// Export / import of ONE character or ONE spacecraft as a JSON file kept on the user's own computer.
// Export: reads the record and everything attached to it and downloads a file.
// Import: always creates a NEW record (status Reserve, in the campaign being viewed); it never overwrites.
const EXPORT_FORMAT = 'traveller-app-export';
const EXPORT_VERSION = 1;

// Tables that hang off the record, in the order they are imported (a table other tables point at comes first).
const EXPORT_CONFIG = {
  character: {
    main: 'characters', fk: 'character_id',
    tables: ['character_careers', 'character_associates', 'character_connections', 'character_armour', 'character_weapons',
      'character_augments', 'character_equipment', 'character_comms', 'character_computers', 'character_wounds', 'character_journal'],
    // tables whose new ids the next level needs
    grand: { character_armour: { table: 'character_armour_mods', fk: 'armour_id' },
             character_computers: { table: 'character_computer_software', fk: 'computer_id' } }
  },
  spacecraft: {
    main: 'spacecraft', fk: 'spacecraft_id',
    tables: ['spacecraft_mounts', 'spacecraft_hired_crew', 'spacecraft_systems', 'spacecraft_software', 'spacecraft_sensors',
      'spacecraft_weapons', 'spacecraft_passengers', 'spacecraft_cargo', 'spacecraft_trade_log', 'spacecraft_crew_roles'],
    grand: {}
  }
};
const EXPORT_NEEDS_IDS = ['character_armour', 'character_computers', 'spacecraft_mounts', 'spacecraft_hired_crew'];

function downloadJson(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function exportFileName(kind, name) {
  const safe = (name || kind).replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-') || kind;
  return `${safe}-${kind}-${new Date().toISOString().slice(0, 10)}.json`;
}

async function exportRecord(kind, id) {
  const cfg = EXPORT_CONFIG[kind];
  const { data: main, error } = await supabaseClient.from(cfg.main).select('*').eq('id', id).single();
  if (error || !main) throw new Error('Could not read the ' + kind + ': ' + (error ? error.message : 'not found'));
  const tables = {};
  for (const t of cfg.tables) {
    const { data, error: e } = await supabaseClient.from(t).select('*').eq(cfg.fk, id);
    if (e) throw new Error('Could not read ' + t + ': ' + e.message);
    tables[t] = data || [];
  }
  for (const [parent, g] of Object.entries(cfg.grand)) {
    const ids = tables[parent].map(r => r.id);
    if (!ids.length) { tables[g.table] = []; continue; }
    const { data, error: e } = await supabaseClient.from(g.table).select('*').in(g.fk, ids);
    if (e) throw new Error('Could not read ' + g.table + ': ' + e.message);
    tables[g.table] = data || [];
  }
  const file = { format: EXPORT_FORMAT, version: EXPORT_VERSION, kind, exported_at: new Date().toISOString(), name: main.name || '', data: { main, tables } };
  downloadJson(file, exportFileName(kind, main.name));
  return file;
}

// Create a new record from an export file. Returns { id, name }.
async function importRecord(kind, file, userId, campaignId) {
  const cfg = EXPORT_CONFIG[kind];
  if (!file || file.format !== EXPORT_FORMAT) throw new Error('This is not a Traveller app export file.');
  if (file.kind !== kind) throw new Error('This file holds a ' + file.kind + ', not a ' + kind + '.');
  if (!(file.version >= 1) || file.version > EXPORT_VERSION) throw new Error('This file was made by a newer version of the app (version ' + file.version + ').');
  if (!file.data || !file.data.main) throw new Error('The file has no ' + kind + ' in it.');

  const main = { ...file.data.main };
  ['id', 'created_at', 'updated_at'].forEach(k => delete main[k]);
  main.status = 'reserve';
  if (campaignId) main.campaign_id = campaignId; else delete main.campaign_id;
  if (kind === 'character') {
    main.user_id = userId;
    main.onboard = false;
    main.onboard_ship_id = null;
  }
  const { data: created, error } = await supabaseClient.from(cfg.main).insert(main).select().single();
  if (error) throw new Error('Could not create the ' + kind + ': ' + error.message);

  const map = {};   // old id -> new id, per table
  const tables = file.data.tables || {};
  const prep = (t, r, fk, parentId) => {
    const row = { ...r };
    ['id', 'created_at'].forEach(k => delete row[k]);
    row[fk] = parentId;
    if (t === 'character_connections') row.other_character_id = null;
    if (t === 'character_journal') row.user_id = userId;
    if (t === 'spacecraft_weapons') row.mount_id = (map.spacecraft_mounts || {})[r.mount_id] || null;
    if (t === 'spacecraft_crew_roles') {
      row.character_id = null;   // characters belong to the old campaign; NPC crew carry over
      row.hired_crew_id = (map.spacecraft_hired_crew || {})[r.hired_crew_id] || null;
    }
    return row;
  };
  const insertAll = async (t, rows, fk, parentFor) => {
    if (!rows.length) return;
    const prepared = rows.map(r => prep(t, r, fk, parentFor(r)));
    const needIds = EXPORT_NEEDS_IDS.includes(t);
    const q = supabaseClient.from(t).insert(prepared);
    const { data, error: e } = needIds ? await q.select('id') : await q;
    if (e) throw new Error(t + ': ' + e.message);
    if (needIds) { map[t] = {}; rows.forEach((r, i) => { map[t][r.id] = data[i].id; }); }
  };

  try {
    for (const t of cfg.tables) await insertAll(t, tables[t] || [], cfg.fk, () => created.id);
    for (const [parent, g] of Object.entries(cfg.grand)) {
      await insertAll(g.table, tables[g.table] || [], g.fk, r => (map[parent] || {})[r[g.fk]]);
    }
  } catch (e) {
    await supabaseClient.from(cfg.main).delete().eq('id', created.id);   // leave nothing half-imported
    throw new Error('Import failed and was rolled back. ' + e.message);
  }
  return { id: created.id, name: created.name || '' };
}

// Export button on a record page.
async function exportCurrent(kind, id, btn) {
  const label = btn.textContent;
  btn.disabled = true; btn.textContent = 'Exporting…';
  try { await exportRecord(kind, id); }
  catch (e) { alert('Export failed: ' + e.message); }
  btn.disabled = false; btn.textContent = label;
}
