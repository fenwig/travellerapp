// Pirates of Drinax — port attitude data (Book 1, Chapter 3 "Port Attitude" and Appendix 2).
// Rows are [sector, world, hex, starting attitude]. Appendix 2 text came out of the PDF garbled, so the
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
  ['Sindal', 'Ace', '0109', 'Suspicious'],
  ['Sindal', 'Number One', '0208', 'Suspicious'],
  ['Sindal', 'Thebus', '0309', 'Tolerant'],
  ['Sindal', 'Noricum', '0408', 'Hostile'],
  ['Sindal', 'Oghma', '0410', 'Neutral'],
  ['Sindal', 'Vume', '0505', 'Suspicious'],
  ['Sindal', 'Theev', '0506', 'Friendly'],
  ['Sindal', 'Marduk', '0510', 'Neutral'],
  ['Sindal', 'Palindrome', '0606', 'Neutral'],
  ['Sindal', 'Borite', '0609', 'Suspicious'],
  ['Sindal', 'Chalchiutlicu', '0704', 'Suspicious'],
  // Tobia
  ['Tobia', 'Boulder', '0107', 'Suspicious'],
  ['Tobia', 'Exocet', '0110', 'Suspicious'],
  ['Tobia', 'Scaladon', '0206', 'Hostile'],
  ['Tobia', 'Iilgan', '0309', 'Suspicious'],
  ['Tobia', 'Wildeman', '0409', 'Neutral'],
  ['Tobia', 'Pandora', '0410', 'Neutral'],
  // Tliowaha
  ['Tliowaha', 'Khusai', '0403', 'Unfriendly'],
  ['Tliowaha', 'Asim', '0503', 'Neutral'],
  ['Tliowaha', 'Kteiroa', '0505', 'Unfriendly'],
  ['Tliowaha', 'Torpol', '0601', 'Unfriendly'],
  ['Tliowaha', 'Drinax', '0603', 'Haven'],
  ['Tliowaha', 'Tyokh', '0606', 'Suspicious'],
  ['Tliowaha', 'Iroioah', '0607', 'Neutral'],
  ['Tliowaha', 'Clarke', '0702', 'Neutral'],
  ['Tliowaha', 'Pourne', '0704', 'Suspicious'],
  ['Tliowaha', 'The World', '0707', 'Tolerant'],
  ['Tliowaha', 'Vorito', '0709', 'Hostile'],
  ['Tliowaha', 'Blue', '0801', 'Suspicious'],
  ['Tliowaha', 'Hilfer', '0804', 'Hostile'],
  ['Tliowaha', 'Paal', '0805', 'Suspicious'],
  ['Tliowaha', 'Sink', '0806', 'Tolerant'],
  ['Tliowaha', 'Fantasy', '0808', 'Tolerant'],
  // Borderlands
  ['Borderlands', 'Byrni', '0107', 'Suspicious'],
  ['Borderlands', 'Arunisiir', '0201', 'Tolerant'],
  ['Borderlands', 'Tech-World', '0204', 'Neutral'],
  ['Borderlands', 'Ergo', '0205', 'Tolerant'],
  ['Borderlands', 'Tanith', '0301', 'Tolerant'],
  ['Borderlands', 'Acrid', '0302', 'Suspicious'],
  ['Borderlands', 'Inurin', '0304', 'Suspicious'],
  ['Borderlands', 'Falcon', '0305', 'Suspicious'],
  ['Borderlands', 'Cordan', '0401', 'Suspicious'],
  ['Borderlands', 'Exe', '0403', 'Tolerant'],
  ['Borderlands', 'Sperle', '0404', 'Hostile'],
  ['Borderlands', 'Umemii', '0501', 'Suspicious'],
  ['Borderlands', 'Argona', '0503', 'Suspicious']
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
