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
  {"type":"Freighter","tons":1000,"kinds":["Heavy Freighter"],"thrust":1,"srooms":9,"low":0,"crew":14,"cargo":490}
];
// Random ship for a prey category.
function pickPreyShip(kind) {
  const list = PREY_SHIPS.filter(s => s.kinds.includes(kind));
  return list[Math.floor(Math.random() * list.length)] || null;
}
