// The Fleet and NPC Fleet pages: combat cards built from fleetCombat() (js/fleet-combat.js).
// FLEET_NPC (set by the page before this loads) is true on the GM-only NPC Fleet page.
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    const FL = {};          // ship id -> { ship, ctx, fc }
    let filter = '';

    // ── dice ──
    const d6 = () => 1 + Math.floor(Math.random() * 6);
    function doRoll(btn) {
      let dm = parseFloat(btn.dataset.dm) || 0;
      if (btn.dataset.salvoInput) dm = parseInt(btn.closest('.fl-line').querySelector('.fl-salvo').value) || 0;   // +1 per missile in the salvo
      const tn = btn.dataset.tn ? parseInt(btn.dataset.tn) : null;
      const a = d6(), b = d6(), total = a + b + Math.round(dm);
      const res = btn.closest('.fl-line').querySelector('.fl-res');
      let text = '2D ' + a + '+' + b + ' ' + fmt(Math.round(dm)) + ' = ' + total;
      let bad = false;
      if (tn != null) {
        const effect = total - tn;
        text += ' vs ' + tn + '+ → ' + (effect >= 0 ? 'success, Effect ' + effect : 'failure, Effect ' + effect);
        if (btn.dataset.crit && effect >= 6) text += ' (critical hit if damage gets through)';
        bad = effect < 0;
        btn.closest('.fl-line').dataset.effect = effect;
      }
      res.textContent = text; res.className = 'fl-res' + (bad ? ' bad' : '');
      const adv = btn.closest('.fl-line').querySelector('.fl-adv');   // the reminder sits on its own line, in gold
      if (adv) adv.textContent = btn.dataset.advice || '';
    }
    const fmt = n => (n >= 0 ? '+' : '−') + Math.abs(n);
    const dice = n => { let t = 0; const r = []; for (let i = 0; i < n; i++) { const v = d6(); r.push(v); t += v; } return { total: t, rolls: r }; };

    // Damage roll for a weapon line: the dice (and extra dice for several weapons) plus the Effect of the last attack roll.
    // The player then takes off the target's armour (reduced by the weapon's AP) and applies the multiple. Missiles and torpedoes:
    // one missile's damage, less armour, times the Effect (at most the missiles in the salvo).
    function rollDamage(btn) {
      const ln = btn.closest('.fl-line'), res = ln.querySelector('.fl-res'), d = btn.dataset;
      const effect = ln.dataset.effect == null ? null : parseInt(ln.dataset.effect);
      const n = parseInt(d.dice), flat = parseInt(d.flat) || 0, mult = parseInt(d.mult) || 1, ap = parseInt(d.ap) || 0;
      const r = dice(n);
      let text;
      if (d.missile) {
        const salvo = parseInt(ln.querySelector('.fl-salvo').value) || 1;
        text = 'One missile: ' + n + 'D ' + r.rolls.join('+') + ' = ' + r.total + (d.dd ? ' × 10 (Destructive) = ' + r.total * 10 : '') + '. Take off the target\'s armour' + (ap ? ' (reduced by AP ' + ap + ' first)' : '') + ', then multiply by the Effect' +
          (effect == null ? ' (roll the attack first)' : ' ' + Math.max(0, Math.min(effect, salvo)) + ' (never more than the ' + salvo + ' missiles in the salvo)') + '.';
      } else {
        const e = effect == null ? 0 : Math.max(0, effect), sum = r.total + flat + e;
        text = 'Damage ' + n + 'D ' + r.rolls.join('+') + (flat ? ' +' + flat : '') + ' + Effect ' + e + ' = ' + sum + '. Take off the target\'s armour' + (ap ? ' (reduced by AP ' + ap + ' first)' : '') +
          (mult > 1 ? ', then multiply what is left by ' + mult : '') + '.' + (effect == null ? ' (No attack roll yet: Effect taken as 0.)' : '');
      }
      res.textContent = text; res.className = 'fl-res';
    }

    // Missile and torpedo magazines (saved on the weapon's row of the Spacecraft Record)
    const sayAt = (id, wid, text, bad) => {
      const el = document.querySelector('#fl-' + id + ' [data-weapon="' + wid + '"] .fl-res');
      if (el) { el.textContent = text; el.className = 'fl-res' + (bad ? ' bad' : ''); }
    };
    async function saveAmmo(id, wid, value) {
      const { error } = await supabaseClient.from('spacecraft_weapons').update({ ammo: value }).eq('id', wid);
      if (error) { alert('Could not save the missile count: ' + error.message + (/ammo/.test(error.message) ? ' (run docs/ship-weapon-ammo.sql in Supabase)' : '')); return false; }
      const w = FL[id].ctx.weapons.find(x => x.id === wid); if (w) w.ammo = value;
      return true;
    }
    async function launchMissiles(id, wid, cap, btn) {
      const n = parseInt(btn.closest('.fl-line').querySelector('.fl-salvo').value) || 0;
      const w = FL[id].ctx.weapons.find(x => x.id === wid), cur = w.ammo == null ? cap : w.ammo;
      if (n <= 0) return;
      if (n > cur) { sayAt(id, wid, 'Only ' + cur + ' left in the magazine.', true); return; }
      if (!(await saveAmmo(id, wid, cur - n))) return;
      redraw(id);
      sayAt(id, wid, 'Launched ' + n + '. ' + (cur - n) + ' left.');
    }
    async function reloadMissiles(id, wid, cap, btn) {
      if (!(await saveAmmo(id, wid, cap))) return;
      redraw(id);
      sayAt(id, wid, 'Magazine refilled to ' + cap + '.');
    }

    // Detecting a missile launch: Routine (6+) if the firing ship is already detected, else Average (8+); +1 per 10 full missiles (max +6)
    function rollDetect(btn) {
      const ln = btn.closest('.fl-line'), res = ln.querySelector('.fl-res');
      const tn = parseInt(ln.querySelector('.fl-det').value), n = parseInt(ln.querySelector('.fl-salvo').value) || 1;
      const bonus = Math.min(6, Math.floor(n / 10)), dm = Math.round(parseFloat(btn.dataset.dm)) + bonus;
      const a = d6(), b = d6(), total = a + b + dm, effect = total - tn;
      res.textContent = '2D ' + a + '+' + b + ' ' + fmt(dm) + (bonus ? ' (incl. salvo +' + bonus + ')' : '') + ' = ' + total + ' vs ' + tn + '+ → ' + (effect >= 0 ? 'launch detected, Effect ' + effect : 'not detected, Effect ' + effect);
      res.className = 'fl-res' + (effect < 0 ? ' bad' : '');
    }

    // ── building the card ──
    function crewText(c, allowSkillOnly) {
      if (!c.list.length) return '<span class="fl-unmanned">no one assigned</span>';
      const names = c.list.map(x => esc(x.name) + ' <i>(' + (x.pc ? (x.untrained ? 'untrained' : esc(c.skill) + (c.spec ? ' ' + esc(c.spec) : '') + ' ' + x.skill) + ', ' + c.statName + ' ' + fmt(x.stat) : 'NPC, level ' + x.skill) + ')</i> <b>' + fmt(x.dm) + '</b>').join('; ');
      return names + (c.list.length > 1 ? ' — <i>average</i> <b>' + fmt(c.avg) + '</b> · <i>best</i> <b>' + fmt(c.best) + '</b>' : '');
    }
    function line(label, dm, tn, note, opts) {
      opts = opts || {};
      if (dm == null) return '<div class="fl-line"><span class="fl-label">' + label + '</span><span class="fl-note" style="grid-column:2/-1;text-align:right">needs crew</span>' + (note ? '<div class="fl-note">' + note + '</div>' : '') + '</div>';
      const r = Math.round(dm);
      return '<div class="fl-line"><span class="fl-label">' + label + '</span><span class="fl-dm">2D ' + fmt(r) + '</span><span class="fl-tn">' + (tn ? tn + '+' : '') + '</span>' +
        '<button class="fl-roll" data-dm="' + r + '" data-tn="' + (tn || '') + '"' + (opts.crit ? ' data-crit="1"' : '') + (opts.advice ? ' data-advice="' + esc(opts.advice) + '"' : '') + ' onclick="doRoll(this)">Roll</button><span class="fl-res"></span><span class="fl-adv"></span>' + (note ? '<div class="fl-note">' + note + '</div>' : '') + '</div>';
    }
    const dmOr = (v, add) => (v == null ? null : v + (add || 0));

    function cardHtml(id) {
      const { ship: s, fc } = FL[id], cw = fc.crew;
      const crits = s.critical_hits || {};
      const lost = fc.hull.max - fc.hull.cur;
      let h = '<div class="fl-card" id="fl-' + id + '">';
      h += '<div class="fl-head"><span class="fl-name">' + esc(s.name) + '</span><span class="fl-badge ' + esc(s.status) + '">' + esc(s.status) + '</span></div>';
      h += '<div class="fl-cls">' + esc(s.ship_class || '') + ' · TL' + (s.tl || '?') + ' · ' + (s.hull_tonnage || 0) + ' tons</div>';
      h += '<div class="fl-stats">' +
        '<div class="fl-stat' + (fc.thrust < fc.thrustBase ? ' warn' : '') + '"><b>' + fc.thrust + (fc.thrust < fc.thrustBase ? ' / ' + fc.thrustBase : '') + '</b><span>Thrust</span></div>' +
        '<div class="fl-stat"><b>' + (s.jump_drive || 0) + '</b><span>Jump</span></div>' +
        '<div class="fl-stat' + (fc.hull.cur <= fc.hull.max * 0.25 ? ' warn' : '') + '"><b>' + fc.hull.cur + ' / ' + fc.hull.max + '</b><span>Hull</span></div>' +
        '<div class="fl-stat"><b>' + fc.armour + '</b><span>Armour</span></div>' +
        '<div class="fl-stat"><b>' + esc(String(fc.sensorGrade).replace(' Grade', '')) + '</b><span>Sensors ' + fmt(fc.sensorDm) + '</span></div></div>';

      // 1 Initiative
      h += '<details class="fl-step"><summary>1 · Initiative<span>2D + Pilot skill + Thrust</span></summary>';
      h += '<div class="fl-crew"><i>Pilot</i> ' + crewText(cw.pilot) + '</div>';
      h += line('Initiative', fc.initiative.manned ? fc.initiative.dm : null, null, fc.initiative.manned ? 'Pilot skill ' + fmt(fc.initiative.pilotSkill) + ' + Thrust ' + fc.initiative.thrust + '. Highest total acts first.' : 'Pilot skill + Thrust ' + fc.initiative.thrust + '; no pilot assigned.');
      h += line('Tactics (naval), commander', cw.tactics.best, 8, 'Once at the start of battle: the Effect is added to the ship\'s Initiative. <i>Captain:</i> ' + crewText(cw.tactics));
      h += line('Improve Initiative (Leadership)', cw.leader.best, 8, 'Captain\'s action: the Effect, even if negative, applies to next round\'s Initiative.');
      h += '</details>';

      // 2 Manoeuvre
      h += '<details class="fl-step"><summary>2 · Manoeuvre<span>' + fc.thrust + ' Thrust to spend</span></summary>';
      h += line('Pilot check (Aid Gunners, docking)', cw.pilot.best, 8, 'Aid Gunners starts a task chain with the gunners. Docking against an unwilling target is opposed, DM−2.');
      h += '<div class="fl-note" style="padding:2px 0">Movement: Thrust to change one range band — Adjacent 1, Close 1, Short 2, Medium 5, Long 10, Very Long 25, Distant 50. Within Close range switch to Dogfighting.</div>';
      h += '<div class="fl-note" style="padding:2px 0"><b style="color:#00e5ff">Evasive Action</b> (reaction): each unspent Thrust dodges one attack, which takes <b style="color:#ffd166">DM−' + Math.abs(fc.evasiveDm) + '</b> (the pilot\'s skill).' + (crits['M-Drive'] ? ' M-Drive damaged: Thrust is ' + fc.thrust + '.' : '') + '</div>';
      h += '</details>';

      // 3 Attack
      const gAvg = cw.gunners.avg, bAvg = cw.bayGunners.avg;
      h += '<details class="fl-step"><summary>3 · Attack &amp; Reactions<span>2D + Gunner + DEX DM, 8+</span></summary>';
      h += '<div class="fl-crew"><i>Turret gunners</i> ' + crewText(cw.gunners) + '</div>';
      if (fc.attacks.some(a => a.bay)) h += '<div class="fl-crew"><i>Bay gunners</i> ' + crewText(cw.bayGunners) + '</div>';
      if (!fc.attacks.length) h += '<div class="fl-note">No weapons recorded on the Spacecraft Record.</div>';
      fc.attacks.forEach(a => {
        const label = (a.mountCount > 1 && a.instance === 1 ? a.mountCount + ' × ' : '') + esc(a.mountType) + ' — ' + (a.k > 1 ? a.k + ' × ' : '') + esc(a.name) + (a.mountCount > 1 ? ' #' + a.instance : '');
        if (a.point) {
          h += '<div class="fl-line"><span class="fl-label">' + label + '</span><span class="fl-note" style="grid-column:2/-1;text-align:right">' + esc(a.range) + '</span></div>';
          return;
        }
        const info = esc(a.range) + ' · damage ' + esc(a.damage) + (a.traits ? ' · ' + esc(a.traits) : '') + ' · power ' + a.power;
        if (a.missile) {
          // Missiles and torpedoes: the magazine is counted here; the salvo's flight and arrival are tracked at the table
          const cur = a.ammo == null ? a.capacity : a.ammo, wid = a.weaponId;
          const dmgBtn = a.dice != null ? '<button class="fl-roll" data-dice="' + a.dice + '" data-flat="0" data-mult="1" data-ap="' + a.ap + '" data-missile="1"' + (a.dd ? ' data-dd="1"' : '') + ' onclick="rollDamage(this)">Damage</button>' : '';
          h += '<div class="fl-line" data-weapon="' + wid + '"><span class="fl-label">' + label + '</span><span class="fl-dm">' + cur + ' / ' + a.capacity + ' left</span><span></span><span></span>' +
            '<div class="fl-note">' + info + (a.simple ? ' · <span style="color:#ffd166">standard missiles only: NPC ships do not track the loaded type</span>' : ' · loaded: ' + esc(a.loaded.name) + ' (TL' + a.loaded.tl + ')') + ' · attack is 2D + 1 per missile in the salvo (gunner skill and range are not used); Distant range −2; Close and Adjacent lose Smart</div>' +
            '<div class="fl-ctl">Salvo <input type="number" class="fl-salvo" min="1" value="' + Math.max(1, Math.min(a.salvo, cur)) + '" />' +
            '<button class="fl-mini" onclick="launchMissiles(\'' + id + '\',\'' + wid + '\',' + a.capacity + ',this)">Launch</button>' +
            '<button class="fl-roll" data-tn="8" data-crit="1" data-salvo-input="1" data-advice="remember Distant range −2 and the target\'s Evasive Action" onclick="doRoll(this)">Attack roll</button>' + dmgBtn +
            '<button class="fl-mini" onclick="reloadMissiles(\'' + id + '\',\'' + wid + '\',' + a.capacity + ',this)">Reload</button></div>' +
            '<span class="fl-res"></span><span class="fl-adv"></span></div>';
          return;
        }
        const gd = a.bay ? bAvg : gAvg;
        const dm = gd == null ? null : gd + a.weaponDm;
        const parts = [gd == null ? 'no gunner assigned' : 'gunner ' + fmt(Math.round(gd))];
        if (a.weaponDm) parts.push('weapon ' + fmt(a.weaponDm) + ' already included');
        const advice = 'add the DM for range (Short +1, Long −2, Very Long −4, Distant −6) and target size (+1 per full 1,000 tons, max +6)' +
          (a.bay ? '; bays take −2 against targets of 2,000 tons or less, −4 at 100 or less' : '');
        let ln = line(label, dm, 8, info + ' · ' + parts.join(', '), { crit: true, advice });
        if (a.dice != null && !a.ion && dm != null) {
          const btn = '<button class="fl-roll" style="margin-left:6px" data-dice="' + a.dice + '" data-flat="' + a.flat + '" data-mult="' + a.mult + '" data-ap="' + a.ap + '" onclick="rollDamage(this)">Damage</button>';
          ln = ln.replace('<span class="fl-res">', btn + '<span class="fl-res">');
        }
        h += ln;
      });
      h += '<div class="fl-legend">Lock-on: +2 against a ship held by Sensor Lock. The target\'s Evasive Action takes its pilot\'s skill off the roll.</div>';
      h += '<div class="fl-wh" style="color:#00e5ff">Reactions</div>';
      h += '<div class="fl-note" style="padding:2px 0"><b style="color:#00e5ff">Evasive Action</b>: each unspent Thrust (up to ' + fc.thrust + ') makes one attack on this ship take DM−' + Math.abs(fc.evasiveDm) + '.</div>';
      if (fc.hasLasers) h += line('Point Defence (laser turret)', gAvg, 8, 'The turret cannot attack this round. Effect = missiles removed from the salvo. DM+1 for two lasers in the turret, +2 for three.');
      if (fc.hasSand) h += line('Disperse Sand (sandcaster)', gAvg, 8, 'Success adds 1D + Effect to the ship\'s armour against that laser attack. Uses one canister.');
      h += '</details>';

      // 4 Engineering
      const e = cw.engAny;
      h += '<details class="fl-step"><summary>4 · Engineering actions<span>Engineer + EDU DM</span></summary>';
      h += '<div class="fl-crew"><i>Engineers</i> ' + crewText(e) + '</div>';
      h += line('Overload Drive (+1 Thrust next round)', cw.engM.best, 10, 'Engineer (m-drive). Cumulative DM−2 each further try. Fail by 6 or more: M-Drive Severity 1 hit.');
      h += line('Overload Plant (+10% Power next round)', cw.engPower.best, 10, 'Engineer (power). Cumulative DM−2 each further try. Fail by 6 or more: Power Plant Severity 1 hit.');
      h += line('Repair System (one critical hit)', e.best, 8, 'DM equal to the hit\'s negative Severity, and +1 per round worked on the same hit (cumulative). Repairs last 1D hours; cannot fix Hull or destroyed equipment.' + (fc.autoRepair ? ' <b style="color:#00ffaa">Auto-Repair software aboard.</b>' : ''));
      h += line('Offline System (free up Power)', cw.engPower.best, 8, 'Engineer (power). Takes another round to bring systems back online.');
      h += line('Jump', e.best, 4, 'Engineer (j-drive) with the astrogator\'s check; hurried jumps raise both difficulties one step.');
      h += '</details>';

      // 5 Sensors
      const sk = fc.sensorsDm;
      h += '<details class="fl-step"><summary>5 · Sensor actions<span>Electronics (sensors) + INT DM + sensors ' + fmt(fc.sensorDm) + (fc.sensorCrit ? ' + damage −2' : '') + '</span></summary>';
      h += '<div class="fl-crew"><i>Sensor operators</i> ' + crewText(cw.sensors) + '</div>';
      h += line('Sensor Lock', sk, 8, 'All attacks against the locked ship get DM+2 until the lock is broken.');
      h += line('Electronic Warfare', cw.comms.best == null ? null : cw.comms.best + fc.sensorDm + fc.sensorCrit, null, 'Opposed Electronics (comms) to jam, or Electronics (sensors) to break a sensor lock. Also a missile countermeasure.');
      h += line('Electronic Warfare vs an inbound missile salvo', sk, 10, 'Actions Step. The Effect removes that many missiles from one salvo; cumulative over rounds, once per round per salvo.');
      h += '<div class="fl-line"><span class="fl-label">Detect missile launch</span><span class="fl-dm">' + (sk == null ? '' : '2D ' + fmt(Math.round(sk))) + '</span><span></span><span></span>' +
        '<div class="fl-note">Electronics (sensors). Routine (6+) if the firing ship is already detected, Average (8+) if not; +1 for every 10 full missiles in the salvo (max +6). Missiles not spotted can be looked for at the start of each later round on an Average (8+) check.</div>' +
        (sk == null ? '<div class="fl-note">needs a sensor operator</div>' : '<div class="fl-ctl">Firing ship already detected <select class="fl-det"><option value="6">Yes (6+)</option><option value="8">No (8+)</option></select> Missiles in salvo <input type="number" class="fl-salvo" min="1" value="1" /><button class="fl-roll" data-dm="' + Math.round(sk) + '" onclick="rollDetect(this)">Roll</button></div>') +
        '<span class="fl-res"></span></div>';
      h += line('General scan / other sensor use', sk, 8, 'Routine sensor work; difficulty set by the Referee.');
      h += '</details>';

      h += moraleHtml(id);

      // Damage and critical hits
      h += '<details class="fl-step"><summary>Armour, damage &amp; critical hits<span>' + (lost > 0 ? lost + ' hull lost' : 'undamaged') + '</span></summary>';
      h += '<div class="fl-dmg">Hull <input type="number" value="' + fc.hull.cur + '" onchange="setField(\'' + id + '\',\'hull_current\',this.value)" /> / ' + fc.hull.max +
        ' &nbsp; Armour <input type="number" value="' + fc.armour + '" onchange="setField(\'' + id + '\',\'armour_current\',this.value)" /> / ' + (s.armour_max || 0) + '</div>';
      h += '<div class="fl-dmg">Incoming damage <input type="number" id="dmg-' + id + '" min="0" /> <button class="fl-mini" onclick="applyDamage(\'' + id + '\')">Apply (minus armour)</button><span id="dmg-res-' + id + '" class="fl-note"></span></div>';
      h += '<div class="fl-legend">Damage = weapon dice + Effect − Armour. Hull 0 = wrecked. Every ' + fc.hull.step + ' hull lost (10% of starting hull) is a Severity 1 critical hit; roll 2D for the location.</div>';
      h += Object.keys(CRIT_EFFECTS).map(loc => {
        const sev = crits[loc] || 0;
        return '<div class="fl-crit"><span>' + loc + '</span><span class="fl-pips">' + [1, 2, 3, 4, 5, 6].map(n =>
          '<span class="fl-pip' + (n <= sev ? ' on' : '') + '" title="' + esc((CRIT_EFFECTS[loc] || [])[n - 1] || '') + '" onclick="setCrit(\'' + id + '\',\'' + loc + '\',' + n + ')">' + n + '</span>').join('') + '</span></div>';
      }).join('');
      h += '<div class="fl-dmg" style="margin-top:8px"><button class="fl-mini" onclick="rollCrit(\'' + id + '\')">Roll crit location (2D)</button> Severity <select id="sev-' + id + '">' + [1, 2, 3, 4, 5, 6].map(n => '<option>' + n + '</option>').join('') + '</select> <button class="fl-mini" onclick="applyCrit(\'' + id + '\')">Apply to rolled location</button><span id="crit-res-' + id + '" class="fl-note"></span></div>';
      h += '<div class="fl-active">' + (fc.activeCrits.length ? fc.activeCrits.map(c => '[' + c.loc + ' — Sev ' + c.sev + ']\n' + c.effects.map((t, i) => '  ' + (i + 1) + '. ' + t).join('\n')).join('\n\n') : 'No critical hits recorded.') + '</div>';
      h += '</details>';
      if (FLEET_NPC) h += npcSetupHtml(id);
      return h + '</div>';
    }

    // ── Crew morale (Pirates of Drinax Book 1, Morale p.12 and Enemy Ship Morale p.14) ──
    // One MOR for the whole ship's crew. Fleet and Active ships use the pirate rules: start 1D+6, MOR checks, events move it,
    // 0 = mutiny. NPC ships use the enemy rules: start 1D+3 merchant / 1D+6 armed / 1D+8 naval (Aslan: a roll under 3 counts as 3),
    // -1 per critical hit and a further -1D at Severity 4+, 0 = the ship jumps out or surrenders.
    const MOR_CLASSES = { merchant: ['Merchant', 3], armed: ['Armed ship', 6], naval: ['Naval ship', 8] };
    const morSay = (id, text, bad) => { const el = document.getElementById('mor-res-' + id); if (el) { el.textContent = text; el.className = 'fl-note' + (bad ? ' fl-res bad' : ''); } };

    function moraleHtml(id) {
      const { ship: s, ctx } = FL[id], mor = s.morale == null ? null : s.morale;
      let h = '<details class="fl-step"><summary>Crew morale<span>' + (mor == null ? 'not rolled yet' : 'MOR ' + mor + ' (DM' + fmt(statDm(mor)) + ')') + '</span></summary>';
      const startCls = s.morale_class && MOR_CLASSES[s.morale_class] ? s.morale_class : 'armed';
      h += '<div class="fl-ctl" style="margin:4px 0">' + (mor == null ? 'Starting MOR: ' : 'Re-roll starting MOR: ') +
        (FLEET_NPC ? '<select id="mor-cls-' + id + '">' + Object.keys(MOR_CLASSES).map(k => '<option value="' + k + '"' + (k === startCls ? ' selected' : '') + '>' + MOR_CLASSES[k][0] + ' (1D+' + MOR_CLASSES[k][1] + ')</option>').join('') + '</select>' +
          ' <label><input type="checkbox" id="mor-aslan-' + id + '" style="width:auto" /> Aslan (minimum 3)</label>' : '1D+6 ') +
        '<button class="fl-mini" onclick="rollStartMorale(\'' + id + '\')">Roll</button></div>';
      if (mor != null) {
        h += '<div class="fl-dmg">MOR <input type="number" min="0" value="' + mor + '" onchange="setMorale(\'' + id + '\',this.value)" /> ' +
          '<button class="fl-mini" onclick="adjustMorale(\'' + id + '\',-1,\'Adjusted by hand\')">−1</button><button class="fl-mini" onclick="adjustMorale(\'' + id + '\',1,\'Adjusted by hand\')">+1</button></div>';
        if (mor === 0) h += '<div class="fl-res bad" style="padding:4px 0">' + (FLEET_NPC ? 'MOR 0: the ship jumps out if it can, otherwise it surrenders.' : 'MOR 0: the crew mutiny and try to overthrow the leadership and seize the ship.') + '</div>';
        if (FLEET_NPC) {
          h += '<div class="fl-dmg"><button class="fl-mini" onclick="adjustMorale(\'' + id + '\',-1,\'Critical hit\')">Critical hit −1</button> ' +
            '<button class="fl-mini" onclick="critSevMorale(\'' + id + '\')">Severity 4+ also −1D</button></div>' +
            '<div class="fl-legend">Applying a critical hit in the damage section below lowers MOR for you (−1, and −1D more at Severity 4+). These buttons are for hits you enter by hand.</div>';
        } else {
          const sk = statDm(mor);
          h += '<div class="fl-line"><span class="fl-label">MOR check</span><span class="fl-dm">2D ' + fmt(sk) + '</span><span class="fl-tn">8+</span>' +
            '<button class="fl-roll" onclick="morCheck(\'' + id + '\')">Roll</button><span class="fl-res" id="mor-check-' + id + '"></span>' +
            '<div class="fl-note">The Referee calls for a check when the ship is endangered (hull under 10% of its starting value), the crew are ordered to risk their lives, endure undue hardship, or the leadership is divided. Average (8+) is assumed. A failed check costs 1D MOR.</div></div>';
          h += '<div class="fl-dmg">' + [['Month without a division of the spoils', -1], ['Failed attempt to capture cargo or a prize', -1], ['Captured considerable cargo or a prize', 1], ['Shore leave, intoxicants, rewards', 1]]
            .map(a => '<button class="fl-mini" onclick="adjustMorale(\'' + id + '\',' + a[1] + ',\'' + a[0] + '\')">' + fmt(a[1]) + ' ' + a[0] + '</button>').join(' ') + '</div>';
          const crewN = ctx.roles.filter(r => r.character_id || r.hired_crew_id).length;
          h += '<div class="fl-ctl" style="margin:6px 0">Division of the Spoils, retaining crew: <input type="number" id="mor-crew-' + id + '" min="1" value="' + Math.max(1, crewN) + '" /> crew ' +
            '<button class="fl-mini" onclick="rollRetention(\'' + id + '\')">Roll for each (2D ' + fmt(statDm(mor)) + ' vs 6+)</button></div>';
        }
        h += '<div class="fl-note" id="mor-res-' + id + '"></div>';
      }
      return h + '</details>';
    }

    async function saveMorale(id, patch) {
      const { error } = await supabaseClient.from('spacecraft').update(patch).eq('id', id);
      if (error) { alert('Could not save morale: ' + error.message + (/morale/.test(error.message) ? ' (run docs/ship-morale.sql in Supabase)' : '')); return false; }
      Object.assign(FL[id].ship, patch);
      return true;
    }
    async function rollStartMorale(id) {
      const s = FL[id].ship;
      if (s.morale != null && !confirm('Replace the current MOR of ' + s.morale + ' with a new starting roll?')) return;
      let cls = null, bonus = 6, aslan = false;
      if (FLEET_NPC) { cls = document.getElementById('mor-cls-' + id).value; bonus = MOR_CLASSES[cls][1]; aslan = document.getElementById('mor-aslan-' + id).checked; }
      const r = d6(); let total = r + bonus;
      if (aslan && total < 3) total = 3;
      if (!(await saveMorale(id, FLEET_NPC ? { morale: total, morale_class: cls } : { morale: total }))) return;
      redraw(id);
      morSay(id, 'Starting MOR: 1D ' + r + ' + ' + bonus + ' = ' + total + '.');
    }
    async function setMorale(id, v) {
      const n = parseInt(v); if (isNaN(n)) return;
      if (await saveMorale(id, { morale: Math.max(0, n) })) redraw(id);
    }
    async function adjustMorale(id, delta, why) {
      const cur = FL[id].ship.morale || 0, next = Math.max(0, cur + delta);
      if (!(await saveMorale(id, { morale: next }))) return;
      redraw(id);
      morSay(id, why + ': MOR ' + cur + ' → ' + next + '.' + (next === 0 ? (FLEET_NPC ? ' The ship jumps out or surrenders.' : ' The crew mutiny!') : ''), next === 0);
    }
    async function critSevMorale(id) {
      const r = d6(), cur = FL[id].ship.morale || 0, next = Math.max(0, cur - r);
      if (!(await saveMorale(id, { morale: next }))) return;
      redraw(id);
      morSay(id, 'Severity 4+: −1D (' + r + '): MOR ' + cur + ' → ' + next + '.' + (next === 0 ? ' The ship jumps out or surrenders.' : ''), next === 0);
    }
    async function morCheck(id) {
      const mor = FL[id].ship.morale || 0, dm = statDm(mor), a = d6(), b = d6(), total = a + b + dm;
      let text = '2D ' + a + '+' + b + ' ' + fmt(dm) + ' = ' + total + ' vs 8+ → ';
      if (total >= 8) { document.getElementById('mor-check-' + id).textContent = text + 'the crew hold steady.'; return; }
      const dmg = d6(), next = Math.max(0, mor - dmg);
      if (!(await saveMorale(id, { morale: next }))) return;
      redraw(id);
      const el = document.getElementById('mor-check-' + id);
      if (el) { el.textContent = text + 'failed. MOR takes 1D = ' + dmg + ': ' + mor + ' → ' + next + '.' + (next === 0 ? ' The crew mutiny!' : ''); el.className = 'fl-res bad'; }
    }
    function rollRetention(id) {
      const mor = FL[id].ship.morale || 0, dm = statDm(mor), n = Math.max(1, parseInt(document.getElementById('mor-crew-' + id).value) || 1);
      let leave = 0;
      for (let i = 0; i < n; i++) if (d6() + d6() + dm < 6) leave++;
      morSay(id, n + ' crew rolled 2D ' + fmt(dm) + ' vs 6+: ' + leave + ' choose to leave at the next Tolerant or better starport, ' + (n - leave) + ' stay.', leave > 0);
    }

    function redraw(id) {
      const f = FL[id];
      f.fc = fleetCombat(f.ship, f.ctx);
      const el = document.getElementById('fl-' + id);
      const openStates = el ? [...el.querySelectorAll('details.fl-step')].map(d => d.open) : [];
      const html = cardHtml(id);
      if (el) el.outerHTML = html;
      const nel = document.getElementById('fl-' + id);
      if (nel) nel.querySelectorAll('details.fl-step').forEach((d, i) => { if (openStates[i] != null) d.open = openStates[i]; });
    }

    // ── saving ──
    async function saveShip(id, patch) {
      const { error } = await supabaseClient.from('spacecraft').update(patch).eq('id', id);
      if (error) { alert('Could not save: ' + error.message); return false; }
      Object.assign(FL[id].ship, patch);
      return true;
    }
    async function setField(id, col, v) {
      const n = parseInt(v); if (isNaN(n)) return;
      if (await saveShip(id, { [col]: Math.max(0, n) })) redraw(id);
    }
    async function applyDamage(id) {
      const f = FL[id], dmg = parseInt(document.getElementById('dmg-' + id).value);
      if (isNaN(dmg) || dmg < 0) return;
      const armour = f.fc.armour, through = Math.max(0, dmg - armour);
      const before = f.fc.hull.cur, after = Math.max(0, before - through), step = f.fc.hull.step;
      const lostBefore = f.fc.hull.max - before, lostAfter = f.fc.hull.max - after;
      const crits = Math.floor(lostAfter / step) - Math.floor(lostBefore / step);
      if (!(await saveShip(id, { hull_current: after }))) return;
      redraw(id);
      const res = document.getElementById('dmg-res-' + id);
      res.textContent = ' ' + dmg + ' − armour ' + armour + ' = ' + through + ' hull damage.' + (after === 0 ? ' Hull 0: the ship is wrecked.' : '') + (crits > 0 ? ' Sustained damage: roll ' + crits + ' × Severity 1 critical hit location.' : '') +
        (!FLEET_NPC && before > f.fc.hull.max * 0.1 && after <= f.fc.hull.max * 0.1 && after > 0 ? ' Hull is now under 10% of its starting value: the ship is endangered, so make a MOR check.' : '');
    }
    async function setCrit(id, loc, n) {
      const crits = Object.assign({}, FL[id].ship.critical_hits || {});
      crits[loc] = crits[loc] === n ? 0 : n;
      if (await saveShip(id, { critical_hits: crits })) redraw(id);
    }
    const rolledLoc = {};
    function rollCrit(id) {
      const r = d6() + d6(), loc = CRIT_LOCATION_BY_ROLL[r];
      rolledLoc[id] = loc;
      document.getElementById('crit-res-' + id).textContent = ' 2D = ' + r + ' → ' + loc + '. A location the ship lacks (no jump drive, say) means roll again.';
    }
    async function applyCrit(id) {
      const loc = rolledLoc[id];
      if (!loc) { document.getElementById('crit-res-' + id).textContent = ' Roll a location first.'; return; }
      const sev = parseInt(document.getElementById('sev-' + id).value) || 1;
      const crits = Object.assign({}, FL[id].ship.critical_hits || {});
      const r = applyCritSeverity(crits[loc], sev);
      crits[loc] = r.sev;
      const patch = { critical_hits: crits };
      // Enemy ship morale: -1 per critical hit, and a further -1D at Severity 4+
      let morText = '';
      const ship = FL[id].ship;
      if (FLEET_NPC && ship.morale != null) {
        const extra = sev >= 4 ? d6() : 0, next = Math.max(0, ship.morale - 1 - extra);
        patch.morale = next;
        morText = ' Morale ' + ship.morale + ' → ' + next + ' (−1' + (extra ? ', −1D = ' + extra : '') + ').' + (next === 0 ? ' MOR 0: the ship jumps out or surrenders.' : '');
      }
      if (!(await saveShip(id, patch))) return;
      redraw(id);
      document.getElementById('crit-res-' + id).textContent = ' ' + loc + ' now Severity ' + r.sev + (r.extra6D ? ' (already Severity 6: it takes 6D extra damage instead)' : '') + '.' + morText;
    }

    // ── initiative for everyone ──
    function rollAllInitiative() {
      const rows = Object.keys(FL).filter(id => !filter || FL[id].ship.status === filter).map(id => {
        const f = FL[id], i = f.fc.initiative, a = d6(), b = d6();
        return { name: f.ship.name, total: a + b + i.dm, text: a + '+' + b + ' ' + fmt(i.dm) };
      }).sort((x, y) => y.total - x.total);
      document.getElementById('fl-order').innerHTML = rows.length ? '<b>Initiative order:</b> ' + rows.map(r => esc(r.name) + ' <b>' + r.total + '</b> <span style="color:#4a9ab8">(' + r.text + ')</span>').join(' → ') +
        ' <span style="color:#4a9ab8">· add the NPC fleet and ties are re-rolled by the Referee</span>' : '';
    }

    function setFilter(f) {
      filter = f;
      ['all', 'active', 'fleet'].forEach(k => { const b = document.getElementById('f-' + k); if (b) b.classList.toggle('on', (k === 'all' ? '' : k) === f); });
      drawAll();
    }
    function drawAll() {
      const ids = Object.keys(FL).filter(id => !filter || FL[id].ship.status === filter);
      document.getElementById('fl-grid').innerHTML = ids.length ? ids.map(cardHtml).join('') :
        (FLEET_NPC ? '<div class="fl-msg">No NPC ships yet. Choose one from the catalogue list above and press Add.</div>'
          : '<div class="fl-msg">No ' + (filter || 'Active or Fleet') + ' ships in this campaign. Set a ship\'s status on the Roster or the Spacecraft Record.</div>');
    }

    // ── NPC Fleet (GM): setup for each ship ──
    const MAX_CREW_LEVEL = 5;
    const slotRoleOf = (ctx, hiredId) => (ctx.roles.find(r => r.hired_crew_id === hiredId) || {}).role || '';

    function npcSetupHtml(id) {
      const ctx = FL[id].ctx;
      // the hired NPCs in each post
      const byRole = {};
      ctx.roles.forEach(r => { const h = r.hired_crew_id && ctx.hired[r.hired_crew_id]; if (h) (byRole[r.role] = byRole[r.role] || []).push(h); });
      const posts = Object.keys(byRole);
      const lvText = hs => [...new Set(hs.map(npcLevel))].sort().join(' / ');
      const btns = role => '<button class="fl-mini" onclick="shiftCrew(\'' + id + '\',\'' + role + '\',-1)">−</button><button class="fl-mini" onclick="shiftCrew(\'' + id + '\',\'' + role + '\',1)">+</button>';
      let h = '<details class="fl-step" open><summary>NPC setup<span>crew, weapons, ship</span></summary>';
      h += '<div class="fl-wh" style="color:#00e5ff;margin-top:0">NPC crew skill level</div>';
      if (!posts.length) h += '<div class="fl-note">No crew on this ship.</div>';
      else {
        const all = posts.flatMap(r => byRole[r]);
        h += '<div class="fl-npc-row"><span class="fl-label">All crew (' + all.length + ')</span><span class="fl-dm">level ' + lvText(all) + '</span>' + btns('*') + '</div>';
        posts.forEach(r => { h += '<div class="fl-npc-row"><span>' + esc(r) + ' ×' + byRole[r].length + '</span><span class="fl-dm">level ' + lvText(byRole[r]) + '</span>' + btns(r) + '</div>'; });
      }

      h += '<div class="fl-wh" style="color:#00e5ff">Weapons</div>';
      if (!ctx.mounts.length) h += '<div class="fl-note">No weapon mounts.</div>';
      ctx.mounts.forEach(m => {
        const slots = MOUNT_SLOT_COUNT[m.mount_type] || 1;
        for (let inst = 1; inst <= (m.count || 1); inst++) {
          const here = [];
          for (let s = 1; s <= slots; s++) here.push(ctx.weapons.find(w => w.mount_id === m.id && w.instance === inst && w.slot === s) || null);
          const empty = here.filter(x => !x).length;
          h += '<div class="fl-wmount"><b>' + esc(m.mount_type) + ((m.count || 1) > 1 ? ' #' + inst : '') + '</b>' +
            (empty > 1 ? ' <select onchange="npcFillMount(\'' + id + '\',\'' + m.id + '\',' + inst + ',this)">' + catalogueWeaponOptions(m.mount_type, 'Fill all ' + empty + ' empty slots with…') + '</select>' : '') + '</div>';
          here.forEach((w, i) => {
            h += '<div class="fl-wslot"><span>' + (i + 1) + '.</span>' + (w
              ? '<span class="fl-label">' + esc(w.name) + '</span><span class="fl-note" style="grid-column:auto">' + esc(w.damage || '') + '</span><button class="fl-mini" title="Remove this weapon" onclick="npcClearWeapon(\'' + id + '\',\'' + w.id + '\')">✕</button>'
              : '<select onchange="npcAddWeapon(\'' + id + '\',\'' + m.id + '\',' + inst + ',' + (i + 1) + ',this)">' + catalogueWeaponOptions(m.mount_type, 'Empty: choose a weapon…') + '</select>') + '</div>';
          });
        }
      });

      h += '<div class="fl-wh" style="color:#00e5ff">Ship</div><div class="fl-dmg"><button class="fl-mini" onclick="renameNpc(\'' + id + '\')">Rename</button>' +
        '<button class="fl-mini" onclick="duplicateNpc(\'' + id + '\')">Add another</button><button class="fl-mini" style="color:#ff5a4a;border-color:#ff5a4a" onclick="removeNpc(\'' + id + '\')">Remove from fleet</button></div>';
      return h + '</details>';
    }

    // +/- the skill level of NPC crew: one post, or '*' for everyone aboard. The level lives in the crew member's role ("Pilot-2").
    async function shiftCrew(id, role, delta) {
      const ctx = FL[id].ctx, rows = [];
      ctx.roles.forEach(r => { const h = r.hired_crew_id && ctx.hired[r.hired_crew_id]; if (h && (role === '*' || r.role === role)) rows.push({ h, slot: r.role }); });
      const jobs = rows.map(({ h, slot }) => {
        const next = Math.max(0, Math.min(MAX_CREW_LEVEL, npcLevel(h) + delta));
        if (next === npcLevel(h)) return null;
        return supabaseClient.from('spacecraft_hired_crew').update({ role: slot + '-' + next }).eq('id', h.id).then(res => { if (!res.error) h.role = slot + '-' + next; return res; });
      }).filter(Boolean);
      const results = await Promise.all(jobs);
      const bad = results.find(r => r.error);
      if (bad) alert('Could not save a crew level: ' + bad.error.message);
      redraw(id);
    }

    async function npcAddWeapon(id, mountId, instance, slot, sel) {
      if (!sel.value) return;
      const ctx = FL[id].ctx, m = ctx.mounts.find(x => x.id === mountId), [g, i] = sel.value.split('|').map(Number);
      const x = catalogueWeaponGroups(m.mount_type)[g][1][i];
      const row = { spacecraft_id: id, mount_id: mountId, instance, slot, name: x.name, tl: x.tl, range: x.range, damage: x.damage || null, power: x.power || 0, traits: x.traits || null };
      const { data, error } = await supabaseClient.from('spacecraft_weapons').insert(row).select().single();
      if (error) { alert('Could not add the weapon: ' + error.message); return; }
      ctx.weapons.push(data);
      redraw(id);
    }
    async function npcFillMount(id, mountId, instance, sel) {
      if (!sel.value) return;
      const ctx = FL[id].ctx, m = ctx.mounts.find(x => x.id === mountId), [g, i] = sel.value.split('|').map(Number);
      const x = catalogueWeaponGroups(m.mount_type)[g][1][i], rows = [];
      for (let s = 1; s <= (MOUNT_SLOT_COUNT[m.mount_type] || 1); s++) {
        if (!ctx.weapons.some(w => w.mount_id === mountId && w.instance === instance && w.slot === s))
          rows.push({ spacecraft_id: id, mount_id: mountId, instance, slot: s, name: x.name, tl: x.tl, range: x.range, damage: x.damage || null, power: x.power || 0, traits: x.traits || null });
      }
      if (!rows.length) return;
      const { data, error } = await supabaseClient.from('spacecraft_weapons').insert(rows).select();
      if (error) { alert('Could not add the weapons: ' + error.message); return; }
      ctx.weapons.push(...data);
      redraw(id);
    }
    async function npcClearWeapon(id, weaponId) {
      const { error } = await supabaseClient.from('spacecraft_weapons').delete().eq('id', weaponId);
      if (error) { alert('Could not remove the weapon: ' + error.message); return; }
      FL[id].ctx.weapons = FL[id].ctx.weapons.filter(w => w.id !== weaponId);
      redraw(id);
    }

    async function renameNpc(id) {
      const name = prompt('Name for this ship:', FL[id].ship.name);
      if (!name || !name.trim()) return;
      if (await saveShip(id, { name: name.trim() })) redraw(id);
    }
    async function removeNpc(id) {
      if (!confirm('Remove "' + FL[id].ship.name + '" from the NPC fleet? Its crew, weapons and damage are deleted too.')) return;
      const { error } = await supabaseClient.from('spacecraft').delete().eq('id', id);
      if (error) { alert('Could not remove it: ' + error.message); return; }
      delete FL[id]; drawAll();
    }
    async function duplicateNpc(id) {
      const entry = typeof SHIP_CATALOGUE !== 'undefined' && SHIP_CATALOGUE.find(e => e.id === FL[id].ship.catalogue_id);
      if (!entry) { alert('This ship was not added from the catalogue, so it cannot be copied. Add another from the catalogue list at the top.'); return; }
      await addNpcShips(entry.id, 1);
    }

    // Adding another copy of a ship (the Ship Catalogue's Add to NPC Fleet button does the same): "Yacht 1", "Yacht 2"..., level 1 NPCs in every crew slot
    async function addNpcShips(entryId, qty) {
      const msg = document.getElementById('npc-msg');
      const say = (t, ok) => { if (msg) { msg.textContent = t; msg.style.color = ok ? '#00ffaa' : '#ff5a4a'; } };
      const entry = SHIP_CATALOGUE.find(e => e.id === entryId);
      if (!entry) { say('Pick a ship from the list first.', false); return; }
      const cid = await currentCampaignId();
      try {
        const names = [];
        for (let i = 0; i < qty; i++) {
          const name = await nextNpcDesignator(supabaseClient, cid, entry.name);
          await addCatalogueShipToRecord(supabaseClient, entry, { name, status: 'npc', campaignId: cid, npcCrewLevel: 1 });
          names.push(name);
        }
        say('Added ' + names.join(', ') + '. Choose weapons for any empty turrets in the card\'s NPC setup.', true);
        await loadFleet();
      } catch (e) {
        say('Not added: ' + e.message + (/status/i.test(e.message) ? ' (run docs/npc-fleet.sql in Supabase first)' : ''), false);
      }
    }
    // ── loading ──
    async function loadFleet() {
      try {
        const cid = await currentCampaignId();
        const { data: ships, error } = await inCampaign(supabaseClient.from('spacecraft').select('*').in('status', FLEET_NPC ? ['npc'] : ['active', 'fleet']).order('name'), cid);
        if (error) throw error;
        const per = await Promise.all((ships || []).map(async s => {
          const [roles, mounts, weapons, software] = await Promise.all([
            supabaseClient.from('spacecraft_crew_roles').select('*').eq('spacecraft_id', s.id),
            supabaseClient.from('spacecraft_mounts').select('*').eq('spacecraft_id', s.id),
            supabaseClient.from('spacecraft_weapons').select('*').eq('spacecraft_id', s.id),
            supabaseClient.from('spacecraft_software').select('*').eq('spacecraft_id', s.id)
          ]);
          return { s, roles: roles.data || [], mounts: mounts.data || [], weapons: weapons.data || [], software: software.data || [] };
        }));
        const charIds = [...new Set(per.flatMap(p => p.roles.map(r => r.character_id).filter(Boolean)))];
        const hiredIds = [...new Set(per.flatMap(p => p.roles.map(r => r.hired_crew_id).filter(Boolean)))];
        const [cr, hr] = await Promise.all([
          charIds.length ? supabaseClient.from('characters').select('id,name,str,dex,end_stat,int_stat,edu,soc,skills').in('id', charIds) : { data: [] },
          hiredIds.length ? supabaseClient.from('spacecraft_hired_crew').select('*').in('id', hiredIds) : { data: [] }
        ]);
        const chars = {}, hired = {};
        (cr.data || []).forEach(c => { chars[c.id] = c; });
        (hr.data || []).forEach(h => { hired[h.id] = h; });
        Object.keys(FL).forEach(k => delete FL[k]);
        per.forEach(p => {
          const ctx = { roles: p.roles, chars, hired, mounts: p.mounts, weapons: p.weapons, software: p.software, simpleMissiles: FLEET_NPC };
          FL[p.s.id] = { ship: p.s, ctx, fc: fleetCombat(p.s, ctx) };
        });
        drawAll();
      } catch (e) {
        document.getElementById('fl-grid').innerHTML = '<div class="fl-msg">Could not load the fleet: ' + esc(e.message) + '</div>';
      }
    }
    (async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) { window.location.href = '../../index.html'; return; }
      if (FLEET_NPC) {
        if (!isGM(session.user)) { document.getElementById('fl-grid').innerHTML = '<div class="fl-msg">The NPC Fleet is for the GM only.</div>'; return; }
      }
      await loadFleet();
    })();
