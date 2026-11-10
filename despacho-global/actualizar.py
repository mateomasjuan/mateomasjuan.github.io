#!/usr/bin/env python3
"""Genera una edición nueva del Despacho Global con Claude Code (usa tu suscripción).

Uso:  python3 actualizar.py
Lo llama también server.py cuando tocás el botón amarillo.
"""
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from zoneinfo import ZoneInfo

RAIZ = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(RAIZ, 'data')
ARCHIVO = os.path.join(DATA, 'archivo')
LOCK = os.path.join(DATA, '.actualizando')
TZ = ZoneInfo('America/Argentina/Buenos_Aires')
TIMEOUT = 20 * 60

MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
         'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']


def buscar_claude():
    """El CLI instalado si existe; si no, el que trae la app de escritorio."""
    for c in [shutil.which('claude'), os.path.expanduser('~/.local/bin/claude'),
              os.path.expanduser('~/.claude/local/claude')]:
        if c and os.path.exists(c):
            return c
    app = glob.glob(os.path.expanduser(
        '~/Library/Application Support/Claude/claude-code/*/*/claude.app/Contents/MacOS/claude'))
    if app:
        return max(app, key=os.path.getmtime)
    raise RuntimeError('No encontré Claude Code. Instalalo o abrí la app de Claude.')


def leer_json(ruta, defecto=None):
    try:
        with open(ruta, encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return defecto


def escribir_json(ruta, datos):
    tmp = ruta + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)
    os.replace(tmp, ruta)


def armar_prompt(ahora, previa):
    titulares = [n['headline'] for n in (previa or {}).get('argentina', [])[:5]]
    titulares += [n['headline'] for n in (previa or {}).get('ranking', [])[:7]]
    titulares += [n['headline'] for n in (previa or {}).get('mundo', [])[:14]]
    reemplazos = {
        '{{FECHA_LARGA}}': f"{DIAS[ahora.weekday()]} {ahora.day} de {MESES[ahora.month - 1]} de {ahora.year}",
        '{{FECHA_ISO}}': ahora.strftime('%Y-%m-%d'),
        '{{HORA}}': ahora.strftime('%H:%M'),
        '{{DIA_MES}}': f"{ahora.day} de {MESES[ahora.month - 1]}",
        '{{TITULARES_PREVIOS}}': '; '.join(titulares) or 'ninguno',
    }
    with open(os.path.join(RAIZ, 'PROMPT.md'), encoding='utf-8') as f:
        texto = f.read()
    for k, v in reemplazos.items():
        texto = texto.replace(k, v)
    return texto


def extraer_json(texto):
    texto = re.sub(r'^```(?:json)?|```$', '', texto.strip(), flags=re.M).strip()
    inicio, fin = texto.find('{'), texto.rfind('}')
    if inicio < 0 or fin < 0:
        raise ValueError('Claude no devolvió un JSON.')
    return json.loads(texto[inicio:fin + 1])


def validar(ed):
    for clave in ('indicadores', 'argentina', 'mundo', 'ranking', 'efemerides'):
        if clave not in ed:
            raise ValueError(f'Falta la sección "{clave}".')
    if len(ed['argentina']) < 3 or len(ed['ranking']) < 3:
        raise ValueError('La edición vino con muy pocas notas.')
    for nota in ed['argentina'] + ed['mundo'] + ed['ranking']:
        if not str(nota.get('url', '')).startswith('http'):
            nota['url'] = ''
        if not nota.get('headline'):
            raise ValueError('Hay una nota sin titular.')
    ed['breves'] = [b for b in ed.get('breves', []) if b.get('text')]
    for breve in ed['breves']:
        if not str(breve.get('url', '')).startswith('http'):
            breve['url'] = ''


def correr(progreso=print):
    """Corre la actualización completa. `progreso(texto)` recibe avances."""
    if os.path.exists(LOCK) and time.time() - os.path.getmtime(LOCK) < TIMEOUT:
        raise RuntimeError('Ya hay una actualización en curso.')
    open(LOCK, 'w').close()
    try:
        ahora = datetime.now(TZ)
        previa = leer_json(os.path.join(DATA, 'edicion.json'), {})
        claude = buscar_claude()
        progreso('Abriendo la redacción…')
        proc = subprocess.Popen(
            [claude, '-p', armar_prompt(ahora, previa),
             '--output-format', 'stream-json', '--verbose',
             '--allowedTools', 'WebSearch', 'WebFetch'],
            cwd=RAIZ, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        resultado, busquedas = None, 0
        for linea in proc.stdout:
            try:
                ev = json.loads(linea)
            except json.JSONDecodeError:
                continue
            if ev.get('type') == 'assistant':
                for bloque in ev.get('message', {}).get('content', []):
                    if bloque.get('type') != 'tool_use':
                        continue
                    entrada = bloque.get('input', {})
                    if bloque.get('name') == 'WebSearch':
                        busquedas += 1
                        progreso(f"Buscando ({busquedas}): {entrada.get('query', '')}")
                    elif bloque.get('name') == 'WebFetch':
                        progreso(f"Leyendo: {entrada.get('url', '')[:90]}")
            elif ev.get('type') == 'result':
                resultado = ev
        proc.wait(timeout=TIMEOUT)
        if not resultado or resultado.get('is_error'):
            detalle = (resultado or {}).get('result') or proc.stderr.read()[-400:]
            if 'login' in str(detalle).lower():
                detalle = 'Claude Code no tiene sesión iniciada. Corré "claude auth login" una vez en la terminal.'
            raise RuntimeError(f'Claude no pudo terminar la edición: {detalle}')

        progreso('Armando la edición…')
        ed = extraer_json(resultado.get('result', ''))
        validar(ed)
        fecha = ahora.strftime('%Y-%m-%d')
        indice = leer_json(os.path.join(ARCHIVO, 'indice.json'), [])
        ed = {
            'edicion': max([e['edicion'] for e in indice] or [0]) + 1,
            'fecha': fecha,
            'generado': ahora.isoformat(timespec='seconds'),
            **ed,
        }
        # Varias ediciones el mismo día: la última pisa a la anterior en el archivo.
        nombre = f'archivo/{fecha}.json'
        escribir_json(os.path.join(DATA, nombre), ed)
        escribir_json(os.path.join(DATA, 'edicion.json'), ed)
        indice = [e for e in indice if e['fecha'] != fecha]
        indice.append({'fecha': fecha, 'edicion': ed['edicion'], 'archivo': nombre})
        escribir_json(os.path.join(ARCHIVO, 'indice.json'), sorted(indice, key=lambda e: e['fecha']))
        progreso(f"Edición N° {ed['edicion']} lista ({busquedas} búsquedas).")
        return ed
    finally:
        os.remove(LOCK)


if __name__ == '__main__':
    try:
        correr()
    except Exception as e:
        print(f'Error: {e}', file=sys.stderr)
        sys.exit(1)
