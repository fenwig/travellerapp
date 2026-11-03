// Combat figures for a ship's Fleet card: crew skills and characteristic DMs turned into the rolls for each step of
// ship to ship combat (Core Rulebook p.164-171, as set out on the Spacecraft Combat page).
//
// fleetCombat(ship, ctx) -> the card's figures.
//   ship  a spacecraft row
//   ctx   { roles: spacecraft_crew_roles rows, chars: { id: character row }, hired: { id: hired crew row },
//           mounts: spacecraft_mounts rows, weapons: spacecraft_weapons rows, software: spacecraft_software rows }
// Needs SENSOR_GRADES and CRIT_EFFECTS (js/ship-data.js).

// Characteristic score -> DM (the same table the Character Record uses)
function statDm(v) {
  v = v || 0;
  return v === 0 ? -3 : v <= 2 ? -2 : v <= 5 ? -1 : v <= 8 ? 0 : v <= 11 ? 1 : v <= 14 ? 2 : 3;
}
const STAT_COLUMN = { STR: 'str', DEX: 'dex', END: 'end_stat', INT: 'int_stat', EDU: 'edu', SOC: 'soc' };

// A character's level in a skill: the exact specialty if they have it, a plain entry if the skill has no
// specialties, 0 in other specialties of a skill they know, and null (untrained, DM-3) otherwise.
function skillLevel(skills, name, spec) {
  const list = Object.values(skills || {}).filter(s => (s.name || '').toLowerCase() === name.toLowerCase());
  if (!list.length) return null;
  const exact = spec && list.find(s => (s.specialty || '').toLowerCase() === spec.toLowerCase());
  if (exact) return parseInt(exact.level) || 0;
  const plain = list.find(s => !s.specialty);
  if (plain) return parseInt(plain.level) || 0;
  return 0;
}

// Crew posts and the skill each one rolls: [role, skill, specialty, characteristic]
const FLEET_CHECKS = {
  pilot:     ['Pilot', null, 'DEX'],            // specialty depends on the hull size
  gunner:    ['Gunner', 'Turret', 'DEX'],
  bayGunner: ['Gunner', 'Capital', 'DEX'],
  engPower:  ['Engineer', 'Power', 'EDU'],
  engMDrive: ['Engineer', 'M-drive', 'EDU'],
  engAny:    ['Engineer', null, 'EDU'],
  sensors:   ['Electronics', 'Sensors', 'INT'],
  comms:     ['Electronics', 'Comms', 'EDU'],
  tactics:   ['Tactics', 'Naval', 'INT'],
  leadership:['Leadership', null, 'SOC']
};

function pilotSpecialty(ship) {
  const t = parseFloat(ship.hull_tonnage) || 0;
  // small craft: 100 tons or less with no jump drive; capital ships: over 5,000 tons; everything else is a spacecraft
  return t <= 100 && !ship.jump_drive ? 'Small Craft' : t > 5000 ? 'Capital Ships' : 'Spacecraft';
}

// Hired crew carry their skill level in the role, "Pilot-2"; no number means level 1. Their characteristics are average (DM+0).
function npcLevel(h) {
  const m = /-(\d)\s*$/.exec(h.role || '');
  return m ? parseInt(m[1]) : 1;
}

function fmtDm(n) { return (n >= 0 ? '+' : '−') + Math.abs(n); }

// Everyone assigned to a post, each with their DM for a check
function crewChecks(ship, ctx, roleNames, checkKey) {
  const [skill, spec0, statName] = FLEET_CHECKS[checkKey];
  const spec = checkKey === 'pilot' ? pilotSpecialty(ship) : spec0;
  const out = [];
  (ctx.roles || []).filter(r => roleNames.includes(r.role) && (r.character_id || r.hired_crew_id)).forEach(r => {
    if (r.character_id) {
      const c = ctx.chars[r.character_id];
      if (!c) return;
      const lvl = skillLevel(c.skills, skill, spec);
      const skillDm = lvl == null ? -3 : lvl;
      const stat = statDm(c[STAT_COLUMN[statName]]);
      out.push({ name: c.name, pc: true, skill: skillDm, untrained: lvl == null, stat, statName, dm: skillDm + stat });
    } else {
      const h = ctx.hired[r.hired_crew_id];
      if (!h) return;
      const lvl = npcLevel(h);
      out.push({ name: h.name, pc: false, skill: lvl, untrained: false, stat: 0, statName, dm: lvl });
    }
  });
  const dms = out.map(x => x.dm);
  return {
    list: out, skill, spec, statName,
    best: dms.length ? Math.max(...dms) : null,
    avg: dms.length ? Math.round(dms.reduce((a, b) => a + b, 0) / dms.length * 10) / 10 : null
  };
}

// The best pilot's skill alone (initiative and evasive action use the skill, not the characteristic)
function bestSkill(c) {
  return c.list.length ? Math.max(...c.list.map(x => x.skill)) : null;
}

