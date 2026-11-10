const $ = id => document.getElementById(id);
const TZ = 'America/Argentina/Buenos_Aires';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let modoLocal = false;

/* ---------- Tema ---------- */
function setTheme(t){
  document.documentElement.dataset.theme = t;
  $('themeLabel').textContent = t === 'noche' ? 'Día' : 'Noche';
  $('themeToggle').setAttribute('aria-label', t === 'noche' ? 'Cambiar a modo día' : 'Cambiar a modo noche');
  try{ localStorage.setItem('despacho-tema', t); }catch(e){}
}
setTheme(document.documentElement.dataset.theme === 'noche' ? 'noche' : 'dia');
$('themeToggle').addEventListener('click', () =>
  setTheme(document.documentElement.dataset.theme === 'noche' ? 'dia' : 'noche'));

/* ---------- Utilidades ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = u => /^https?:\/\//.test(u || '') ? esc(u) : '';
const fechaCorta = iso => new Intl.DateTimeFormat('es-AR',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(iso + 'T12:00:00Z'));
const fechaLarga = iso => new Intl.DateTimeFormat('es-AR',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(iso + 'T12:00:00Z'));
const fechaMini = iso => new Intl.DateTimeFormat('es-AR',{day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(iso + 'T12:00:00Z')).replace('.', '');
const hoyISO = () => new Intl.DateTimeFormat('en-CA',{timeZone:TZ}).format(new Date());
const diasDesde = iso => Math.round((new Date(hoyISO() + 'T12:00:00Z') - new Date(iso + 'T12:00:00Z')) / 864e5);
const lugar = n => [n.city, n.country].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ');

function headlineHtml(n, texto){
  const u = safeUrl(n.url);
  const t = esc(texto ?? n.headline);
  return `<h3 class="headline">${u ? `<a href="${u}" target="_blank" rel="noopener">${t}</a>` : t}</h3>`;
}
const fuenteHtml = n => safeUrl(n.url) ? `<a class="src" href="${safeUrl(n.url)}" target="_blank" rel="noopener">Leer la fuente ↗</a>` : '';
const impactoHtml = n => n.impact ? `<span class="chip ${n.impact === 'alto' ? 'chip--alto' : ''}">Impacto ${esc(n.impact)}</span>` : '';
const origenHtml = n => n.source ? `<span>${esc(n.source)}${n.time_note ? ' · ' + esc(n.time_note) : ''}</span>` : '';

/* ---------- Render ---------- */
function renderTicker(items){
  $('ticker').innerHTML = (items || []).map(i => {
    // Sin verde/rojo: que el riesgo país suba es malo, que suba el Merval es bueno.
    const v = String(i.variacion || '').trim();
    return `<div class="ind">
      <div class="ind__label">${esc(i.label)}</div>
      <div class="ind__value">${esc(i.valor)}${v ? `<span class="ind__var">${esc(v)}</span>` : ''}</div>
      ${i.nota ? `<div class="ind__note" title="${esc(i.nota)}">${esc(i.nota)}</div>` : ''}
    </div>`;
  }).join('');
  $('ticker').hidden = !(items || []).length;
}

function renderAgenda(notas){
  $('agenda').innerHTML = (notas || []).map((n, i) => `
    <li id="n-ranking-${i}">
      <div class="rank" aria-label="Puesto ${i + 1}">${i + 1}</div>
      <div>
        <p class="where">${esc(lugar(n))}</p>
        ${headlineHtml(n)}
        <p class="summary">${esc(n.summary)}</p>
        <div class="meta">${n.category ? `<span class="chip">${esc(n.category)}</span>` : ''}${impactoHtml(n)}${origenHtml(n)}${fuenteHtml(n)}</div>
      </div>
    </li>`).join('') || '<li class="empty">Sin agenda en esta edición.</li>';
}

