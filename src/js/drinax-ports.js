// Pirates of Drinax — port attitude data (Book 1, Chapter 3 "Port Attitude" and Appendix 2).
// Rows are [sector, world, hex, starting attitude, UWP, trade codes, policy profile (Government/Security/Technology;
// '-' is a null rating, X means no grounds for negotiation)]. Appendix 2 text came out of the PDF garbled, so the
// attitudes were matched to worlds by list order; check them against the book (printed p.280s).
const PORT_LEVELS = ['Haven', 'Friendly', 'Tolerant', 'Neutral', 'Suspicious', 'Unfriendly', 'Hostile'];

// Fence % is the pirates' share of the normal value of stolen goods. Arrest/Spies/Protection are 2D targets.
// The book prints "Tolerant" twice; the second row (10%, 9+) is almost certainly Neutral.
const PORT_EFFECTS = {
  Haven:      { fence: '30%', recruit: '3+',  arrest: '-',   spies: '12+', protect: '3+' },
  Friendly:   { fence: '25%', recruit: '5+',  arrest: '-',   spies: '12+', protect: '7+' },
  Tolerant:   { fence: '20%', recruit: '7+',  arrest: '12+', spies: '10+', protect: '11+' },
  Neutral:    { fence: '10%', recruit: '9+',  arrest: '12+', spies: '10+', protect: '-' },
  Suspicious: { fence: '10%', recruit: '11+', arrest: '10+', spies: '8+',  protect: '-' },
  Unfriendly: { fence: '-',   recruit: '12+', arrest: '10+', spies: '8+',  protect: '-' },
  Hostile:    { fence: '-',   recruit: '-',   arrest: '2+',  spies: '2+',  protect: '-' }
};

// Starting level from Law Level, for worlds not in the list.
function attitudeFromLaw(law) {
  return law <= 2 ? 'Tolerant' : law <= 5 ? 'Neutral' : law <= 9 ? 'Suspicious' : law <= 11 ? 'Unfriendly' : 'Hostile';
}

