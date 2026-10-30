// Restore a backup made by tools/backup.js into the same Supabase project.
// Run:  node tools/restore.js backups/<folder>
// Safe by design: it only ADDS or OVERWRITES rows that are in the backup (matched by primary key). It never deletes
// anything, so rows created after the backup are left alone. User accounts are not restored (passwords can't be
// exported); people who still have accounts keep them. Needs tools/.env like backup.js.
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const root = path.join(__dirname, '..');
const url = fs.readFileSync(path.join(root, 'src/js/supabase-config.js'), 'utf8').match(/SUPABASE_URL\s*=\s*'([^']+)'/)[1];
const envText = fs.existsSync(path.join(__dirname, '.env')) ? fs.readFileSync(path.join(__dirname, '.env'), 'utf8') : '';
const key = process.env.SUPABASE_SERVICE_KEY || (envText.match(/^\s*SUPABASE_SERVICE_KEY\s*=\s*(\S+)/m) || [])[1];
const dir = process.argv[2] && path.resolve(process.argv[2]);
if (!key || !dir || !fs.existsSync(path.join(dir, 'manifest.json'))) {
  console.error('Usage: node tools/restore.js backups/<folder>   (and tools/.env must hold SUPABASE_SERVICE_KEY)');
  process.exit(1);
}
// New-style sb_secret_ keys go in the apikey header only; old JWT service_role keys also go in Authorization
const H = key.startsWith('sb_') ? { apikey: key } : { apikey: key, Authorization: 'Bearer ' + key };

async function upsert(table, rows) {
  const res = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers: { ...H, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows)
  });
  return res.ok ? null : (await res.text()).slice(0, 160);
}

(async () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const ask = q => new Promise(r => { const i = readline.createInterface({ input: process.stdin, output: process.stdout }); i.question(q, a => { i.close(); r(a); }); });
  console.log(`Backup from ${manifest.created} of ${manifest.url}`);
  if ((await ask('Type RESTORE to copy this backup into the live database: ')).trim() !== 'RESTORE') { console.log('Cancelled.'); return; }

  // Tables depend on each other (characters before their gear, etc). Keep retrying the ones that fail until none can progress.
  let pending = Object.keys(manifest.tables).filter(t => manifest.tables[t] > 0);
  const errors = {};
  for (let pass = 1; pending.length && pass <= 8; pass++) {
    const failed = [];
    for (const t of pending) {
      const rows = JSON.parse(fs.readFileSync(path.join(dir, 'tables', t + '.json'), 'utf8'));
      let err = null;
      for (let i = 0; i < rows.length && !err; i += 200) err = await upsert(t, rows.slice(i, i + 200));
      if (err) { failed.push(t); errors[t] = err; } else { console.log('  restored', t, rows.length); delete errors[t]; }
    }
    if (failed.length === pending.length) break;
    pending = failed;
  }
  for (const t of pending) console.log('  NOT restored', t, '-', errors[t]);

  const sdir = path.join(dir, 'storage');
  if (fs.existsSync(sdir)) {
    const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
    let n = 0;
    for (const f of walk(sdir)) {
      const rel = path.relative(sdir, f).split(path.sep);
      const res = await fetch(`${url}/storage/v1/object/${rel.map(encodeURIComponent).join('/')}`, {
        method: 'POST', headers: { ...H, 'x-upsert': 'true', 'Content-Type': 'application/octet-stream' }, body: fs.readFileSync(f)
      });
      if (res.ok) n++; else console.log('  file failed', rel.join('/'));
    }
    console.log('  restored files', n);
  }
  console.log(pending.length ? '\nDone with problems (see above).' : '\nRestore complete.');
})();
