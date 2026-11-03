// Turns a Ship Catalogue entry into the rows the Spacecraft Record stores.
// catalogueToRecord(entry, { campaignId, name, status, withCrew }) -> { ship, software, mounts, weapons, hiredCrew, crewRoles, warnings }
// It only builds the rows; the caller inserts them (ship first, then mounts, then weapons and the rest, which need ids).
// weapons[].mountIndex and weapons[].instance/slot say which mount (index into mounts) each weapon sits in.

// Catalogue crew posts -> the record's crew roles. Posts the record has no role for map to null and are listed as warnings.
const CATALOGUE_ROLE_MAP = {
  Captain: 'Captain', Pilot: 'Pilot', 'Fighter Pilot': 'Pilot', 'Pilot/Astrogator': 'Pilot', Astrogator: 'Astrogator', Engineer: 'Engineer',
  Mechanic: 'Maintenance', Maintenance: 'Maintenance', Medic: 'Medic', Steward: 'Steward', Stewards: 'Steward',
  Gunner: 'Turret Gunner', Marine: 'Marine', Thug: 'Marine', 'Sensor Operator': 'Sensor Operator', Sensop: 'Sensor Operator',
  Officer: 'Officer', 'Executive Officer': 'Officer', 'Executive Officer/Head Scientist': 'Officer', 'Purser/Executive Officer': 'Officer',
  Purser: 'Administrator', Administrator: 'Administrator', Scientist: 'Scientist', 'Small Craft Crew': 'Small Craft Crew'
};
const MOUNT_TYPE_BY_COUNT = { Turret: n => (n >= 3 ? 'Triple Turret' : n === 2 ? 'Double Turret' : 'Single Turret'), Barbette: () => 'Barbette', Fixed: () => 'Fixed Mount' };

// "Triple Turret (beam lasers)" -> "Beam Laser"; plain names such as "Particle Barbette" stay as they are
function weaponName(n) {
  const m = /^(?:Triple|Double|Single) Turrets? \(([^)]*?)s?(?: x\d+)?\)$/i.exec(n || '');
  return m ? m[1].replace(/\b\w/g, c => c.toUpperCase()) : n;
}

function catalogueToRecord(s, opts) {
  opts = opts || {};
  const warnings = [];
  const round = n => Math.round(n * 1000) / 1000;

  // Weapons and mounts
  const mounts = [], weapons = [];
  let weaponPower = 0, mountPower = 0;
  s.weapons.forEach(w => {
    if (!MOUNT_TYPE_BY_COUNT[w.mount]) warnings.push('The record has no "' + w.mount + '" mount: "' + w.name + '" is added as a Fixed Mount');
    const mountType = (MOUNT_TYPE_BY_COUNT[w.mount] || (() => 'Fixed Mount'))(w.perMount || 1);
    const slots = mountType === 'Triple Turret' || mountType === 'Fixed Mount' ? 3 : mountType === 'Double Turret' ? 2 : 1;
    const mountIndex = mounts.length;
    mounts.push({ mount_type: mountType, count: w.count, tl: null, power: w.mountPower || 0 });
    mountPower += w.count * (w.mountPower || 0);
    for (let inst = 1; inst <= w.count; inst++) {
      for (let slot = 1; slot <= Math.min(slots, w.perMount || 0); slot++) {
        const st = w.mixed ? w.mixed[slot - 1] : w.stats;
        if (!st) warnings.push('No weapon stats yet for ' + w.name);
        weapons.push({ mountIndex, instance: inst, slot, name: w.names ? w.names[slot - 1] : weaponName(w.name),
          tl: st ? st.tl : null, range: st ? st.range : null, damage: st ? st.damage : null, power: st ? st.power : 0, traits: st ? st.traits : null });
        weaponPower += st ? st.power : 0;
      }
    }
  });

  // Software: the record's names carry the rating ("Jump Control/2"); bandwidth is the book's table value
  const software = s.software.map(x => ({ name: x.rating != null ? x.name + '/' + x.rating : x.name, bandwidth: x.bw, tl: x.tl, active: false, note: '' }));

  // Crew slots: one empty slot for each post the design needs (NPCs are hired later, by hand or with Hire Full Crew)
  const crewSlots = [];
  s.crew.forEach(c => {
    const role = CATALOGUE_ROLE_MAP[c.role];
    if (!role) warnings.push('No crew role in the record for "' + c.role + '" (x' + c.count + '): no slot added');
    else for (let i = 0; i < c.count; i++) crewSlots.push({ role });
  });

  // Optional (opts.withCrew): the book's posts as NPC crew already filling those slots
  const hiredCrew = [], crewRoles = [];
  // Only when asked for (opts.withCrew): a ship added from the catalogue gets no NPC crew; they are hired by hand
  if (opts.withCrew) s.crew.forEach(c => {
    const role = CATALOGUE_ROLE_MAP[c.role];
    for (let i = 0; i < c.count; i++) {
      hiredCrew.push({ name: c.role + (c.count > 1 ? ' ' + (i + 1) : ''), role: c.role, salary: 0, _recordRole: role || null });
    }
  });
  const single = new Set(['Captain']), used = new Set();
  if (opts.withCrew) hiredCrew.forEach((h, i) => {
    if (!h._recordRole) return;
    if (single.has(h._recordRole) && used.has(h._recordRole)) { warnings.push('Second ' + h._recordRole + ' has no role slot (record allows one)'); return; }
    used.add(h._recordRole);
    crewRoles.push({ role: h._recordRole, hiredIndex: i });
  });

  // Power allocation: five fixed lines, the rest go to the record's labelled "extra" lines (it holds five)
  const extra = (s.powerReq.other || []).map(o => ({ label: o[0], value: o[1] }));
  while (extra.length < 5) extra.push({ label: '', value: 0 });
  if (extra.length > 5) { warnings.push('More than five extra power lines'); extra.length = 5; }

  const ship = {
    ...(opts.campaignId ? { campaign_id: opts.campaignId } : {}),
    name: opts.name || s.name, ship_class: s.cls ? s.name + ', ' + s.cls : s.name, tl: s.tl,
    status: opts.status || 'reserve', catalogue_id: s.id,
    streamlined_status: /^streamlined/i.test(s.hull) ? 'Streamlined' : 'Unstreamlined',
    purchase_value: round(s.purchase),
    hull_tonnage: s.tons, hull_max: s.structure, hull_current: s.structure,
    armour_max: s.armour.value, armour_current: s.armour.value,
    fuel_max: s.fuelTons, fuel_current: s.fuelTons,
    staterooms: s.staterooms, low_berths: s.lowBerths, cargo_max: s.cargo,
    jump_drive: s.jump, m_drive: s.thrust,
    power_plant: s.power, power_current: s.power,
    power_basic: s.powerReq.basic, power_m_drive: s.powerReq.mDrive, power_j_drive: s.powerReq.jDrive,
    power_sensor: s.powerReq.sensors, power_weapons: weaponPower, power_turrets: mountPower,
    power_extra: extra,
    sensor_grade: String(s.sensors).replace(/ Grade$/, ''),   // the record's grades are Basic/Civilian/Military/Improved/Advanced
    computer_processor: s.computerSpec.processor, computer_bis: !!s.computerSpec.bis, computer_fib: !!s.computerSpec.fib,
    fin_maintenance: s.maintenance,
    notes: [s.notes, 'Imported from the Ship Catalogue (' + s.source.book + ' p.' + s.source.page + '). Systems: ' + s.systems.join(', ') +
      (s.craft.length ? '. Craft: ' + s.craft.join(', ') : '') + '.'].filter(Boolean).join('\n')
  };
  if (Math.abs((weaponPower + mountPower) - s.powerReq.weapons) > 0.01 && s.weapons.some(w => w.perMount)) {
    warnings.push('Weapon power ' + (weaponPower + mountPower) + ' differs from the book\'s ' + s.powerReq.weapons);
  }
  // The same warning repeated (e.g. each extra Pilot) is listed once with a count
  const counts = {}; warnings.forEach(w => { counts[w] = (counts[w] || 0) + 1; });
  const tidy = Object.keys(counts).map(w => w + (counts[w] > 1 ? ' (x' + counts[w] + ')' : ''));
  return { ship, software, mounts, weapons, crewSlots, hiredCrew, crewRoles, warnings: tidy };
}