const DRINAX_PORTS = [
  // Sindal
  ['Sindal', 'Ace', '0109', 'Suspicious', 'E7A08B9-5', 'De Lt', '-11'],
  ['Sindal', 'Number One', '0208', 'Suspicious', 'C9C6778-7', 'Fl', '1-3'],
  ['Sindal', 'Thebus', '0309', 'Tolerant', 'B534320-6', 'Po Ni Lo', '22-'],
  ['Sindal', 'Noricum', '0408', 'Hostile', 'D8867BB-1', 'Ag Lt', '211'],
  ['Sindal', 'Oghma', '0410', 'Neutral', 'B214754-9', 'Ic', '001'],
  ['Sindal', 'Vume', '0505', 'Suspicious', 'B100477-C', 'Ni Va An', '-22'],
  ['Sindal', 'Theev', '0506', 'Friendly', 'A434500-F', 'Na Ni Ht', '-00'],
  ['Sindal', 'Marduk', '0510', 'Neutral', 'C377436-3', 'Ni Lt', '---'],
  ['Sindal', 'Palindrome', '0606', 'Neutral', 'B433334-B', 'Po Ni Lo', '203'],
  ['Sindal', 'Borite', '0609', 'Suspicious', 'E655796-4', 'Ag Lt', '121'],
  ['Sindal', 'Chalchiutlicu', '0704', 'Suspicious', 'B76A787-7', 'Ri Wa', '0-1'],
  // Tobia
  ['Tobia', 'Boulder', '0107', 'Suspicious', 'D100758-9', 'Va Na', '021'],
  ['Tobia', 'Exocet', '0110', 'Suspicious', 'A574126-8', 'Ni Lo', '1-2'],
  ['Tobia', 'Scaladon', '0206', 'Hostile', 'AAD98DK-A', 'Fl', '0-3'],
  ['Tobia', 'Iilgan', '0309', 'Suspicious', 'C467787-8', 'Ag Ri', '231'],
  ['Tobia', 'Wildeman', '0409', 'Neutral', 'B201674-C', 'Ic Na Ni Va', '231'],
  ['Tobia', 'Pandora', '0410', 'Neutral', 'B878313-B', 'Ni Lo', '-2-'],
  // Tliowaha
  ['Tliowaha', 'Khusai', '0403', 'Unfriendly', 'A5766M5-C', 'Ag Ni Ht', 'X21'],
  ['Tliowaha', 'Asim', '0503', 'Neutral', 'B867564-6', 'Ag Ni', '222'],
  ['Tliowaha', 'Kteiroa', '0505', 'Unfriendly', 'C4601K4-8', 'De Lo Ni', '01-'],
  ['Tliowaha', 'Torpol', '0601', 'Unfriendly', 'B55A77A-8', 'Wa', '121'],
  ['Tliowaha', 'Drinax', '0603', 'Haven', 'A33645C-F', 'Ni Ht', 'N/A'],
  ['Tliowaha', 'Tyokh', '0606', 'Suspicious', 'B466AH7-E', 'Hi Ht', 'XXX'],
  ['Tliowaha', 'Iroioah', '0607', 'Neutral', 'B6301G3-E', 'De Po Ni Lo Ht', 'XXX'],
  ['Tliowaha', 'Clarke', '0702', 'Neutral', 'B899753-8', '', '33-'],
  ['Tliowaha', 'Pourne', '0704', 'Suspicious', 'A9B2887-A', 'Fl', '133'],
  ['Tliowaha', 'The World', '0707', 'Tolerant', 'E100551-6', 'In Ni Va', '0-2'],
  ['Tliowaha', 'Vorito', '0709', 'Hostile', 'E595ABB-A', 'In Hi', 'XXX'],
  ['Tliowaha', 'Blue', '0801', 'Suspicious', 'B443487-C', 'Po Ni Ht', '010'],
  ['Tliowaha', 'Hilfer', '0804', 'Hostile', 'BA5077A-6', 'De Po', '221'],
  ['Tliowaha', 'Paal', '0805', 'Suspicious', 'B564679-6', 'Ag Ni Ri', '222'],
  ['Tliowaha', 'Sink', '0806', 'Tolerant', 'D665220-5', 'Ni Lo Lt', '0--'],
  ['Tliowaha', 'Fantasy', '0808', 'Tolerant', 'E788400-2', 'Ni Lt', '112'],
  // Borderlands
  ['Borderlands', 'Byrni', '0107', 'Suspicious', 'B955699-6', 'Ag Ni', '330'],
  ['Borderlands', 'Arunisiir', '0201', 'Tolerant', 'B776530-6', 'Ag Ni', '211'],
  ['Borderlands', 'Tech-World', '0204', 'Neutral', 'A455154-F', 'Ni Lo Ht', '020'],
  ['Borderlands', 'Ergo', '0205', 'Tolerant', 'X767500-0', 'Ag Ni Lt', '2-2'],
  ['Borderlands', 'Tanith', '0301', 'Tolerant', 'A589342-B', 'Ni Lo', '122'],
  ['Borderlands', 'Acrid', '0302', 'Suspicious', 'AAC1388-D', 'Fl Lo Ni Ht', '111'],
  ['Borderlands', 'Inurin', '0304', 'Suspicious', 'E668776-5', 'Ag Ri Lt', '2-0'],
  ['Borderlands', 'Falcon', '0305', 'Suspicious', 'A158448-D', 'Ni Ht', '121'],
  ['Borderlands', 'Cordan', '0401', 'Suspicious', 'A895347-9', 'Ni Lo', '211'],
  ['Borderlands', 'Exe', '0403', 'Tolerant', 'B300101-A', 'Ni Va Lo', '00-'],
  ['Borderlands', 'Sperle', '0404', 'Hostile', 'BA8A76A-7', 'Ri Wa', '12-'],
  ['Borderlands', 'Umemii', '0501', 'Suspicious', 'C521877-6', 'Na Po', '112'],
  ['Borderlands', 'Argona', '0503', 'Suspicious', 'B612586-9', 'Ic Ni', '122']
];

// Standing (Book 1, "Standing"): the Imperium starts at 0, the Hierate at -5.
const STANDING_START = { Imperium: 0, Hierate: -5 };

// Highest threshold first.
const STANDING_BANDS = [
  [20,  'Ally',     'All ports belonging to the power are now Friendly, and the pirates gain SOC+2 within its territory.'],
  [6,   'Tolerated', 'The power overlooks the excesses. All its ports are now Tolerant of the pirates.'],
  [-5,  'Ignored',  'No effect.'],
  [-20, 'Irritant', 'A bounty of Cr1000 x 1D x the pirate\'s Standing (reversing the negative) is placed on their head.'],
  [-40, 'Infamy',   'A patrol is dispatched to hunt down the pirate menace in the reach.'],
  [-Infinity, 'Enemy of the State', 'Hounded by agents of the power, from assassins to naval ships. Any port not already Friendly or better drops one attitude level.']
];

function standingBand(v) {
  return STANDING_BANDS.find(b => v >= b[0]);
}

