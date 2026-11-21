#!/bin/bash
# Chequeo automático del Despacho: lo corre macOS cada 10 minutos mientras la
# Mac está despierta (y apenas despierta, si se perdió alguno). Si son más de
# las 7 y la edición de hoy todavía no existe, la arma y la publica con diario.sh.
#
# Corre desde una copia del proyecto fuera del Escritorio (~/.despacho-global/repo),
# porque macOS no deja que los procesos de fondo entren al Escritorio.
# El agente que lo dispara está en ~/Library/LaunchAgents/com.mateomasjuan.despacho-global.plist
export PATH="$HOME/.local/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export GIT_TERMINAL_PROMPT=0
cd "$(dirname "$0")/.." || exit 1

ESTADO="$HOME/.despacho-global"
ULTIMO="$ESTADO/ultimo-intento"
mkdir -p "$ESTADO"

# 1. Solo con la Mac despierta del todo (pantalla encendida), no en los
#    "microdespertares" de mantenimiento con la tapa cerrada.
pmset -g systemstate | grep -q Graphics || exit 0

# 2. Solo desde las 7 de la mañana.
[ "$(date +%H)" -ge 7 ] || exit 0

# 3. Si ya hay un intento hoy en la última hora (o uno en curso), no apilar otro.
if [ -f "$ULTIMO" ] && [ $(( $(date +%s) - $(stat -f %m "$ULTIMO") )) -lt 3600 ]; then
  exit 0
fi

# 4. Traer lo último de GitHub (la edición pudo haberse armado en otro lado).
git pull -q --rebase --autostash origin main 2>/dev/null || exit 0

# 5. ¿Ya está la edición de hoy?
HOY=$(date +%Y-%m-%d)
FECHA=$(python3 -c "import json; print(json.load(open('despacho-global/data/edicion.json'))['fecha'])" 2>/dev/null)
[ "$FECHA" = "$HOY" ] && exit 0

touch "$ULTIMO"
echo "=== $(date '+%Y-%m-%d %H:%M') · falta la edición de hoy, la armo ==="
bash despacho-global/diario.sh
echo "=== $(date '+%Y-%m-%d %H:%M') · terminó (código $?) ==="
touch "$ULTIMO"
