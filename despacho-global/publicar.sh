#!/bin/bash
# Sube a GitHub la edición del día (solo data/), para que se vea en mateomasjuan.github.io.
# Lo corre la tarea de la mañana después de actualizar.py. También se puede correr a mano:
#   bash publicar.sh
set -euo pipefail
cd "$(dirname "$0")/.."
export GIT_TERMINAL_PROMPT=0   # si falta la clave de GitHub, falla en vez de quedarse esperando

DATA="despacho-global/data"
FECHA=$(python3 -c "import json; print(json.load(open('$DATA/edicion.json'))['fecha'])")

git add "$DATA"
if git diff --cached --quiet -- "$DATA"; then
  echo "Nada nuevo para publicar (la edición $FECHA ya está en GitHub)."
else
  git commit -q -m "Despacho Global: edición del $FECHA" -- "$DATA"
fi

git pull -q --rebase --autostash origin main
git push -q origin main
echo "Edición $FECHA publicada en GitHub. Se ve en la web en 2 o 3 minutos."
