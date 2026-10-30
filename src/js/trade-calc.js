// Shared rules + helpers for the Passenger / Freight / Mail calculators.
// Source: Traveller Core Rulebook (2022 update), Trade chapter pp.238–241.

const TC = {
  // Passage and Freight table (p.238), by parsecs travelled
  FARES: {
    1: { high: 9000,   middle: 6500,   basic: 2000,  low: 700,   freight: 1000 },
    2: { high: 14000,  middle: 10000,  basic: 3000,  low: 1300,  freight: 1600 },
    3: { high: 21000,  middle: 14000,  basic: 5000,  low: 2200,  freight: 2600 },
    4: { high: 34000,  middle: 23000,  basic: 8000,  low: 3900,  freight: 4400 },
    5: { high: 60000,  middle: 40000,  basic: 14000, low: 7200,  freight: 8500 },
    6: { high: 210000, middle: 130000, basic: 55000, low: 27000, freight: 32000 }
  },

  // Number of D6 rolled for a given 2D+DM total (index = total, 20+ = 10D)
  PASSENGER_DICE: [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,7,8,9,10],   // p.239
  FREIGHT_DICE:   [0,0,1,1,2,2,3,3,3,4,4,4,5,5,5,6,6,7,8,9,10],   // p.241

  diceFor(table, total) {
    if (total <= 1) return 0;
    return table[Math.min(total, 20)];
  },

  d6() { return Math.floor(Math.random() * 6) + 1; },
  rollDice(n) { const r = []; for (let i = 0; i < n; i++) r.push(TC.d6()); return r; },
  sum(a) { return a.reduce((x, y) => x + y, 0); },
  signed(n) { return (n >= 0 ? '+' : '−') + Math.abs(n); },
  cr(n) { return 'Cr' + n.toLocaleString('en-US'); },

  // ── World DMs (each returns [[label, dm], ...]) ──
  passengerWorldDMs(w, name) {
    const pop = w.pop <= 1 ? -4 : w.pop >= 8 ? 3 : w.pop >= 6 ? 1 : 0;
    return TC._worldDMs(w, name, pop, { amber: 1, red: -4 }, false);
  },
  freightWorldDMs(w, name) {
    const pop = w.pop <= 1 ? -4 : w.pop >= 8 ? 4 : w.pop >= 6 ? 2 : 0;
    return TC._worldDMs(w, name, pop, { amber: -2, red: -6 }, true);
  },
  _worldDMs(w, name, pop, zone, withTL) {
    const port = { A: 2, B: 1, C: 0, D: 0, E: -1, X: -3 }[w.port] || 0;
    const rows = [
      [name + ' population ' + w.pop, pop],
      [name + ' starport ' + w.port, port],
      [name + ' ' + w.zone + ' zone', w.zone === 'Amber' ? zone.amber : w.zone === 'Red' ? zone.red : 0]
    ];
    if (withTL) rows.push([name + ' tech level ' + w.tl, w.tl <= 6 ? -1 : w.tl >= 9 ? 2 : 0]);
    return rows;
  },
  distanceDM(parsecs) { return [['Distance ' + parsecs + ' parsec' + (parsecs > 1 ? 's' : '') + ' (−1 per parsec past the first)', -(parsecs - 1)]]; },

  // ── Skill check (Average 8+): 2D + skill + characteristic DM − 8 = effect ──
  skillCheck(skill, level, charDM) {
    const dice = [TC.d6(), TC.d6()];
    const total = TC.sum(dice) + level + charDM;
    return { dice, total, effect: total - 8, text:
      skill + ' check: 2D [' + dice.join('+') + '] ' + TC.signed(level) + ' skill ' + TC.signed(charDM) +
      ' characteristic = ' + total + ' vs 8+ → Effect ' + TC.signed(total - 8) };
  },

  // ── HTML builders ──
  opts(list, sel) {
    return list.map(v => '<option' + (String(v) === String(sel) ? ' selected' : '') + '>' + v + '</option>').join('');
  },
  // ── World profile (UWP), e.g. A9B2887-A: Starport, Size, Atmosphere, Hydrographics,
  //    Population, Government, Law Level, then Tech Level (extended hex, no I or O) ──
  EHEX: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
  parseUWP(text) {
    const m = /^\s*([ABCDEX])([0-9A-HJ-NP-Z])([0-9A-HJ-NP-Z])([0-9A-HJ-NP-Z])([0-9A-HJ-NP-Z])([0-9A-HJ-NP-Z])([0-9A-HJ-NP-Z])\s*-?\s*([0-9A-HJ-NP-Z])\s*$/i.exec(text || '');
    if (!m) return null;
    const v = c => TC.EHEX.indexOf(c.toUpperCase());
    return { port: m[1].toUpperCase(), size: v(m[2]), atmo: v(m[3]), hydro: v(m[4]),
             pop: v(m[5]), gov: v(m[6]), law: v(m[7]), tl: v(m[8]) };
  },
  uwpShow(id) {
    const out = document.getElementById(id + '-uwp-text');
    if (!out) return;
    const w = TC.parseUWP(document.getElementById(id + '-uwp').value);
    if (!w) { out.style.color = '#ff5a4a'; out.textContent = 'Not a valid profile (example: A9B2887-A)'; return; }
    out.style.color = '#4a9ab8';
    out.textContent = 'Starport ' + w.port + ' · Size ' + w.size + ' · Atmosphere ' + w.atmo + ' · Hydro ' + w.hydro +
      ' · Pop ' + w.pop + ' · Govt ' + w.gov + ' · Law ' + w.law + ' · TL ' + w.tl;
  },
  // Fill a "where we are now" world block from the active ship's Current World (Spacecraft Record).
  // If the ship has none set, the block stays editable. Returns { name, uwp } or null.
  async hereWorld(id) {
    try {
      const s = await TC.activeShip().catch(() => null);
      const name = document.getElementById(id + '-name'), uwp = document.getElementById(id + '-uwp');
      if (!s || !s.current_world_uwp) {
        // no world on this ship (or the ship was just changed): make the block editable again
        [name, uwp].forEach(el => { if (el) { el.readOnly = false; el.style.opacity = ''; el.title = ''; } });
        return null;
      }
      name.value = s.current_world_name || ''; uwp.value = s.current_world_uwp;
      [name, uwp].forEach(el => { el.readOnly = true; el.style.opacity = '0.75'; el.title = 'Set on the Spacecraft Record (Current World)'; });
      TC.uwpShow(id);
      return { name: s.current_world_name || '', uwp: s.current_world_uwp };
    } catch (e) { return null; }
  },
  // Collapsed "how this was worked out" box: dice, modifiers and formulas stay out of sight until it is opened.
  // lines: html strings; rows: optional modifier list [[label, dm], ...]
  workings(lines, rows) {
    const mods = rows && rows.length
      ? '<div>Modifiers (' + TC.signed(TC.sum(rows.map(r => r[1]))) + '):</div>' +
        rows.map(r => '<div style="padding-left:12px">' + r[0] + ': <b>' + TC.signed(r[1]) + '</b></div>').join('')
      : '';
    return '<details class="dm-detail"><summary>How this was worked out</summary>' +
      lines.filter(Boolean).map(l => '<div>' + l + '</div>').join('') + mods + '</details>';
  },
  uwpRefresh() { document.querySelectorAll('[id$="-uwp"]').forEach(el => TC.uwpShow(el.id.slice(0, -4))); },
  worldBlock(id, title) {
    return '<div class="calc-block calc-row"><div class="calc-block-title">' + title + '</div><div class="calc-fields">' +
      '<label>World<input type="text" id="' + id + '-name" placeholder="name" style="width:120px" /></label>' +
      '<label>Profile (UWP)<input type="text" id="' + id + '-uwp" value="C566777-8" maxlength="10" style="width:105px;text-transform:uppercase" oninput="TC.uwpShow(\'' + id + '\')" /></label>' +
      '<label>Zone<select id="' + id + '-zone">' + TC.opts(['Green','Amber','Red'], 'Green') + '</select></label>' +
      '<span id="' + id + '-uwp-text" class="calc-note uwp-decoded" style="margin:0"></span>' +
      '</div></div>';
  },
  readWorld(id) {
    const w = TC.parseUWP(document.getElementById(id + '-uwp').value);
    if (!w) {
      const msg = 'The world profile is not valid. Enter it like A9B2887-A (Starport, Size, Atmosphere, Hydrographics, Population, Government, Law Level, then -Tech Level).';
      alert(msg); throw new Error(msg);
    }
    w.zone = document.getElementById(id + '-zone').value;
    return w;
  },
  num(id) { const el = document.getElementById(id); return el ? parseInt(el.value, 10) || 0 : 0; },

  dmList(rows) {
    return '<details class="dm-detail"><summary>Modifiers (' + TC.signed(TC.sum(rows.map(r => r[1]))) + ')</summary>' +
      rows.map(r => '<div>' + r[0] + ': <b>' + TC.signed(r[1]) + '</b></div>').join('') + '</details>';
  },

  // ── Transfer to the active spacecraft record ──
  transferBlock(p, fn) {
    p = p || 'xfer'; fn = fn || 'transferToShip';
    return '<div class="calc-block calc-row"><div class="calc-block-title">Transfer to Ship</div>' +
      '<div class="calc-actions" style="margin:0"><button class="btn-primary" id="' + p + '-btn" onclick="' + fn + '()">Transfer to Active Spacecraft</button>' +
      ' <span id="' + p + '-msg" class="calc-note" style="margin:0 0 0 10px"></span></div></div>';
  },
  // ── Which active ship the calculators work on (any number of ships can be Active) ──
  _shipKey: null,
  async activeShips() {
    const cid = await currentCampaignId();
    TC._shipKey = 'tc-ship-' + (cid || 'none');
    const { data, error } = await inCampaign(supabaseClient.from('spacecraft')
      .select('id,name,cargo_max,m_drive,current_world_name,current_world_uwp').eq('status', 'active').order('name'), cid);
    if (error) throw error;
    return data || [];
  },
  // The ship chosen in the dropdown (remembered in this browser), else the first active ship.
  async activeShip() {
    const ships = await TC.activeShips();
    if (!ships.length) throw new Error('There is no active spacecraft. Set one to Active on the Roster first.');
    let id = null;
    try { id = localStorage.getItem(TC._shipKey); } catch (e) {}
    return ships.find(s => s.id === id) || ships[0];
  },
  // Fill every <select class="ship-select"> on the page with the active ships, showing the chosen one.
  async fillShipSelects() {
    let ships = [], cur = null;
    try { ships = await TC.activeShips(); cur = (await TC.activeShip()).id; } catch (e) {}
    document.querySelectorAll('select.ship-select').forEach(sel => {
      sel.innerHTML = ships.length
        ? ships.map(s => '<option value="' + s.id + '"' + (s.id === cur ? ' selected' : '') + '>' + s.name + '</option>').join('')
        : '<option value="">No active ship</option>';
    });
  },
  async shipChosen(id, onChange) {
    await TC.activeShips();
    try { localStorage.setItem(TC._shipKey, id); } catch (e) {}
    await TC.fillShipSelects();   // keeps every ship dropdown on the page in step
    if (onChange) onChange();
  },
  // Ship dropdown under the page title; onChange runs after the choice changes.
  async shipPicker(onChange) {
    const host = document.querySelector('.page-main');
    if (!host) return;
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;align-items:center;gap:10px;margin:0 0 16px;';
    bar.innerHTML = '<label style="font-size:0.7rem;color:#4a9ab8;text-transform:uppercase;letter-spacing:0.08em">Ship</label>' +
      '<select class="ship-select" style="margin:0;width:auto;background:#080d12;border:1px solid #0a4a60;color:#00e5ff;border-radius:4px;padding:6px 10px;font-size:0.9rem;min-width:220px"></select>';
    const title = host.querySelector('.page-title');
    if (title) title.after(bar); else host.prepend(bar);
    bar.querySelector('select').addEventListener('change', e => TC.shipChosen(e.target.value, onChange));
    await TC.fillShipSelects();
  },
  xferMsg(text, ok, p) {
    const m = document.getElementById((p || 'xfer') + '-msg');
    m.innerHTML = text; m.style.color = ok ? '#00ffaa' : '#ff5a4a';
    TC.save();
  },
  xferDone(p) { document.getElementById((p || 'xfer') + '-btn').disabled = true; },

  // ── Keep the calculator as the player left it (this browser only) ──
  _persist: null,
  persist(key, getExtra, setExtra, containers) {
    // containers: ids of the result areas to keep (default: the calculators' two)
    TC._persist = { key: 'tcalc-' + key, getExtra, setExtra, containers: containers || null };
    const p = TC._persist;
    try {
      const saved = JSON.parse(localStorage.getItem(p.key) || 'null');
      if (saved) {
        if (p.containers) {
          p.containers.forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = (saved.containers || {})[id] || ''; });
        } else {
          document.getElementById('results').innerHTML = saved.results || '';
          const mail = document.getElementById('mail-results');
          if (mail) mail.innerHTML = saved.mail || '';
        }
        Object.entries(saved.fields || {}).forEach(([id, v]) => {
          const el = document.getElementById(id);
          if (!el) return;
          if (el.type === 'checkbox') el.checked = !!v; else el.value = v;
        });
        if (saved.extra && p.setExtra) p.setExtra(saved.extra);
      }
    } catch (e) {}
    TC.uwpRefresh();
    ['input', 'change'].forEach(ev => document.addEventListener(ev, () => TC.save()));
  },
  save() {
    const p = TC._persist; if (!p) return;
    try {
      const fields = {};
      document.querySelectorAll('main input[id], main select[id]').forEach(el => {
        fields[el.id] = el.type === 'checkbox' ? el.checked : el.value;
      });
      const data = { fields, extra: p.getExtra ? p.getExtra() : null };
      if (p.containers) {
        data.containers = {};
        p.containers.forEach(id => { const el = document.getElementById(id); if (el) data.containers[id] = el.innerHTML; });
      } else {
        const mail = document.getElementById('mail-results');
        data.results = document.getElementById('results').innerHTML;
        data.mail = mail ? mail.innerHTML : '';
      }
      localStorage.setItem(p.key, JSON.stringify(data));
    } catch (e) {}
  },
  reset() {
    const p = TC._persist;
    if (!confirm('Clear all entries and rolled results on this calculator?')) return;
    try { localStorage.removeItem(p.key); } catch (e) {}
    location.reload();
  },

  async doSignOut() {
    await supabaseClient.auth.signOut();
    window.location.href = '../../index.html';
  }
};

async function doSignOut() { return TC.doSignOut(); }
