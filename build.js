/* Generador estático del portafolio. Editar datos y correr: node build.js */
const fs = require('fs'), path = require('path');
const SITE='https://blundabranco.github.io';
const MAIL='brancoadrianblunda@gmail.com';
const LINKEDIN='https://linkedin.com/in/brancoblunda';
const GITHUB='https://github.com/BlundaBranco';

const PROJECTS=[
{slug:'taxi-ai',title:'Taxi AI',cliente:'Taxi Call Group S.A.S.',pais:'Colombia',
 rol:'Diseño, construcción y operación',estado:'En producción · mantenimiento continuo',
 tag:'Agente de voz con IA · Telefonía',
 desc:'Una empresa de taxis despachaba a mano todas las llamadas. Construí el sistema que atiende la llamada, entiende la dirección hablada del pasajero y asigna un conductor sin que intervenga un operador. También las dos apps móviles, la landing y el panel de operación.',
 problema:'La central recibía decenas de miles de llamadas por mes y cada una la atendía una persona: escuchaba la dirección, la ubicaba y llamaba por radio a un conductor. El cuello de botella era humano y no escalaba.',
 construido:['Endpoint en Node.js que recibe las llamadas y los audios desde Asterisk.',
 'Transcripción del audio con Whisper y extracción de la dirección con un modelo de lenguaje.',
 'Geocodificación con Google Maps y cerco geográfico sobre Manizales y Villamaría.',
 'Respuesta hablada generada con TTS y convertida a formato telefónico con FFMPEG.',
 'Dialplan propio en Asterisk: enrutamiento, consulta a conductores y derivación directa.',
 'Asignación por radio variable de 500 a 1.900 metros según la franja horaria.',
 'Sensor de cuelgue que cancela el viaje en la base automáticamente.',
 'Alta automática del pasajero que llama por primera vez.',
 'Dos apps Android publicadas: pasajero, con seguimiento en mapa, chat con el conductor y código de seguridad; y conductor.'],
 stats:[['500+','conductores'],['50.000+','llamadas por mes'],['35.000+','reservas por mes'],['~70%','menos trabajo manual']],
 tech:'Node.js · Fastify · tRPC · PostgreSQL · Kysely · Asterisk / FreePBX · Docker · Traefik · Whisper · TTS · Google Maps · Twilio',
 links:[['Sitio','https://taxiai.com.co'],['App pasajero','https://play.google.com/store/apps/details?id=co.com.taxiai.pasajero'],['App conductor','https://play.google.com/store/apps/details?id=co.com.taxiai.conductor']],
 cover:'08-panel-despacho.png',
 shots:['08-panel-despacho.png','01-landing-hero.png','02-landing-tres-formas.png','06-app-seguimiento.png','05-app-solicitar.png','07-app-historial.png','03-play-pasajero.png','04-play-conductor.png'],
 nota:'Las cifras de operación son datos informados por el cliente.'},

{slug:'tu-proximo-horizonte',title:'Tu Próximo Horizonte',cliente:'Leo Cerdeira',pais:'Argentina',
 rol:'Diseño, construcción y entrega',estado:'Tres sistemas en producción · uso diario',
 tag:'Next.js · Supabase · Automatización',
 desc:'Tres sistemas para una agencia de viajes, que el cliente opera solo: la agenda de capacitaciones semanales, la automatización de leads de Facebook y un onboarding de afiliados editable sin tocar código.',
 problema:'Coordinaba capacitaciones semanales a mano, perdía los leads que entraban por Facebook y mandaba siete PDFs sueltos a cada afiliado nuevo. Necesitaba poder cambiar todo él, sin depender del desarrollador.',
 construido:['Agenda con panel para cargar la semana completa, inscripción pública, manejo estricto de zonas horarias y backups diarios con alarma de fallo.',
 'Duplicado de semana con borrado definitivo para sesiones vacías y borrado lógico para las que ya tienen inscriptos.',
 'Seguridad a nivel de fila en la base y revocación del acceso anónimo a los enlaces y claves de reunión.',
 'Captura automática de leads de Facebook y secuencia de cuatro correos a las 0, 24, 48 y 72 horas, con dominio de envío propio autenticado.',
 'Onboarding público paso a paso, sin registro, que refleja al instante lo que el administrador cambia.',
 'Panel de administración con sesión firmada y escrituras por lote a prueba de pérdida de datos.',
 'Sitio mellizo de demostración en un esquema separado, con aislamiento verificado.'],
 stats:[['3','sistemas en producción'],['0','dependencia del dev para editar']],
 tech:'Next.js 15 · TypeScript · Supabase · Vercel · Make.com · Brevo · Facebook Lead Ads · GitHub Actions',
 links:[['Onboarding','https://onboarding.tuproximohorizonte.com'],['Agenda','https://agenda.tuproximohorizonte.com'],['Demo','https://demo.tuproximohorizonte.com']],
 cover:'01-onboarding-inicio.png',
 shots:['01-onboarding-inicio.png','02-onboarding-paso.png','06-agenda-publica.png','08-make-escenario.png'],
 nota:''},

{slug:'infinity-book',title:'Infinity Book',cliente:'Elfinbook S.R.L.',pais:'Argentina',
 rol:'Desarrollo y publicación de la versión actual',estado:'En producción · mantenimiento mensual',
 tag:'Flutter · ASP.NET Core · OCR',
 desc:'App de escaneo de cuadernos reutilizables con OCR e IA. La heredé de otro proveedor —sin control de versiones, con credenciales expuestas y todo a nombre de terceros— y desarrollé y publiqué la versión que está hoy en las tiendas.',
 problema:'El producto funcionaba pero no era del cliente: el backend, las cuentas de tienda y las integraciones estaban a nombre del proveedor anterior. La cámara de Android era inestable y había una fecha límite de Google para actualizar la app.',
 construido:['Refactor del pipeline de cámara en Android y corrección del procesamiento que truncaba las capturas.',
 'Migración completa del backend a infraestructura propia del cliente, con TLS.',
 'Migración de datos entre bases desacopladas sin modificar un solo registro de usuario real.',
 'Módulo de IA para edición libre del texto reconocido y funnel de registro con segmentación.',
 'Reconfiguración de las cinco integraciones en la nube bajo cuentas del cliente.',
 'Endurecimiento de seguridad: cierre de endpoints, eliminación de credenciales expuestas, bloqueo de las cuentas del proveedor anterior, firewall y backups verificados.',
 'Publicación en Google Play y App Store bajo cuentas del cliente, incluida la transferencia de la ficha de iOS.'],
 stats:[['8.900+','usuarios registrados'],['177','países'],['0','registros perdidos en la migración']],
 tech:'Flutter / Dart · Kotlin con OpenCV y ML Kit · ASP.NET Core · SQL Server · Azure Document Intelligence · OpenAI · DigitalOcean · Docker · Codemagic',
 links:[['Google Play','https://play.google.com/store/apps/details?id=com.infinitybook.infinitybook']],
 cover:'03-app-escaneo.png',
 shots:['03-app-escaneo.png','04-app-resultado-ocr.png','05-app-editor-libre.png','01-play-ficha.png'],
 nota:''},

{slug:'signfloow',title:'SignFloow',cliente:'Cliente directo',pais:'España',
 rol:'Diseño y construcción desde cero',estado:'En producción con clientes',
 tag:'SaaS multi-tenant · React + NestJS + AWS',
 desc:'SaaS para empresas de rotulación: reemplaza planillas y mensajes por un tablero de producción, un catálogo con recetas de fabricación, presupuestos calculados por fórmulas y un asistente de IA que consulta los datos reales del negocio.',
 problema:'Los talleres del rubro manejan proyectos, materiales y presupuestos entre planillas, mensajes y memoria. Nadie sabe con certeza cuánto cuesta un trabajo hasta que ya se hizo.',
 construido:['Tablero multi-empresa con cinco fases, subtableros por taller y descomposición automática del proyecto en tareas de producción.',
 'Motor de presupuestos con fórmulas, capítulos, tarifas de mano de obra y costes indirectos.',
 'Enlace público de aceptación que, al aceptarse, crea el proyecto en el tablero.',
 'Catálogo con lista de materiales por dimensión y 91 materiales preconfigurados del rubro.',
 'Asistente de IA con acceso a herramientas sobre los datos de cada empresa, con dos proveedores y conmutación automática.',
 'Control de acceso por rol y aislamiento total entre empresas.',
 'Infraestructura como código y despliegue automatizado sin credenciales estáticas.'],
 stats:[['1.551+','tests automatizados'],['~90%','de cobertura'],['~130','pull requests']],
 tech:'TypeScript · React 19 · Vite · Tailwind · NestJS 11 · PostgreSQL 16 · Prisma · Turborepo · AWS ECS Fargate y Aurora · Terraform · Vercel',
 links:[['Aplicación','https://app.signfloow.ai']],
 cover:'01-floow-kanban.png',
 shots:['01-floow-kanban.png','03-quote-engine.png','06-catalogo-bom.png','07-floowy-chat.png'],
 nota:''}
];

