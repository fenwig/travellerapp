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
  worldBlock(id, title, withTL) {
    const pops = Array.from({ length: 13 }, (_, i) => i);
    return '<div class="calc-block calc-row"><div class="calc-block-title">' + title + '</div><div class="calc-fields">' +
      '<label>World<input type="text" id="' + id + '-name" placeholder="name" style="width:120px" /></label>' +
      '<label>Population<select id="' + id + '-pop">' + TC.opts(pops, 7) + '</select></label>' +
      '<label>Starport<select id="' + id + '-port">' + TC.opts(['A','B','C','D','E','X'], 'C') + '</select></label>' +
      '<label>Zone<select id="' + id + '-zone">' + TC.opts(['Green','Amber','Red'], 'Green') + '</select></label>' +
      (withTL ? '<label>Tech Level<input type="number" id="' + id + '-tl" min="0" max="25" value="8" /></label>' : '') +
      '</div></div>';
  },
  readWorld(id) {
    const tl = document.getElementById(id + '-tl');
    return {
      pop:  parseInt(document.getElementById(id + '-pop').value, 10),
      port: document.getElementById(id + '-port').value,
      zone: document.getElementById(id + '-zone').value,
      tl:   tl ? parseInt(tl.value, 10) || 0 : 0
    };
  },
  num(id) { return parseInt(document.getElementById(id).value, 10) || 0; },

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
  async activeShip() {
    const { data, error } = await supabaseClient.from('spacecraft').select('id,name,cargo_max').eq('status', 'active');
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('There is no active spacecraft. Set one to Active on the Roster first.');
    if (data.length > 1) throw new Error('More than one spacecraft is marked Active. Leave only one Active on the Roster.');
    return data[0];
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
