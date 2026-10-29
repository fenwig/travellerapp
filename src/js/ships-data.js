// Prey ships for the Piracy Encounter, built from docs/Traveller Ships.xlsx (rows with a Prey category).
// kinds = Prey categories; thrust = M-drive; srooms = staterooms; low = low berths; cargo = hold tons.
// est lists figures the spreadsheet left blank that were estimated (crew = tons/40, staterooms = crew, cargo = 40% of tons).
const PREY_SHIPS = [
  {"type":"Light Fighter","tons":10,"kinds":["Traveller"],"thrust":3,"srooms":0,"low":0,"crew":1,"cargo":2.5},
  {"type":"Light Fighter","tons":10,"kinds":["Traveller"],"thrust":6,"srooms":0,"low":0,"crew":1,"cargo":0},
  {"type":"Heavy Fighter","tons":50,"kinds":["Traveller"],"thrust":9,"srooms":2,"low":0,"crew":2,"cargo":1},
  {"type":"Type S Scout","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":11},
  {"type":"Type S Scout","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":12},
  {"type":"Scout","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":5},
  {"type":"Scout","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":15},
  {"type":"Hraye Scout","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":15},
  {"type":"Safari Ship","tons":200,"kinds":["Unusual Vessel"],"thrust":2,"srooms":11,"low":0,"crew":5,"cargo":14},
  {"type":"Seeker (Miner)","tons":200,"kinds":["Unusual Vessel"],"thrust":2,"srooms":4,"low":0,"crew":2,"cargo":61},
  {"type":"Far Trader (Type A2)","tons":200,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":0,"crew":3,"cargo":65},
  {"type":"Free Trader (Type A)","tons":200,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":20,"crew":4,"cargo":80},
  {"type":"Far Trader","tons":200,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":4,"crew":5,"cargo":57},
  {"type":"Courier","tons":200,"kinds":["Traveller"],"thrust":4,"srooms":7,"low":0,"crew":4,"cargo":3},
  {"type":"Messenger","tons":200,"kinds":["Traveller"],"thrust":1,"srooms":2,"low":0,"crew":3,"cargo":8},
  {"type":"Yacht","tons":200,"kinds":["Unusual Vessel"],"thrust":1,"srooms":13,"low":0,"crew":5,"cargo":21},
  {"type":"Ktiyhui Courier","tons":200,"kinds":["Traveller"],"thrust":4,"srooms":7,"low":0,"crew":6,"cargo":3},
  {"type":"Courier","tons":300,"kinds":["Traveller"],"thrust":2,"srooms":5,"low":6,"crew":6,"cargo":16},
  {"type":"Aoa'iw Trader","tons":300,"kinds":["Small Freighter"],"thrust":1,"srooms":8,"low":12,"crew":6,"cargo":86},
  {"type":"Trader","tons":400,"kinds":["Medium Freighter"],"thrust":1,"srooms":13,"low":16,"crew":4,"cargo":189},
  {"type":"Medium Transport","tons":400,"kinds":["Liner"],"thrust":4,"srooms":17,"low":0,"crew":9,"cargo":27},
  {"type":"Research Vessel","tons":400,"kinds":["Unusual Vessel"],"thrust":1,"srooms":15,"low":10,"crew":2,"cargo":28},
  {"type":"Laboratory Ship","tons":400,"kinds":["Unusual Vessel"],"thrust":2,"srooms":20,"low":0,"crew":4,"cargo":3},
  {"type":"Subsidized Merchant","tons":400,"kinds":["Medium Freighter"],"thrust":1,"srooms":19,"low":9,"crew":5,"cargo":201},
  {"type":"Eakhau Trader","tons":400,"kinds":["Small Freighter"],"thrust":1,"srooms":13,"low":16,"crew":4,"cargo":174},
  {"type":"Subsidized Liner","tons":600,"kinds":["Liner"],"thrust":1,"srooms":30,"low":10,"crew":6,"cargo":119},
  {"type":"Khtukhau Transport","tons":600,"kinds":["Liner"],"thrust":2,"srooms":25,"low":30,"crew":5,"cargo":149},
  {"type":"Long Range Trader","tons":800,"kinds":["Medium Freighter"],"thrust":2,"srooms":18,"low":0,"crew":6,"cargo":363},
  {"type":"Rift Trader","tons":900,"kinds":["Medium Freighter"],"thrust":2,"srooms":12,"low":0,"crew":12,"cargo":307.5},
  {"type":"Queen Elizabeth","tons":1200,"kinds":["Liner"],"thrust":1,"srooms":92,"low":20,"crew":14,"cargo":5},
  {"type":"Freighter","tons":3000,"kinds":["Heavy Freighter"],"thrust":2,"srooms":25,"low":0,"crew":17,"cargo":1937},
  {"type":"Cargo Carrier","tons":3000,"kinds":["Heavy Freighter"],"thrust":1,"srooms":44,"low":0,"crew":25,"cargo":1100},
  {"type":"Imperial Cargo","tons":1600,"kinds":["Medium Freighter"],"thrust":1,"srooms":20,"low":0,"crew":27,"cargo":429},
  {"type":"Freighter","tons":2000,"kinds":["Heavy Freighter"],"thrust":2,"srooms":12,"low":0,"crew":19,"cargo":1015},
  {"type":"Freighter","tons":1000,"kinds":["Heavy Freighter"],"thrust":1,"srooms":9,"low":0,"crew":14,"cargo":490},
  {"type":"Reach Freighter","tons":4000,"kinds":["Heavy Freighter"],"thrust":1,"srooms":48,"low":100,"crew":25,"cargo":2273}
];
// Random ship for a prey category.
function pickPreyShip(kind) {
  const list = PREY_SHIPS.filter(s => s.kinds.includes(kind));
  return list[Math.floor(Math.random() * list.length)] || null;
}

// Named ships from the Drinaxian Companion (sheet "Special Ships"). used = state in the spreadsheet when this file was built;
// the live used list is kept in the Supabase table special_ships_used. Blank figures count as 0.
const SPECIAL_SHIPS = [
  {"type":"Blank Slate","tons":40,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":11,"used":false},
  {"type":"Red Adder","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":8,"used":false},
  {"type":"Noseforgold","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":2,"low":0,"crew":3,"cargo":30,"used":false},
  {"type":"Meldas Bama","tons":100,"kinds":["Traveller"],"thrust":2,"srooms":4,"low":0,"crew":3,"cargo":11,"used":false},
  {"type":"Trojan Ranger","tons":100,"kinds":["Traveller"],"thrust":1,"srooms":11,"low":0,"crew":5,"cargo":11,"used":false},
  {"type":"Starlight Voyager","tons":200,"kinds":["Unusual Vessel"],"thrust":1,"srooms":13,"low":0,"crew":5,"cargo":16,"used":false},
  {"type":"Emma","tons":95,"kinds":["Small Freighter"],"thrust":3,"srooms":0,"low":0,"crew":1,"cargo":63,"used":false},
  {"type":"Sawnenson's Pride","tons":200,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":20,"crew":4,"cargo":80,"used":false},
  {"type":"Puttinalong","tons":80,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":20,"crew":4,"cargo":80,"used":false},
  {"type":"Pelzentin Della","tons":80,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":20,"crew":4,"cargo":80,"used":false},
  {"type":"Handow's Ship","tons":80,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":0,"crew":4,"cargo":65,"used":false},
  {"type":"Shebiigibuka","tons":80,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":0,"crew":4,"cargo":65,"used":false},
  {"type":"Carnise","tons":80,"kinds":["Small Freighter"],"thrust":1,"srooms":10,"low":0,"crew":4,"cargo":65,"used":false},
  {"type":"Uekh Etasieaheari","tons":400,"kinds":["Medium Freighter"],"thrust":1,"srooms":13,"low":16,"crew":4,"cargo":174,"used":false},
  {"type":"Ardasil Conveyor","tons":400,"kinds":["Medium Freighter"],"thrust":1,"srooms":19,"low":9,"crew":5,"cargo":200,"used":false},
  {"type":"Ikurdagur","tons":400,"kinds":["Medium Freighter"],"thrust":1,"srooms":19,"low":9,"crew":5,"cargo":200,"used":false},
  {"type":"Call Sign Alpha","tons":400,"kinds":["Rich Freighter"],"thrust":1,"srooms":19,"low":9,"crew":5,"cargo":200,"used":false},
  {"type":"Princely Challenger","tons":240,"kinds":["Liner"],"thrust":1,"srooms":60,"low":0,"crew":20,"cargo":60,"used":false},
  {"type":"JCV Arym Essden","tons":240,"kinds":["Liner"],"thrust":1,"srooms":60,"low":0,"crew":20,"cargo":60,"used":false},
  {"type":"Mendina","tons":160,"kinds":["Unusual Vessel"],"thrust":1,"srooms":40,"low":0,"crew":14,"cargo":60,"used":false},
  {"type":"Hero","tons":800,"kinds":["Unusual Vessel"],"thrust":3,"srooms":30,"low":0,"crew":13,"cargo":24,"used":false}
];
// Chance that a prey ship of each kind is one of the named special ships.
const SPECIAL_CHANCE = { 'Traveller': 25, 'Small Freighter': 30, 'Medium Freighter': 15, 'Rich Freighter': 10, 'Unusual Vessel': 15, 'Liner': 15 };
