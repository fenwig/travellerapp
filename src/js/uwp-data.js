// UWP (Universal World Profile) decoder. Tables are from the Traveller Core Rulebook (World Creation: Size,
// Atmosphere, Hydrographics, Population, Government, Law Level, Starport) and, for Aslan government codes G-N,
// The Trojan Reach ("Creating Aslan Worlds"). A UWP reads  C4601K4-8  =  Starport, Size, Atmosphere,
// Hydrographics, Population, Government, Law Level, then - and Tech Level. Codes above 9 use letters
// (A=10 ... H=17, J=18, K=19 ...; I and O are skipped).
const UWP_HEX = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const uwpVal = ch => UWP_HEX.indexOf(String(ch).toUpperCase());

const UWP_STARPORT = { A: 'Excellent', B: 'Good', C: 'Routine', D: 'Poor', E: 'Frontier', X: 'No starport' };
const UWP_SIZE = [   // diameter and surface gravity
  'Under 1,000 km (asteroid or orbital complex), negligible gravity', '1,600 km, 0.05 G', '3,200 km, 0.15 G', '4,800 km, 0.25 G', '6,400 km, 0.35 G',
  '8,000 km, 0.45 G', '9,600 km, 0.7 G', '11,200 km, 0.9 G', '12,800 km, 1.0 G', '14,400 km, 1.25 G', '16,000 km, 1.4 G'];
const UWP_ATMOSPHERE = ['None', 'Trace', 'Very Thin, Tainted', 'Very Thin', 'Thin, Tainted', 'Thin', 'Standard', 'Standard, Tainted',
  'Dense', 'Dense, Tainted', 'Exotic', 'Corrosive', 'Insidious', 'Very Dense', 'Low', 'Unusual'];
const UWP_HYDRO = ['Desert world (0-5%)', 'Dry world (6-15%)', 'A few small seas (16-25%)', 'Small seas and oceans (26-35%)', 'Wet world (36-45%)',
  'A large ocean (46-55%)', 'Large oceans (56-65%)', 'Earth-like world (66-75%)', 'Only a few islands and archipelagos (76-85%)',
  'Almost entirely water (86-95%)', 'Waterworld (96-100%)'];
const UWP_POPULATION = ['None', 'Few', 'Hundreds', 'Thousands', 'Tens of thousands', 'Hundreds of thousands', 'Millions', 'Tens of millions',
  'Hundreds of millions', 'Billions', 'Tens of billions', 'Hundreds of billions', 'Trillions'];
const UWP_GOVERNMENT = {
  0: 'None', 1: 'Company/Corporation', 2: 'Participating Democracy', 3: 'Self-Perpetuating Oligarchy', 4: 'Representative Democracy',
  5: 'Feudal Technocracy', 6: 'Captive Government', 7: 'Balkanisation', 8: 'Civil Service Bureaucracy', 9: 'Impersonal Bureaucracy',
  A: 'Charismatic Dictator', B: 'Non-Charismatic Leader', C: 'Charismatic Oligarchy', D: 'Religious Dictatorship', E: 'Religious Autocracy',
  F: 'Totalitarian Oligarchy',
  // Aslan worlds (Trojan Reach book)
  G: 'Aslan: Small station or facility (run by an offworld clan or a company)', H: 'Aslan: Split control (several on-planet clans)',
  J: 'Aslan: Single on-world clan control', K: 'Aslan: Single multi-world clan control', L: 'Aslan: Major clan control (one of the Twenty-Nine)',
  M: 'Aslan: Vassal clan control (in fief to a larger clan)', N: 'Aslan: Major vassal clan control (in fief to one of the Twenty-Nine)'
  // Other codes seen on some maps (Vargr, Solomani, Zhodani and so on) are not in these books, so they show as Unknown.
};
const UWP_LAW = ['No restrictions', 'Poison gas, explosives, undetectable weapons and WMD banned', 'Portable energy and laser weapons banned',
  'Military weapons banned', 'Light assault weapons and submachine guns banned', 'Personal concealable weapons banned',
  'All firearms except shotguns and stunners banned; carrying weapons discouraged', 'Shotguns banned', 'All bladed weapons and stunners banned'];

// Returns [{ label, code, text }] for a UWP string like "C4601K4-8", or null if it cannot be read.
function decodeUwp(uwp) {
  const m = /^([A-EX])([0-9A-Z])([0-9A-Z])([0-9A-Z])([0-9A-Z])([0-9A-Z])([0-9A-Z])-([0-9A-Z])$/i.exec(String(uwp || '').trim());
  if (!m) return null;
  const c = m.slice(1).map(s => s.toUpperCase()), v = c.map(uwpVal);
  const pick = (arr, i, fallback) => arr[v[i]] != null ? arr[v[i]] : (fallback || 'Unknown');
  return [
    { label: 'Starport Quality', code: c[0], text: UWP_STARPORT[c[0]] || 'Unknown' },
    { label: 'Size', code: c[1], text: pick(UWP_SIZE, 1) },
    { label: 'Atmosphere Type', code: c[2], text: pick(UWP_ATMOSPHERE, 2) },
    { label: 'Hydrographics', code: c[3], text: pick(UWP_HYDRO, 3) },
    { label: 'Population', code: c[4], text: pick(UWP_POPULATION, 4) },
    { label: 'Government Type', code: c[5], text: UWP_GOVERNMENT[c[5]] || 'Unknown' },
    { label: 'Law Level', code: c[6], text: v[6] >= 9 ? 'All weapons and armour banned' : pick(UWP_LAW, 6) },
    { label: 'Tech Level', code: String(v[7]), text: '' }
  ];
}