// Thrust left after drive critical hits
function thrustNow(ship, crits) {
  const base = ship.m_drive || 0, sev = (crits || {})['M-Drive'] || 0;
  return sev >= 5 ? 0 : sev >= 2 ? Math.max(0, base - 1) : base;
}

// How much one weapon, or a mount of the same weapon, hits for. Same weapons in a turret fire together: one roll,
// +1 per damage die for each extra weapon. Barbettes multiply damage by 3; bays by 10, 20 or 100 by size.
function weaponDamage(name, mountType, damage, k) {
  if (!damage) return '—';
  if (/missile|torpedo/i.test(name)) return damage + ' per ' + (/torpedo/i.test(name) ? 'torpedo' : 'missile');
  const m = /^(\d+)D$/.exec(damage);
  if (!m) return damage;
  if (/\bbay\b/i.test(name)) {
    const size = (/\b(small|medium|large)\b/i.exec(name) || [])[1];
    return damage + ' ×' + ({ small: 10, medium: 20, large: 100 }[(size || 'small').toLowerCase()]);
  }
  if (mountType === 'Barbette' || /barbette/i.test(name)) return damage + ' ×3';
  return damage + (k > 1 ? '+' + (k - 1) * parseInt(m[1]) : '');
}

// DM that comes with the weapon itself: beam lasers +4 and pulse lasers +2 in turrets, fixed mounts and barbettes (not bays)
function weaponAttackDm(name, mountType) {
  if (/bay/i.test(name) || !/turret|fixed|barbette/i.test((mountType || '') + ' ' + name)) return 0;
  if (/beam laser/i.test(name)) return 4;
  if (/pulse laser/i.test(name)) return 2;
  return 0;
}

// Missiles or torpedoes a weapon launches in one round: one per rack, 5 per missile barbette, 3 per torpedo barbette;
// bays fire 12/24/120 missiles or 3/6/30 torpedoes by size.
function salvoSize(name, k) {
  const size = ((/\b(small|medium|large)\b/i.exec(name) || [])[1] || '').toLowerCase();
  if (/torpedo bay/i.test(name)) return { small: 3, medium: 6, large: 30 }[size] || 3;
  if (/missile bay/i.test(name)) return { small: 12, medium: 24, large: 120 }[size] || 12;
  if (/torpedo barbette/i.test(name)) return 3;
  if (/missile barbette/i.test(name)) return 5;
  return k;
}

// Attack DMs for the range band and the target's size (the book's attack modifiers table)
const RANGE_BANDS = ['Adjacent', 'Close', 'Short', 'Medium', 'Long', 'Very Long', 'Distant'];
const RANGE_DM = { Short: 1, Long: -2, 'Very Long': -4, Distant: -6 };
function sizeDm(tons) { return Math.min(6, Math.floor((tons || 0) / 1000)); }
// Bay weapons (not missiles or torpedoes): DM-2 against targets of 2,000 tons or less, DM-4 at 100 tons or less
function bayDm(tons) { return tons <= 100 ? -4 : tons <= 2000 ? -2 : 0; }
// Rounds a missile salvo takes to arrive, by the range it was launched from
const MISSILE_FLIGHT = { Adjacent: 0, Close: 0, Short: 0, Medium: 0, Long: 1, 'Very Long': 4, Distant: 10 };