PROJECTS.push(
{slug:'blc-one',title:'BLC One',cliente:'BLC Power Generation',pais:'Argentina',
 rol:'Diseño y construcción desde cero',estado:'v0.3.4 entregada · aplicación interna',
 tag:'Python · Flet · MySQL · Escritorio',
 desc:'Plataforma de gestión para el área de servicios de un grupo de energía renovable que opera remotamente cerca del 17% de la generación renovable del país. Centraliza plantas, contratos y compromisos regulatorios que vivían en planillas.',
 problema:'Clientes, plantas, cronogramas de reportes ante el organismo regulador y agendas se manejaban en Excel y scripts sueltos. No había trazabilidad ni control de quién podía ver o modificar qué.',
 construido:['Ingreso y control de acceso por rol: tres roles sobre quince pantallas, permisos por ruta, modo de solo lectura y menú filtrado.',
 'Alta, baja y modificación de clientes, plantas con versionado histórico de configuraciones, y usuarios internos y externos.',
 'Gestor de reportes con cronograma anual, asignación de procesador y aprobador, seguimiento y matriz de servicios.',
 'Vista cruzada de plantas por tipo de reporte, con filtros por rango de fechas.',
 'Módulo de agenda con exportación a Excel en el formato exacto del cliente.',
 'Vista integrada de soporte sobre 216 agentes y pantalla de contratos.',
 'Ejecutable con asistente de primer arranque, datos de prueba y registro rotativo.'],
 stats:[['237','plantas'],['2.555','compromisos regulatorios'],['2.709','tests automatizados'],['82','decisiones de arquitectura documentadas']],
 tech:'Python 3.13 · Flet · SQLAlchemy 2 · MySQL 8 · PyInstaller · desarrollo dirigido por especificación',
 links:[],cover:'03-cronograma-anual.png',
 shots:['02-dashboard.png','03-cronograma-anual.png','04-matriz-servicios.png','09-rbac.png'],
 nota:'Aplicación interna sobre red privada. Las capturas se toman sobre datos de prueba.'},

{slug:'comanda-central',title:'Comanda Central',cliente:'Producto propio',pais:'Argentina',
 rol:'Producto, arquitectura y operación',estado:'En producción en 8 negocios y 3 cadenas',
 tag:'SaaS gastronómico · Node.js + PostgreSQL',
 desc:'Nació para resolver el problema de mi propia pizzería y terminó siendo un SaaS con gestión centralizada de sucursales: toma de comandas, inventario, análisis de ventas y costeo real por producto con recetas anidadas.',
 problema:'Un negocio gastronómico sabe cuánto vendió, pero casi nunca cuánto ganó: el costo real de un plato depende de sub-recetas cuyos insumos cambian de precio todo el tiempo.',
 construido:['Punto de venta de tres paneles, operable por completo con el teclado, con impresión de ticket.',
 'Costeo con consultas recursivas en PostgreSQL, que resuelve recetas dentro de recetas.',
 'Tablero de análisis: ventas, ticket promedio, ganancia bruta y neta, comparativas, horario pico y productos más vendidos.',
 'Inventario y compras: el stock se descuenta con la venta y el alta de una compra genera el gasto e impacta el inventario en una sola transacción.',
 'Editor de menú con categorías, adicionales y combos.',
 'Editor del sitio público de cada negocio, con vista previa en vivo.'],
 stats:[['8','negocios'],['3','cadenas'],['15','sucursales']],
 tech:'Node.js · Express · PostgreSQL · JavaScript · Chart.js · Cloudinary · Render · Vercel',
 links:[['Código','https://github.com/BlundaBranco/Comanda-Central'],['Sitio de ejemplo','https://monat.ar']],
 cover:'01-pos.png',
 shots:['01-pos.png','02-dashboard-bi.png','03-costeo-receta.png','08-sitio-publico.png'],
 nota:''},

{slug:'vertical',title:'Vertical',cliente:'Producto propio',pais:'Argentina',
 rol:'Fundador · producto, arquitectura y operación',estado:'Activo, con clientes',
 tag:'Agentes de WhatsApp · Meta Cloud API',
 desc:'Mi propia plataforma: agentes conversacionales con IA y CRM para inmobiliarias, sobre la API oficial de WhatsApp. Califica leads, hace seguimiento y reactiva contactos las 24 horas. Proveedor de tecnología verificado por Meta.',
 problema:'Una inmobiliaria recibe consultas a toda hora y responde cuando puede. El contacto que no recibe respuesta en minutos se enfría, y después nadie tiene tiempo de reactivarlo.',
 construido:['Agente conversacional que califica al contacto durante la charla, sobre la API oficial de WhatsApp.',
 'CRM propio donde queda el historial y el estado de cada contacto.',
 'Seguimiento y reactivación automáticos.',
 'Configuración del comportamiento del agente por cliente.',
 'Infraestructura y operación diaria de la plataforma.'],
 stats:[['Meta','proveedor verificado'],['24/7','atención']],
 tech:'Meta WhatsApp Cloud API · modelos de lenguaje con uso de herramientas · Python',
 links:[['Sitio','https://somosvertical.ar']],
 cover:'03-chat-mati.png',
 shots:['01-web-home.png','03-chat-mati.png','02-meta-verificado.png','04-crm-leads.png'],
 nota:''},

{slug:'deltan-scan',title:'Deltan Scan IA',cliente:'Carlos Vargas',pais:'Latinoamérica',
 rol:'Diseño y construcción',estado:'Entregado · código abierto',
 tag:'Visión por computadora · Salud',
 desc:'Análisis biométrico asistido de radiografías dentales panorámicas: medición interactiva de las piezas y procesamiento de imagen para apoyar el diagnóstico.',
 problema:'Medir corona y raíz sobre una radiografía panorámica es manual, lento y poco reproducible entre profesionales.',
 construido:['Procesamiento de la radiografía con visión por computadora.',
 'Medición interactiva de las piezas dentales sobre la imagen.',
 'Interfaz web para cargar el estudio y ver los resultados.'],
 stats:[],
 tech:'Python · OpenCV · Streamlit',
 links:[['Código','https://github.com/BlundaBranco/Deltan-Scan-AI']],
 cover:'03-app-analisis.png',
 shots:['03-app-analisis.png','02-app-carga.png'],
 nota:''});

