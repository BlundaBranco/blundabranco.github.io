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
 shots:[['08-panel-despacho.png','Panel de despacho: llamadas y viajes del día, solicitudes activas, la flota en el mapa y el detalle del viaje en curso.'],['01-landing-hero.png','La landing pública del servicio.'],['02-landing-tres-formas.png','Los tres canales de pedido: WhatsApp, llamada telefónica y app.'],['06-app-seguimiento.png','Seguimiento del viaje en tiempo real, con la ruta y el chat con el conductor.'],['05-app-solicitar.png','Pedido desde la app. El círculo es el radio de búsqueda de conductores en hora pico.'],['07-app-historial.png','Historial de viajes del pasajero, con el estado de cada uno.'],['03-play-pasajero.png','La app de pasajero, publicada en Google Play.'],['04-play-conductor.png','La app de conductor, publicada en Google Play.']],
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
 shots:[['01-onboarding-inicio.png','El onboarding de afiliados: el plan de siete pasos, el paso en curso con su video y la agenda de capacitaciones al costado. Un solo link, sin registro.'],['02-onboarding-paso.png','Un paso abierto: video, PDFs descargables y enlaces a herramientas. El cliente edita todo esto desde su panel, sin tocar código.'],['06-agenda-publica.png','La agenda semanal de capacitaciones, con inscripción abierta. El selector de zona horaria convierte los horarios al país de cada inscripto.'],['08-make-escenario.png','La automatización que captura los leads de Facebook y dispara la secuencia de cuatro correos.']],
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
 cover:'01-app-escaneo.png',
 shots:[['01-app-escaneo.png','La cámara detectando la hoja del cuaderno para escanearla.'],['02-app-nuevo-escaneo.png','El escaneo listo, con el módulo de IA: transcripción del documento, resumen inteligente y resolución de matemática.'],['03-cloud-destinos.png','Las integraciones en la nube: Google Drive, Dropbox, OneNote, OneDrive, correo y Trello.'],['04-cloud-configurado.png','Cada uno de los seis íconos impresos en la hoja se asocia a un destino: el usuario marca el ícono y el escaneo se guarda solo donde corresponde.'],['05-app-store.png','La app publicada en la App Store bajo la cuenta del cliente.']],
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
 shots:[['01-floow-kanban.png','El tablero de producción: cinco fases, una tarjeta por proyecto y el avance de cada tarea.'],['02-panel.png','El panel de inicio: proyectos por fase, prioridades del día y presupuestos pendientes de enviar.'],['03-quote-engine.png','Detalle de un presupuesto: líneas, impuestos y análisis interno de costes y margen.'],['08-detalle-proyecto.png','Ficha de proyecto: tareas de producción, archivos, notas internas y un resumen generado por IA.'],['06-catalogo.png','El catálogo: familias, subfamilias y productos con herencia de materiales y reglas. Cada producto puede ser de precio fijo o calculable.'],['04-crm-pipeline.png','El embudo comercial, desde la consulta nueva hasta el cobro pendiente.'],['05-presupuestos-lista.png','El listado de presupuestos, con el estado y el margen de cada uno.'],['07-floowy-chat.png','Floowy, el asistente de IA: propone acciones concretas sobre los datos del taller.']],
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
 shots:[['03-cronograma-anual.png','El cronograma anual de compromisos regulatorios: 2.555 filas, filtrables por planta, tipo de reporte y estado.'],['10-roles-permisos.png','El control de acceso: nivel de permiso de cada rol sobre cada pantalla, de lectura y escritura a sin visibilidad.'],['04-matriz-servicios.png','La matriz de servicios: qué paquetes, módulos y submódulos aplican a cada planta.'],['01-planta-detalle.png','La ficha de una planta, con su información contractual, de gestión de activos y de soporte.'],['09-usuarios-roles.png','Usuarios internos con su rol y sus permisos de emisión y aprobación.']],
 nota:'Aplicación interna sobre red privada. Los datos de clientes, plantas y personas están difuminados en las capturas.'},