function renderArgentina(notas){
  if(!notas?.length){ $('argentina').innerHTML = '<p class="empty">Sin notas de Argentina en esta edición.</p>'; return; }
  const nota = (a, i) => `
    <p class="where">${esc(a.tag)}${a.city ? ' · ' + esc(a.city) : ''}</p>
    ${headlineHtml(a)}
    <p class="summary">${esc(a.summary)}</p>
    <div class="meta">${impactoHtml(a)}${origenHtml(a)}${fuenteHtml(a)}</div>`;
  const [lead, ...resto] = notas;
  // Dos columnas parejas: la principal y las que le siguen a la izquierda, el resto a la derecha.
  // El orden de lectura se mantiene (1, 2, 3…), así en el celular quedan en fila.
  const peso = (a, k = 1) => k * (90 + String(a.headline).length * 2.2 + String(a.summary).length);
  const total = peso(lead, 1.7) + resto.reduce((t, a) => t + peso(a), 0);
  let izq = peso(lead, 1.7), corte = 0;
  while(corte < resto.length - 1 && Math.abs(total - 2 * (izq + peso(resto[corte]))) < Math.abs(total - 2 * izq)){
    izq += peso(resto[corte]);
    corte++;
  }
  const item = (a, i) => `<li id="n-argentina-${i + 1}">${nota(a, i + 1)}</li>`;
  $('argentina').innerHTML =
    `<div class="arg__col">
      <article class="arg__lead" id="n-argentina-0">${nota(lead, 0)}</article>
      <ul class="arg__list">${resto.slice(0, corte).map((a, i) => item(a, i)).join('')}</ul>
    </div>
    <ul class="arg__list arg__list--side">${resto.slice(corte).map((a, i) => item(a, i + corte)).join('')}</ul>`;
}

function renderRadar(notas){
  const regiones = [];
  (notas || []).forEach((n, i) => {
    let r = regiones.find(x => x.nombre === n.region);
    if(!r) regiones.push(r = {nombre: n.region || 'Mundo', notas: []});
    r.notas.push({...n, i});
  });
  $('radar').innerHTML = regiones.map(r => `
    <div class="region">
      <h3 class="region__name">${esc(r.nombre)}</h3>
      <div class="region__stories">${r.notas.map(n => `
        <article class="story" id="n-mundo-${n.i}">
          <p class="where">${esc(lugar(n))}</p>
          ${headlineHtml(n)}
          <p class="summary">${esc(n.summary)}</p>
          ${n.por_que ? `<p class="story__why"><b>Por qué importa:</b>${esc(n.por_que)}</p>` : ''}
          <div class="meta">${n.category ? `<span class="chip">${esc(n.category)}</span>` : ''}${origenHtml(n)}${fuenteHtml(n)}</div>
        </article>`).join('')}
      </div>
    </div>`).join('') || '<p class="empty">Sin historias fuera del radar en esta edición.</p>';
}

function renderBreves(items){
  const hay = !!(items || []).length;
  $('navBreves').hidden = !hay;
  $('breves').innerHTML = (items || []).map((b, i) => `
    <li id="n-breves-${i}">
      <span class="pinlg" aria-hidden="true"></span>
      <div>
        <p class="where">${esc(b.country)}${b.category ? ' · ' + esc(b.category) : ''}</p>
        <p>${esc(b.text)}</p>
        <div class="meta">${b.source ? `<span>${esc(b.source)}</span>` : ''}${fuenteHtml(b)}</div>
      </div>
    </li>`).join('');
}

function renderEfemerides(ef){
  $('efemDia').textContent = ef?.dia ? ef.dia : 'día como hoy';
  $('efemerides').innerHTML = (ef?.items || []).map(e =>
    `<li><span class="efem__year">${esc(e.year)}</span><p>${esc(e.text)}</p></li>`).join('');
}

