// Full backup of the Traveller app's Supabase project: every table, the user list and the stored files.
// Run:  node tools/backup.js
// Needs tools/.env containing:  SUPABASE_SERVICE_KEY=<the service_role key from Supabase → Project Settings → API>
// The key stays on your computer (.env files are git-ignored). Backups go to backups/<date>/ (also git-ignored).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const url = fs.readFileSync(path.join(root, 'src/js/supabase-config.js'), 'utf8').match(/SUPABASE_URL\s*=\s*'([^']+)'/)[1];
const key = readKey();
// New-style sb_secret_ keys go in the apikey header only; old JWT service_role keys also go in Authorization
const H = key.startsWith('sb_') ? { apikey: key } : { apikey: key, Authorization: 'Bearer ' + key };

function readKey() {
  const file = path.join(__dirname, '.env');
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const m = text.match(/^\s*SUPABASE_SERVICE_KEY\s*=\s*(\S+)/m);
  const k = process.env.SUPABASE_SERVICE_KEY || (m && m[1]);
  if (!k) { console.error('No key found. Create tools/.env with a line:  SUPABASE_SERVICE_KEY=...'); process.exit(1); }
  return k;
}

async function getJson(u, opts = {}) {
  const res = await fetch(u, { ...opts, headers: { ...H, ...(opts.headers || {}) } });
  if (!res.ok) throw new Error(res.status + ' ' + (await res.text()).slice(0, 200));
  return res;
}

async function backupTable(name, dir) {
  const rows = [];
  const page = 1000;
  for (let from = 0; ; from += page) {
    const res = await getJson(`${url}/rest/v1/${encodeURIComponent(name)}?select=*`, { headers: { Range: `${from}-${from + page - 1}`, 'Range-Unit': 'items' } });
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < page) break;
  }
  // cross-check the row count so a silently short copy is noticed
  const head = await getJson(`${url}/rest/v1/${encodeURIComponent(name)}?select=*`, { method: 'HEAD', headers: { Prefer: 'count=exact', Range: '0-0', 'Range-Unit': 'items' } });
  const total = parseInt((head.headers.get('content-range') || '').split('/')[1]);
  fs.writeFileSync(path.join(dir, 'tables', name + '.json'), JSON.stringify(rows, null, 1));
  return { rows: rows.length, expected: isNaN(total) ? null : total };
}

async function backupUsers(dir) {
  const users = [];
  for (let pg = 1; ; pg++) {
    const body = await (await getJson(`${url}/auth/v1/admin/users?page=${pg}&per_page=1000`)).json();
    users.push(...(body.users || []));
    if ((body.users || []).length < 1000) break;
  }
  fs.writeFileSync(path.join(dir, 'auth-users.json'), JSON.stringify(users, null, 1));
  return users.length;
}

async function listObjects(bucket, prefix, out) {
  for (let offset = 0; ; offset += 1000) {
    const items = await (await getJson(`${url}/storage/v1/object/list/${bucket}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix, limit: 1000, offset })
    })).json();
    for (const it of items) {
      if (it.id) out.push(prefix + it.name); else await listObjects(bucket, prefix + it.name + '/', out);
    }
    if (items.length < 1000) break;
  }
}

async function backupStorage(dir) {
  const buckets = await (await getJson(`${url}/storage/v1/bucket`)).json();
  let files = 0;
  for (const b of buckets) {
    const names = [];
    await listObjects(b.name, '', names);
    for (const n of names) {
      const res = await getJson(`${url}/storage/v1/object/${b.name}/${n.split('/').map(encodeURIComponent).join('/')}`);
      const dest = path.join(dir, 'storage', b.name, n);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      files++;
    }
  }
  return { buckets: buckets.map(b => b.name), files };
}

(async () => {
  const stamp = new Date().toISOString().slice(0, 16).replace('T', '_').replace(':', '');
  const dir = path.join(root, 'backups', stamp);
  fs.mkdirSync(path.join(dir, 'tables'), { recursive: true });
  console.log('Backing up', url, '->', dir);

  const spec = await (await getJson(`${url}/rest/v1/`)).json();
  fs.writeFileSync(path.join(dir, 'schema.json'), JSON.stringify(spec.definitions || {}, null, 1));
  const manifest = { created: new Date().toISOString(), url, tables: {}, problems: [] };

  for (const name of Object.keys(spec.definitions || {})) {
    try {
      const r = await backupTable(name, dir);
      manifest.tables[name] = r.rows;
      const flag = r.expected != null && r.expected !== r.rows ? `  !! expected ${r.expected}` : '';
      if (flag) manifest.problems.push(`${name}: got ${r.rows}, expected ${r.expected}`);
      console.log(' ', name.padEnd(34), r.rows + ' rows' + flag);
    } catch (e) { manifest.problems.push(`${name}: ${e.message}`); console.log(' ', name, 'FAILED', e.message); }
  }
  try { manifest.authUsers = await backupUsers(dir); console.log('  auth users'.padEnd(36), manifest.authUsers); }
  catch (e) { manifest.problems.push('auth users: ' + e.message); console.log('  auth users FAILED', e.message); }
  try { manifest.storage = await backupStorage(dir); console.log('  stored files'.padEnd(36), manifest.storage.files); }
  catch (e) { manifest.problems.push('storage: ' + e.message); console.log('  storage FAILED', e.message); }

  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 1));
  console.log(manifest.problems.length ? '\nFinished WITH PROBLEMS:\n  ' + manifest.problems.join('\n  ') : '\nBackup complete, no problems.');
})().catch(e => { console.error('Backup failed:', e.message); process.exit(1); });