{slug:'lomas-del-pacifico',title:'Lomas del Pacífico',cliente:'Desarrollador inmobiliario',pais:'México',
 rol:'Diseño y construcción desde cero',estado:'En uso · mantenimiento continuo',
 tag:'Laravel · MySQL · Cobranzas',
 desc:'Sistema de cobranza para la venta de lotes en cuotas. Reemplazó planillas de Excel dispersas por un solo lugar donde vive el cliente, su lote, su plan de pago, cada cobro con folio y la mora calculada sola.',
 problema:'La cobranza de lotes vendidos en cuotas se llevaba en planillas de Excel sueltas. Nadie sabía con certeza quién estaba al día, cuánto se debía ni desde cuándo, y cada recibo se armaba a mano.',
 construido:['Alta, baja y modificación de clientes, lotes y loteos, con el estado de cada lote: disponible, vendido o liquidado.',
 'Planes de pago que generan las cuotas solos, en frecuencia mensual, bimestral o trimestral.',
 'Registro de cobros con folio único, pagos parciales y validación de sobrepago.',
 'Recibos y estados de cuenta en PDF.',
 'Interés por mora con tasa y días de gracia configurables, y condonación.',
 'Reportes de ingresos y de morosidad, con filtros y exportación a PDF.',
 'Comando de migración desde las planillas de Excel existentes, transaccional y con registro de errores.',
 'Avisos automáticos por WhatsApp: recordatorio de vencimiento y confirmación de pago, con su panel de configuración.'],
 stats:[['289','clientes'],['345','lotes'],['0','planillas de Excel']],
 tech:'PHP 8.1 · Laravel 11 · Blade · Alpine.js · Tailwind · MySQL 8 · dompdf · PhpSpreadsheet · Twilio · Chart.js',
 links:[],
 cover:'01-dashboard.png',
 shots:[['01-dashboard.png','El tablero del sistema: clientes, lotes por estado, cuotas vencidas y accesos rápidos a las operaciones del día.'],['02-plan-de-pagos.png','Un plan de pago con sus cuotas generadas automáticamente.'],['03-recibo-pdf.png','El recibo con folio que emite el sistema.'],['04-reporte-morosidad.png','El reporte de morosidad, con la deuda y los días de atraso de cada cliente.']],
 nota:'Sistema privado del cliente. Las capturas se toman sobre datos de prueba.'},

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
 shots:[['01-pos.png','El punto de venta de tres paneles, operable por completo con el teclado.'],['02-dashboard-bi.png','El tablero de ventas, ganancia y horario pico.'],['03-costeo-receta.png','El costeo de un producto, resolviendo las recetas anidadas.'],['08-sitio-publico.png','El sitio público que genera la plataforma para cada negocio.']],
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
 shots:[['01-web-home.png','El sitio de Vertical.'],['03-chat-mati.png','El agente calificando un contacto por WhatsApp.'],['02-meta-verificado.png','El estado de proveedor de tecnología verificado por Meta.'],['04-crm-leads.png','El CRM con los contactos y su estado.']],
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
 shots:[['03-app-analisis.png','La radiografía procesada, con las mediciones sobre la imagen.'],['02-app-carga.png','La carga del estudio.']],
 nota:''});

const OTHERS=[
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
'lomas-del-pacifico':'Cobranza de lotes en cuotas: planes de pago, recibos con folio, mora y morosidad.',
'blc-one':'Centraliza 237 plantas de energía renovable y sus compromisos regulatorios.',
'comanda-central':'Punto de venta, inventario y costeo real de recetas anidadas para gastronomía.',
'vertical':'Mi plataforma: agentes de WhatsApp con IA para inmobiliarias. Verificada por Meta.',
'deltan-scan':'Medición asistida de radiografías dentales con visión por computadora.'};
const chips=p=>p.tech.split(' · ').slice(0,4);

/* ---------- helpers ---------- */
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const YEAR=new Date().getFullYear();
const WA='https://wa.me/5493412714751';

