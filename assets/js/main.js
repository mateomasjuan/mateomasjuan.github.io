/* =========================================================
   Mateo Masjuan — Portfolio · lógica
   ========================================================= */
(function () {
  "use strict";

  const C = window.CONTENT;

  /* ---------- Textos de interfaz ---------- */
  const UI = {
    es: {
      "nav.timeline": "Recorrido", "nav.work": "Trabajos", "nav.archive": "Notas", "nav.about": "Sobre mí", "nav.contact": "Contacto",
      "hero.eyebrow": "Licenciado en Comunicación Social · Buenos Aires",
      "hero.lead": "Cuento historias con sonido, imagen y palabras. Edito, produzco, escribo y entrevisto. Me interesa todo lo que pasa entre la música, la historia, el deporte y los medios.",
      "hero.cta": "Ver el recorrido", "hero.cta2": "Contacto", "hero.reel": "Showreel — próximamente",
      "track.v": "Audiovisual", "track.r": "Redacción", "track.a": "Podcast",
      "tl.title": "Recorrido",
      "tl.sub": "Mi trayectoria como una línea de tiempo de edición. Cada clip es una etapa: tocalo para ver el detalle.",
      "tl.today": "HOY", "tl.notes": "Notas de esta etapa", "tl.works": "Trabajos relacionados",
      "tl.prev": "← Anterior", "tl.next": "Siguiente →",
      "work.title": "Trabajos", "work.sub": "Una selección de proyectos audiovisuales, de redacción y podcast.",
      "work.all": "Todo", "work.wip": "En proceso",
      "work.open.v": "Ver", "work.open.r": "Leer", "work.open.a": "Escuchar", "work.soon": "Link próximamente",
      "arc.title": "Archivo de notas", "arc.sub": "Todas mis notas, agrupadas por el lugar donde las escribí.",
      "arc.more": "Ver las {n} notas", "arc.less": "Ver menos", "arc.unpub": "Inédita", "arc.site": "Ver el sitio ↗", "arc.seeClip": "Ver en el recorrido →",
      "about.title": "Sobre mí",
      "about.p1": "Soy curioso, investigador y proactivo. Me formé en Comunicación Social en la Universidad Austral y trabajé en periodismo digital, gestión pública y producción audiovisual.",
      "about.p2": "Toco la batería en BLEND, jugué al rugby doce años en el San Isidro Club y pasé una temporada de invierno trabajando en Breckenridge, Colorado. Desde los 18 trabajo también en PANZA, nuestro emprendimiento familiar.",
      "about.f1": "Idiomas", "about.f1v": "Español · Inglés", "about.f2": "Base", "about.f3": "Intereses", "about.f3v": "Música, historia, deporte, medios",
      "tools.title": "Herramientas",
      "off.title": "Fuera de cámara", "off.sub": "Lo que no está en ningún plan de estudios, pero también me formó.",
      "off.blend.tag": "Batería · Video", "off.blend.t": "Detrás de la batería",
      "off.blend.d": "Soy el baterista de BLEND. La mayoría de los videos de la banda los grabé y edité yo.",
      "off.blend.watch": "Ver el show en Makena ↗", "off.blend.lobos": "Ver Gira a Lobos ↗", "off.blend.riesgo": "Ver el cover de El Riesgo ↗",
      "off.wat.t": "Una temporada en la montaña",
      "off.wat.d": "Cuatro meses como Lift Operator en Breckenridge (Vail Resorts), Colorado. Independencia, un entorno multicultural y un trabajo de alta exigencia. Además, desarrollé mucho mi inglés.",
      "off.rugby.t": "Doce años de rugby",
      "off.rugby.d": "En el San Isidro Club aprendí a liderar, a ser liderado y a jugar en equipo bajo presión.",
      "cr.role": "Audiovisual, redacción y podcast", "cr.cta": "¿Tenés un proyecto? Hagámoslo juntos.",
      "cr.mail": "Mail", "cr.phone": "Teléfono", "cr.cv": "CV", "cr.cvlink": "Descargar PDF", "cr.fin": "Fin",
      "footer.top": "Volver arriba ↑"
    },
    en: {
      "nav.timeline": "Timeline", "nav.work": "Work", "nav.archive": "Writing", "nav.about": "About", "nav.contact": "Contact",
      "hero.eyebrow": "BA in Social Communication · Buenos Aires",
      "hero.lead": "I tell stories through sound, image and words. I edit, produce, write and interview. I'm drawn to everything that happens where music, history, sport and media meet.",
      "hero.cta": "See the timeline", "hero.cta2": "Contact", "hero.reel": "Showreel — coming soon",
      "track.v": "Video", "track.r": "Writing", "track.a": "Podcast",
      "tl.title": "Timeline",
      "tl.sub": "My path laid out like an editing timeline. Each clip is a chapter: tap it to see the details.",
      "tl.today": "NOW", "tl.notes": "Writing from this chapter", "tl.works": "Related work",
      "tl.prev": "← Previous", "tl.next": "Next →",
      "work.title": "Work", "work.sub": "A selection of video, writing and podcast projects.",
      "work.all": "All", "work.wip": "In progress",
      "work.open.v": "Watch", "work.open.r": "Read", "work.open.a": "Listen", "work.soon": "Link coming soon",
      "arc.title": "Writing archive", "arc.sub": "All my articles, grouped by where I wrote them. Originals are in Spanish.",
      "arc.more": "See all {n} articles", "arc.less": "Show less", "arc.unpub": "Unpublished", "arc.site": "Visit the site ↗", "arc.seeClip": "See on the timeline →",
      "about.title": "About",
      "about.p1": "I'm curious, research-driven and proactive. I studied Social Communication at Universidad Austral and have worked in digital journalism, public administration and video production.",
      "about.p2": "I play drums in BLEND, played rugby for twelve years at San Isidro Club and spent a winter season working in Breckenridge, Colorado. Since I was 18 I've also worked at PANZA, our family business.",
      "about.f1": "Languages", "about.f1v": "Spanish · English", "about.f2": "Based in", "about.f3": "Interests", "about.f3v": "Music, history, sport, media",
      "tools.title": "Tools",
      "off.title": "Off camera", "off.sub": "Things no curriculum covers, but that shaped me just as much.",
      "off.blend.tag": "Drums · Video", "off.blend.t": "Behind the drum kit",
      "off.blend.d": "I'm the drummer in BLEND. I shot and edited most of the band's videos.",
      "off.blend.watch": "Watch the Makena show ↗", "off.blend.lobos": "Watch Gira a Lobos ↗", "off.blend.riesgo": "Watch the El Riesgo cover ↗",
      "off.wat.t": "A season on the mountain",
      "off.wat.d": "Four months as a Lift Operator at Breckenridge (Vail Resorts), Colorado. Independence, a multicultural team and a demanding job. It also did a lot for my English.",
      "off.rugby.t": "Twelve years of rugby",
      "off.rugby.d": "At San Isidro Club I learned to lead, to be led and to play as a team under pressure.",
      "cr.role": "Video, writing and podcasts", "cr.cta": "Got a project? Let's make it together.",
      "cr.mail": "Email", "cr.phone": "Phone", "cr.cv": "Résumé", "cr.cvlink": "Download PDF", "cr.fin": "The End",
      "footer.top": "Back to top ↑"
    }
  };

  const MONTHS = {
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  /* ---------- Estado ---------- */
  let lang = "es";
  let selected = null;
  let filter = "all";
  const openGroups = new Set();

  const $ = (s, el = document) => el.querySelector(s);
  const t = (k) => UI[lang][k] ?? UI.es[k] ?? k;
  const L = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.es : obj ?? "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = (list, id) => list.find((x) => x.id === id);

  const ext = (url, html, cls = "") => `<a href="${esc(url)}" target="_blank" rel="noopener"${cls ? ` class="${cls}"` : ""}>${html}</a>`;
  const thumb = (w) => w.image || (w.youtube ? `https://i.ytimg.com/vi/${w.youtube}/hqdefault.jpg` : "");
  const workUrl = (w) => w.url || (w.youtube ? `https://www.youtube.com/watch?v=${w.youtube}` : "");

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin storage */ } }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- Idioma ---------- */
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.title = lang === "es"
      ? "Mateo Masjuan — Comunicación, audiovisual y redacción"
      : "Mateo Masjuan — Communication, video and writing";
    store("mm-lang", lang);
    renderTimeline();
    renderWorks();
    renderArchive();
    renderTools();
  }

  /* ---------- Línea de tiempo ---------- */
  const LANE_H = 38;
  const MIN_YEAR_PX = 175; // ancho de un año con la línea de tiempo en su mínimo
  const { from: T0, to: T1 } = C.timeline;
  const pct = (y) => ((Math.min(Math.max(y, T0), T1) - T0) / (T1 - T0)) * 100;
  const now = new Date();
  const TODAY = now.getFullYear() + now.getMonth() / 12;
  const chrono = [...C.clips].sort((a, b) => a.start - b.start || a.end - b.end);

  function fmtDate(y) {
    const year = Math.floor(y);
    const m = Math.min(11, Math.max(0, Math.floor((y - year) * 12)));
    return `${MONTHS[lang][m]} ${year}`;
  }

  function renderTimeline() {
    const tl = $("#timeline");
    let html = `<div class="tl-ruler"><div class="tl-ruler__pad"></div><div class="tl-ruler__scale">`;
    for (let y = T0; y < T1; y++) {
      html += `<div class="tl-year" style="left:${pct(y)}%;width:${pct(y + 1) - pct(y)}%">${y}</div>`;
    }
    html += `</div></div>`;

    let group = null;
    C.tracks.forEach((tr) => {
      if (tr.group !== group) {
        group = tr.group;
        const g = byId(C.trackGroups, group);
        html += `<div class="tl-group"><div class="tl-group__label">${esc(L(g.label))}</div><div class="tl-group__line"></div></div>`;
      }
      const clips = C.clips.filter((c) => c.track === tr.id);
      const lanes = Math.max(1, ...clips.map((c) => (c.lane || 0) + 1));
      html += `<div class="tl-track"><div class="tl-track__label"><span class="tl-track__code">${tr.code}</span><span>${esc(L(tr.label))}</span></div>`;
      html += `<div class="tl-track__lane" style="height:${lanes * LANE_H + 8}px">`;
      clips.forEach((c) => {
        const left = pct(c.start), width = pct(c.end) - left;
        // el dibujo respeta las fechas: si el título no entra, va al costado del clip
        const short = L(c.title).length * 6.6 + 20 > (c.end - c.start) * MIN_YEAR_PX;
        const cls = ["tl-clip", c.openStart ? "tl-clip--open-start" : "", c.openEnd ? "tl-clip--open-end" : "",
          short ? `tl-clip--short${c.labelSide === "left" ? " tl-clip--short-left" : ""}` : ""].join(" ");
        html += `<button type="button" class="${cls}" data-clip="${c.id}" aria-pressed="${c.id === selected}"
          style="--c:var(--tr-${tr.id});left:${left}%;width:${width}%;top:${(c.lane || 0) * LANE_H + 6}px"
          title="${esc(L(c.title))}"><span>${esc(L(c.title))}</span></button>`;
      });
      html += `</div></div>`;
    });

    html += `<div class="tl-today" style="left:calc(132px + (100% - 132px) * ${pct(TODAY) / 100})"><span>${t("tl.today")}</span></div>`;
    html += `<div class="tl-playhead" id="playhead"></div>`;
    tl.innerHTML = html;

    // en mobile el label mide 64px: ajustar posiciones absolutas
    syncLabelWidth();
    tl.querySelectorAll(".tl-clip").forEach((b) => b.addEventListener("click", () => select(b.dataset.clip, true)));
    bindPlayhead();
    if (selected) { movePlayhead(byId(C.clips, selected).start); renderInspector(); }
  }

  function labelWidth() {
    const el = $(".tl-track__label");
    return el ? el.getBoundingClientRect().width : 132;
  }
  function syncLabelWidth() {
    const w = labelWidth();
    const today = $(".tl-today");
    if (today) today.style.left = `calc(${w}px + (100% - ${w}px) * ${pct(TODAY) / 100})`;
  }

  function movePlayhead(year) {
    const ph = $("#playhead"); if (!ph) return;
    const w = labelWidth();
    ph.style.left = `calc(${w}px + (100% - ${w}px) * ${pct(year) / 100})`;
    $("#playhead-tc").textContent = fmtDate(year);
  }

  function bindPlayhead() {
    const tl = $("#timeline");
    if (tl.dataset.bound) return;
    tl.dataset.bound = "1";
    tl.addEventListener("mousemove", (e) => {
      const r = tl.getBoundingClientRect(), w = labelWidth();
      const x = e.clientX - r.left - w;
      if (x < 0) return;
      const ph = $("#playhead");
      ph.style.transition = "none";
      ph.style.left = `${x + w}px`;
      $("#playhead-tc").textContent = fmtDate(T0 + (x / (r.width - w)) * (T1 - T0));
    });
    tl.addEventListener("mouseleave", () => {
      const ph = $("#playhead"); ph.style.transition = "";
      if (selected) movePlayhead(byId(C.clips, selected).start);
    });
  }

  function select(id, userAction) {
    selected = id;
    document.querySelectorAll(".tl-clip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.clip === id)));
    const ph = $("#playhead"); if (ph) ph.style.transition = "";
    movePlayhead(byId(C.clips, id).start);
    renderInspector();
    if (userAction) {
      // centrar el clip si la línea de tiempo está scrolleada (mobile)
      const btn = document.querySelector(`.tl-clip[data-clip="${id}"]`), sc = $("#tl-scroll");
      if (btn && sc.scrollWidth > sc.clientWidth) {
        sc.scrollTo({ left: btn.offsetLeft - sc.clientWidth / 2 + btn.offsetWidth / 2 + labelWidth(), behavior: "smooth" });
      }
    }
  }

  function renderInspector() {
    const c = byId(C.clips, selected); if (!c) return;
    const tr = byId(C.tracks, c.track);
    const notes = (c.notes || []).map((id) => byId(C.notes, id)).filter(Boolean);
    const works = (c.works || []).map((id) => byId(C.works, id)).filter(Boolean);
    const links = c.links || (c.link ? [c.link] : []);
    const i = chrono.findIndex((x) => x.id === c.id);

    let side = "";
    if (notes.length) {
      side += `<p class="insp__label">${t("tl.notes")}</p><ul class="insp__list">` +
        notes.map((n) => {
          const inner = `<small>${esc(noteTags(n))}</small>${esc(n.title)}${n.url ? " ↗" : ""}`;
          return `<li>${n.url ? ext(n.url, inner) : `<a href="#${n.id}" data-note="${n.id}">${inner}</a>`}</li>`;
        }).join("") + `</ul>`;
    }
    if (works.length) {
      side += `<p class="insp__label">${t("tl.works")}</p><ul class="insp__list">` +
        works.map((w) => {
          const inner = `<small>${esc(L(w.kind))} · ${w.year}</small>${esc(L(w.title))}${workUrl(w) ? " ↗" : ""}`;
          return `<li>${workUrl(w) ? ext(workUrl(w), inner) : `<a href="#${w.id}" data-work="${w.id}">${inner}</a>`}</li>`;
        }).join("") + `</ul>`;
    }
    // sin material asociado, el detalle ocupa todo el ancho
    $("#inspector").classList.toggle("inspector--solo", !side);
    $("#inspector").innerHTML = `
      <div class="insp__main">
        <div class="insp__meta"><span class="chip chip--${tr.id}">${tr.code} · ${esc(L(tr.label))}</span><span>${esc(L(c.dates))}</span></div>
        <h3 class="insp__title">${esc(L(c.title))}</h3>
        <p class="insp__role">${esc(L(c.role))}</p>
        <div class="insp__body">
        <ul class="insp__bullets">${(c.bullets || []).map((b) => `<li>${esc(L(b))}</li>`).join("")}</ul>
        ${links.length ? `<div class="insp__links">${links.map((l) => ext(l.url, `${esc(L(l.label))} ↗`, "insp__link")).join("")}</div>` : ""}
        </div>
        <div class="insp__nav">
          <button type="button" data-step="-1" ${i === 0 ? "disabled" : ""}>${t("tl.prev")}</button>
          <button type="button" data-step="1" ${i === chrono.length - 1 ? "disabled" : ""}>${t("tl.next")}</button>
        </div>
      </div>
      ${side ? `<div class="insp__side">${side}</div>` : ""}`;

    $("#inspector").querySelectorAll("[data-step]").forEach((b) =>
      b.addEventListener("click", () => {
        const n = chrono[i + Number(b.dataset.step)];
        if (n) select(n.id, true);
      }));
    $("#inspector").querySelectorAll("[data-note]").forEach((a) =>
      a.addEventListener("click", (e) => { e.preventDefault(); goToNote(a.dataset.note); }));
    $("#inspector").querySelectorAll("[data-work]").forEach((a) =>
      a.addEventListener("click", (e) => { e.preventDefault(); goToWork(a.dataset.work); }));
  }

  /* ---------- Trabajos ---------- */
  function renderWorks() {
    const used = C.tracks.filter((tr) => C.works.some((w) => w.track === tr.id));
    $("#filters").innerHTML =
      `<button type="button" data-f="all" aria-pressed="${filter === "all"}">${t("work.all")}</button>` +
      used.map((tr) => `<button type="button" data-f="${tr.id}" style="--c:var(--tr-${tr.id})" aria-pressed="${filter === tr.id}">${esc(L(tr.label))}</button>`).join("");
    $("#filters").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; renderWorks(); }));

    const list = [...C.works].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.year - a.year);
    $("#works").innerHTML = list.map((w) => {
      const tr = byId(C.tracks, w.track);
      const hide = filter !== "all" && filter !== w.track;
      const featured = w.featured && filter === "all";
      return `<article class="work work--${w.track}${featured ? " work--featured" : ""}" id="${w.id}" ${hide ? "hidden" : ""}>
        <div class="work__media${w.youtube ? " work__media--thumb" : ""}${w.image ? " work__media--image" : ""}"${thumb(w) ? ` style="background-image:url(${thumb(w)})"` : ""}>
          <span class="work__kind">${esc(L(w.kind))}</span>
          ${w.award ? `<span class="work__badge">★ ${esc(L(w.award))}</span>` : ""}
          ${w.wip ? `<span class="work__badge work__badge--wip">${t("work.wip")}</span>` : ""}
        </div>
        <div class="work__body">
          <div class="work__meta"><b>${tr.code} · ${esc(L(tr.label))}</b><span>${w.year}</span></div>
          <h3 class="work__title">${esc(L(w.title))}</h3>
          <p class="work__context">${esc(L(w.context))}</p>
          <p class="work__desc">${esc(L(w.desc))}</p>
          ${w.episodes ? `<ul class="work__eps">${w.episodes.map((e) => `<li>${ext(e.url, `${esc(e.title)} ↗`)}</li>`).join("")}</ul>`
            : workUrl(w) ? ext(workUrl(w), `${t("work.open." + w.track)} ↗`, "work__link") : `<span class="work__link work__link--soon">${t("work.soon")}</span>`}
        </div>
      </article>`;
    }).join("");
  }

  function goToWork(id) {
    filter = "all"; renderWorks();
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); flash(el); }
  }

  /* ---------- Archivo de notas ---------- */
  const COLLAPSE_AT = 4;

  function renderArchive() {
    $("#archive").innerHTML = C.noteGroups.map((g) => {
      const notes = C.notes.filter((n) => n.group === g.id)
        .sort((a, b) => (a.unpublished ? 1 : 0) - (b.unpublished ? 1 : 0) || noteKey(a).localeCompare(noteKey(b)));
      const open = openGroups.has(g.id);
      const shown = open ? notes : notes.slice(0, COLLAPSE_AT);
      const small = notes.length > COLLAPSE_AT;
      return `<div class="arc-group">
        <div class="arc-group__name">${esc(L(g.name))}
          ${g.url ? ext(g.url, t("arc.site")) : ""}
          <button type="button" data-clip="${g.clip}">${t("arc.seeClip")}</button>
          ${small ? `<button type="button" data-toggle="${g.id}">${open ? t("arc.less") : t("arc.more").replace("{n}", notes.length)}</button>` : ""}
        </div>
        <ul class="arc-list">${shown.map((n) => noteItem(n, small)).join("")}</ul>
      </div>`;
    }).join("");

    $("#archive").querySelectorAll("[data-toggle]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.toggle; openGroups.has(id) ? openGroups.delete(id) : openGroups.add(id); renderArchive();
    }));
    $("#archive").querySelectorAll("[data-clip]").forEach((b) => b.addEventListener("click", () => {
      select(b.dataset.clip); $("#recorrido").scrollIntoView({ behavior: "smooth" });
    }));
  }

  function noteItem(n, small) {
    const title = n.url ? ext(n.url, `${esc(n.title)} ↗`) : esc(n.title);
    const tags = noteTags(n);
    return `<li class="arc-item${small ? " arc-item--small" : ""}" id="${n.id}">
      <p class="arc-item__kind">${esc(tags)}</p>
      <h3 class="arc-item__title">${title}${lang === "en" ? `<span class="arc-item__lang">ES</span>` : ""}</h3>
      ${n.dek ? `<p class="arc-item__dek">${esc(L(n.dek))}</p>` : ""}
    </li>`;
  }

  // orden: fecha exacta si la hay (AAAA-MM-DD), si no el año
  const noteKey = (n) => n.date || String(n.year);
  function noteTags(n) {
    let when = n.year;
    if (n.date) { const [y, m, d] = n.date.split("-").map(Number); when = `${d} ${MONTHS[lang][m - 1]} ${y}`; }
    return [L(n.kind), when, n.unpublished ? t("arc.unpub") : ""].filter(Boolean).join(" · ");
  }

  function goToNote(id) {
    const n = byId(C.notes, id);
    if (n && !document.getElementById(id)) { openGroups.add(n.group); renderArchive(); }
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); flash(el); }
  }

  function flash(el) { el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }

  /* ---------- Herramientas (rack de plugins) ---------- */
  function renderTools() {
    $("#tools").innerHTML = C.tools.map((tool) => {
      const on = Math.round(tool.level * 12);
      const meter = Array.from({ length: 12 }, (_, i) => `<i class="${i < on ? "on" : ""}${i >= 10 && i < on ? " hot" : ""}"></i>`).join("");
      return `<div class="plugin"><span class="plugin__name">${esc(tool.name)}</span><span class="plugin__cat">${esc(L(tool.cat))}</span><div class="plugin__meter" aria-hidden="true">${meter}</div></div>`;
    }).join("");
  }

  /* ---------- Timecodes ---------- */
  const FPS = 25;
  const tc = (secs) => {
    const f = Math.floor((secs % 1) * FPS), s = Math.floor(secs) % 60, m = Math.floor(secs / 60) % 60, h = Math.floor(secs / 3600);
    return [h, m, s, f].map((n) => String(n).padStart(2, "0")).join(":");
  };

  function bindScrollTimecode() {
    const el = $("#timecode"), DURATION = 180; // la página "dura" 3 minutos
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      el.textContent = tc(max > 0 ? (scrollY / max) * DURATION : 0);
    };
    addEventListener("scroll", update, { passive: true }); update();
  }

  function runMonitor() {
    const tcEl = $("#monitor-tc"), wave = $(".monitor__wave");
    wave.innerHTML = Array.from({ length: 64 }, () => "<i></i>").join("");
    const bars = [...wave.children];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let last = 0;
    const loop = (ts) => {
      tcEl.textContent = tc((ts - t0) / 1000);
      if (ts - last > 110) {
        last = ts;
        bars.forEach((b, i) => {
          const env = Math.sin((i / bars.length) * Math.PI);
          b.style.height = `${Math.max(2, (0.25 + Math.random() * 0.75) * env * 34)}px`;
        });
      }
      if (!reduced) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- Revelado ---------- */
  function bindReveal() {
    const items = document.querySelectorAll(".section__head, .editor, .works, .archive, .about, .rack, .offcam, .credits > *");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  /* ---------- Inicio ---------- */
  document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.lang)));
  addEventListener("resize", () => { syncLabelWidth(); if (selected) movePlayhead(byId(C.clips, selected).start); });

  const param = new URLSearchParams(location.search).get("lang");
  selected = "austral";
  applyLang(param === "en" || param === "es" ? param : read("mm-lang") || "es");
  bindScrollTimecode();
  runMonitor();
  bindReveal();
})();