function fleetCombat(ship, ctx) {
  const crits = ship.critical_hits || {};
  const out = { crew: {}, crits };

  const pilot = crewChecks(ship, ctx, ['Pilot'], 'pilot');
  const gunners = crewChecks(ship, ctx, ['Turret Gunner'], 'gunner');
  const bayGunners = crewChecks(ship, ctx, ['Bay Gunner'], 'bayGunner');
  const engPower = crewChecks(ship, ctx, ['Engineer'], 'engPower');
  const engM = crewChecks(ship, ctx, ['Engineer'], 'engMDrive');
  const engAny = crewChecks(ship, ctx, ['Engineer', 'Maintenance'], 'engAny');
  const sensors = crewChecks(ship, ctx, ['Sensor Operator'], 'sensors');
  const comms = crewChecks(ship, ctx, ['Sensor Operator'], 'comms');
  const tactics = crewChecks(ship, ctx, ['Captain'], 'tactics');
  const leader = crewChecks(ship, ctx, ['Captain'], 'leadership');
  Object.assign(out.crew, { pilot, gunners, bayGunners, engPower, engM, engAny, sensors, comms, tactics, leader });

  // Ship figures
  const thrust = thrustNow(ship, crits);
  const grade = (typeof SENSOR_GRADES !== 'undefined' && SENSOR_GRADES[ship.sensor_grade || 'Basic']) || { dm: -4 };
  const sensorCrit = (crits['Sensors'] || 0) >= 1 ? -2 : 0;      // severity 1 and up: all sensor checks DM-2
  out.thrust = thrust; out.thrustBase = ship.m_drive || 0;
  out.sensorGrade = ship.sensor_grade || 'Basic'; out.sensorDm = grade.dm; out.sensorCrit = sensorCrit;

  // 1. Initiative: 2D + Pilot skill + Thrust
  const pilotSkill = bestSkill(pilot);
  out.initiative = { dm: (pilotSkill == null ? 0 : pilotSkill) + thrust, pilotSkill, thrust, manned: pilot.list.length > 0 };

  // 2. Manoeuvre
  out.evasiveDm = pilotSkill == null ? 0 : pilotSkill;
  out.pilotCheckDm = pilot.best;

  // 3. Attack: every weapon mount, one line each
  const mounts = (ctx.mounts || []).slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const weapons = ctx.weapons || [];
  out.attacks = [];
  mounts.forEach(m => {
    for (let inst = 1; inst <= (m.count || 1); inst++) {
      const here = weapons.filter(w => w.mount_id === m.id && w.instance === inst).sort((a, b) => a.slot - b.slot);
      if (!here.length) continue;
      const groups = [];
      here.forEach(w => { const g = groups.find(x => x.name === w.name); if (g) g.k++; else groups.push({ name: w.name, k: 1, w }); });
      groups.forEach(g => {
        const bay = /\bbay\b/i.test(g.name);
        const point = /point defence/i.test(g.name);
        out.attacks.push({
          mountType: m.mount_type, name: g.name, k: g.k, instance: inst, mountCount: m.count || 1, range: g.w.range || '—',
          damage: weaponDamage(g.name, m.mount_type, g.w.damage, g.k), traits: g.w.traits && g.w.traits !== '--' ? g.w.traits : '',
          power: g.w.power || 0, bay, point, weaponDm: weaponAttackDm(g.name, m.mount_type),
          dice: /^\d+D$/.test(g.w.damage || '') ? parseInt(g.w.damage) : null,
          flat: 0, mult: 1, ap: parseInt((/\bAP\s*(\d+)/i.exec(g.w.traits || '') || [])[1]) || 0, ion: /\bion\b/i.test(g.w.traits || ''),
          salvo: /missile|torpedo/i.test(g.name) ? salvoSize(g.name, g.k) : 0,
          missile: /missile|torpedo/i.test(g.name), sand: /sandcaster/i.test(g.name), laser: /laser/i.test(g.name)
        });
      });
    }
  });
  // damage multiples and the extra dice for several weapons of one type in a turret
  out.attacks.forEach(a => {
    if (a.missile || a.dice == null) return;
    if (a.bay) a.mult = { small: 10, medium: 20, large: 100 }[((/\b(small|medium|large)\b/i.exec(a.name) || [])[1] || 'small').toLowerCase()];
    else if (a.mountType === 'Barbette' || /barbette/i.test(a.name)) a.mult = 3;
    else a.flat = (a.k - 1) * a.dice;
  });
  out.missileLaunch = out.attacks.filter(a => a.missile).reduce((n, a) => n + a.salvo, 0);
  out.hasLasers = out.attacks.some(a => a.laser && !a.bay);
  out.hasSand = out.attacks.some(a => a.sand);

  // 4. Engineering: repair DM is the engineer's check minus the crit severity
  out.software = (ctx.software || []).map(s => s.name);
  out.autoRepair = out.software.some(n => /auto-?repair/i.test(n));
  out.fireControl = out.software.some(n => /fire control/i.test(n));

  // 5. Sensors
  out.sensorsDm = sensors.best == null ? null : sensors.best + grade.dm + sensorCrit;
  out.sensorsAvg = sensors.avg == null ? null : Math.round((sensors.avg + grade.dm + sensorCrit) * 10) / 10;

  // Damage: sustained damage every 10% of the starting hull
  const hullMax = ship.hull_max || 0;
  out.hull = { cur: ship.hull_current || 0, max: hullMax, step: Math.max(1, Math.ceil(hullMax / 10)) };
  out.armour = ship.armour_current != null ? ship.armour_current : (ship.armour_max || 0);

  // Active critical hit effects
  out.activeCrits = Object.keys(crits).filter(l => crits[l] > 0).map(l => ({
    loc: l, sev: crits[l], effects: ((typeof CRIT_EFFECTS !== 'undefined' && CRIT_EFFECTS[l]) || []).slice(0, crits[l])
  }));
  return out;
}

// 2D location roll for critical hits
const CRIT_LOCATION_BY_ROLL = { 2: 'Sensors', 3: 'Power Plant', 4: 'Fuel', 5: 'Weapon', 6: 'Armour', 7: 'Hull', 8: 'M-Drive', 9: 'Cargo', 10: 'J-Drive', 11: 'Crew', 12: 'Bridge' };

// A new hit on a location: the higher of the new severity and the old +1, to a maximum of 6.
// A location already at 6 cannot rise further and takes 6D extra damage instead (returns { sev, extra6D }).
function applyCritSeverity(old, incoming) {
  old = old || 0;
  if (old >= 6) return { sev: 6, extra6D: true };
  return { sev: Math.min(6, old ? Math.max(incoming, old + 1) : incoming), extra6D: false };
}