// Writes a catalogue entry to the Spacecraft Record tables (ship first, then the rows that need its ids).
// Returns { ship, warnings }. If anything fails after the ship row exists, the ship (and its rows) is removed again and the error is thrown.
async function addCatalogueShipToRecord(db, s, opts) {
  const r = catalogueToRecord(s, opts);
  const must = (what, res) => { if (res.error) throw new Error(what + ': ' + res.error.message); return res.data; };
  let first = await db.from('spacecraft').insert(r.ship).select().single();
  if (first.error && /catalogue_id/.test(first.error.message)) {   // docs/fleet-status.sql has not been run yet
    const { catalogue_id, ...plain } = r.ship;
    first = await db.from('spacecraft').insert(plain).select().single();
  }
  if (first.error && /status/.test(first.error.message)) first.error.message += ' (run docs/fleet-status.sql in Supabase to allow the Fleet status)';
  const ship = must('Ship', first);
  try {
    const id = ship.id;
    const mounts = r.mounts.length ? must('Mounts', await db.from('spacecraft_mounts')
      .insert(r.mounts.map(m => ({ spacecraft_id: id, mount_type: m.mount_type, count: m.count, tl: m.tl || 0, power: m.power }))).select()) : [];
    if (r.weapons.length) must('Weapons', await db.from('spacecraft_weapons').insert(r.weapons.map(w => ({
      spacecraft_id: id, mount_id: mounts[w.mountIndex].id, instance: w.instance, slot: w.slot, name: w.name,
      tl: w.tl || null, range: w.range || null, damage: w.damage || null, power: w.power || 0, traits: w.traits && w.traits !== '--' ? w.traits : null }))));
    if (r.software.length) must('Software', await db.from('spacecraft_software').insert(r.software.map(x => ({ spacecraft_id: id, ...x }))));
    if (s.systems.length) must('Systems', await db.from('spacecraft_systems').insert(s.systems.map(d => ({ spacecraft_id: id, description: d }))));
    if (r.crewSlots.length && !r.hiredCrew.length) must('Crew slots', await db.from('spacecraft_crew_roles').insert(r.crewSlots.map(c => ({ spacecraft_id: id, role: c.role }))));
    const crew = r.hiredCrew.length ? must('Crew', await db.from('spacecraft_hired_crew')
      .insert(r.hiredCrew.map(h => ({ spacecraft_id: id, name: h.name, role: h.role, salary: h.salary }))).select()) : [];
    if (r.crewRoles.length) must('Crew roles', await db.from('spacecraft_crew_roles')
      .insert(r.crewRoles.map(c => ({ spacecraft_id: id, role: c.role, hired_crew_id: crew[c.hiredIndex].id }))));
  } catch (e) {
    await db.from('spacecraft').delete().eq('id', ship.id);
    throw e;
  }
  return { ship, warnings: r.warnings };
}