const head=(title,desc,canonical,depth)=>{const r=depth?'../':'';return `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Branco Blunda">
<meta name="theme-color" content="#10b981">
<title>${esc(title)}</title>
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="${r}favicon.svg">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/assets/images/foto.jpg">
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${esc(title)}">
<meta property="twitter:description" content="${esc(desc)}">
<meta property="twitter:image" content="${SITE}/assets/images/foto.jpg">
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}css/styles.css">
</head>
<body class="bg-gray-900 text-gray-100 font-sans">

<nav class="fixed top-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md z-50 border-b border-gray-800">
  <div class="container mx-auto px-6 py-4">
    <div class="flex justify-between items-center">
      <a href="${r}index.html" class="flex items-center space-x-2">
        <span class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-gray-900">B</span>
        <span class="text-xl font-bold">Branco Blunda</span>
      </a>
      <div class="hidden md:flex space-x-8">
        <a href="${r}index.html#inicio" class="nav-link">Inicio</a>
        <a href="${r}index.html#servicios" class="nav-link">Servicios</a>
        <a href="${r}index.html#portafolio" class="nav-link">Portafolio</a>
        <a href="${r}index.html#tecnologias" class="nav-link">Stack</a>
        <a href="${r}index.html#contacto" class="nav-link">Contacto</a>
      </div>
      <button id="menu-toggle" class="md:hidden text-2xl focus:outline-none" aria-label="Menu"><i class="fas fa-bars"></i></button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-4">
      <a href="${r}index.html#inicio" class="block nav-link-mobile">Inicio</a>
      <a href="${r}index.html#servicios" class="block nav-link-mobile">Servicios</a>
      <a href="${r}index.html#portafolio" class="block nav-link-mobile">Portafolio</a>
      <a href="${r}index.html#tecnologias" class="block nav-link-mobile">Stack</a>
      <a href="${r}index.html#contacto" class="block nav-link-mobile">Contacto</a>
    </div>
  </div>
</nav>`;};

const foot=depth=>{const r=depth?'../':'';return `
<footer class="py-12 px-6 bg-gray-800 bg-opacity-50 border-t border-gray-800">
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-center md:text-left">
        <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
          <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-gray-900">B</div>
          <span class="text-lg font-bold">Branco Blunda</span>
        </div>
        <p class="text-gray-500 text-sm">Software Engineer · Rosario, Argentina</p>
      </div>
      <div class="flex gap-6">
        <a href="${GITHUB}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="GitHub"><i class="fab fa-github text-xl"></i></a>
        <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="LinkedIn"><i class="fab fa-linkedin text-xl"></i></a>
        <a href="${WA}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="WhatsApp"><i class="fab fa-whatsapp text-xl"></i></a>
        <a href="mailto:${MAIL}" class="social-icon-footer" aria-label="Email"><i class="fas fa-envelope text-xl"></i></a>
      </div>
      <div class="text-center md:text-right">
        <p class="text-gray-500 text-sm">© <span id="current-year">${YEAR}</span> Branco Blunda</p>
        <p class="text-gray-600 text-xs mt-1">Hecho con <i class="fas fa-heart text-red-500"></i> y mucho código</p>
      </div>
    </div>
  </div>
</footer>
<button id="scroll-top" class="scroll-top-btn" aria-label="Volver arriba"><i class="fas fa-arrow-up"></i></button>
<script src="${r}js/main.js"></script>
</body>
</html>`;};

/* imagen con placeholder si falta */
const shot=(slug,file,alt,depth,cls)=>{const r=depth?'../':'';
return `<img src="${r}assets/proyectos/${slug}/${file}" alt="${esc(alt)}" class="${cls}" loading="lazy" decoding="async" data-file="assets/proyectos/${slug}/${file}" onerror="this.parentElement.classList.add('img-missing');this.parentElement.setAttribute('data-missing',this.dataset.file);this.remove()">`;};
const gitem=(slug,pair,depth)=>{const f=Array.isArray(pair)?pair[0]:pair, c=Array.isArray(pair)?pair[1]:'';
return `<figure class="gitem"><div class="gitem-img">${shot(slug,f,c||'Captura',depth,'')}</div>${c?`<figcaption>${esc(c)}</figcaption>`:''}</figure>`;};

/* ---------- servicios ---------- */
const SERVICIOS=[
['fas fa-robot','from-green-400 to-cyan-500','Agentes de IA y automatización',
 'Sistemas que atienden, entienden y resuelven solos: voz por teléfono, WhatsApp y flujos internos. En producción, no en demo.',
 ['Agentes de voz sobre telefonía','Agentes de WhatsApp con API oficial','Automatización de procesos','LLMs con acceso a datos del negocio']],
['fas fa-layer-group','from-blue-500 to-purple-600','SaaS y plataformas a medida',
 'Del problema al producto: arquitectura multi-empresa, paneles de operación, APIs e infraestructura que aguanta.',
 ['Arquitectura multi-tenant','Paneles y tableros de operación','APIs y motores de cálculo','AWS, Docker y CI/CD']],
['fas fa-mobile-screen','from-yellow-400 to-orange-500','Apps móviles y publicación',
 'Apps Android e iOS construidas, publicadas y mantenidas. Incluye la parte que nadie quiere hacer: tiendas, cuentas y migraciones.',
 ['Flutter y Android nativo','Publicación en Google Play y App Store','Migración de apps heredadas','Mantenimiento y versiones']]];

