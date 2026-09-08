/* Verifica que sigan vivos todos los links externos del sitio.
   Uso:  node verificar-links.js            */
const https = require('https'), http = require('http'), fs = require('fs'), path = require('path');

const archivos = ['index.html', ...fs.readdirSync('proyectos').filter(f => f.endsWith('.html')).map(f => path.join('proyectos', f))];
const urls = new Set();
for (const f of archivos) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const u = m[1];
    if (/wa\.me|fonts\.|cdn\.|cdnjs|jsdelivr|formsubmit/.test(u)) continue;
    urls.add(u.split('?text=')[0]);
  }
}
const probar = u => new Promise(res => {
  const lib = u.startsWith('https') ? https : http;
  const req = lib.request(u, { method: 'GET', timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
    let n = 0; r.on('data', d => { n += d.length; if (n > 3000) r.destroy(); });
    r.on('close', () => res({ u, code: r.statusCode }));
  });
  req.on('timeout', () => { req.destroy(); res({ u, code: 'TIMEOUT' }); });
  req.on('error', e => res({ u, code: 'ERROR', msg: e.code || e.message }));
  req.end();
});
(async () => {
  console.log(`Verificando ${urls.size} links...\n`);
  const rotos = [];
  for (const u of [...urls].sort()) {
    const r = await probar(u);
    // 403 en sitios con anti-bot (Workana, LinkedIn) no significa roto
    const antibot = /workana\.com|linkedin\.com/.test(u) && r.code === 403;
    const ok = (typeof r.code === 'number' && r.code < 400) || antibot;
    console.log(`${ok ? '  OK  ' : ' ROTO '} ${String(antibot ? '403*' : r.code).padEnd(8)} ${u}${r.msg ? '  (' + r.msg + ')' : ''}`);
    if (!ok) rotos.push(`${r.code} ${u}`);
  }
  console.log(rotos.length ? `\n>>> ${rotos.length} LINK(S) ROTO(S):\n` + rotos.join('\n') : '\n>>> Todos los links funcionan.');
  console.log('\n(403* = el sitio bloquea programas automáticos pero el link anda en un navegador)');
})();