const OTHERS=[
['Lomas del Pacífico','México','Cobranza de lotes en cuotas: planes de pago, recibos con folio, mora y morosidad. Laravel.'],
['Luseo','EE.UU. / Colombia','Colaboración dentro del equipo del cliente sobre módulos de gestión de proyectos en Angular.'],
['SatManager','España','Servicio técnico en campo: avisos con mapa y ruteo, albaranes con firma, facturación. Ionic.'],
['Cortex','Producto propio','Asistente personal por WhatsApp con recordatorios, gastos y notas por audio. FastAPI.'],
['Academia Thales','Perú','Aula virtual en Moodle y reemplazo de un WordPress comprometido por un sitio estático. Astro.'],
['The Argentino y Mosto','Canadá / EE.UU.','Dos tiendas de exportación creadas desde cero. Shopify.'],
['Tymonyz','Producto propio','Pipeline autónomo de noticias a video: guion, voz, edición y publicación. Python.'],
['Expert Advisor MetaTrader 5','Cliente vía Workana','Robot de trading construido según la especificación del cliente. MQL5.'],
['25+ trabajos con reseña pública','Varios países','Bots de WhatsApp, aulas virtuales, tiendas, tableros y frontends. Verificables en Workana.']];

const METHOD=[
['Arquitectura primero','Defino qué se construye y qué no antes de escribir código.'],
['Entregas por hitos','El cliente ve algo andando temprano y seguido.'],
['Tests como condición','Un hito no está entregado si no está cubierto.'],
['Desarrollo con IA','Agentes de código sobre especificaciones. El criterio sigue siendo mío.']];

