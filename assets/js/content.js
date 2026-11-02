/* =========================================================
   CONTENIDO DEL PORTFOLIO
   Todo el texto bilingüe vive acá. Para sumar un clip,
   un trabajo o una nota, agregá un objeto a la lista.
   ========================================================= */

window.CONTENT = {
  /* Pistas de la línea de tiempo */
  /* Bloques de pistas: dónde estuve / qué hice / lo personal */
  trackGroups: [
    { id: "path", label: { es: "Trayectoria", en: "Path" } },
    { id: "projects", label: { es: "Trabajos destacados", en: "Featured work" } },
    { id: "personal", label: { es: "Personal", en: "Personal" } }
  ],

  tracks: [
    { id: "ed", group: "path", code: "ED", label: { es: "Formación", en: "Education" } },
    { id: "ex", group: "path", code: "EX", label: { es: "Experiencia", en: "Experience" } },
    { id: "v", group: "projects", code: "V1", label: { es: "Audiovisual", en: "Video" } },
    { id: "r", group: "projects", code: "R1", label: { es: "Redacción", en: "Writing" } },
    { id: "a", group: "projects", code: "A1", label: { es: "Podcast", en: "Podcast" } },
    { id: "x", group: "personal", code: "X1", label: { es: "Fuera de cámara", en: "Off camera" } }
  ],

  timeline: { from: 2021, to: 2027 },

  /* Clips de la línea de tiempo (start/end en años decimales) */
  clips: [
    {
      id: "pilgrims", track: "ed", start: 2021, end: 2021.95, openStart: true,
      title: { es: "Pilgrims College", en: "Pilgrims College" },
      role: { es: "Bachiller Bilingüe", en: "Bilingual high school diploma" },
      dates: { es: "Egresado 2021", en: "Graduated 2021" },
      bullets: [
        { es: "Exámenes internacionales IGCSE.", en: "IGCSE international examinations." },
        { es: "ESSARP Model United Nations 2019.", en: "ESSARP Model United Nations 2019." }
      ]
    },
    {
      id: "austral", track: "ed", start: 2022.2, end: 2026.55,
      title: { es: "Universidad Austral", en: "Universidad Austral" },
      role: { es: "Licenciatura en Comunicación Social", en: "BA in Social Communication" },
      dates: { es: "Mar 2022 — Jul 2026 · Graduado", en: "Mar 2022 — Jul 2026 · Graduated" },
      bullets: [
        { es: "Ayudante de cátedra en Historia y Cultura de la Comunicación (2023) y en el Taller de Realización Audiovisual (2025).", en: "Teaching assistant in History and Culture of Communication (2023) and in the Audiovisual Production Workshop (2025)." },
        { es: "Premio a mejor Director de Sonido por el cortometraje “Sin Dolores” (2024).", en: "Best Sound Director award for the short film “Sin Dolores” (2024)." },
        { es: "Gracias a Vida Universitaria realicé un voluntariado de dos días con Modulo Sanitario, en el Río Luján.", en: "Through Vida Universitaria, I did a two-day volunteer program with Modulo Sanitario on the Luján River." }
      ]
    },
    {
      id: "fcb", track: "ed", start: 2022.59, end: 2023.49, lane: 1,
      title: { es: "Ayudantía · Five Came Back", en: "TA · Five Came Back" },
      role: { es: "Ayudante de cátedra — Historia y Cultura de la Comunicación", en: "Teaching assistant — History and Culture of Communication" },
      dates: { es: "2.º cuatrimestre 2022 — 1.er cuatrimestre 2023", en: "Second term 2022 — First term 2023" },
      bullets: [
        { es: "En el segundo cuatrimestre de 2022 empecé a investigar y preparar la ayudantía con el profesor; la materia se dictó en el primer cuatrimestre de 2023.", en: "In the second term of 2022 I began researching and preparing the course with the professor; it was taught in the first term of 2023." },
        { es: "Investigué y preparé una clase sobre cine y propaganda en EE.UU. durante la Segunda Guerra Mundial, a partir de la docuserie “Five Came Back”.", en: "Researched and taught a class on film and propaganda in the US during World War II, based on the docuseries “Five Came Back”." },
        { es: "Elaboré la ficha de cátedra, la presentación y el material audiovisual de apoyo.", en: "Wrote the course handout and built the presentation and supporting video material." }
      ]
    },
    {
      id: "mdz", track: "ex", start: 2023.17, end: 2024.08, lane: 1,
      title: { es: "MDZ Online", en: "MDZ Online" },
      role: { es: "Pasantía en redacción", en: "Newsroom internship" },
      dates: { es: "Mar 2023 — Ene 2024", en: "Mar 2023 — Jan 2024" },
      bullets: [
        { es: "Investigación, desarrollo y redacción de 10 notas para el módulo “Verano sustentable”; 7 se publicaron.", en: "Researched and wrote 10 articles for the “Sustainable Summer” section; 7 were published." }
      ],
      notes: ["n-mdz-5", "n-mdz-3", "n-mdz-7", "n-mdz-4", "n-mdz-6", "n-mdz-1", "n-mdz-8"]
    },
    {
      id: "contepomi", labelSide: "left", track: "r", start: 2023.75, end: 2023.91,
      title: { es: "Entrevista a Bebe Contepomi", en: "Interview with Bebe Contepomi" },
      role: { es: "Entrevista multimedia — Producción Discursiva", en: "Multimedia interview — Discourse Production" },
      dates: { es: "Nov 2023", en: "Nov 2023" },
      bullets: [
        { es: "Entrevista al periodista de rock más reconocido del país sobre cómo cambió la industria musical.", en: "Interview with Argentina's best-known rock journalist on how the music industry has changed." }
      ],
      link: { url: "https://blogdeproduccion842733582.wordpress.com/2023/11/09/bebe-contepomi-los-musicos-son-empresarios-y-profesionales-que-se-levantan-temprano-y-tienen-una-estructura-detras/", label: { es: "Leer la entrevista", en: "Read the interview" } },
      notes: ["n-contepomi"]
    },
    {
      id: "tano", track: "r", start: 2024.34, end: 2024.49,
      title: { es: "El Tano · Club Italiano", en: "El Tano · Club Italiano" },
      role: { es: "Medio digital — Géneros y Estilos Informativos", en: "Digital outlet — News Genres and Styles" },
      dates: { es: "May — Jun 2024", en: "May — Jun 2024" },
      bullets: [
        { es: "Grupo de 5: nos sumergimos en el Club Italiano para construir un sitio periodístico.", en: "Team of five: we immersed ourselves in Club Italiano to build a news site." },
        { es: "Escribí tres notas: divulgación científica, perfil y crónica.", en: "I wrote three pieces: a science explainer, a profile and a feature story." }
      ],
      link: { url: "https://sites.google.com/view/el-tano/portada", label: { es: "Ver el sitio", en: "Visit the site" } },
      notes: ["n-tano-cronica", "n-tano-perfil", "n-tano-divulgacion"], works: ["w-tano"]
    },
    {
      id: "ccc2", track: "a", start: 2024.5, end: 2024.74,
      title: { es: "Rollo Porteño · CCC 2", en: "Rollo Porteño · CCC 2" },
      role: { es: "Podcast", en: "Podcast" },
      dates: { es: "Jul — Sep 2024", en: "Jul — Sep 2024" },
      bullets: [{ es: "Producción, grabación y edición del podcast de la cátedra.", en: "Produced, recorded and edited the course podcast." }],
      link: { url: "https://www.youtube.com/watch?v=edBFwissOOo", label: { es: "Ver el podcast", en: "Watch the podcast" } },
      works: ["w-ccc2"]
    },
    {
      id: "devoto", track: "r", start: 2024.67, end: 2024.74, lane: 1,
      title: { es: "Cárcel de Villa Devoto", en: "Villa Devoto Prison" },
      role: { es: "Nota de investigación — Taller de Redacción Multimodal", en: "Investigative piece — Multimodal Writing Workshop" },
      dates: { es: "Sep 2024", en: "Sep 2024" },
      bullets: [{ es: "Investigación sobre el sistema de salud dentro de la única cárcel en funcionamiento de CABA.", en: "Investigation into the health system inside the only operating prison in Buenos Aires City." }],
      notes: ["n-devoto"]
    },
    {
      id: "sindolores", track: "v", start: 2024.67, end: 2024.96,
      title: { es: "“Sin Dolores”", en: "“Sin Dolores”" },
      role: { es: "Director de sonido — Taller de Realización Audiovisual", en: "Sound director — Audiovisual Production Workshop" },
      dates: { es: "Sep — Dic 2024 · Premio mejor Director de Sonido", en: "Sep — Dec 2024 · Best Sound Director award" },
      bullets: [
        { es: "Diseño, registro y mezcla de sonido del cortometraje.", en: "Sound design, recording and mix for the short film." },
        { es: "La entrega de premios fue a mediados de diciembre de 2024.", en: "The awards ceremony was held in mid-December 2024." }
      ],
      link: { url: "https://www.youtube.com/watch?v=CKdpaXTxLjI", label: { es: "Ver el corto", en: "Watch the film" } },
      works: ["w-sindolores"]
    },
    {
      id: "gcba", track: "ex", lane: 1, start: 2025.17, end: 2025.49,
      title: { es: "Vicejefatura de Gobierno CABA", en: "Deputy Mayor's Office, Buenos Aires" },
      role: { es: "Comunicación institucional", en: "Institutional communications" },
      dates: { es: "Mar 2025 — Jun 2025", en: "Mar 2025 — Jun 2025" },
      bullets: [
        { es: "Investigación y redacción de informes estratégicos para comunicación institucional.", en: "Researched and wrote strategic reports for institutional communications." },
        { es: "Producción de entrevistas y contenidos para comunicación pública.", en: "Produced interviews and content for public communications." },
        { es: "Clipping, minutas y análisis de agenda pública.", en: "Media monitoring, briefing notes and public agenda analysis." }
      ],
      notes: ["n-expert"]
    },
    {
      id: "monkey", labelSide: "left", track: "ex", lane: 2, start: 2025.5, end: 2025.99,
      title: { es: "Monkey Studio", en: "Monkey Studio" },
      role: { es: "Preproducción, producción y postproducción", en: "Pre-production, production and post-production" },
      dates: { es: "Jul 2025 — Dic 2025", en: "Jul 2025 — Dec 2025" },
      bullets: [
        { es: "Productora de cinco personas. Como equipo chico, todos sabemos hacer de todo: preproducción, producción y postproducción.", en: "A five-person production company. As a small team, we all do a bit of everything: pre-production, production and post-production." },
        { es: "Podcasts y programas propios, como “Mientras lavás los platos”, con invitados como Nacho Elizalde, Cande Molfese, Evelyn Botto y Sofi Martínez.", en: "Our own podcasts and shows, like “Mientras lavás los platos”, with guests such as Nacho Elizalde, Cande Molfese, Evelyn Botto and Sofi Martínez." },
        { es: "Monkey Music, el canal de la productora para DJ sets y entrevistas.", en: "Monkey Music, the studio's channel for DJ sets and interviews." }
      ],
      links: [
        { url: "https://www.youtube.com/@MonkeyStudio_BA", label: { es: "Canal de Monkey Studio", en: "Monkey Studio channel" } },
        { url: "https://www.youtube.com/@MonkeyMusic_BA", label: { es: "Canal de Monkey Music", en: "Monkey Music channel" } }
      ],
      works: ["w-monkey-kil", "w-monkey-kil-int", "w-monkey-fernandito", "w-mllp"]
    },
    {
      id: "monkey-2", labelSide: "left", track: "ex", lane: 2, start: 2026.67, end: 2026.8, openEnd: true,
      title: { es: "Monkey Studio", en: "Monkey Studio" },
      role: { es: "Preproducción, producción y postproducción", en: "Pre-production, production and post-production" },
      dates: { es: "Sep 2026 — hoy", en: "Sep 2026 — present" },
      bullets: [
        { es: "En septiembre de 2026 volví a trabajar en la productora, de nuevo en preproducción, producción y postproducción.", en: "In September 2026 I returned to the production company, again working across pre-production, production and post-production." },
        { es: "Armamos Clicks Modernos, el nuevo programa de Monkey Music. Desde el segundo programa, además de estar en todo el proceso, hablo y soy parte del programa.", en: "We created Clicks Modernos, Monkey Music's new show. From the second episode on, as well as working across the whole process, I'm also on air as part of the show." }
      ],
      works: ["w-clicks"],
      links: [
        { url: "https://www.youtube.com/@MonkeyStudio_BA", label: { es: "Canal de Monkey Studio", en: "Monkey Studio channel" } },
        { url: "https://www.youtube.com/@MonkeyMusic_BA", label: { es: "Canal de Monkey Music", en: "Monkey Music channel" } }
      ]
    },
    {
      id: "tra", labelSide: "left", track: "ed", start: 2025.59, end: 2025.91, lane: 1,
      title: { es: "Ayudantía · Realización Audiovisual", en: "TA · Audiovisual Production" },
      role: { es: "Ayudante de cátedra — Taller de Realización Audiovisual", en: "Teaching assistant — Audiovisual Production Workshop" },
      dates: { es: "Ago — Nov 2025", en: "Aug — Nov 2025" },
      bullets: [{ es: "Un año después de ganar el premio a mejor sonido en el taller, volví como ayudante.", en: "A year after winning best sound in the workshop, I came back as a teaching assistant." }]
    },
    {
      id: "foto", labelSide: "left", track: "ed", lane: 1, start: 2026.75, end: 2026.8,
      title: { es: "Curso de fotografía", en: "Photography course" },
      role: { es: "Curso de fotografía con cámara — Rochi Lanusse y Tefi Conen", en: "Camera photography course — Rochi Lanusse and Tefi Conen" },
      dates: { es: "Oct 2026", en: "Oct 2026" },
      bullets: [{ es: "Lo cursé todos los viernes de octubre de 2026.", en: "I took it every Friday throughout October 2026." }]
    },
    {
      id: "panza", track: "ex", start: 2022.4, end: 2026.8, openEnd: true,
      title: { es: "PANZA", en: "PANZA" },
      role: { es: "Emprendimiento familiar — ventas y comunicación", en: "Family business — sales and communications" },
      dates: { es: "2022 — hoy", en: "2022 — present" },
      bullets: [
        { es: "PANZA es un emprendimiento familiar: tiene una marca de productos congelados, Panza Congelados, y en marzo de 2026 pudimos abrir nuestro primer local, Panza Food House.", en: "PANZA is a family business: it has a frozen food brand, Panza Congelados, and in March 2026 we were able to open our first restaurant, Panza Food House." },
        { es: "Trabajé vendiendo los congelados y estuve en contacto con proveedores, clientes y eventos.", en: "I sold the frozen food and dealt directly with suppliers, clients and events." },
        { es: "En 2026, con Panza Food House, tuve mis primeras experiencias armando un plan de comunicación desde cero y el rebranding de Panza Congelados.", en: "In 2026, with Panza Food House, I had my first experience building a communications plan from scratch, and worked on the Panza Congelados rebrand." }
      ],
      links: [
        { url: "https://www.instagram.com/panzacongelados/", label: { es: "@panzacongelados", en: "@panzacongelados" } },
        { url: "https://www.instagram.com/panzafoodhouse/", label: { es: "@panzafoodhouse", en: "@panzafoodhouse" } }
      ]
    },
    {
      id: "rugby", track: "x", start: 2021, end: 2022.9, openStart: true,
      title: { es: "San Isidro Club · Rugby", en: "San Isidro Club · Rugby" },
      role: { es: "Jugador", en: "Player" },
      dates: { es: "2010 — 2022", en: "2010 — 2022" },
      bullets: [{ es: "Liderar, ser liderado y jugar en equipo. Disciplina, compromiso y resiliencia.", en: "Leading, being led and playing as a team. Discipline, commitment and resilience." }]
    },
    {
      id: "wat", labelSide: "left", track: "x", start: 2025.95, end: 2026.3,
      title: { es: "Breckenridge, Colorado", en: "Breckenridge, Colorado" },
      role: { es: "Lift Operator — Vail Resorts", en: "Lift Operator — Vail Resorts" },
      dates: { es: "Dic 2025 — Abr 2026", en: "Dec 2025 — Apr 2026" },
      bullets: [
        { es: "Work & Travel: una temporada completa de invierno en las montañas de Colorado.", en: "Work & Travel: a full winter season in the Colorado mountains." },
        { es: "Entorno multicultural, independencia y trabajo de alta exigencia.", en: "Multicultural environment, independence and a demanding job." }
      ]
    }
  ],

  /* Trabajos: grilla filtrable */
  works: [
    {
      id: "w-sindolores", track: "v", year: 2024, featured: true,
      kind: { es: "Cortometraje", en: "Short film" },
      title: { es: "Sin Dolores", en: "Sin Dolores" },
      context: { es: "Taller de Realización Audiovisual", en: "Audiovisual Production Workshop" },
      desc: { es: "Director de sonido. Premio a mejor Director de Sonido.", en: "Sound director. Best Sound Director award." },
      award: { es: "Premio mejor sonido", en: "Best sound award" },
      youtube: "CKdpaXTxLjI"
    },
    {
      id: "w-ccc2", track: "a", year: 2024,
      kind: { es: "Podcast", en: "Podcast" },
      title: { es: "Rollo Porteño", en: "Rollo Porteño" },
      context: { es: "Podcast · Cátedra CCC 2", en: "Podcast · CCC 2 course" },
      desc: { es: "Producción, grabación y edición.", en: "Production, recording and editing." },
      youtube: "edBFwissOOo"
    },
    {
      id: "w-clicks", track: "v", year: 2026, featured: true,
      kind: { es: "Programa", en: "Show" },
      title: { es: "Clicks Modernos", en: "Clicks Modernos" },
      context: { es: "Monkey Music · Monkey Studio", en: "Monkey Music · Monkey Studio" },
      desc: { es: "Nuevo programa de Monkey Music. Preproducción, producción y postproducción; desde el segundo programa también hablo y soy parte del programa.", en: "Monkey Music's new show. Pre-production, production and post-production; from the second episode on, I'm also on air as part of the show." },
      youtube: "_s36va2_ydg",
      episodes: [
        { title: "1 · Formatos musicales, Bogotá y recitales", url: "https://www.youtube.com/watch?v=SQ5J_BhGlEI" },
        { title: "2 · Recitales internacionales y jazz kissa japoneses", url: "https://www.youtube.com/watch?v=_s36va2_ydg" }
      ]
    },
    {
      id: "w-monkey-kil", track: "v", year: 2025, featured: true,
      kind: { es: "DJ set", en: "DJ set" },
      title: { es: "Burzaco Live Beats — Kil From Kilmes", en: "Burzaco Live Beats — Kil From Kilmes" },
      context: { es: "Monkey Music · Monkey Studio", en: "Monkey Music · Monkey Studio" },
      desc: { es: "Set en vivo grabado en el estudio. Preproducción, producción y postproducción en equipo.", en: "Live set recorded in the studio. Pre-production, production and post-production as a team." },
      youtube: "s-WHMSucwPo"
    },
    {
      id: "w-monkey-kil-int", track: "v", year: 2025,
      kind: { es: "Entrevista", en: "Interview" },
      title: { es: "Kil From Kilmes: cómo cortar vinilos", en: "Kil From Kilmes on cutting vinyl" },
      context: { es: "Monkey Music · Monkey Studio", en: "Monkey Music · Monkey Studio" },
      desc: { es: "Entrevista y ranking de sonidos con el DJ.", en: "Interview and sound ranking with the DJ." },
      youtube: "Anz9iNLcBTU"
    },
    {
      id: "w-monkey-fernandito", track: "v", year: 2025,
      kind: { es: "Entrevista", en: "Interview" },
      title: { es: "Fernandito: el DJ y la creación de contenido", en: "Fernandito: DJs and content creation" },
      context: { es: "Monkey Music · Monkey Studio", en: "Monkey Music · Monkey Studio" },
      desc: { es: "“El DJ no tiene que ser creador de contenido, pero si lo es, mejor.”", en: "“A DJ doesn't have to be a content creator, but it helps if they are.”" },
      youtube: "GGQILrz1VJ8"
    },
    {
      id: "w-mllp", track: "a", year: 2025, featured: true,
      kind: { es: "Podcast", en: "Podcast" },
      title: { es: "Mientras lavás los platos", en: "Mientras lavás los platos" },
      context: { es: "Monkey Studio · Spotify", en: "Monkey Studio · Spotify" },
      desc: { es: "Conversaciones con invitados. Algunos de los mejores episodios:", en: "Conversations with guests. Some of the best episodes:" },
      image: "https://image-cdn-ak.spotifycdn.com/image/ab6772ab000015bea2582c53db8fd5039ce53157",
      episodes: [
        { title: "Ep. 12 · Cande Molfese — Adictas al drama", url: "https://open.spotify.com/episode/3J5iXyhE6Y171vI5SegNIE" },
        { title: "Ep. 14 · Evelyn Botto — El arte del autoboicot", url: "https://open.spotify.com/episode/7vhB5VlJ4XFQYK90FwL9Ol" },
        { title: "Ep. 16 · Nacho Elizalde — Hacer cosas", url: "https://open.spotify.com/episode/2Vsaal7BGXpskoeyqrpJoD" },
        { title: "Ep. 19 · Sofi Martínez — Apego, amor y vínculos", url: "https://open.spotify.com/episode/0A4hhJqUhtwn14xIr8WeAH" }
      ]
    },
    {
      id: "w-expert", track: "r", year: 2025,
      kind: { es: "Entrevista", en: "Interview" },
      title: { es: "Sergio Expert", en: "Sergio Expert" },
      context: { es: "Vicejefatura de Gobierno CABA", en: "Deputy Mayor's Office, Buenos Aires" },
      desc: { es: "Publicada en las redes de Clara Muzzio.", en: "Published on Clara Muzzio's social media." },
      url: "https://www.instagram.com/p/DIHVbQzJ5SX/"
    },
    {
      id: "w-contepomi", track: "r", year: 2023, featured: true,
      kind: { es: "Entrevista multimedia", en: "Multimedia interview" },
      title: { es: "Bebe Contepomi", en: "Bebe Contepomi" },
      context: { es: "Producción Discursiva", en: "Discourse Production" },
      desc: { es: "Texto + audio de la entrevista completa.", en: "Text + full interview audio." },
      url: "https://blogdeproduccion842733582.wordpress.com/2023/11/09/bebe-contepomi-los-musicos-son-empresarios-y-profesionales-que-se-levantan-temprano-y-tienen-una-estructura-detras/"
    },
    {
      id: "w-tano", track: "r", year: 2024,
      kind: { es: "Medio digital", en: "Digital outlet" },
      title: { es: "El Tano", en: "El Tano" },
      context: { es: "Géneros y Estilos Informativos", en: "News Genres and Styles" },
      desc: { es: "Sitio sobre el Club Italiano. Tres notas mías.", en: "Site about Club Italiano. Three pieces of mine." },
      url: "https://sites.google.com/view/el-tano/portada"
    }
  ],

  /* Archivo de notas: agrupadas por medio. date (AAAA-MM-DD) o year ordena cada grupo */
  notes: [
    {
      id: "n-expert", group: "gcba", year: 2025, kind: { es: "Perfil", en: "Profile" },
      title: "Sergio Expert: de la explosión que le cambió la vida a “Explosión de vida”",
      dek: { es: "Perfil en primera persona del fundador de Explosión de vida y TEDx speaker.", en: "First-person profile of the founder of Explosión de vida and TEDx speaker." },
      url: "https://www.instagram.com/p/DIHVbQzJ5SX/"
    },
    {
      id: "n-devoto", group: "multimodal", year: 2024, kind: { es: "Investigación", en: "Investigation" },
      title: "Cárcel de Villa Devoto: el hospital de escasez, colapso y pobreza",
      dek: { es: "Unos 320 trabajadores de la salud para cerca de 1.750 internos, en un edificio de 97 años.", en: "Around 320 health workers for roughly 1,750 inmates, in a 97-year-old building." },
      url: "https://carceldevilladevot.wixsite.com/complejo-penitenciar/salud-1"
    },
    {
      id: "n-tano-cronica", group: "tano", year: 2024, kind: { es: "Crónica", en: "Feature" },
      title: "Un sábado de rugby en el Club Italiano",
      dek: { es: "Desde que Américo abre el portón a las ocho hasta el tercer tiempo.", en: "From when Américo opens the gate at eight until the post-match gathering." },
      url: "https://sites.google.com/view/el-tano/memorias"
    },
    {
      id: "n-tano-perfil", group: "tano", year: 2024, kind: { es: "Perfil", en: "Profile" },
      title: "Matías Maza: los entrenadores tienen que formar valores y generar tolerancia a la frustración",
      dek: { es: "El entrenador que llevó al básquet del club a la Liga Federal.", en: "The coach who took the club's basketball team to the Liga Federal." },
      url: "https://sites.google.com/view/el-tano/nuestra-familia"
    },
    {
      id: "n-tano-divulgacion", group: "tano", year: 2024, kind: { es: "Divulgación científica", en: "Science explainer" },
      title: "Caminar es la actividad más elegida por los argentinos",
      dek: { es: "Qué dicen las encuestas nacionales sobre cómo nos movemos.", en: "What national surveys say about how Argentines stay active." },
      url: "https://sites.google.com/view/el-tano/ciencia-y-deporte"
    },
    {
      id: "n-contepomi", group: "discursiva", date: "2023-11-09", kind: { es: "Entrevista", en: "Interview" },
      title: "Bebe Contepomi: “Los músicos son empresarios y profesionales, que se levantan temprano y tienen una estructura detrás”",
      dek: { es: "El periodista de rock analiza cómo la globalización e Internet cambiaron la música.", en: "The rock journalist on how globalization and the internet changed music." },
      url: "https://blogdeproduccion842733582.wordpress.com/2023/11/09/bebe-contepomi-los-musicos-son-empresarios-y-profesionales-que-se-levantan-temprano-y-tienen-una-estructura-detras/"
    },
    {
      id: "n-mdz-5", group: "mdz", date: "2023-12-29", kind: { es: "Nota", en: "Article" },
      title: "Las 3 provincias argentinas naturales y sustentables para viajar en verano",
      dek: { es: "Destinos fuera del circuito tradicional para viajar con amigos o en familia.", en: "Destinations off the usual circuit for travelling with friends or family." },
      url: "https://www.mdzol.com/sociedad/2023/12/29/las-provincias-argentinas-naturales-sustentables-para-viajar-en-verano-1756726.html"
    },
    {
      id: "n-mdz-3", group: "mdz", date: "2024-01-01", kind: { es: "Nota", en: "Article" },
      title: "Actividad física en verano: salud y recomendaciones",
      dek: { es: "Cómo afecta el calor al rendimiento deportivo y cómo ejercitarse sin riesgos.", en: "How heat affects athletic performance and how to exercise safely." },
      url: "https://www.mdzol.com/sociedad/2024/1/1/actividad-fisica-en-verano-salud-recomendaciones-1757318.html"
    },
    {
      id: "n-mdz-7", group: "mdz", date: "2024-01-12", kind: { es: "Nota", en: "Article" },
      title: "Calor y tecnología: cuidados esenciales para los dispositivos en verano",
      dek: { es: "Con la palabra de Agustín Suárez, subsecretario de Innovación Digital porteño.", en: "Featuring Agustín Suárez, Buenos Aires undersecretary for digital innovation." },
      url: "https://www.mdzol.com/sociedad/2024/1/12/calor-tecnologia-cuidados-esenciales-para-los-dispositivos-en-verano-1759691.html"
    },
    {
      id: "n-mdz-4", group: "mdz", date: "2024-01-13", kind: { es: "Nota", en: "Article" },
      title: "Ecoturismo: los destinos más naturales que no conocías de Argentina",
      dek: { es: "Turismo de naturaleza: entornos silvestres y actividades en contacto directo con el paisaje.", en: "Nature tourism: wild places and activities in direct contact with the landscape." },
      url: "https://www.mdzol.com/sociedad/2024/1/13/ecoturismo-los-destinos-mas-naturales-que-no-conocias-de-argentina-1759924.html"
    },
    {
      id: "n-mdz-6", group: "mdz", date: "2024-01-13", kind: { es: "Nota", en: "Article" },
      title: "Anteojos de sol: cómo cuidar la vista en verano",
      dek: { es: "Qué provoca la exposición a los rayos UV y cómo prevenirla.", en: "What UV exposure does to your eyes and how to prevent it." },
      url: "https://www.mdzol.com/sociedad/2024/1/13/anteojos-de-sol-como-cuidar-la-vista-en-verano-1759920.html"
    },
    {
      id: "n-mdz-1", group: "mdz", date: "2024-01-19", kind: { es: "Nota", en: "Article" },
      title: "Recomendaciones para cuidarse del sol en el verano",
      dek: { es: "Especialistas explican cómo proteger la piel durante la temporada.", en: "Specialists explain how to protect your skin during the season." },
      url: "https://www.mdzol.com/sociedad/2024/1/19/recomendaciones-para-cuidarse-del-sol-en-el-verano-1761251.html"
    },
    {
      id: "n-mdz-8", group: "mdz", date: "2024-01-26", kind: { es: "Nota", en: "Article" },
      title: "Yoga: por qué sirve como una disciplina de desconexión",
      dek: { es: "Con María José Beretta, profesora de yoga y terapeuta del sonido.", en: "With María José Beretta, yoga teacher and sound therapist." },
      url: "https://www.mdzol.com/sociedad/2024/1/26/yoga-por-que-sirve-como-una-disciplina-de-desconexion-1762765.html"
    },
    { id: "n-mdz-2", group: "mdz", year: 2024, unpublished: true, kind: { es: "Nota", en: "Article" }, title: "¿Qué alimentos son fundamentales para consumir en verano?" },
    { id: "n-mdz-9", group: "mdz", year: 2024, unpublished: true, kind: { es: "Nota", en: "Article" }, title: "Desconexión digital" },
    { id: "n-mdz-10", group: "mdz", year: 2024, unpublished: true, kind: { es: "Nota", en: "Article" }, title: "Por qué es importante que los adultos mayores hagan actividad física" }
  ],

  noteGroups: [
    { id: "discursiva", name: { es: "Producción Discursiva", en: "Discourse Production" }, clip: "contepomi" },
    { id: "mdz", name: { es: "MDZ Online — Verano sustentable", en: "MDZ Online — Sustainable Summer" }, clip: "mdz" },
    { id: "tano", name: { es: "El Tano — Géneros y Estilos Informativos", en: "El Tano — News Genres and Styles" }, clip: "tano", url: "https://sites.google.com/view/el-tano/portada" },
    { id: "multimodal", name: { es: "Taller de Redacción Multimodal", en: "Multimodal Writing Workshop" }, clip: "devoto" },
    { id: "gcba", name: { es: "Vicejefatura de Gobierno CABA", en: "Deputy Mayor's Office, Buenos Aires" }, clip: "gcba" }
  ],

  tools: [
    { name: "Reaper", cat: { es: "Audio", en: "Audio" }, level: 0.9 },
    { name: "DaVinci Resolve", cat: { es: "Color + edición", en: "Color + editing" }, level: 0.8 },
    { name: "Adobe Premiere", cat: { es: "Edición", en: "Editing" }, level: 0.8 },
    { name: "Canva", cat: { es: "Diseño", en: "Design" }, level: 0.75 },
    { name: "WordPress", cat: { es: "Web", en: "Web" }, level: 0.6 },
    { name: "Google / Microsoft", cat: { es: "Productividad", en: "Productivity" }, level: 0.85 }
  ]
};
