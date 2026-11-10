/* Atlas: índice de países con mapa y fichas por país (#id o #id/seccion). */
(function(){
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const RADIO_TIERRA = 6371;
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PAISES = COUNTRIES;
  const color = (c) => `var(--c${PAISES.indexOf(c) % 5})`;
  const porId = (id) => PAISES.find((c) => c.id === id);

  // Capitales para marcar en la silueta [lon, lat, nombre].
  const CAPITALES = {
    kosovo:[[21.17,42.66,'Pristina']], turkmenistan:[[58.38,37.95,'Asjabad']], haiti:[[-72.34,18.54,'Puerto Príncipe']],
    ruanda:[[30.06,-1.95,'Kigali']], croacia:[[15.98,45.81,'Zagreb']], moldavia:[[28.86,47.01,'Chisináu']],
    yemen:[[44.19,15.37,'Saná'],[45.03,12.79,'Adén']], eritrea:[[38.93,15.32,'Asmara']],
    guatemala:[[-90.51,14.63,'Ciudad de Guatemala']], png:[[147.18,-9.44,'Port Moresby']],
    bosnia:[[18.41,43.86,'Sarajevo']], siria:[[36.29,33.51,'Damasco']], sudandelsur:[[31.58,4.85,'Yuba']],
    nicaragua:[[-86.24,12.11,'Managua']], georgia:[[44.79,41.72,'Tiflis']], surinam:[[-55.2,5.85,'Paramaribo']],
    guineabisau:[[-15.6,11.86,'Bisáu']], timororiental:[[125.57,-8.56,'Dili']], kiribati:[[172.98,1.33,'Tarawa']]
  };

  const SECCIONES = [
    ['hoy', 'Qué está pasando'],
    ['gobierna', 'Quién gobierna'],
    ['historia', 'Historia'],
    ['economia', 'Economía'],
    ['libertades', 'Política y libertades'],
    ['conflictos', 'Conflictos'],
    ['fuentes', 'Fuentes']
  ];

  // Separa "texto (aclaración)" para mostrar la aclaración más chica.
  function partir(s){
    const m = String(s).match(/^([^()]+?)\s*\((.+)\)\s*$/);
    return m ? `${esc(m[1])}<small>${esc(m[2])}</small>` : esc(s);
  }

  /* ---------- Siluetas ---------- */

  function proyectar(f, w, h, pad){
    const c = d3.geoCentroid(f);
    return d3.geoAzimuthalEqualArea().rotate([-c[0], -c[1]]).fitExtent([[pad, pad], [w - pad, h - pad]], f);
  }

  // Islas demasiado chicas para verse se marcan con un punto.
  function puntitos(f, path, r){
    const g = f.geometry;
    const polis = g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates];
    return polis.map((p) => {
      const pol = {type:'Polygon', coordinates:p};
      if(path.area(pol) > r * r) return '';
      const [x, y] = path.centroid(pol);
      return `<circle class="forma-punto" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`;
    }).join('');
  }

  function silueta(c, w, h, pad, relleno){
    const f = FORMAS[c.id];
    if(!f) return '';
    const path = d3.geoPath(proyectar(f, w, h, pad));
    const fill = relleno || color(c);
    return `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true"><g class="forma-grupo" style="fill:${fill}">
      <path class="forma" d="${path(f)}"/>${puntitos(f, path, 3.2)}</g></svg>`;
  }

  const superficie = (id) => d3.geoArea(FORMAS[id]) * RADIO_TIERRA * RADIO_TIERRA;
  const redondear = (n) => {
    const p = Math.pow(10, Math.max(0, Math.floor(Math.log10(n)) - 1));
    return Math.round(n / p) * p;
  };
  const miles = (n) => n.toLocaleString('es-AR');

  /* ---------- Mapa del mundo ---------- */

  const MUNDO_GEO = topojson.feature(MUNDO, MUNDO.objects.countries).features.filter((f) => f.properties.name !== 'Antarctica');

  function pintarMundo(){
    const W = 1000, H = 470;
    const proj = d3.geoEqualEarth().rotate([15, 0]).fitExtent([[4, 4], [W - 4, H - 4]], {type:'FeatureCollection', features:MUNDO_GEO});
    const path = d3.geoPath(proj);
    const grat = d3.geoGraticule10();

    const paises = PAISES.map((c) => {
      const f = FORMAS[c.id];
      const area = path.area(f);
      const [x, y] = path.centroid(f);
      const chico = area < 60;
      return `<g class="wm-g" data-id="${c.id}" tabindex="-1">
        <path class="wm-pais" style="fill:${color(c)}" d="${path(f)}"/>
        ${chico ? `<circle class="wm-anillo" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>` : ''}
        <circle class="wm-hit" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${chico ? 13 : 4}"/>
      </g>`;
    }).join('');

    $('worldmap').insertAdjacentHTML('afterbegin',
      `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Mapa del mundo con los ${PAISES.length} países del Atlas marcados en color">
        <path class="wm-grat" d="${path(grat)}"/>
        ${MUNDO_GEO.map((f) => `<path class="wm-tierra" d="${path(f)}"/>`).join('')}
        ${paises}
      </svg>`);

    const svg = $('worldmap').querySelector('svg');
    const tip = $('worldtip');
    const mostrar = (g) => {
      svg.querySelectorAll('.wm-g.is-on').forEach((x) => x.classList.remove('is-on'));
      if(!g){ tip.hidden = true; return; }
      g.classList.add('is-on');
      g.parentNode.appendChild(g);
      const r = g.querySelector('.wm-pais').getBoundingClientRect();
      const base = $('worldmap').getBoundingClientRect();
      tip.textContent = porId(g.dataset.id).name;
      tip.style.left = `${r.left + r.width / 2 - base.left}px`;
      tip.style.top = `${r.top - base.top}px`;
      tip.hidden = false;
    };
    svg.addEventListener('pointerover', (ev) => mostrar(ev.target.closest('.wm-g')));
    svg.addEventListener('pointerleave', () => mostrar(null));
    svg.addEventListener('click', (ev) => {
      const g = ev.target.closest('.wm-g');
      if(g) location.hash = g.dataset.id;
    });
  }

  /* ---------- Índice ---------- */

  let region = 'Todas';

  function pintarFiltros(){
    const regiones = [...new Set(PAISES.map((c) => c.region))].sort((a, b) => a.localeCompare(b, 'es'));
    const boton = (r, n) => `<button type="button" data-region="${esc(r)}" aria-pressed="${r === region}">${esc(r)}<span>${n}</span></button>`;
    $('filtros').innerHTML = boton('Todas', PAISES.length) +
      regiones.map((r) => boton(r, PAISES.filter((c) => c.region === r).length)).join('');
  }

  function pintarPaises(){
    const lista = region === 'Todas' ? PAISES : PAISES.filter((c) => c.region === region);
    $('paises').innerHTML = lista.map((c) => `
      <li class="pais">
        <a href="#${c.id}">
          <div class="pais__forma">${silueta(c, 320, 240, 18)}</div>
          <h3 class="pais__nombre">${esc(c.name)}</h3>
          <p class="pais__donde">${esc(c.region)} · ${esc(c.subregion)}</p>
          <p class="pais__gancho">${esc(c.current)}</p>
        </a>
      </li>`).join('');
  }

  $('filtros').addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if(!b) return;
    region = b.dataset.region;
    pintarFiltros();
    pintarPaises();
  });

  /* ---------- Globo que gira hasta el país ---------- */

  let giro = [-58.4, -34.6]; // arranca mirando a Buenos Aires
  let animando = 0;

  function pintarGlobo(c){
    const S = 120;
    const proj = d3.geoOrthographic().scale(S / 2 - 2).translate([S / 2, S / 2]).clipAngle(90);
    const path = d3.geoPath(proj);
    const hasta = d3.geoCentroid(FORMAS[c.id]);
    const cont = document.querySelector('.globo');
    if(!cont) return;

    // Dibuja el globo mirando al punto [lon, lat].
    const dibujar = ([lon, lat]) => {
      proj.rotate([-lon, -lat]);
      cont.innerHTML = `<svg viewBox="0 0 ${S} ${S}" aria-hidden="true">
        <path class="globo__mar" d="${path({type:'Sphere'})}"/>
        <path class="globo__grat" d="${path(d3.geoGraticule10())}"/>
        <path class="globo__tierra" d="${path({type:'FeatureCollection', features:MUNDO_GEO}) || ''}"/>
        <path class="globo__pais" d="${path(FORMAS[c.id]) || ''}"/>
        <path class="globo__aro" d="${path({type:'Sphere'})}"/>
      </svg>`;
    };

    cancelAnimationFrame(animando);
    const desde = giro;
    giro = hasta;
    if(quieto){ dibujar(hasta); return; }
    const interp = d3.geoInterpolate(desde, hasta);
    const t0 = performance.now(), dur = 1400;
    dibujar(desde);
    const paso = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      dibujar(interp(1 - Math.pow(1 - k, 3)));
      if(k < 1) animando = requestAnimationFrame(paso);
    };
    animando = requestAnimationFrame(paso);
    // Si la pestaña no anima (pantalla oculta), igual termina mirando al país.
    setTimeout(() => { if(giro === hasta){ cancelAnimationFrame(animando); dibujar(hasta); } }, dur + 300);
  }

  /* ---------- Ficha ---------- */

  function mapaFicha(c){
    const W = 520, H = 520;
    const f = FORMAS[c.id];
    const proj = proyectar(f, W, H, 46);
    const path = d3.geoPath(proj);
    const caps = (CAPITALES[c.id] || []).map(([lon, lat, nombre]) => {
      const [x, y] = proj([lon, lat]);
      const izq = x > W * 0.62;
      return `<circle class="cap-punto" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>
        <text class="cap-texto" x="${(x + (izq ? -14 : 14)).toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="${izq ? 'end' : 'start'}">${esc(nombre)}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Silueta de ${esc(c.name)} con su capital marcada">
      <g class="forma-grupo"><path class="forma" d="${path(f)}"/>${puntitos(f, path, 6)}</g>${caps}
    </svg>`;
  }

  function escala(c){
    const W = 220, H = 330;
    const arg = FORMAS.argentina;
    const projA = proyectar(arg, W, H, 6);
    const pathA = d3.geoPath(projA);
    const cc = d3.geoCentroid(FORMAS[c.id]);
    const projP = d3.geoAzimuthalEqualArea().rotate([-cc[0], -cc[1]]).scale(projA.scale()).translate(projA(d3.geoCentroid(arg)));
    const pathP = d3.geoPath(projP);
    const f = FORMAS[c.id];
    const [x, y] = pathP.centroid(f);
    const chico = pathP.area(f) < 120;
    const km2 = superficie(c.id);
    const veces = Math.round(superficie('argentina') / km2);
    return `<figure class="escala">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.name)} dibujado a la misma escala que Argentina">
        <path class="escala__arg" d="${pathA(arg)}"/>
        <path class="escala__pais" style="fill:${color(c)}" d="${pathP(f)}"/>
        ${chico ? `<circle class="escala__marca" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11"/>` : ''}
      </svg>
      <figcaption><b>${esc(c.name)}</b> a la misma escala que Argentina. Mide unos ${miles(redondear(km2))} km²: Argentina es ${miles(veces)} veces más grande.</figcaption>
    </figure>`;
  }

  function pintarFicha(c){
    const i = PAISES.indexOf(c);
    const ant = PAISES[(i - 1 + PAISES.length) % PAISES.length];
    const sig = PAISES[(i + 1) % PAISES.length];
    const presos = (c.politicalPrisoners || '').trim();
    const represion = (c.repression || '').trim();
    const icono = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4.5M12 17.3v.2"/></svg>';

    const ficha = $('ficha');
    ficha.style.setProperty('--color', color(c));
    ficha.innerHTML = `
      <header class="ficha__hero">
        <div class="ficha__hero-in">
          <div>
            <a class="ficha__volver" href="#"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4"/></svg>Todos los países</a>
            <h1 class="ficha__nombre">${esc(c.name)}</h1>
            <p class="ficha__oficial">${esc(c.official)}</p>
            <p class="ficha__region">${esc(c.region)} · ${esc(c.subregion)}</p>
            <p class="ficha__geo">${esc(c.geography)}</p>
          </div>
          <div class="ficha__mapa">${mapaFicha(c)}<div class="globo"></div></div>
        </div>
      </header>

      <dl class="datos"><div class="datos__in">
        <div class="dato"><dt>Capital</dt><dd>${partir(c.capital)}</dd></div>
        <div class="dato"><dt>Población</dt><dd>${partir(c.population)}</dd></div>
        <div class="dato"><dt>Gobierna</dt><dd>${esc(c.leader.name)}<small>${esc(c.leader.role)}</small></dd></div>
        <div class="dato"><dt>Moneda</dt><dd>${partir(c.economy.currency)}</dd></div>
      </div></dl>

      <div class="cuerpo"><div class="cuerpo__in">
        <aside class="indice">
          <nav aria-label="En esta ficha">
            <h2>En esta ficha</h2>
            <ol>${SECCIONES.map(([id, t]) => `<li><a href="#${c.id}/${id}" data-sec="${id}">${t}</a></li>`).join('')}</ol>
          </nav>
          ${escala(c)}
        </aside>

        <div class="texto">
          <section id="s-hoy" aria-labelledby="h-hoy">
            <h2 id="h-hoy">Qué está pasando</h2>
            <p class="lead">${esc(c.current)}</p>
          </section>

          <section id="s-gobierna" aria-labelledby="h-gobierna">
            <h2 id="h-gobierna">Quién gobierna</h2>
            <div class="lider">
              <span class="lider__inicial" aria-hidden="true">${esc(c.leader.name.trim().charAt(0))}</span>
              <p class="lider__nombre">${esc(c.leader.name)}</p>
              <p class="lider__cargo">${esc(c.leader.role)}</p>
            </div>
            <p>${esc(c.leader.bio)}</p>
          </section>

          <section id="s-historia" aria-labelledby="h-historia">
            <h2 id="h-historia">Historia</h2>
            <ol class="hitos">${c.history.map((h) => `<li><span class="hitos__cuando">${esc(h.period)}</span><span class="hitos__que">${esc(h.text)}</span></li>`).join('')}</ol>
          </section>

          <section id="s-economia" aria-labelledby="h-economia">
            <h2 id="h-economia">Economía</h2>
            <dl class="economia">
              <div><dt>PBI nominal</dt><dd>${esc(c.economy.gdp)}</dd></div>
              <div><dt>Crecimiento</dt><dd>${esc(c.economy.growth)}</dd></div>
              <div><dt>Moneda</dt><dd>${esc(c.economy.currency)}</dd></div>
              <div><dt>De qué vive</dt><dd>${esc(c.economy.industries)}</dd></div>
            </dl>
            <p><strong>Puntos débiles.</strong> ${esc(c.economy.weaknesses)}</p>
          </section>

          <section id="s-libertades" aria-labelledby="h-libertades">
            <h2 id="h-libertades">Política y libertades</h2>
            <div class="regimen"><span>${esc(c.government)}</span><span>${esc(c.classification)}</span></div>
            <p><strong>Prensa.</strong> ${esc(c.press)}</p>
            ${presos ? `<div class="alerta">${icono}<div><h3>Presos políticos</h3><p>${esc(presos)}</p></div></div>` : ''}
            ${represion ? `<div class="alerta">${icono}<div><h3>Represión y censura</h3><p>${esc(represion)}</p></div></div>` : ''}
          </section>

          <section id="s-conflictos" aria-labelledby="h-conflictos">
            <h2 id="h-conflictos">Conflictos</h2>
            <p>${esc(c.conflicts)}</p>
          </section>

          <section id="s-fuentes" class="fuentes" aria-label="Fuentes">
            <p><strong>Fuentes:</strong> ${esc(c.sources)}</p>
            <p>Ficha actualizada el ${esc(c.updated)}.</p>
          </section>
        </div>
      </div></div>

      <nav class="vecinos" aria-label="Otros países"><div class="vecinos__in">
        <a class="vecino" href="#${ant.id}"><span class="vecino__forma">${silueta(ant, 168, 128, 8)}</span><div><small>Anterior</small><span>${esc(ant.name)}</span></div></a>
        <a class="vecinos__todos" href="#">Todos los países</a>
        <a class="vecino vecino--sig" href="#${sig.id}"><div><small>Siguiente</small><span>${esc(sig.name)}</span></div><span class="vecino__forma">${silueta(sig, 168, 128, 8)}</span></a>
      </div></nav>`;

    pintarGlobo(c);
    vigilarSecciones();
  }

  // Marca en el índice la sección que se está leyendo.
  let observador = null;
  function vigilarSecciones(){
    if(observador) observador.disconnect();
    const links = [...document.querySelectorAll('.indice a')];
    const marcar = (id) => links.forEach((a) => a.classList.toggle('is-on', a.dataset.sec === id));
    marcar('hoy');
    observador = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if(e.isIntersecting) marcar(e.target.id.slice(2)); });
    }, {rootMargin:'-20% 0px -70% 0px'});
    document.querySelectorAll('.texto section').forEach((s) => observador.observe(s));
  }

  /* ---------- Rutas ---------- */

  let actual = null;

  function ruta(){
    const [id, sec] = decodeURIComponent(location.hash.slice(1)).split('/');
    const c = porId(id);
    const vista = c ? 'ficha' : 'indice';
    document.body.dataset.view = vista;
    document.querySelectorAll('.view').forEach((v) => { v.hidden = v.dataset.view !== vista; });

    if(c){
      const cambio = actual !== c.id;
      if(cambio){
        pintarFicha(c);
        actual = c.id;
        document.title = `${c.name} · Atlas`;
        if(!sec) window.scrollTo(0, 0);
      }
      if(sec){
        const destino = $(`s-${sec}`);
        if(destino) setTimeout(() => destino.scrollIntoView({behavior: quieto || cambio ? 'auto' : 'smooth', block:'start'}), 60);
      }
    }else{
      const venia = actual;
      actual = null;
      document.title = 'Atlas · Los países que el mundo no mira';
      // Al volver, queda a la vista el país que se estaba leyendo.
      const tarjeta = venia && document.querySelector(`.pais a[href="#${venia}"]`);
      if(tarjeta) tarjeta.scrollIntoView({block:'center'});
      else window.scrollTo(0, 0);
    }
  }

  /* ---------- Modo papel / noche ---------- */

  function setTheme(t){
    document.documentElement.dataset.theme = t;
    $('themeLabel').textContent = t === 'noche' ? 'Papel' : 'Noche';
    $('themeToggle').setAttribute('aria-label', t === 'noche' ? 'Cambiar a modo papel' : 'Cambiar a modo noche');
    try{ localStorage.setItem('despacho-tema', t); }catch(e){}
  }
  $('themeToggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'noche' ? 'dia' : 'noche'));
  setTheme(document.documentElement.dataset.theme);

  /* ---------- Arranque ---------- */

  $('footCount').textContent = `Atlas · ${PAISES.length} países · parte de Despacho Global`;
  pintarMundo();
  pintarFiltros();
  pintarPaises();
  window.addEventListener('hashchange', ruta);
  ruta();
})();