const STACK=[
['Lenguajes','Python|TypeScript|SQL|Dart|C#'],
['Backend','Node.js|NestJS|FastAPI|ASP.NET Core|Laravel'],
['Frontend','React|Next.js|Angular|Flutter|Astro|Tailwind'],
['Datos','PostgreSQL|MySQL|SQL Server|Supabase|Prisma'],
['Infra','AWS|Terraform|Docker|Vercel|Netlify|CI/CD'],
['IA','LLMs con herramientas|Agentes en producción|Whisper|TTS|OpenCV'],
['Integraciones','WhatsApp Cloud API|Google Maps|Mercado Pago|Twilio|Asterisk|n8n']];


const SHORT={
'taxi-ai':'Atiende la llamada, entiende la dirección hablada y despacha el taxi sin operador.',
'tu-proximo-horizonte':'Tres sistemas en producción que el cliente opera solo: agenda, captación de leads y onboarding.',
'infinity-book':'App de escaneo con OCR e IA. Rehice y publiqué la versión que está hoy en las tiendas.',
'signfloow':'SaaS para empresas de rotulación: tablero de producción, presupuestos por fórmulas y asistente de IA.',
'blc-one':'Centraliza 237 plantas de energía renovable y sus compromisos regulatorios.',
'comanda-central':'Punto de venta, inventario y costeo real de recetas anidadas para gastronomía.',
'vertical':'Mi plataforma: agentes de WhatsApp con IA para inmobiliarias. Verificada por Meta.',
'deltan-scan':'Medición asistida de radiografías dentales con visión por computadora.'};
const chips=p=>p.tech.split(' · ').slice(0,4);

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const head=(title,desc,canonical,depth)=>{const r=depth?'../':'';return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="'+SITE+'/assets/images/profile.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FBFAF8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#100F0D" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}css/site.css">
</head>
<body>
<header class="site"><div class="wrap">
<a class="brand" href="${r}index.html"><b>Branco Blunda</b></a>
<nav class="site">
<a href="${r}index.html#trabajo">Trabajo</a>
<a href="${r}index.html#metodo">Método</a>
<a href="${r}index.html#stack">Stack</a>
<a href="${r}index.html#contacto">Contacto</a>
</nav>
</div></header>`;};

const shot=(slug,file,alt,depth)=>{const r=depth?'../':'';
return `<figure class="shot"><img src="${r}assets/proyectos/${slug}/${file}" alt="${esc(alt)}" loading="lazy" onerror="this.closest('.shot').classList.add('missing');this.remove()"><figcaption>Falta la captura<br>assets/proyectos/${slug}/${file}</figcaption></figure>`;};

const foot=depth=>{const r=depth?'../':'';return `<footer class="site"><div class="wrap" style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:center;width:100%">
<span class="mono">© ${new Date().getFullYear()} Branco Blunda · Rosario, Argentina</span>
<span class="links-row"><a href="${LINKEDIN}">LinkedIn</a><a href="${GITHUB}">GitHub</a><a href="mailto:${MAIL}">Email</a></span>
</div></footer>
<script src="${r}js/site.js"></script>
</body></html>`;};

let idx=head('Branco Blunda — Software Engineer','Software Engineer. Construyo sistemas que llegan a producción: agentes de voz y de WhatsApp, SaaS multi-tenant y apps móviles publicadas.',SITE+'/',0);
idx+=`
<div class="wrap">
<section class="hero">
<div class="hero-grid">
<div>
<div class="mono kicker">Software Engineer · Rosario, Argentina · Remoto</div>
<h1>Construyo sistemas que <em>llegan a producción</em> y los usa gente real.</h1>
<p class="lede">Agentes de voz y de WhatsApp, SaaS multi-tenant, apps móviles publicadas y automatización de procesos. Desarrollo software desde 2017.</p>
<div class="cta"><a class="btn" href="#trabajo">Ver el trabajo</a><a class="btn ghost" href="mailto:${MAIL}">Escribime</a></div>
</div>
<img class="foto" src="assets/images/foto.jpg" alt="Branco Blunda" width="800" height="800">
</div>
</section>
<section class="proof">
<ul>
<li><strong>40+</strong><span>proyectos</span></li>
<li><strong>25</strong><span>reseñas de clientes</span></li>
<li><strong>#1</strong><span>Workana Argentina 2026</span></li>
<li><strong>4</strong><span>apps en tiendas</span></li>
<li><strong>8.900+</strong><span>usuarios</span></li>
<li><strong>Meta</strong><span>proveedor verificado</span></li>
</ul>
</section>
<section id="trabajo">
<div class="sec-head"><h2>Trabajo</h2><span class="mono">Ocho de más de cuarenta</span></div>
<div class="grid-cases">`;
PROJECTS.forEach(p=>{
idx+=`
<article class="card">
<a href="proyectos/${p.slug}.html">
${shot(p.slug,p.cover,p.title,0)}
<div class="card-body">
<div class="mono card-meta">${esc(p.cliente)} · ${esc(p.pais)}</div>
<h3>${esc(p.title)}</h3>
<p>${esc(SHORT[p.slug]||'')}</p>
<div class="chips">${chips(p).map(c=>`<span>${esc(c)}</span>`).join('')}</div>
</div>
</a>
</article>`;});
idx+=`
</div>
</section>
<section id="otros" style="padding-top:0">
<div class="others">
<div class="sec-head" style="margin-bottom:24px"><h2 style="font-size:1.4rem">Otros trabajos</h2>
<button class="toggle" id="toggle-otros" aria-expanded="false" aria-controls="otros-list">Ver</button></div>
<ol id="otros-list" hidden>${OTHERS.map(o=>`<li><h4>${esc(o[0])}<br><span class="mono" style="text-transform:none">${esc(o[1])}</span></h4><p>${esc(o[2])}</p></li>`).join('')}</ol>
</div>
</section>
<section id="metodo">
<div class="sec-head"><h2>Cómo trabajo</h2></div>
<div class="cols">${METHOD.map(m=>`<div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p></div>`).join('')}</div>
</section>
<section id="stack">
<div class="sec-head"><h2>Stack</h2></div>
${STACK.map(s=>`<div class="stack-group"><h3 style="font-size:.95rem">${esc(s[0])}</h3><div class="chips">${s[1].split('|').map(c=>`<span>${esc(c)}</span>`).join('')}</div></div>`).join('')}
</section>
<section class="contact" id="contacto" style="border-bottom:0">
<h2>¿Tenés un problema que se resuelve con software?</h2>
<p class="lede">Escribime y lo charlamos.</p>
<p><a class="big" href="mailto:${MAIL}">${MAIL}</a></p>
<div class="links-row" style="margin-top:26px"><a href="${LINKEDIN}" class="small">LinkedIn</a><a href="${GITHUB}" class="small">GitHub</a><a href="https://somosvertical.ar" class="small">Vertical</a></div>
</section>
</div>`;
idx+=foot(0);
fs.writeFileSync('index.html',idx);

if(!fs.existsSync('proyectos'))fs.mkdirSync('proyectos');
PROJECTS.forEach(p=>{
let h=head(p.title+' — Branco Blunda',p.desc.slice(0,155),SITE+'/proyectos/'+p.slug+'.html',1);
h+=`
<div class="wrap">
<div class="crumb"><a href="../index.html">← Todo el trabajo</a></div>
<section class="p-hero">
<div class="mono" style="margin-bottom:20px">${esc(p.tag)}</div>
<h1>${esc(p.title)}</h1>
<p class="lede">${esc(p.desc)}</p>
<div class="p-meta">
<div><span>Cliente</span><b>${esc(p.cliente)}</b></div>
<div><span>País</span><b>${esc(p.pais)}</b></div>
<div><span>Rol</span><b>${esc(p.rol)}</b></div>
<div><span>Estado</span><b>${esc(p.estado)}</b></div>
</div>
</section>
<section class="block"><h2>El problema</h2><p class="lede">${esc(p.problema)}</p></section>
<section class="block"><h2>Lo que construí</h2><ul>${p.construido.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></section>
${p.stats.length?`<section class="block"><h2>Resultado</h2><ul class="result" style="margin-top:6px">${p.stats.map(s=>`<li><b>${esc(s[0])}</b>${esc(s[1])}</li>`).join('')}</ul>${p.nota?`<div class="note">${esc(p.nota)}</div>`:''}</section>`:''}
<section class="block"><h2>Capturas</h2><div class="gallery">${p.shots.map(s=>shot(p.slug,s,p.title+' — captura',1)).join('')}</div></section>
<section class="block"><h2>Stack</h2>
<p class="mono" style="text-transform:none;letter-spacing:0;font-size:.86rem;line-height:2;color:var(--muted)">${esc(p.tech)}</p>
${p.links.length?`<div class="case-links" style="margin-top:26px">${p.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])}</a>`).join('')}</div>`:''}
</section>
<section style="padding:56px 0"><a class="btn" href="../index.html">← Volver a todo el trabajo</a></section>
</div>`;
h+=foot(1);
fs.writeFileSync(path.join('proyectos',p.slug+'.html'),h);});
console.log('OK — index.html + '+PROJECTS.length+' paginas');
