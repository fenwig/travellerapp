// Trade Goods table — Core Rulebook (2022 update) pp.244–245.
// codes: trade codes that make the good available ('all' = Common Goods, available everywhere).
// tons:  [number of dice, multiplier]  e.g. [2, 10] = 2D x 10 tons.
// buy / sell: Purchase DM and Sale DM lists as [code, DM]; the largest matching DM applies.
//   Codes are trade codes (Ag As Ba De Fl Ga Hi Ht Ic In Lo Lt Na Ni Po Ri Va Wa)
//   plus the zones 'Amber' and 'Red'.
// illegal: sold only by black market suppliers.

const TRADE_GOODS = [
  // ── Common Goods (available on every world) ──
  { id: 11, name: 'Common Electronics',        codes: 'all', tons: [2, 10], price: 20000,  buy: [['In',2],['Ht',3],['Ri',1]],            sell: [['Ni',2],['Lt',1],['Po',1]],                 example: 'Simple electronics including basic computers up to TL10' },
  { id: 12, name: 'Common Industrial Goods',   codes: 'all', tons: [2, 10], price: 10000,  buy: [['Na',2],['In',5]],                     sell: [['Ni',3],['Ag',2]],                          example: 'Machine components and spare parts for common machinery' },
  { id: 13, name: 'Common Manufactured Goods', codes: 'all', tons: [2, 10], price: 20000,  buy: [['Na',2],['In',5]],                     sell: [['Ni',3],['Hi',2]],                          example: 'Household appliances, clothing and so forth' },
  { id: 14, name: 'Common Raw Materials',      codes: 'all', tons: [2, 20], price: 5000,   buy: [['Ag',3],['Ga',2]],                     sell: [['In',2],['Po',2]],                          example: 'Metal, plastics, chemicals and other basic materials' },
  { id: 15, name: 'Common Consumables',        codes: 'all', tons: [2, 20], price: 500,    buy: [['Ag',3],['Wa',2],['Ga',1],['As',-4]],  sell: [['As',1],['Fl',1],['Ic',1],['Hi',1]],        example: 'Food, drink and other agricultural products' },
  { id: 16, name: 'Common Ore',                codes: 'all', tons: [2, 20], price: 1000,   buy: [['As',4]],                              sell: [['In',3],['Ni',1]],                          example: 'Ore bearing common metals' },

  // ── Trade Goods (available on worlds with a matching trade code) ──
  { id: 21, name: 'Advanced Electronics',       codes: ['In','Ht'],            tons: [1, 5],  price: 100000,  buy: [['In',2],['Ht',3]],                  sell: [['Ni',1],['Ri',2],['As',3]],                 example: 'Advanced sensors, computers and other electronics up to TL15' },
  { id: 22, name: 'Advanced Machine Parts',     codes: ['In','Ht'],            tons: [1, 5],  price: 75000,   buy: [['In',2],['Ht',1]],                  sell: [['As',2],['Ni',1]],                          example: 'Machine components and spare parts, including gravitic components' },
  { id: 23, name: 'Advanced Manufactured Goods',codes: ['In','Ht'],            tons: [1, 5],  price: 100000,  buy: [['In',1]],                           sell: [['Hi',1],['Ri',2]],                          example: 'Devices and clothing incorporating advanced technologies' },
  { id: 24, name: 'Advanced Weapons',           codes: ['In','Ht'],            tons: [1, 5],  price: 150000,  buy: [['Ht',2]],                           sell: [['Po',1],['Amber',2],['Red',4]],             example: 'Firearms, explosives, ammunition, artillery and other military-grade weaponry' },
  { id: 25, name: 'Advanced Vehicles',          codes: ['In','Ht'],            tons: [1, 5],  price: 180000,  buy: [['Ht',2]],                           sell: [['As',2],['Ri',2]],                          example: 'Air/rafts, spacecraft, grav tanks and other vehicles up to TL15' },
  { id: 26, name: 'Biochemicals',               codes: ['Ag','Wa'],            tons: [1, 5],  price: 50000,   buy: [['Ag',1],['Wa',2]],                  sell: [['In',2]],                                   example: 'Biofuels, organic chemicals, extracts' },

  { id: 31, name: 'Crystals & Gems',            codes: ['As','De','Ic'],      tons: [1, 5],  price: 20000,   buy: [['As',2],['De',1],['Ic',1]],         sell: [['In',3],['Ri',2]],                          example: 'Diamonds, synthetic or natural gemstones' },
  { id: 32, name: 'Cybernetics',                codes: ['Ht'],                tons: [1, 1],  price: 250000,  buy: [['Ht',1]],                           sell: [['As',1],['Ic',1],['Ri',2]],                 example: 'Cybernetic components, replacement limbs' },
  { id: 33, name: 'Live Animals',               codes: ['Ag','Ga'],           tons: [1, 10], price: 10000,   buy: [['Ag',2]],                           sell: [['Lo',3]],                                   example: 'Riding animals, beasts of burden, exotic pets' },
  { id: 34, name: 'Luxury Consumables',         codes: ['Ag','Ga','Wa'],      tons: [1, 10], price: 20000,   buy: [['Ag',2],['Wa',1]],                  sell: [['Ri',2],['Hi',2]],                          example: 'Rare foods, fine liquors' },
  { id: 35, name: 'Luxury Goods',               codes: ['Hi'],                tons: [1, 1],  price: 200000,  buy: [['Hi',1]],                           sell: [['Ri',4]],                                   example: 'Rare or extremely high-quality manufactured goods' },
  { id: 36, name: 'Medical Supplies',           codes: ['Ht','Hi'],           tons: [1, 5],  price: 50000,   buy: [['Ht',2]],                           sell: [['In',2],['Po',1],['Ri',1]],                 example: 'Diagnostic equipment, basic drugs, cloning technology' },

  { id: 41, name: 'Petrochemicals',             codes: ['De','Fl','Ic','Wa'], tons: [1, 10], price: 10000,   buy: [['De',2]],                           sell: [['In',2],['Ag',1],['Lt',2]],                 example: 'Oil, liquid fuels' },
  { id: 42, name: 'Pharmaceuticals',            codes: ['As','De','Hi','Wa'], tons: [1, 1],  price: 100000,  buy: [['As',2],['Hi',1]],                  sell: [['Ri',2],['Lt',1]],                          example: 'Drugs, medical supplies, anagathics, fast or slow drugs' },
  { id: 43, name: 'Polymers',                   codes: ['In'],                tons: [1, 10], price: 7000,    buy: [['In',1]],                           sell: [['Ri',2],['Ni',1]],                          example: 'Plastics and other synthetics' },
  { id: 44, name: 'Precious Metals',            codes: ['As','De','Ic','Fl'], tons: [1, 1],  price: 50000,   buy: [['As',3],['De',1],['Ic',2]],         sell: [['Ri',3],['In',2],['Ht',1]],                 example: 'Gold, silver, platinum, rare elements' },
  { id: 45, name: 'Radioactives',               codes: ['As','De','Lo'],      tons: [1, 1],  price: 1000000, buy: [['As',2],['Lo',2]],                  sell: [['In',3],['Ht',1],['Ni',-2],['Ag',-3]],      example: 'Uranium, plutonium, unobtanium, rare elements' },
  { id: 46, name: 'Robots',                     codes: ['In'],                tons: [1, 5],  price: 400000,  buy: [['In',1]],                           sell: [['Ag',2],['Ht',1]],                          example: 'Industrial and personal robots and drones' },

  { id: 51, name: 'Spices',                     codes: ['Ga','De','Wa'],      tons: [1, 10], price: 6000,    buy: [['De',2]],                           sell: [['Hi',2],['Ri',3],['Po',3]],                 example: 'Preservatives, luxury food additives, natural drugs' },
  { id: 52, name: 'Textiles',                   codes: ['Ag','Ni'],           tons: [1, 20], price: 3000,    buy: [['Ag',7]],                           sell: [['Hi',3],['Na',2]],                          example: 'Clothing and fabrics' },
  { id: 53, name: 'Uncommon Ore',               codes: ['As','Ic'],           tons: [1, 20], price: 5000,    buy: [['As',4]],                           sell: [['In',3],['Ni',1]],                          example: 'Ore containing precious or valuable metals' },
  { id: 54, name: 'Uncommon Raw Materials',     codes: ['Ag','De','Wa'],      tons: [1, 10], price: 20000,   buy: [['Ag',2],['Wa',1]],                  sell: [['In',2],['Ht',1]],                          example: 'Valuable metals like titanium, rare elements' },
  { id: 55, name: 'Wood',                       codes: ['Ag','Ga'],           tons: [1, 20], price: 1000,    buy: [['Ag',6]],                           sell: [['Ri',2],['In',1]],                          example: 'Hard or beautiful woods and plant extracts' },
  { id: 56, name: 'Vehicles',                   codes: ['In','Ht'],           tons: [1, 10], price: 15000,   buy: [['In',2],['Ht',1]],                  sell: [['Ni',2],['Hi',1]],                          example: 'Wheeled, tracked and other vehicles from TL10 or lower' },

  // ── Illegal goods (black market suppliers only) ──
  { id: 61, name: 'Illegal Biochemicals',       codes: ['Ag','Wa'],           tons: [1, 5],  price: 50000,   buy: [['Wa',2]],                           sell: [['In',6]],                                   example: 'Dangerous chemicals, extracts from endangered species', illegal: true },
  { id: 62, name: 'Cybernetics, Illegal',       codes: ['Ht'],                tons: [1, 1],  price: 250000,  buy: [['Ht',1]],                           sell: [['As',4],['Ic',4],['Ri',8],['Amber',6],['Red',6]], example: 'Combat cybernetics, illegal enhancements', illegal: true },
  { id: 63, name: 'Drugs, Illegal',             codes: ['As','De','Hi','Wa'], tons: [1, 1],  price: 100000,  buy: [['As',1],['De',1],['Ga',1],['Wa',1]],sell: [['Ri',6],['Hi',6]],                          example: 'Addictive drugs, combat drugs', illegal: true },
  { id: 64, name: 'Luxuries, Illegal',          codes: ['Ag','Ga','Wa'],      tons: [1, 1],  price: 50000,   buy: [['Ag',2],['Wa',1]],                  sell: [['Ri',6],['Hi',4]],                          example: 'Debauched or addictive luxuries', illegal: true },
  { id: 65, name: 'Weapons, Illegal',           codes: ['In','Ht'],           tons: [1, 5],  price: 150000,  buy: [['Ht',2]],                           sell: [['Po',6],['Amber',8],['Red',10]],            example: 'Weapons of mass destruction, naval weapons', illegal: true }
  // 66 Exotics: outside the normal trade rules — a matter for roleplaying and adventure.
];
