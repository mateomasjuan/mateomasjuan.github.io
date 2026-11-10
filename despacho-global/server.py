#!/usr/bin/env python3
"""Servidor local del Despacho Global: sirve la página y hace andar el botón amarillo.

Uso:  python3 server.py   →   http://localhost:8787
Solo escucha en tu Mac (127.0.0.1); nadie de afuera puede disparar actualizaciones.
"""
import json
import os
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import actualizar

PUERTO = int(os.environ.get('PORT', 8787))
estado = {'corriendo': False, 'inicio': None, 'pasos': [], 'error': None, 'terminado': None}
candado = threading.Lock()


def trabajar():
    def progreso(texto):
        estado['pasos'] = (estado['pasos'] + [texto])[-8:]
    try:
        actualizar.correr(progreso)
    except Exception as e:
        estado['error'] = str(e)
    finally:
        estado['corriendo'] = False
        estado['terminado'] = time.time()


class Manejador(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=actualizar.RAIZ, **kw)

    def responder(self, codigo, datos):
        cuerpo = json.dumps(datos, ensure_ascii=False).encode()
        self.send_response(codigo)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def translate_path(self, path):
        # El Atlas vive al lado, como en el portfolio publicado: ../atlas-global/
        if path.startswith('/atlas-global/'):
            hermano = os.path.join(os.path.dirname(actualizar.RAIZ), 'atlas-global')
            return os.path.join(hermano, path.split('?')[0][len('/atlas-global/'):] or 'index.html')
        # Y el Atlas vuelve con ../despacho-global/, que acá es la raíz.
        if path.startswith('/despacho-global/'):
            path = path[len('/despacho-global'):]
        return super().translate_path(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        if self.path.split('?')[0] == '/api/estado':
            return self.responder(200, estado)
        return super().do_GET()

    def do_POST(self):
        if self.path.split('?')[0] != '/api/actualizar':
            return self.responder(404, {'error': 'no existe'})
        with candado:
            if estado['corriendo']:
                return self.responder(409, estado)
            estado.update(corriendo=True, inicio=time.time(), pasos=[], error=None, terminado=None)
        threading.Thread(target=trabajar, daemon=True).start()
        self.responder(202, estado)

    def log_message(self, fmt, *args):
        if '/api/estado' not in (args[0] if args else ''):
            super().log_message(fmt, *args)


if __name__ == '__main__':
    print(f'Despacho Global en http://localhost:{PUERTO}')
    ThreadingHTTPServer(('127.0.0.1', PUERTO), Manejador).serve_forever()
