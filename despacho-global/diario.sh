#!/bin/bash
# Arma y publica la edición del día, con paciencia si falta internet.
# Lo corre la tarea de la mañana. También se puede correr a mano:
#   bash diario.sh
# 1. Espera hasta 20 minutos a que haya internet (la Mac puede estar recién despertando).
# 2. Corre actualizar.py hasta 3 veces, esperando 5 y 10 minutos entre intentos.
# 3. Si salió bien, sube la edición con publicar.sh (2 intentos).
cd "$(dirname "$0")"

hay_internet() {
  curl -s -o /dev/null --max-time 10 https://api.anthropic.com && \
  curl -s -o /dev/null --max-time 10 https://github.com
}

echo "Esperando conexión a internet…"
for i in $(seq 1 40); do
  if hay_internet; then echo "Hay internet."; break; fi
  if [ "$i" -eq 40 ]; then echo "Error: no hubo internet durante 20 minutos."; exit 1; fi
  sleep 30
done

OK=0
for intento in 1 2 3; do
  echo "Intento $intento de armar la edición…"
  if python3 actualizar.py; then OK=1; break; fi
  if [ "$intento" -lt 3 ]; then
    espera=$((intento * 300))
    echo "Falló el intento $intento. Reintento en $((espera / 60)) minutos."
    sleep "$espera"
    until hay_internet; do sleep 30; done
  fi
done
if [ "$OK" -ne 1 ]; then
  echo "Error: no se pudo armar la edición después de 3 intentos."
  exit 1
fi

for intento in 1 2; do
  if bash publicar.sh; then exit 0; fi
  echo "Falló la subida a GitHub (intento $intento)."
  [ "$intento" -lt 2 ] && sleep 120
done
echo "Error: la edición quedó lista en la compu pero no se pudo subir a GitHub."
exit 2