// Incident types: dice is how many D6 to roll; sign is the effect on the power the incident is aimed at.
const STANDING_INCIDENTS = [
  { id: 'cargo',   label: 'Stole over Cr100,000 of cargo', flat: -1, count: true },
  { id: 'infamous', label: 'Infamous Incident (large theft, captured ships, rocked the boat)', dice: 1, sign: -1 },
  { id: 'atrocity', label: 'Atrocity (destroyed ships, murdered prisoners, broke the code)', dice: 1, sign: -1 },
  { id: 'interfere', label: 'Interference (scouts, couriers, convoys, starports, refuelling)', dice: 1, sign: -1 },
  { id: 'heroic',  label: 'Heroic Deed (attacked pirates or hurt the other power)', dice: 1, sign: 1 }
];

// Allies toward the Kingdom: Friendly or Haven worlds the Travellers have charted. Drinax and Theev are the starting
// friends and do not count toward the target. Twelve is the minimum goal, but the count can go past it.
const ALLY_TARGET = 12;
const ALLY_EXCLUDED = ['Drinax', 'Theev'];
function countAllies(ports) {
  return ports.filter(p => p.on_map && (p.attitude === 'Haven' || p.attitude === 'Friendly') && !ALLY_EXCLUDED.includes(p.world)).length;
}
// A bar that grows past the target; the tick marks the minimum goal.
function allyBarHtml(allies) {
  const max = Math.max(ALLY_TARGET, allies), met = allies >= ALLY_TARGET;
  return `<div class="ab-goal"><b class="${met ? 'ab-met' : ''}">${allies}</b> worlds Friendly or better<div class="ab-sub">Minimum goal: ${ALLY_TARGET}. Drinax and Theev do not count.</div></div>
    <div class="ab-track"><div class="ab-fill ${met ? 'ab-met-bg' : ''}" style="width:${(allies / max * 100).toFixed(1)}%"></div>
      <div class="ab-tick" style="left:${(ALLY_TARGET / max * 100).toFixed(1)}%"><span>${ALLY_TARGET}</span></div></div>`;
}

// Political borders for the map, measured from a Traveller Map screenshot of the four subsectors (shaded red for the
// Third Imperium, yellow for the Aslan Hierate). Hexes are listed by map column (1-16 across Sindal, Tobia on the top
// row; Tliowaha, Borderlands below) then rows (1-20 down), the same grid the map page draws. Borders outside the four
// subsectors are not included.
const REACH_REGIONS = {
  Imperium: {
    6: [1, 2, 3], 7: [2, 3], 8: [1, 2, 3], 9: [1, 2, 3, 4, 5], 10: [1, 2, 3, 4, 5, 6], 11: [1, 2, 3, 4, 5, 6, 7],
    12: [1, 2, 3, 4, 5, 6, 7], 13: [1, 2, 3, 4, 5, 6, 7, 8], 14: [1, 2, 3, 4, 5, 6, 7, 8],
    15: [1, 2, 3, 4, 5, 6, 7, 8, 9], 16: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  Hierate: {
    1: [12, 13, 14, 15, 16, 17, 18, 19, 20], 2: [12, 13, 14, 15, 16, 17, 18, 19, 20], 3: [13, 14, 15, 16, 17, 18, 19, 20],
    4: [13, 14, 15, 16, 17, 18, 19, 20], 5: [15, 16, 17, 18, 19, 20], 6: [16, 17, 18, 19, 20]
  }
};

// What a world wants from the reborn Kingdom, in words, from its policy profile (Government, Security, Technology as
// three characters: 0-3, '-' for no view, 'X' for no grounds for negotiation). Wording follows the Finale's "Shaping
// Royal Policy" (Book 1, pp.247-248). Returns [{ label, text }], or null when the profile is not readable.
const POLICY_WORDS = {
  Government: ['to stay independent, with Drinax only first among equals', 'a parliament where every world is represented',
    'a feudal order, with the larger worlds as duchies', 'a strong king ruling from Drinax'],
  Security: ['piracy tolerated, even encouraged', 'little change: piracy outlawed but often overlooked',
    'a crackdown on piracy and a strong navy', 'a warrior king with a great fleet, and piracy outlawed'],
  Technology: ['Drinax keeping its technology to itself', 'factories on member worlds and the Scholar\'s Tower open to their students',
    'some technology shared, for a price', 'Drinax lifting everyone to higher technology']
};
function policyWants(policy) {
  const m = /^([0-3X-])([0-3X-])([0-3X-])$/.exec(String(policy || '').trim().toUpperCase());
  if (!m) return null;
  const keys = Object.keys(POLICY_WORDS);
  if (m.slice(1).every(c => c === '-')) return [{ label: '', text: 'No strong views on how the Kingdom is run.' }];
  return keys.map((k, i) => {
    const c = m[i + 1];
    return { label: k, text: c === '-' ? 'no strong view' : c === 'X' ? 'will not negotiate on this' : POLICY_WORDS[k][+c] };
  });
}
