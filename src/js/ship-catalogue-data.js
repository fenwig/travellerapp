// Ship catalogue: published designs from High Guard (2022 update), read from the ship pages.
// SAMPLE of five ships to check before the rest are added. Costs are in MCr; "total" is the table total,
// "purchase" is the printed purchase cost; maintenance is Cr per month. "page" is the printed page of the spec table.
// power = power plant output. structure = the hull points printed as "Hull: N". Crew lists the posts the book names.
const SHIP_CATALOGUE = [
  {
    id: 'hg-scout-courier-s', name: 'Scout/Courier', cls: 'Type S (Sulieman class)', role: 'Scout',
    source: { book: 'High Guard', page: 160 },
    tl: 12, tons: 100, hull: 'Streamlined', armour: { type: 'Crystaliron', value: 4 },
    thrust: 2, jump: 2, power: 60, fuel: 'J-2, 12 weeks of operation', structure: 40,
    computer: 'Computer/5bis', sensors: 'Military Grade', bridge: 'Standard',
    weapons: [{ name: 'Double Turret (empty)', mount: 'Turret', count: 1 }],
    staterooms: 4, lowBerths: 0, barracks: 0, cargo: 11,
    craft: ['Air/Raft'], systems: ['Fuel Processor (40 tons/day)', 'Fuel Scoops', 'Probe Drones x10', 'Workshop', 'Docking Space (4 tons)'],
    software: ['Manoeuvre', 'Jump Control/2', 'Library', 'Intellect'],
    crew: [{ role: 'Pilot', count: 1 }, { role: 'Astrogator', count: 1 }, { role: 'Engineer', count: 1 }],
    total: 41.045, purchase: 36.9405, maintenance: 3079
  },
  {
    id: 'hg-free-trader-a', name: 'Free Trader', cls: 'Type A (Beowulf class)', role: 'Merchant',
    source: { book: 'High Guard', page: 171 },
    tl: 12, tons: 200, hull: 'Streamlined', armour: { type: 'Crystaliron', value: 2 },
    thrust: 1, jump: 1, power: 75, fuel: 'J-1, 4 weeks of operation', structure: 80,
    computer: 'Computer/5', sensors: 'Civilian Grade', bridge: 'Standard',
    weapons: [],
    staterooms: 10, lowBerths: 20, barracks: 0, cargo: 80,
    craft: [], systems: ['Fuel Processor (20 tons/day)', 'Fuel Scoops', 'Cargo Crane'],
    software: ['Manoeuvre', 'Jump Control/1', 'Library', 'Intellect'],
    crew: [{ role: 'Pilot', count: 1 }, { role: 'Astrogator', count: 1 }, { role: 'Engineer', count: 1 }, { role: 'Steward', count: 1 }],
    total: 51.38, purchase: 46.242, maintenance: 3854
  },
  {
    id: 'hg-far-trader-a2', name: 'Far Trader', cls: 'Type A2 (Hero class)', role: 'Merchant',
    source: { book: 'High Guard', page: 169 },
    tl: 12, tons: 200, hull: 'Streamlined', armour: { type: 'Crystaliron', value: 2 },
    thrust: 1, jump: 2, power: 75, fuel: 'J-2, 4 weeks of operation', structure: 80,
    computer: 'Computer/5bis', sensors: 'Civilian Grade', bridge: 'Standard',
    weapons: [],
    staterooms: 10, lowBerths: 0, barracks: 0, cargo: 65,
    craft: [], systems: ['Fuel Processor (40 tons/day)', 'Fuel Scoops', 'Cargo Crane'],
    software: ['Manoeuvre', 'Jump Control/2', 'Library', 'Intellect'],
    crew: [{ role: 'Pilot', count: 1 }, { role: 'Astrogator', count: 1 }, { role: 'Engineer', count: 1 }, { role: 'Steward', count: 1 }],
    total: 58.045, purchase: 52.2405, maintenance: 4353,
    notes: 'Tight power budget: the manoeuvre drive must shut down ("jump dimming") to have enough power to jump.'
  },
  {
    id: 'hg-corsair-p', name: 'Corsair', cls: 'Type P (Nishemani class)', role: 'Pirate',
    source: { book: 'High Guard', page: 196 },
    tl: 15, tons: 400, hull: 'Standard (Adjustable Hull)', armour: { type: 'Bonded Superdense', value: 5 },
    thrust: 3, jump: 2, power: 230, fuel: 'J-2, 4 weeks of operation', structure: 160,
    computer: 'Computer/10', sensors: 'Advanced', bridge: 'Standard',
    weapons: [{ name: 'Triple Turret (beam laser x1)', mount: 'Turret', count: 3 }],
    staterooms: 10, lowBerths: 20, barracks: 0, cargo: 45.5,
    craft: [], systems: ['Adjustable Hull (TL15)', 'Fuel Processor (80 tons/day)', 'Fuel Scoops', 'Forced Linkage Apparatus (Advanced)', 'Docking Space (100 tons)'],
    software: ['Manoeuvre', 'Jump Control/2', 'Library'],
    crew: [{ role: 'Pilot', count: 1 }, { role: 'Astrogator', count: 1 }, { role: 'Engineer', count: 1 }, { role: 'Gunner', count: 3 }, { role: 'Thug', count: 4 }],
    total: 180.86, purchase: 180.86, maintenance: 15072,
    notes: 'Can disguise itself as a 400-ton trader. Docking space takes in ships up to 100 tons. The purchase cost is printed equal to the table total (other ships show 90% of it).'
  },
  {
    id: 'hg-close-escort-gazelle', name: 'Close Escort', cls: 'Gazelle class', role: 'Warship',
    source: { book: 'High Guard', page: 181 },
    tl: 14, tons: 400, hull: 'Close Structure', armour: { type: 'Bonded Superdense', value: 3 },
    thrust: 5, jump: 5, power: 570, fuel: 'Jump-3 plus 8 weeks of operation', structure: 160,
    computer: 'Computer/20bis', sensors: 'Military Grade', bridge: 'Smaller Bridge',
    weapons: [{ name: 'Particle Barbette', mount: 'Barbette', count: 2 }, { name: 'Triple Turret (beam lasers)', mount: 'Turret', count: 2 }],
    staterooms: 5, lowBerths: 0, barracks: 12, cargo: 23.78,
    craft: ['Military Gig'], systems: ['Fuel Processor (200 tons/day)', 'Fuel Scoops', 'Drop Tanks Mount', 'Armoury', 'Medical Bay', 'Docking Space (20 tons)', 'High-Efficiency Batteries (TL12, 300 power)'],
    software: ['Evade/1', 'Fire Control/4', 'Jump Control/5', 'Library', 'Manoeuvre'],
    crew: [{ role: 'Captain', count: 1 }, { role: 'Pilot', count: 3 }, { role: 'Astrogator', count: 1 }, { role: 'Engineer', count: 4 }, { role: 'Maintenance', count: 1 }, { role: 'Medic', count: 1 }, { role: 'Gunner', count: 8 }, { role: 'Officer', count: 1 }],
    total: 209.597, purchase: 188.6373, maintenance: 15720,
    notes: 'Drive modifiers: Thrust 5 (increased size, 420 tons), Jump 5 (energy inefficient). With 80-ton drop tanks (MCr2): Jump-4 and Thrust 4; jettisoned before jump: Jump-5. Internal tanks only: Jump-3 and Thrust 5.'
  }
];