const flecha = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
function renderPortada(ed){
  const ag = ed.ranking || [];
  const [lead, ...resto] = ag;
  $('frontAgenda').innerHTML = lead ? `
    <h2 class="front__label"><a href="#agenda">La agenda del día</a></h2>
    <article class="front__lead">
      <p class="where">${esc(lugar(lead))}</p>
      <h3 class="headline"><a href="#agenda/n-ranking-0">${esc(lead.headline)}</a></h3>
      <p class="summary">${esc(lead.summary)}</p>
    </article>
    <ul class="front__list">${resto.slice(0, 3).map((n, i) => `
      <li><p class="where">${esc(lugar(n))}</p><h3 class="headline"><a href="#agenda/n-ranking-${i + 1}">${esc(n.headline)}</a></h3></li>`).join('')}
    </ul>
    <a class="more" href="#agenda">Toda la agenda del día${flecha}</a>` : '';

  const arg = ed.argentina || [];
  $('frontArg').innerHTML = arg.slice(0, 4).map((n, i) => `
    <article class="front__argitem${i === 0 ? ' front__argitem--lead' : ''}">
      <p class="where">${esc(n.tag)}</p>
      <h3 class="headline"><a href="#argentina/n-argentina-${i}">${esc(n.headline)}</a></h3>
      ${i === 0 ? `<p class="summary">${esc(n.summary)}</p>` : ''}
    </article>`).join('');

  // Una historia por región, para que la portada muestre la vuelta al mundo.
  const mundo = (ed.mundo || []).map((n, i) => ({...n, i}));
  const regiones = new Set();
  const elegidas = mundo.filter(n => !regiones.has(n.region) && regiones.add(n.region)).slice(0, 4);
  $('frontRadar').innerHTML = elegidas.map(n => `
    <article class="fr">
      <p class="fr__region">${esc(n.region)}</p>
      <p class="where">${esc(lugar(n))}</p>
      <h3 class="headline"><a href="#fuera-del-radar/n-mundo-${n.i}">${esc(n.headline)}</a></h3>
      ${n.por_que ? `<p class="fr__why">${esc(n.por_que)}</p>` : ''}
    </article>`).join('');
  $('frontRadarMore').innerHTML = `Ver las ${mundo.length} historias${flecha}`;

  const breves = ed.breves || [];
  $('frontBrevesCol').hidden = !breves.length;
  $('frontBreves').innerHTML = breves.slice(0, 3).map((b, i) => `
    <li><a href="#breves/n-breves-${i}"><b>${esc(b.country)}.</b> ${esc(b.text)}</a></li>`).join('');
  $('frontEfem').innerHTML = (ed.efemerides?.items || []).slice(0, 3).map(e => `
    <li><b>${esc(e.year)}.</b> ${esc(e.text)}</li>`).join('');
}

function setStatus(texto, dot){
  $('statustext').textContent = texto;
  $('statusdot').className = 'dot ' + (dot || '');
}

let edicionActual = null;
function renderEdicion(ed, esUltima){
  edicionActual = ed;
  const cierre = ed.generado ? new Date(ed.generado).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:TZ}) : '';
  $('edline').innerHTML = `Edición <b>N° ${esc(ed.edicion)}</b> · ${esc(fechaLarga(ed.fecha))}${cierre ? ' · cierre ' + esc(cierre) : ''}`;
  renderTicker(ed.indicadores);
  $('editorNote').textContent = ed.nota_editor || '';
  $('editorNote').hidden = !ed.nota_editor;
  renderAgenda(ed.ranking);
  renderArgentina(ed.argentina);
  renderRadar(ed.mundo);
  renderBreves(ed.breves);
  renderEfemerides(ed.efemerides);
  renderPortada(ed);
  mapa.pintar(ed);

  const d = diasDesde(ed.fecha);
  if(!esUltima) setStatus(`Estás viendo una edición archivada, del ${fechaCorta(ed.fecha)}.`, 'stale');
  else if(d <= 0) setStatus(`Edición de hoy, cerrada a las ${cierre}.`);
  else setStatus(`Última edición: ${fechaCorta(ed.fecha)}, hace ${d} ${d === 1 ? 'día' : 'días'}.`, 'stale');
}

