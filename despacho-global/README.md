# Despacho Global

Diario de Argentina y el mundo, con foco en lo que los grandes medios no cuentan: 35 noticias por edición (agenda 7, Argentina 7, fuera del radar 14, breves 7). Las ediciones las investiga y redacta Claude Code con búsqueda web, usando tu suscripción de Claude.

## Usarlo

```bash
cd "~/Desktop/Landing Page Personal/despacho-global"
python3 server.py
```

Abrí http://localhost:8787 y tocá **Actualizar**. Tarda unos minutos y en pantalla vas viendo qué está buscando. Si algo falla, queda la edición anterior.

También se puede actualizar sin abrir la página: `python3 actualizar.py`.

**Una sola vez:** Claude Code tiene que tener una sesión iniciada en la terminal (`claude auth login`).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página. Lee `data/edicion.json`. Estilos en `assets/despacho.css`, lógica y mapa en `assets/despacho.js`. |
| `assets/vendor/` | Librerías del mapa y el mapamundi, guardados acá para no depender de internet. |
| `PROMPT.md` | Las instrucciones editoriales: secciones, criterios y formato. Para cambiar qué cubre el Despacho, editá esto. |
| `actualizar.py` | Llama a Claude Code, valida el JSON y guarda la edición. |
| `publicar.sh` | Sube la edición del día (`data/`) a GitHub. |
| `diario.sh` | Lo que corre la tarea de la mañana: espera internet, arma la edición (hasta 3 intentos) y la publica. |
| `server.py` | Servidor local, solo accesible desde tu Mac, que hace andar el botón. |
| `data/edicion.json` | La edición vigente. |
| `data/archivo/` | Una edición por día, más `indice.json` para el selector de ediciones anteriores. |

## En el portfolio publicado

Online no hay servidor: el botón pasa a decir **Recargar** y trae la última edición subida.

La tarea de la mañana corre `diario.sh`: espera hasta 20 minutos a que haya internet, arma la edición (hasta 3 intentos) y después corre `publicar.sh`, que sube solo `data/` a GitHub. Para publicar a mano: `bash publicar.sh`.
