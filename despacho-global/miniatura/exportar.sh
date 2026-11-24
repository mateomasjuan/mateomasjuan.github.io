#!/bin/bash
# Exporta la miniatura de Despacho Global a PNG con Chrome sin ventana.
#   bash exportar.sh            → la miniatura para compartir (radar) y la de la tarjeta del portfolio
#   bash exportar.sh mapa       → otra variante de prueba (mapa, rincones, cable, dia, noche)
# Salen en esta carpeta: miniatura-<variante>.png (2400×1254, para nitidez)
cd "$(dirname "$0")/.." || exit 1
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PUERTO=8791
python3 -m http.server $PUERTO >/dev/null 2>&1 &
SERVIDOR=$!
trap 'kill $SERVIDOR 2>/dev/null' EXIT
sleep 1
for v in ${@:-radar tarjeta}; do
  ALTO=627; URLV="v=$v"
  # "tarjeta": la versión ancha para la tarjeta del portfolio (texto centrado, sin bajada)
  if [ "$v" = "tarjeta" ]; then ALTO=524; URLV="v=radar&formato=tarjeta"; fi
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --window-size=1200,$ALTO --virtual-time-budget=20000 \
    --screenshot="$PWD/miniatura/miniatura-$v.png" \
    "http://localhost:$PUERTO/miniatura/miniatura.html?$URLV" 2>/dev/null
  echo "Lista: miniatura/miniatura-$v.png"
done