/* ---------- Mapa ---------- */
const mapa = (() => {
  const W = 1000, H = 488;
  const el = $('map');
  let listo = null, paises = null, centros = null, proj = null, path = null;

  // Nombres de Natural Earth que no coinciden con los nombres en inglés del navegador.
  const NE = {
    'United States':'United States of America','Congo - Kinshasa':'Dem. Rep. Congo','Congo - Brazzaville':'Congo',
    'Central African Republic':'Central African Rep.','South Sudan':'S. Sudan','Bosnia and Herzegovina':'Bosnia and Herz.',
    'Dominican Republic':'Dominican Rep.','Equatorial Guinea':'Eq. Guinea','Eswatini':'eSwatini','Solomon Islands':'Solomon Is.',
    'Western Sahara':'W. Sahara',"Côte d’Ivoire":"Côte d'Ivoire",'North Macedonia':'Macedonia','Myanmar (Burma)':'Myanmar',
    'Falkland Islands':'Falkland Is.','Palestinian Territories':'Palestine','Türkiye':'Turkey','Turkey':'Turkey'
  };
  // Cómo suelen aparecer en las notas, en castellano.
  const ALIAS = {
    'eeuu':'US','ee uu':'US','estados unidos de america':'US','usa':'US','inglaterra':'GB','escocia':'GB','gales':'GB',
    'irlanda del norte':'GB','gran bretana':'GB','costa de marfil':'CI','birmania':'MM','turquia':'TR','palestina':'PS','gaza':'PS',
    'franja de gaza':'PS','cisjordania':'PS','republica checa':'CZ','chequia':'CZ','rd congo':'CD','republica democratica del congo':'CD',
    'congo':'CG','republica del congo':'CG','macedonia del norte':'MK','suazilandia':'SZ','esuatini':'SZ','corea del sur':'KR',
    'corea del norte':'KP','holanda':'NL','paises bajos':'NL','emiratos arabes':'AE','vaticano':'VA','timor oriental':'TL',
    'islas malvinas':'FK','malvinas':'FK','cabo verde':'CV','taiwan':'TW','kosovo':'XK','somalilandia':'SO','groenlandia':'GL',
    'hong kong':'HK','tibet':'CN','sahara occidental':'EH','papua nueva guinea':'PG','rusia':'RU'
  };
  // Países chicos que no aparecen en el mapa de baja resolución.
  const CHICOS = {
    SG:[103.8,1.35],BH:[50.6,26.0],MT:[14.4,35.9],MU:[57.6,-20.3],MV:[73.5,4.2],SC:[55.5,-4.6],CV:[-23.6,15.1],KM:[43.9,-11.7],
    ST:[6.6,0.3],TV:[179.2,-8.5],WS:[-172.1,-13.8],TO:[-175.2,-21.2],KI:[173.0,1.4],NR:[166.9,-0.5],MH:[171.2,7.1],FM:[158.2,6.9],
    PW:[134.5,7.5],AD:[1.5,42.5],MC:[7.4,43.7],LI:[9.5,47.1],SM:[12.4,43.9],VA:[12.45,41.9],LU:[6.1,49.6],BB:[-59.5,13.1],
    GD:[-61.7,12.1],LC:[-61.0,13.9],VC:[-61.2,13.2],DM:[-61.4,15.4],AG:[-61.8,17.1],KN:[-62.7,17.3],HK:[114.2,22.3],MO:[113.5,22.2],
    XK:[20.9,42.6],BN:[114.7,4.5],CK:[-159.8,-21.2],PF:[-149.6,-17.6],NC:[165.6,-21.3],GL:[-42,72],SO:[45.3,5.2]
  };
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z ]/g,' ').replace(/\s+/g,' ').trim();

  function armarCentros(){
    const porNombre = new Map(paises.features.map(f => [f.properties.name, f]));
    const es = new Intl.DisplayNames(['es'], {type:'region'});
    const en = new Intl.DisplayNames(['en'], {type:'region'});
    const porCodigo = new Map();
    centros = new Map();
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(const a of A) for(const b of A){
      const code = a + b;
      let nEs, nEn;
      try{ nEs = es.of(code); nEn = en.of(code); }catch(e){ continue; }
      if(!nEs || nEs === code) continue;
      const clave = NE[nEn] || nEn.replace(/ & /g, ' and ');
      const f = porNombre.get(clave);
      const c = f ? d3.geoCentroid(f) : CHICOS[code];
      if(!c) continue;
      porCodigo.set(code, {c, f});
      centros.set(norm(nEs), {c, f});
      centros.set(norm(nEs.replace(/\s*\(.*\)/, '')), {c, f});
    }
    for(const [alias, code] of Object.entries(ALIAS)) if(porCodigo.has(code)) centros.set(alias, porCodigo.get(code));
    // Francia, Noruega y algunos más tienen territorios lejanos que corren el centro.
    const fix = {francia:[2.4,46.6],noruega:[9,61],estados_unidos:[-98,39],rusia:[60,58],chile:[-71,-35],canada:[-100,58]};
    for(const [k, c] of Object.entries(fix)){ const n = k.replace('_',' '); if(centros.has(n)) centros.set(n, {...centros.get(n), c}); }
    if(centros.has('estados unidos')) centros.set('eeuu', centros.get('estados unidos'));
  }

  function cargar(){
    if(listo) return listo;
    if(!window.d3 || !window.topojson){ $('mapband').classList.add('sinmapa'); return listo = Promise.resolve(false); }
    listo = fetch('assets/vendor/countries-110m.json').then(r => r.json()).then(world => {
      paises = topojson.feature(world, world.objects.countries);
      paises.features = paises.features.filter(f => f.properties.name !== 'Antarctica');
      proj = d3.geoEqualEarth().fitExtent([[4, 4], [W - 4, H - 4]], paises);
      path = d3.geoPath(proj);
      armarCentros();
      return true;
    }).catch(() => { $('mapband').classList.add('sinmapa'); return false; });
    return listo;
  }

  function ubicar(n){
    if(Number.isFinite(+n.lat) && Number.isFinite(+n.lon) && (n.lat !== 0 || n.lon !== 0) && n.lat !== '' && n.lon !== '')
      return {c:[+n.lon, +n.lat], f:centros.get(norm(n.country))?.f};
    const hit = centros.get(norm(n.country)) || centros.get(norm(String(n.country || '').split(/,|\/| y /)[0]));
    return hit || null;
  }

  // En el mapa van todas las de Fuera del radar y las breves, más las tres que más pesan del día.
  function puntos(ed){
    const lista = [];
    const sumar = (arr, sec, tipo, titulo) => (arr || []).forEach((n, i) => {
      const u = ubicar(n);
      if(u) lista.push({id:`n-${sec}-${i}`, tipo, lonlat:u.c, f:u.f, titulo:titulo(n), donde:sec === 'breves' ? n.country : lugar(n),
        seccion:{ranking:'Lo más importante del día', mundo:'Fuera del radar', breves:'Breves'}[sec]});
    });
    sumar(ed.mundo, 'mundo', 'radar', n => n.headline);
    sumar(ed.breves, 'breves', 'breve', n => n.text);
    sumar((ed.ranking || []).slice(0, 3), 'ranking', 'agenda', n => n.headline);
    // De oeste a este, como el barrido y el recorrido.
    lista.sort((a, b) => a.lonlat[0] - b.lonlat[0]);
    return lista;
  }

  // Separa los puntos que quedan muy juntos, para que cada uno se pueda tocar.
  // La distancia mínima depende del tamaño en pantalla: en el celular se abren más.
  function separar(lista){
    const escala = W / Math.max(320, el.clientWidth || W);
    const min = Math.min(42, Math.max(15, 24 * escala));
    lista.forEach((p, i) => { [p.x0, p.y0] = proj(p.lonlat); p.x = p.x0 + Math.cos(i * 2.4) * .01; p.y = p.y0 + Math.sin(i * 2.4) * .01; });
    for(let it = 0; it < 80; it++){
      let movio = false;
      for(let i = 0; i < lista.length; i++) for(let j = i + 1; j < lista.length; j++){
        const a = lista[i], b = lista[j];
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
        if(d >= min) continue;
        const k = (min - d) / 2 / d;
        a.x -= dx * k; a.y -= dy * k; b.x += dx * k; b.y += dy * k;
        movio = true;
      }
      if(!movio) break;
    }
    lista.forEach(p => { p.x = Math.max(8, Math.min(W - 8, p.x)); p.y = Math.max(8, Math.min(H - 8, p.y)); });
  }

  function meridiano(lon){
    return path({type:'LineString', coordinates:d3.range(-90, 90.1, 3).map(lat => [lon, lat])});
  }

  async function pintar(ed){
    if(!(await cargar())) return;
    const lista = puntos(ed);
    separar(lista);
    const conNoticia = new Set(lista.filter(p => p.f).map(p => p.f));
    const paisesHoy = new Set(lista.map(p => p.f?.properties.name || p.donde));
    const fuera = lista.filter(p => p.tipo !== 'agenda').length;
    $('mapcount').innerHTML = `<b>${fuera} historias fuera del foco</b> en <b>${paisesHoy.size} países</b>, y lo más importante del día.`;

    const meridianos = d3.range(-180, 181, 15).map(lon => `<path class="meridian" d="${meridiano(lon)}"/>`).join('');
    const corridos = lista.filter(p => Math.hypot(p.x - p.x0, p.y - p.y0) > 5);
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="presentation">
      <defs>
        <pattern id="landdots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.25" fill="rgba(255,255,255,.42)"/></pattern>
        <pattern id="landdots-hoy" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.6" fill="#D3F33F" fill-opacity=".8"/></pattern>
      </defs>
      <g>${meridianos}<path class="meridian meridian--ba" d="${meridiano(-58.4)}"/></g>
      <g>${paises.features.map(f => `<path class="land${conNoticia.has(f) ? ' land--hoy' : ''}" d="${path(f)}"/>`).join('')}</g>
      <path class="sweep" id="sweep"/>
      <g>${corridos.map(p => `<line class="leader" x1="${p.x0.toFixed(1)}" y1="${p.y0.toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}"/><circle class="anchor" cx="${p.x0.toFixed(1)}" cy="${p.y0.toFixed(1)}" r="1.8"/>`).join('')}</g>
      <g id="pts">${lista.map((p, i) => `
        <g class="pt pt--${p.tipo}" data-i="${i}" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})">
          <circle class="halo" r="16"/><circle class="hit" r="11" fill="transparent"/>
          <circle class="core" r="${p.tipo === 'breve' ? 4.2 : 5.4}"/>
        </g>`).join('')}</g>
    </svg>`;

    const g = el.querySelector('#pts');
    let activo = -1;
    const mostrar = i => {
      const p = lista[i];
      if(!p) return;
      g.querySelectorAll('.pt').forEach(n => n.classList.toggle('is-on', +n.dataset.i === i));
      g.appendChild(g.querySelector(`.pt[data-i="${i}"]`));
      activo = i;
      $('mapstory').innerHTML = `
        <p class="mapcard__where">${esc(p.seccion)} · ${esc(p.donde)}</p>
        <p class="mapcard__head">${esc(p.titulo)}</p>
        <button class="mapcard__go" type="button" data-go="${esc(p.id)}">Ir a la noticia ↓</button>`;
      $('mapPos').textContent = `${i + 1} de ${lista.length}`;
      $('mapPrev').disabled = i === 0;
      $('mapNext').disabled = i === lista.length - 1;
      $('mapNextLabel').textContent = 'Siguiente';
    };
    $('mapPrev').disabled = true;
    $('mapNext').disabled = false;
    $('mapNextLabel').textContent = 'Empezar el recorrido';
    $('mapPos').textContent = `${lista.length} historias`;
    $('mapPrev').onclick = () => mostrar(Math.max(0, activo - 1));
    $('mapNext').onclick = () => mostrar(Math.min(lista.length - 1, activo + 1));

    g.addEventListener('pointerover', ev => { const n = ev.target.closest('.pt'); if(n && ev.pointerType === 'mouse') mostrar(+n.dataset.i); });
    g.addEventListener('click', ev => {
      const n = ev.target.closest('.pt');
      if(!n) return;
      const i = +n.dataset.i;
      // En el celular, el primer toque muestra la nota; el botón lleva a ella.
      if(ev.pointerType === 'mouse' || activo === i && matchMedia('(hover: hover)').matches) irA(lista[i].id);
      else mostrar(i);
    });
    barrer(lista);
  }

  // El momento del mapa: un meridiano recorre el planeta de oeste a este y va encendiendo las noticias.
  function barrer(lista){
    const pts = [...el.querySelectorAll('.pt')];
    if(reduceMotion) return;
    const sweep = el.querySelector('#sweep');
    el.classList.add('armando');
    const t0 = performance.now(), dur = 2600;
    const paso = t => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      const lon = -180 + 360 * e;
      sweep.setAttribute('d', meridiano(Math.min(lon, 180)));
      sweep.style.opacity = k < .92 ? .9 : (1 - k) * 11;
      pts.forEach((n, i) => { if(lista[i].lonlat[0] <= lon) n.classList.add('visto'); });
      if(k < 1) requestAnimationFrame(paso);
      else { el.classList.remove('armando'); sweep.style.opacity = 0; }
    };
    requestAnimationFrame(paso);
  }

  return {pintar};
})();

/* ---------- Portada y secciones ---------- */
// Cada sección es una página aparte, como en un diario: la portada resume y el zócalo lleva al resto.
const RUTAS = {'':'portada', agenda:'agenda', argentina:'argentina', 'fuera-del-radar':'radar', breves:'breves', efemerides:'efemerides'};
const NOMBRES = {agenda:'La agenda del día', argentina:'Argentina', radar:'Fuera del radar', breves:'Breves del mundo', efemerides:'Efemérides'};
const SECCION_DE = {ranking:'agenda', argentina:'argentina', mundo:'fuera-del-radar', breves:'breves'};

function marcar(id, suave = true){
  const n = document.getElementById(id);
  if(!n) return;
  n.scrollIntoView({behavior: suave && !reduceMotion ? 'smooth' : 'auto', block:'center'});
  n.classList.remove('flash');
  void n.offsetWidth;
  n.classList.add('flash');
}

function irA(id){
  const destino = `${SECCION_DE[id.split('-')[1]]}/${id}`;
  if(location.hash.slice(1) === destino) marcar(id);
  else location.hash = destino;
}

function ruta(){
  const [sec, nota] = decodeURIComponent(location.hash.slice(1)).split('/');
  if(sec === 'contenido') return;
  const view = RUTAS[sec] ?? 'portada';
  const cambio = document.body.dataset.view !== view;
  document.body.dataset.view = view;
  document.querySelectorAll('.view').forEach(v => { v.hidden = v.dataset.view !== view; });
  document.querySelectorAll('.sections a[data-view]').forEach(a => {
    const aca = a.dataset.view === view;
    a.classList.toggle('is-here', aca);
    if(aca) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    // En el celular el zócalo se desliza: dejamos a la vista la sección actual.
    if(aca){ const z = a.parentElement; z.scrollLeft = a.offsetLeft - (z.clientWidth - a.offsetWidth) / 2; }
  });
  document.title = view === 'portada' ? 'Despacho Global' : `${NOMBRES[view]} · Despacho Global`;

  // Al pie de cada sección: la siguiente y la vuelta a la portada.
  const orden = Object.keys(RUTAS).filter(k => k && !$('nav' + k[0].toUpperCase() + k.slice(1))?.hidden);
  const i = orden.indexOf(sec);
  const sig = view !== 'portada' && orden[(i + 1) % orden.length];
  $('nextsec').hidden = view === 'portada';
  if(sig) $('nextsec').innerHTML = `
    <a class="nextsec__home" href="#">Volver a la portada</a>
    <a class="nextsec__next" href="#${sig}"><span>Seguí leyendo</span>${esc(NOMBRES[RUTAS[sig]])}
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a>`;

  // Al llegar desde otra página, saltamos directo a la nota; dentro de la misma, deslizamos.
  if(nota) setTimeout(() => marcar(nota, !cambio), 30);
  else if(cambio) scrollTo(0, 0);
  if(cambio && view !== 'portada') $('contenido').focus({preventScroll:true});
}
addEventListener('hashchange', ruta);

$('mapcard').addEventListener('click', ev => {
  const b = ev.target.closest('[data-go]');
  if(b) irA(b.dataset.go);
});

/* ---------- Datos ---------- */
async function getJSON(url){
  const r = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now());
  if(!r.ok) throw new Error(r.status);
  return r.json();
}

let indice = [];
async function cargarIndice(){
  try{ indice = await getJSON('data/archivo/indice.json'); }catch(e){ indice = []; }
  const sel = $('archivo');
  sel.innerHTML = indice.slice().reverse().map((e, i) =>
    `<option value="${esc(e.archivo)}">N° ${esc(e.edicion)} · ${esc(fechaMini(e.fecha))}</option>`).join('');
  sel.hidden = indice.length < 2;
}

async function cargarUltima(){
  try{
    renderEdicion(await getJSON('data/edicion.json'), true);
  }catch(e){
    setStatus('No se pudo cargar la edición. Abrí la página con server.py (ver README).', 'stale');
  }
}

$('archivo').addEventListener('change', async ev => {
  const ultima = ev.target.selectedIndex === 0;
  try{ renderEdicion(await getJSON('data/' + ev.target.value), ultima); }
  catch(e){ setStatus('No se pudo abrir esa edición.', 'stale'); }
});

/* ---------- Botón Actualizar ---------- */
const btn = $('refresh');
let reloj = null;

function mostrarProgreso(est){
  const p = $('progress');
  p.classList.add('on');
  p.classList.toggle('err', !!est.error);
  $('progressTitle').textContent = est.error ? 'La edición no salió' : est.corriendo ? 'Redacción trabajando' : 'Edición lista';
  const pasos = est.error ? [...(est.pasos || []), est.error] : (est.pasos || []);
  $('progressList').innerHTML = pasos.map(s => `<li>${esc(s)}</li>`).join('') || '<li>Arrancando…</li>';
  if(est.inicio){
    const fin = est.terminado || Date.now() / 1000;
    const s = Math.max(0, Math.round(fin - est.inicio));
    $('progressTime').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2,'0')}`;
  }
}