/* ---------- index ---------- */
let idx=head('Branco Blunda | Software Engineer & AI Specialist',
 'Software Engineer. Construyo sistemas que llegan a produccion: agentes de voz y de WhatsApp, SaaS multi-tenant y apps moviles publicadas.',
 SITE+'/',0);

idx+=`
<section id="inicio" class="min-h-screen flex items-center justify-center pt-24 pb-16">
  <div class="container mx-auto px-6 md:px-12 lg:px-24">
    <div class="flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="flex-1 text-center md:text-left">
        <div class="inline-block mb-4">
          <span class="px-4 py-2 bg-green-500 bg-opacity-10 border border-green-500 rounded-full text-green-400 text-sm font-mono">🚀 Disponible para proyectos</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight"><span class="gradient-text">Branco </span>Blunda</h1>
        <h2 class="text-2xl md:text-3xl text-gray-300 mb-6 font-light">Software Engineer | Full Stack &amp; IA</h2>
        <p class="text-lg md:text-xl text-gray-400 mb-6 max-w-2xl">
          Construyo sistemas que <span class="text-green-400 font-semibold">llegan a producción</span> y usa gente real:
          agentes de voz y de <span class="text-blue-400 font-semibold">WhatsApp</span>, SaaS multi-empresa y apps móviles publicadas.
        </p>
        <p class="text-gray-500 mb-10 max-w-2xl">Desarrollo software desde 2017. Rosario, Argentina · Trabajo remoto.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#portafolio" class="btn-primary"><i class="fas fa-folder-open mr-2"></i>Ver proyectos</a>
          <a href="#contacto" class="btn-secondary"><i class="fas fa-comments mr-2"></i>Hablemos</a>
        </div>
        <div class="flex gap-6 mt-10 justify-center md:justify-start">
          <a href="${GITHUB}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub"><i class="fab fa-github text-2xl"></i></a>
          <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin text-2xl"></i></a>
          <a href="${WA}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp"><i class="fab fa-whatsapp text-2xl"></i></a>
          <a href="mailto:${MAIL}" class="social-icon" aria-label="Email"><i class="fas fa-envelope text-2xl"></i></a>
        </div>
      </div>
      <div class="flex-1 flex justify-center">
        <div class="profile-container">
          <img src="assets/images/foto.jpg" alt="Branco Blunda - Software Engineer" class="profile-image" loading="eager" width="800" height="800">
          <div class="profile-glow"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="px-6 pb-16">
  <div class="container mx-auto">
    <div class="proof-bar">
      <div><strong>40+</strong><span>proyectos</span></div>
      <div><strong>25</strong><span>reseñas de clientes</span></div>
      <div><strong>#1</strong><span>Workana Argentina 2026</span></div>
      <div><strong>4</strong><span>apps en tiendas</span></div>
      <div><strong>8.900+</strong><span>usuarios</span></div>
      <div><strong>Meta</strong><span>proveedor verificado</span></div>
    </div>
  </div>
</section>

<section id="servicios" class="py-20 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">Qué hago</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Software que resuelve un problema concreto del negocio y queda funcionando.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${SERVICIOS.map(s=>`<div class="service-card">
        <div class="service-icon bg-gradient-to-br ${s[1]}"><i class="${s[0]} text-3xl"></i></div>
        <h3 class="text-2xl font-bold mb-4">${esc(s[2])}</h3>
        <p class="text-gray-400 mb-6">${esc(s[3])}</p>
        <ul class="space-y-2 text-sm text-gray-500">${s[4].map(i=>`<li><i class="fas fa-check text-green-400 mr-2"></i>${esc(i)}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </div>
</section>

<section id="portafolio" class="py-20 px-6">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">Proyectos destacados</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Ocho de más de cuarenta. Cada uno con el problema, lo que construí y capturas del sistema real.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${PROJECTS.map(p=>`<div class="project-card">
        <a href="proyectos/${p.slug}.html" class="project-image-container">
          ${shot(p.slug,p.cover,p.title,0,'project-image')}
          <div class="project-overlay"><i class="fas fa-arrow-right text-3xl"></i></div>
        </a>
        <div class="p-6">
          <div class="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">${esc(p.cliente)} · ${esc(p.pais)}</div>
          <h3 class="text-2xl font-bold mb-3">${esc(p.title)}</h3>
          <p class="text-gray-400 mb-4">${esc(SHORT[p.slug]||'')}</p>
          <div class="flex flex-wrap gap-2 mb-4">${chips(p).map(c=>`<span class="tech-tag">${esc(c)}</span>`).join('')}</div>
          <a href="proyectos/${p.slug}.html" class="text-blue-400 hover:text-blue-300 transition font-semibold"><i class="fas fa-arrow-right mr-1"></i> Ver el caso completo</a>
        </div>
      </div>`).join('')}
    </div>
    <div class="mt-12 text-center">
      <button class="btn-secondary" id="toggle-otros" aria-expanded="false" aria-controls="otros-list"><i class="fas fa-plus mr-2"></i>Ver otros trabajos</button>
      <div id="otros-list" hidden class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
        ${OTHERS.map(o=>`<div class="glass-card p-6">
          <h4 class="text-lg font-bold mb-1">${esc(o[0])}</h4>
          <p class="text-xs font-mono text-gray-500 mb-3">${esc(o[1])}</p>
          <p class="text-gray-400 text-sm">${esc(o[2])}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>`;

idx+=`
<section id="metodo" class="py-20 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">Cómo trabajo</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Sin sorpresas: se define, se entrega por partes y se prueba.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      ${METHOD.map((m,i)=>`<div class="glass-card p-6">
        <div class="text-3xl font-bold gradient-text mb-3">0${i+1}</div>
        <h3 class="text-lg font-bold mb-2">${esc(m[0])}</h3>
        <p class="text-gray-400 text-sm">${esc(m[1])}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section id="tecnologias" class="py-20 px-6">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">Stack tecnológico</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Lo que uso todos los días para construir y sostener estos sistemas.</p>
    </div>
    ${STACK.map((s,i)=>`<div class="mb-10">
      <h3 class="text-xl font-bold mb-5 text-center ${['text-green-400','text-blue-400','text-purple-400'][i%3]}">${esc(s[0])}</h3>
      <div class="flex flex-wrap justify-center gap-4">${s[1].split('|').map(c=>`<span class="tech-badge">${esc(c)}</span>`).join('')}</div>
    </div>`).join('')}
  </div>
</section>

<section id="contacto" class="py-20 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto max-w-4xl">
    <div class="text-center mb-16">
      <h2 class="section-title">Hablemos de tu proyecto</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">¿Tenés un problema que se resuelve con software? Contame y lo charlamos.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fas fa-envelope text-green-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">Email</p>
              <a href="mailto:${MAIL}" class="text-base font-semibold hover:text-green-400 transition break-all">${MAIL}</a></div>
          </div>
        </div>
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fab fa-whatsapp text-blue-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">WhatsApp</p>
              <a href="${WA}" target="_blank" rel="noopener" class="text-lg font-semibold hover:text-blue-400 transition">+54 341 271-4751</a></div>
          </div>
        </div>
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fab fa-linkedin text-purple-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">LinkedIn</p>
              <a href="${LINKEDIN}" target="_blank" rel="noopener" class="text-lg font-semibold hover:text-purple-400 transition">linkedin.com/in/brancoblunda</a></div>
          </div>
        </div>
      </div>
      <div class="glass-card p-8 bg-gradient-to-br from-green-500 to-blue-600 bg-opacity-10">
        <h3 class="text-2xl font-bold mb-4">¿Empezamos?</h3>
        <p class="text-gray-300 mb-6">Contame el problema y te devuelvo una propuesta concreta en menos de 24 horas.</p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-3"><i class="fas fa-check-circle text-green-400"></i><span>Primera charla sin costo</span></li>
          <li class="flex items-center gap-3"><i class="fas fa-check-circle text-green-400"></i><span>Propuesta técnica y alcance por escrito</span></li>
          <li class="flex items-center gap-3"><i class="fas fa-check-circle text-green-400"></i><span>Entregas por hitos, ves avances desde el principio</span></li>
        </ul>
        <a href="${WA}?text=Hola%20Branco,%20te%20escribo%20por%20un%20proyecto" target="_blank" rel="noopener"
           class="inline-block w-full text-center px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition">
          <i class="fab fa-whatsapp mr-2"></i> Escribime por WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>`;

idx+=foot(0);
fs.writeFileSync('index.html',idx);

/* ---------- paginas de caso ---------- */
if(!fs.existsSync('proyectos'))fs.mkdirSync('proyectos');
PROJECTS.forEach(p=>{
let h=head(p.title+' | Branco Blunda',p.desc.slice(0,155),SITE+'/proyectos/'+p.slug+'.html',1);
h+=`
<section class="pt-32 pb-12 px-6">
  <div class="container mx-auto max-w-5xl">
    <a href="../index.html#portafolio" class="text-gray-400 hover:text-green-400 transition text-sm font-mono"><i class="fas fa-arrow-left mr-2"></i>Todo el trabajo</a>
    <div class="mt-8">
      <span class="px-4 py-2 bg-green-500 bg-opacity-10 border border-green-500 rounded-full text-green-400 text-xs font-mono">${esc(p.tag)}</span>
      <h1 class="text-4xl md:text-6xl font-bold mt-6 mb-6"><span class="gradient-text">${esc(p.title)}</span></h1>
      <p class="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">${esc(p.desc)}</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      ${[['Cliente',p.cliente],['País',p.pais],['Rol',p.rol],['Estado',p.estado]].map(m=>`<div class="glass-card p-5">
        <p class="text-xs text-gray-500 font-mono uppercase tracking-wider mb-2">${esc(m[0])}</p>
        <p class="font-semibold text-sm">${esc(m[1])}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="py-16 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto max-w-5xl">
    <h2 class="text-3xl font-bold mb-6 text-green-400">El problema</h2>
    <p class="text-lg text-gray-300 leading-relaxed max-w-3xl">${esc(p.problema)}</p>
  </div>
</section>

<section class="py-16 px-6">
  <div class="container mx-auto max-w-5xl">
    <h2 class="text-3xl font-bold mb-8 text-blue-400">Lo que construí</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${p.construido.map(c=>`<li class="glass-card p-5 flex gap-3 items-start"><i class="fas fa-check text-green-400 mt-1"></i><span class="text-gray-300">${esc(c)}</span></li>`).join('')}
    </ul>
  </div>
</section>

${p.stats.length?`<section class="py-16 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto max-w-5xl">
    <h2 class="text-3xl font-bold mb-8 text-purple-400">Resultado</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      ${p.stats.map(s=>`<div class="glass-card p-6 text-center">
        <div class="text-3xl md:text-4xl font-bold gradient-text mb-2">${esc(s[0])}</div>
        <p class="text-gray-400 text-sm">${esc(s[1])}</p></div>`).join('')}
    </div>
    ${p.nota?`<p class="text-gray-500 text-sm mt-6 font-mono">${esc(p.nota)}</p>`:''}
  </div>
</section>`:''}

<section class="py-16 px-6">
  <div class="container mx-auto max-w-5xl">
    <h2 class="text-3xl font-bold mb-8">Capturas</h2>
    <div class="gallery">${p.shots.map(s=>gitem(p.slug,s,1)).join('')}</div>
  </div>
</section>

<section class="py-16 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto max-w-5xl">
    <h2 class="text-3xl font-bold mb-8">Stack</h2>
    <div class="flex flex-wrap gap-3">${p.tech.split(' · ').map(t=>`<span class="tech-badge">${esc(t)}</span>`).join('')}</div>
    ${p.links.length?`<div class="flex flex-wrap gap-4 mt-10">${p.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener" class="btn-secondary"><i class="fas fa-external-link-alt mr-2"></i>${esc(l[0])}</a>`).join('')}</div>`:''}
  </div>
</section>

<section class="py-20 px-6 text-center">
  <div class="container mx-auto max-w-3xl">
    <h2 class="text-3xl font-bold mb-4">¿Tenés algo parecido entre manos?</h2>
    <p class="text-gray-400 mb-8">Contame el problema y lo charlamos.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="${WA}?text=Hola%20Branco,%20vi%20el%20caso%20de%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener" class="btn-primary"><i class="fab fa-whatsapp mr-2"></i>Escribime</a>
      <a href="../index.html#portafolio" class="btn-secondary"><i class="fas fa-arrow-left mr-2"></i>Ver otros proyectos</a>
    </div>
  </div>
</section>`;
h+=foot(1);
fs.writeFileSync(path.join('proyectos',p.slug+'.html'),h);});
console.log('OK — index.html + '+PROJECTS.length+' paginas de caso');
