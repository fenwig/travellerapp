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