async function seguirActualizacion(){
  btn.disabled = true;
  btn.textContent = 'Actualizando…';
  setStatus('Buscando y redactando la edición nueva. Tarda unos minutos.', 'live');
  clearInterval(reloj);
  reloj = setInterval(async () => {
    let est;
    try{ est = await getJSON('/api/estado'); }catch(e){ return; }
    mostrarProgreso(est);
    if(est.corriendo) return;
    clearInterval(reloj);
    btn.disabled = false;
    btn.textContent = 'Actualizar';
    if(est.error){
      setStatus('La actualización falló. La edición anterior sigue publicada.', 'stale');
    } else {
      await cargarIndice();
      await cargarUltima();
      setTimeout(() => $('progress').classList.remove('on'), 6000);
    }
  }, 2000);
}

btn.addEventListener('click', async () => {
  if(!modoLocal){
    btn.textContent = 'Buscando…';
    await cargarIndice();
    await cargarUltima();
    btn.textContent = 'Recargar';
    return;
  }
  try{
    const r = await fetch('/api/actualizar', {method:'POST'});
    mostrarProgreso(await r.json());
    seguirActualizacion();
  }catch(e){
    setStatus('No pude hablar con el servidor local.', 'stale');
  }
});

/* ---------- Arranque ---------- */
(async () => {
  ruta();
  await Promise.all([cargarIndice(), cargarUltima()]);
  if(location.hash.includes('/')) ruta();
  try{
    const est = await getJSON('/api/estado');
    modoLocal = true;
    btn.title = 'Busca las noticias de hoy y arma una edición nueva';
    if(est.corriendo){ mostrarProgreso(est); seguirActualizacion(); }
  }catch(e){
    btn.textContent = 'Recargar';
    btn.title = 'Trae la última edición publicada';
  }
})();
