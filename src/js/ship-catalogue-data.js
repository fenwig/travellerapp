// Ship catalogue: published designs from High Guard (2022 update), read from the ship pages.
// SAMPLE of five ships to check before the rest are added. Costs are in MCr: "total" is the table total and
// "purchase" the purchase cost printed in the book (use purchase). maintenance = Cr per month. page = printed page of
// the spec table. power = power plant output; powerReq = the book's Power Requirements block (feeds the Spacecraft
// Record's power allocation: basic, mDrive, jDrive, sensors, weapons, other = extra labelled lines). structure = hull
// points ("Hull: N"). fuelTons = fuel tank tonnage from the spec table. software bw = the package bandwidth from the Core Rulebook ship software table, tl its TL; softwareBw splits the total into Jump Control and other packages. A /bis computer runs Jump Control as if its Processing were 5 higher. computerSpec = the Spacecraft Record computer fields (processor, bis, fib). Sensor grade names match the record's grades.
// Weapons: count = number of mounts; perMount = weapons in each mount; mountPower = the mount's own power (turrets 1, barbettes 0).
// Check: sum of count x (mountPower + perMount x weapon power) should equal powerReq.weapons.
// draft: true marks a ship read from the book text and not yet checked by hand against the page.
// polity: who builds and flies the design (Imperium, Aslan, Drinax, Zhodani); the catalogue page filters on it.
const SHIP_CATALOGUE = [
  {
    "id": "hg-scout-courier-s",
    "name": "Scout/Courier",
    "cls": "Type S (Sulieman class)",
    "role": "Scout",
    "source": {
      "book": "High Guard",
      "page": 160
    },
    "tl": 12,
    "tons": 100,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 2,
    "jump": 2,
    "power": 60,
    "fuel": "J-2, 12 weeks of operation",
    "structure": 40,
    "computer": "Computer/5bis",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (empty)",
        "mount": "Turret",
        "count": 1,
        "mountPower": 1,
        "perMount": 0
      }
    ],
    "staterooms": 4,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 11,
    "craft": [
      "Air/Raft"
    ],
    "systems": [
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Probe Drones x10",
      "Workshop",
      "Docking Space (4 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      }
    ],
    "total": 41.045,
    "purchase": 36.9405,
    "maintenance": 3079,
    "fuelTons": 23,
    "powerReq": {
      "basic": 20,
      "mDrive": 20,
      "jDrive": 20,
      "sensors": 2,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-free-trader-a",
    "name": "Free Trader",
    "cls": "Type A (Beowulf class)",
    "role": "Merchant",
    "source": {
      "book": "High Guard",
      "page": 171
    },
    "tl": 12,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 2
    },
    "thrust": 1,
    "jump": 1,
    "power": 75,
    "fuel": "J-1, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/5",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 10,
    "lowBerths": 20,
    "barracks": 0,
    "cargo": 80,
    "craft": [],
    "systems": [
      "Fuel Processor (20 tons/day)",
      "Fuel Scoops",
      "Cargo Crane"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 51.38,
    "purchase": 46.242,
    "maintenance": 3854,
    "fuelTons": 21,
    "powerReq": {
      "basic": 40,
      "mDrive": 20,
      "jDrive": 20,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          1
        ],
        [
          "Low Berths",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 5,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-far-trader-a2",
    "name": "Far Trader",
    "cls": "Type A2 (Hero class)",
    "role": "Merchant",
    "source": {
      "book": "High Guard",
      "page": 169
    },
    "tl": 12,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 2
    },
    "thrust": 1,
    "jump": 2,
    "power": 75,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 10,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 65,
    "craft": [],
    "systems": [
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Cargo Crane"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 58.045,
    "purchase": 52.2405,
    "maintenance": 4353,
    "notes": "Tight power budget: the manoeuvre drive must shut down (\"jump dimming\") to have enough power to jump.",
    "fuelTons": 41,
    "powerReq": {
      "basic": 40,
      "mDrive": 20,
      "jDrive": 40,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-corsair-p",
    "name": "Corsair",
    "cls": "Type P (Nishemani class)",
    "role": "Pirate",
    "source": {
      "book": "High Guard",
      "page": 196
    },
    "tl": 15,
    "tons": 400,
    "hull": "Standard (Adjustable Hull)",
    "armour": {
      "type": "Bonded Superdense",
      "value": 5
    },
    "thrust": 3,
    "jump": 2,
    "power": 230,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 160,
    "computer": "Computer/10",
    "sensors": "Advanced",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (beam laser x1)",
        "mount": "Turret",
        "count": 3,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard p.27"
        },
        "mountPower": 1,
        "perMount": 1
      }
    ],
    "staterooms": 10,
    "lowBerths": 20,
    "barracks": 0,
    "cargo": 45.5,
    "craft": [],
    "systems": [
      "Adjustable Hull (TL15)",
      "Fuel Processor (80 tons/day)",
      "Fuel Scoops",
      "Forced Linkage Apparatus (Advanced)",
      "Docking Space (100 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 3
      },
      {
        "role": "Thug",
        "count": 4
      }
    ],
    "total": 180.86,
    "purchase": 180.86,
    "maintenance": 15072,
    "notes": "Can disguise itself as a 400-ton trader. Docking space takes in ships up to 100 tons. The purchase cost is printed equal to the table total (other ships show 90% of it).",
    "fuelTons": 82,
    "powerReq": {
      "basic": 80,
      "mDrive": 120,
      "jDrive": 80,
      "sensors": 6,
      "weapons": 15,
      "other": [
        [
          "Low Berths",
          2
        ],
        [
          "Fuel Processor",
          4
        ]
      ]
    },
    "computerSpec": {
      "processor": 10,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-close-escort-gazelle",
    "name": "Close Escort",
    "cls": "Gazelle class",
    "role": "Warship",
    "source": {
      "book": "High Guard",
      "page": 181
    },
    "tl": 14,
    "tons": 400,
    "hull": "Close Structure",
    "armour": {
      "type": "Bonded Superdense",
      "value": 3
    },
    "thrust": 5,
    "jump": 5,
    "power": 570,
    "fuel": "Jump-3 plus 8 weeks of operation",
    "structure": 160,
    "computer": "Computer/20bis",
    "sensors": "Military Grade",
    "bridge": "Smaller Bridge",
    "weapons": [
      {
        "name": "Particle Barbette",
        "mount": "Barbette",
        "count": 2,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 11,
          "range": "Very Long",
          "power": 15,
          "damage": "4D",
          "cost": 8,
          "traits": "Radiation",
          "source": "High Guard barbette table (given by user)"
        }
      },
      {
        "name": "Triple Turret (beam lasers)",
        "mount": "Turret",
        "count": 2,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard p.27"
        },
        "mountPower": 1,
        "perMount": 3
      }
    ],
    "staterooms": 5,
    "lowBerths": 0,
    "barracks": 12,
    "cargo": 23.78,
    "craft": [
      "Military Gig"
    ],
    "systems": [
      "Fuel Processor (200 tons/day)",
      "Fuel Scoops",
      "Drop Tanks Mount",
      "Armoury",
      "Medical Bay",
      "Docking Space (20 tons)",
      "High-Efficiency Batteries (TL12, 300 power)"
    ],
    "software": [
      {
        "name": "Evade",
        "rating": 1,
        "tl": 9,
        "bw": 10
      },
      {
        "name": "Fire Control",
        "rating": 4,
        "tl": 12,
        "bw": 20
      },
      {
        "name": "Jump Control",
        "rating": 5,
        "tl": 14,
        "bw": 25
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 3
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 4
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 8
      },
      {
        "role": "Officer",
        "count": 1
      }
    ],
    "total": 209.597,
    "purchase": 188.6373,
    "maintenance": 15720,
    "notes": "Drive modifiers: Thrust 5 (increased size, 420 tons), Jump 5 (energy inefficient). With 80-ton drop tanks (MCr2): Jump-4 and Thrust 4; jettisoned before jump: Jump-5. Internal tanks only: Jump-3 and Thrust 5.",
    "fuelTons": 130,
    "powerReq": {
      "basic": 80,
      "mDrive": 200,
      "jDrive": 260,
      "sensors": 2,
      "weapons": 56,
      "other": [
        [
          "Fuel Processor",
          10
        ],
        [
          "Medical Bay",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 20,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 25,
      "other": 30
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-subsidised-merchant-r",
    "name": "Subsidised Merchant",
    "cls": "Type R",
    "role": "Merchant",
    "source": {
      "book": "High Guard",
      "page": 189
    },
    "tl": 12,
    "tons": 400,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 1,
    "power": 135,
    "fuel": "J-1, 4 weeks of operation",
    "structure": 160,
    "computer": "Computer/5",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 19,
    "lowBerths": 9,
    "barracks": 0,
    "cargo": 201,
    "craft": [
      "Launch"
    ],
    "systems": [
      "Docking Space (20 tons)",
      "Fuel Scoops",
      "Fuel Processors (20 tons/day)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 87.31,
    "purchase": 78.579,
    "maintenance": 6549,
    "fuelTons": 41,
    "powerReq": {
      "basic": 80,
      "mDrive": 40,
      "jDrive": 40,
      "sensors": 1,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 5,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-patrol-corvette-t",
    "name": "Patrol Corvette",
    "cls": "Type T",
    "role": "Warship",
    "source": {
      "book": "High Guard",
      "page": 187
    },
    "tl": 12,
    "tons": 400,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 4,
    "jump": 3,
    "power": 300,
    "fuel": "J-3, 4 weeks of operation",
    "structure": 160,
    "computer": "Computer/15",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (pulse lasers)",
        "mount": "Turret",
        "count": 2,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (missile racks)",
        "mount": "Turret",
        "count": 2,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 7,
          "range": "Special",
          "power": 0,
          "damage": "4D",
          "cost": 0.75,
          "traits": "Smart",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 12,
    "lowBerths": 4,
    "barracks": 0,
    "cargo": 43,
    "craft": [
      "Ship's Boat",
      "G/carrier"
    ],
    "systems": [
      "Docking Space (30 tons)",
      "Docking Space (15 tons)",
      "Fuel Processor (80 tons/day)",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Evade",
        "rating": 1,
        "tl": 9,
        "bw": 10
      },
      {
        "name": "Fire Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 4
      },
      {
        "role": "Marine",
        "count": 8
      }
    ],
    "total": 198.26,
    "purchase": 178.434,
    "maintenance": 14870,
    "fuelTons": 122,
    "powerReq": {
      "basic": 80,
      "mDrive": 160,
      "jDrive": 120,
      "sensors": 2,
      "weapons": 28,
      "other": [
        [
          "Fuel Processor",
          4
        ]
      ]
    },
    "computerSpec": {
      "processor": 15,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 15,
      "other": 15
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-subsidised-liner-m",
    "name": "Subsidised Liner",
    "cls": "Type M",
    "role": "Passenger",
    "source": {
      "book": "High Guard",
      "page": 199
    },
    "tl": 12,
    "tons": 600,
    "hull": "Standard",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 3,
    "power": 360,
    "fuel": "J-3, 4 weeks of operation",
    "structure": 240,
    "computer": "Computer/10bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 34,
    "lowBerths": 20,
    "barracks": 0,
    "cargo": 60,
    "craft": [
      "Launch"
    ],
    "systems": [
      "Docking Space (20 tons)",
      "Biosphere",
      "Gourmet Kitchen (12 diners)",
      "Hot Tub (4 seats)",
      "Swimming Pool",
      "Theatre",
      "Wet Bar",
      "Medical Bay",
      "Studios x2 (shops, salons)",
      "Training Facilities (gym)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 2
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 3
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 10
      },
      {
        "role": "Officer",
        "count": 1
      }
    ],
    "total": 186.244,
    "purchase": 167.6196,
    "maintenance": 13968,
    "fuelTons": 183,
    "powerReq": {
      "basic": 120,
      "mDrive": 60,
      "jDrive": 180,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Biosphere",
          1
        ],
        [
          "Medical Bay",
          1
        ],
        [
          "Low Berths",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 10,
      "bis": true,
      "fib": false
    },
    "notes": "Staterooms: 30 standard and 4 high. Low berths: 20, as the book text says.",
    "softwareBw": {
      "jumpControl": 15,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-yacht-y",
    "name": "Yacht",
    "cls": "Type Y",
    "role": "Yacht",
    "source": {
      "book": "High Guard",
      "page": 179
    },
    "tl": 12,
    "tons": 200,
    "hull": "Standard",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 1,
    "power": 90,
    "fuel": "J-1, 8 weeks of operation",
    "structure": 80,
    "computer": "Computer/5",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 13,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 16,
    "craft": [
      "Air/Raft",
      "Ship's Boat",
      "ATV (on ship's boat)"
    ],
    "systems": [
      "Docking Space (4 tons)",
      "Docking Space (30 tons)",
      "Fuel Processor (20 tons/day)",
      "Gourmet Kitchen (6 diners)",
      "Hot Tub (4 seats)",
      "Theatre",
      "Wet Bar",
      "Studio (salon)",
      "Training Facilities (gym)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 69.479,
    "purchase": 62.5311,
    "maintenance": 5211,
    "fuelTons": 22,
    "powerReq": {
      "basic": 40,
      "mDrive": 20,
      "jDrive": 20,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          1
        ],
        [
          "Training Facilities",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Staterooms: 12 standard and 1 luxury.",
    "softwareBw": {
      "jumpControl": 5,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-survey-scout-donosev",
    "name": "Survey Scout",
    "cls": "Donosev class",
    "role": "Survey",
    "source": {
      "book": "High Guard",
      "page": 191
    },
    "tl": 14,
    "tons": 400,
    "hull": "Dispersed Structure",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 3,
    "jump": 3,
    "power": 210,
    "fuel": "J-3, 8 weeks of operation (reduced size x2)",
    "structure": 144,
    "computer": "Computer/25",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 10,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 21,
    "craft": [
      "Modular Cutter",
      "Air/Raft x3"
    ],
    "systems": [
      "Sensor Station",
      "Docking Space (50 tons)",
      "Docking Space (30 tons)",
      "Docking Space (4 tons) x3",
      "Fuel Processor (120 tons/day)",
      "Advanced Probe Drones x20",
      "Laboratories x2",
      "Workshop"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Scientist",
        "count": 5
      }
    ],
    "total": 181.555,
    "purchase": 163.3995,
    "maintenance": 13617,
    "fuelTons": 124,
    "powerReq": {
      "basic": 80,
      "mDrive": 80,
      "jDrive": 120,
      "sensors": 4,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          6
        ]
      ]
    },
    "computerSpec": {
      "processor": 25,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 15,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-system-defence-boat-dragon",
    "name": "System Defence Boat",
    "cls": "Dragon class",
    "role": "Warship",
    "source": {
      "book": "High Guard",
      "page": 193
    },
    "tl": 13,
    "tons": 400,
    "hull": "Streamlined (Reinforced, Stealth Improved)",
    "armour": {
      "type": "Crystaliron",
      "value": 13
    },
    "thrust": 7,
    "jump": 0,
    "power": 450,
    "fuel": "16 weeks of operation",
    "structure": 176,
    "computer": "Computer/25fib",
    "sensors": "Improved",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Particle Barbette",
        "mount": "Barbette",
        "count": 2,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 11,
          "range": "Very Long",
          "power": 15,
          "damage": "4D",
          "cost": 8,
          "traits": "Radiation",
          "source": "High Guard barbette table (given by user)"
        }
      },
      {
        "name": "Small Missile Bay (size reduction x3)",
        "mount": "Bay",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": null
      },
      {
        "name": "Point Defence Laser Battery (Type II)",
        "mount": "Point Defence",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": null
      }
    ],
    "staterooms": 10,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 18,
    "craft": [],
    "systems": [
      "Radiation Shielding",
      "Sensor Stations x2",
      "Backup: Computer/20fib",
      "Countermeasures Suite",
      "Extended Arrays",
      "Enhanced Signal Processing",
      "Missile Storage (480 missiles)",
      "Fuel Scoops",
      "Repair Drones",
      "Armoury",
      "Biosphere",
      "Medical Bay",
      "Training Facilities",
      "Workshop"
    ],
    "software": [
      {
        "name": "Auto-Repair",
        "rating": 1,
        "tl": 10,
        "bw": 10
      },
      {
        "name": "Evade",
        "rating": 1,
        "tl": 9,
        "bw": 10
      },
      {
        "name": "Fire Control",
        "rating": 2,
        "tl": 10,
        "bw": 10
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 3
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 6
      },
      {
        "role": "Sensop",
        "count": 3
      },
      {
        "role": "Officer",
        "count": 1
      }
    ],
    "total": 308.25,
    "purchase": 277.425,
    "maintenance": 23119,
    "fuelTons": 78,
    "powerReq": {
      "basic": 80,
      "mDrive": 280,
      "jDrive": 0,
      "sensors": 15,
      "weapons": 55,
      "other": [
        [
          "Biosphere",
          4
        ],
        [
          "Medical Bay",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 25,
      "bis": false,
      "fib": true
    },
    "notes": "No jump drive. Small missile bay and point defence battery stats are not entered yet: they need the bay and point-defence tables.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 30
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-mercenary-cruiser-c",
    "name": "Mercenary Cruiser",
    "cls": "Type C",
    "role": "Mercenary",
    "source": {
      "book": "High Guard",
      "page": 202
    },
    "tl": 12,
    "tons": 800,
    "hull": "Sphere",
    "armour": {
      "type": "Crystaliron",
      "value": 3
    },
    "thrust": 3,
    "jump": 3,
    "power": 540,
    "fuel": "J-3, 8 weeks of operation, plus fuel for cutters",
    "structure": 320,
    "computer": "Computer/20fib",
    "sensors": "Military Grade",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Triple Turret (empty)",
        "mount": "Turret",
        "count": 8,
        "perMount": 0,
        "mountPower": 1
      }
    ],
    "staterooms": 16,
    "lowBerths": 0,
    "barracks": 30,
    "cargo": 22,
    "craft": [
      "Modular Cutters x2",
      "Air/Raft"
    ],
    "systems": [
      "Radiation Shielding",
      "Docking Spaces (50 tons) x2",
      "Docking Spaces (30 tons) x2",
      "Extra Cutter Modules x2",
      "Docking Space (4 tons)",
      "Fuel Processor (120 tons/day)",
      "Fuel Scoops",
      "Armoury",
      "Briefing Room",
      "Medical Bays x2",
      "Training Facilities",
      "Workshop"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Evade",
        "rating": 1,
        "tl": 9,
        "bw": 10
      },
      {
        "name": "Fire Control",
        "rating": 2,
        "tl": 10,
        "bw": 10
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 3
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 4
      },
      {
        "role": "Mechanic",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Stewards",
        "count": 1
      }
    ],
    "total": 385.51,
    "purchase": 346.959,
    "maintenance": 28913,
    "fuelTons": 250,
    "powerReq": {
      "basic": 160,
      "mDrive": 120,
      "jDrive": 240,
      "sensors": 2,
      "weapons": 8,
      "other": [
        [
          "Fuel Processor",
          6
        ],
        [
          "Medical Bay",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 20,
      "bis": false,
      "fib": true
    },
    "notes": "Turrets are fitted empty; no weapons or cutter modules included. Staterooms: 15 standard and 1 luxury (the owner's). Barracks hold a platoon of 30. The book's crew list may be longer than the posts read here.",
    "softwareBw": {
      "jumpControl": 15,
      "other": 20
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-seeker-mining-ship-j",
    "name": "Seeker Mining Ship",
    "cls": "Type J",
    "role": "Mining",
    "source": {
      "book": "High Guard",
      "page": 162
    },
    "tl": 12,
    "tons": 100,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 2,
    "jump": 2,
    "power": 60,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 40,
    "computer": "Computer/5bis",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (empty)",
        "mount": "Turret",
        "count": 1,
        "perMount": 0,
        "mountPower": 1
      }
    ],
    "staterooms": 2,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 30,
    "craft": [
      "Prospecting Buggy"
    ],
    "systems": [
      "Docking Space (4 tons)",
      "Fuel Processor (20 tons/day)",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      }
    ],
    "total": 38.115,
    "purchase": 34.3035,
    "maintenance": 2859,
    "fuelTons": 21,
    "powerReq": {
      "basic": 20,
      "mDrive": 20,
      "jDrive": 20,
      "sensors": 2,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-safari-ship-k",
    "name": "Safari Ship",
    "cls": "Type K (Animal class)",
    "role": "Safari",
    "source": {
      "book": "High Guard",
      "page": 173
    },
    "tl": 12,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 2,
    "power": 105,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (empty)",
        "mount": "Turret",
        "count": 1,
        "perMount": 0,
        "mountPower": 1
      }
    ],
    "staterooms": 11,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 13.2,
    "craft": [
      "Launch",
      "ATV (on launch)",
      "Air/Raft"
    ],
    "systems": [
      "Docking Space (20 tons)",
      "Docking Space (4 tons)",
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Multi-Environment Equipment",
      "Multi-Environment Holding Tanks",
      "Trophy Lounge"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 68.03,
    "purchase": 61.227,
    "maintenance": 5103,
    "fuelTons": 41,
    "powerReq": {
      "basic": 40,
      "mDrive": 20,
      "jDrive": 40,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          2
        ],
        [
          "Multi-Environment Equipment",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-far-trader-empress-marava",
    "name": "Far Trader",
    "cls": "Empress Marava class",
    "role": "Merchant",
    "source": {
      "book": "High Guard",
      "page": 167
    },
    "tl": 12,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 2,
    "power": 90,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (beam lasers)",
        "mount": "Turret",
        "count": 2,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 10,
    "lowBerths": 4,
    "barracks": 0,
    "cargo": 57,
    "craft": [
      "Air/Raft"
    ],
    "systems": [
      "Docking Space (4 tons)",
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Loading Belt (TL7)",
      "Cargo Airlocks x2"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot/Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 2
      }
    ],
    "total": 60.148,
    "purchase": 54.1582,
    "maintenance": 4513,
    "fuelTons": 41,
    "powerReq": {
      "basic": 40,
      "mDrive": 20,
      "jDrive": 40,
      "sensors": 1,
      "weapons": 18,
      "other": [
        [
          "Fuel Processor",
          2
        ],
        [
          "Loading Belt",
          1
        ],
        [
          "Low Berths",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "notes": "The book lists one Pilot/Astrogator post.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-x-boat-tender-xt",
    "name": "X-Boat Tender",
    "cls": "Class XT",
    "role": "Tender",
    "source": {
      "book": "High Guard",
      "page": 204
    },
    "tl": 14,
    "tons": 1000,
    "hull": "Standard",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 1,
    "power": 450,
    "fuel": "J-1, 20 weeks of operation",
    "structure": 400,
    "computer": "Computer/15",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Single Turret (empty)",
        "mount": "Turret",
        "count": 2,
        "perMount": 0,
        "mountPower": 1
      },
      {
        "name": "Pop-Up Single Turret (empty)",
        "mount": "Turret",
        "count": 1,
        "perMount": 0,
        "mountPower": 1
      }
    ],
    "staterooms": 11,
    "lowBerths": 20,
    "barracks": 0,
    "cargo": 78,
    "craft": [
      "Full Hangar (100 tons)"
    ],
    "systems": [
      "Docking Space (300 tons)",
      "Spare Parts and Equipment",
      "Fuel Processor (100 tons/day)",
      "Fuel Scoops",
      "Mail Distribution Array (Advanced)",
      "Workshops x2",
      "Medical Bay with AutoDoc",
      "UNREP (40 tons/hour)"
    ],
    "software": [
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      }
    ],
    "total": 311.35,
    "purchase": 280.215,
    "maintenance": 23351,
    "fuelTons": 115,
    "powerReq": {
      "basic": 200,
      "mDrive": 100,
      "jDrive": 100,
      "sensors": 1,
      "weapons": 3,
      "other": [
        [
          "Fuel Processor",
          5
        ],
        [
          "Low Berths",
          2
        ],
        [
          "UNREP",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 15,
      "bis": false,
      "fib": false
    },
    "notes": "Staterooms: 10 standard and 1 high.",
    "softwareBw": {
      "jumpControl": 5,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "hg-destroyer-escort-fer-de-lance",
    "name": "Destroyer Escort",
    "cls": "Fer-de-Lance class",
    "role": "Warship",
    "source": {
      "book": "High Guard",
      "page": 211
    },
    "tl": 15,
    "tons": 1000,
    "hull": "Close Structure (Reinforced)",
    "armour": {
      "type": "Bonded Superdense",
      "value": 2
    },
    "thrust": 6,
    "jump": 4,
    "power": 1000,
    "fuel": "J-4, 8 weeks of operation (reduced fuel x2)",
    "structure": 440,
    "computer": "Computer/35fib",
    "sensors": "Advanced",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Missile Barbette (accurate)",
        "mount": "Barbette",
        "count": 4,
        "perMount": 1,
        "mountPower": 0,
        "stats": null
      },
      {
        "name": "Triple Turret (accurate, high yield beam lasers)",
        "mount": "Turret",
        "count": 6,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 28,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 50,
    "craft": [
      "Modular Cutters x2"
    ],
    "systems": [
      "Radiation Shielding",
      "Countermeasures Suite",
      "Missile Storage (360 missiles)",
      "Docking Spaces (50 tons) x2",
      "Fuel Processor (180 tons/day)",
      "Fuel Scoops",
      "Repair Drones",
      "Medical Bay",
      "Armoury"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 4,
        "tl": 13,
        "bw": 20
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Auto-Repair",
        "rating": 1,
        "tl": 10,
        "bw": 10
      },
      {
        "name": "Evade",
        "rating": 2,
        "tl": 11,
        "bw": 15
      },
      {
        "name": "Fire Control",
        "rating": 2,
        "tl": 10,
        "bw": 10
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 3
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 7
      },
      {
        "role": "Maintenance",
        "count": 2
      },
      {
        "role": "Gunner",
        "count": 20
      },
      {
        "role": "Administrator",
        "count": 1
      },
      {
        "role": "Sensop",
        "count": 3
      },
      {
        "role": "Small Craft Crew",
        "count": 4
      },
      {
        "role": "Officer",
        "count": 4
      },
      {
        "role": "Medic",
        "count": 1
      }
    ],
    "total": 727.735,
    "purchase": 654.9615,
    "maintenance": 54581,
    "fuelTons": 370,
    "powerReq": {
      "basic": 200,
      "mDrive": 300,
      "jDrive": 400,
      "sensors": 6,
      "weapons": 78,
      "other": [
        [
          "Fuel Processor",
          9
        ],
        [
          "Medical Bay",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 35,
      "bis": false,
      "fib": true
    },
    "notes": "Missile barbette stats are not entered yet; the book's weapon power of 78 is 6 turrets x (1 + 3 beam lasers x 4), so the barbettes use none. The beam lasers are accurate and high yield; those options are not applied to the stats.",
    "softwareBw": {
      "jumpControl": 20,
      "other": 35
    },
    "polity": "Imperium"
  },
  {
    "id": "pod-harrier",
    "name": "Commerce Raider",
    "cls": "Drinaxi Harrier class",
    "role": "Pirate",
    "source": {
      "book": "Pirates of Drinax, Book 2: The Trojan Reach",
      "page": 9
    },
    "tl": 15,
    "tons": 200,
    "hull": "Streamlined, Reinforced (Superior Stealth)",
    "armour": {
      "type": "Bonded Superdense",
      "value": 4
    },
    "thrust": 6,
    "jump": 2,
    "power": 260,
    "fuel": "J-2, 4 weeks of operation (early jump, size reduction, stealth jump)",
    "structure": 88,
    "computer": "Computer/20",
    "sensors": "Advanced",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Particle Barbette (accurate, high yield)",
        "mount": "Barbette",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 11,
          "range": "Very Long",
          "power": 15,
          "damage": "4D",
          "cost": 8,
          "traits": "Radiation",
          "source": "High Guard barbette table (given by user)"
        }
      },
      {
        "name": "Single Turret (missile rack)",
        "mount": "Turret",
        "count": 1,
        "perMount": 1,
        "mountPower": 1,
        "stats": {
          "tl": 7,
          "range": "Special",
          "power": 0,
          "damage": "4D",
          "cost": 0.75,
          "traits": "Smart",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 8,
    "lowBerths": 8,
    "barracks": 0,
    "cargo": 29.7,
    "craft": [],
    "systems": [
      "Military Countermeasures Suite",
      "Holographic Hull",
      "Missile storage (12 missiles)",
      "Armoury",
      "Cargo Scoop",
      "Fuel Processor (40 tons/day)"
    ],
    "software": [
      {
        "name": "Evade",
        "rating": 1,
        "tl": 9,
        "bw": 10
      },
      {
        "name": "Fire Control",
        "rating": 2,
        "tl": 10,
        "bw": 10
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 2
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Marine",
        "count": 3
      }
    ],
    "total": 318.94875,
    "purchase": 318.94875,
    "maintenance": 26579,
    "fuelTons": 42,
    "powerReq": {
      "basic": 40,
      "mDrive": 120,
      "jDrive": 40,
      "sensors": 8,
      "weapons": 16,
      "other": [
        [
          "Holographic Hull",
          100
        ],
        [
          "Low Berths",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 20,
      "bis": false,
      "fib": false
    },
    "notes": "The party's starting ship. As the campaign starts it is damaged: Hull 72 of 88 (microfractures), power plant at 75% (195), unreliable jump drive (DM-2 to Engineer checks to jump), unreliable manoeuvre drive (double 1 on a Pilot check cuts thrust for a round), damaged ventral turret, only part of the holographic hull works, countermeasures suite partly restored, and maintenance costs Cr10000 a month (the book says it would normally be Cr2657, though its printed maintenance figure is Cr26579). Ship Shares fix these at 1 Ship Share to MCr5.",
    "startCondition": {
      "hull_current": 72,
      "power_current": 195
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 20
    },
    "polity": "Drinax"
  },
  {
    "id": "b3-fast-trader-a3",
    "name": "Fast Trader",
    "cls": "Type A3",
    "role": "Merchant",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 2
    },
    "tl": 12,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 2
    },
    "thrust": 4,
    "jump": 2,
    "power": 135,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 10,
    "lowBerths": 20,
    "barracks": 0,
    "cargo": 36,
    "craft": [],
    "systems": [
      "Fuel Scoop",
      "Fuel Processors (20 tons/day)",
      "Cargo Crane",
      "Aerofins"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 76.5,
    "purchase": 76.5,
    "maintenance": 6375,
    "fuelTons": 41,
    "powerReq": {
      "basic": 40,
      "mDrive": 80,
      "jDrive": 40,
      "sensors": 1,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-star-ray-interceptor",
    "name": "Interceptor",
    "cls": "Star Ray class",
    "role": "Warship",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 4
    },
    "tl": 12,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 3,
    "jump": 1,
    "power": 140,
    "fuel": "J-1 (twice), 4 weeks of operation, plus Light Fighter",
    "structure": 80,
    "computer": "Computer/10",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (beam lasers)",
        "mount": "Turret",
        "count": 2,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 8,
    "lowBerths": 6,
    "barracks": 0,
    "cargo": 44,
    "craft": [
      "Light Fighter"
    ],
    "systems": [
      "Fuel Processor (20 tons/day)",
      "Fuel Scoops",
      "Cargo Crane",
      "Heavy Grappling Arm",
      "Cargo Scoop",
      "Forced Linkage Apparatus (TL15)",
      "Docking Space (10 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 2
      },
      {
        "role": "Fighter Pilot",
        "count": 1
      },
      {
        "role": "Marine",
        "count": 6
      }
    ],
    "total": 87.75,
    "purchase": 87.75,
    "maintenance": 7312,
    "fuelTons": 42,
    "powerReq": {
      "basic": 40,
      "mDrive": 60,
      "jDrive": 20,
      "sensors": 4,
      "weapons": 18,
      "other": []
    },
    "computerSpec": {
      "processor": 10,
      "bis": false,
      "fib": false
    },
    "notes": "Power plant is Fusion TL15, Power 140.",
    "softwareBw": {
      "jumpControl": 5,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-herald-fast-messenger",
    "name": "Fast Messenger",
    "cls": "Herald class",
    "role": "Courier",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 6
    },
    "tl": 15,
    "tons": 300,
    "hull": "Streamlined",
    "armour": {
      "type": "Bonded Superdense",
      "value": 4
    },
    "thrust": 2,
    "jump": 4,
    "power": 240,
    "fuel": "J-4, 6 weeks of operation",
    "structure": 120,
    "computer": "Computer/15bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (missile rack, sandcaster)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Missile Rack",
          "Sandcaster"
        ]
      }
    ],
    "staterooms": 8,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 14.4,
    "craft": [
      "Launch"
    ],
    "systems": [
      "Fuel Scoops",
      "Docking Space (20 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 4,
        "tl": 13,
        "bw": 20
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Evade",
        "rating": 2,
        "tl": 11,
        "bw": 15
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Gunner",
        "count": 1
      },
      {
        "role": "Steward",
        "count": 1
      }
    ],
    "total": 140.127,
    "purchase": 140.127,
    "maintenance": 11677,
    "fuelTons": 123,
    "powerReq": {
      "basic": 60,
      "mDrive": 60,
      "jDrive": 120,
      "sensors": 1,
      "weapons": 1,
      "other": []
    },
    "computerSpec": {
      "processor": 15,
      "bis": true,
      "fib": false
    },
    "notes": "Staterooms: 4 standard, 2 high and 2 luxury. A common refit swaps the lifeboat for escape pods and adds cargo and staterooms.",
    "softwareBw": {
      "jumpControl": 20,
      "other": 15
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-indigo-pirate-carrier",
    "name": "Pirate Carrier",
    "cls": "Indigo class",
    "role": "Pirate",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 8
    },
    "tl": 15,
    "tons": 300,
    "hull": "Dispersed",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 2,
    "power": 135,
    "fuel": "J-2, 4 weeks of operation, plus Light Fighters",
    "structure": 120,
    "computer": "Computer/10",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (beam lasers x2, missile rack)",
        "mount": "Turret",
        "count": 3,
        "perMount": 3,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 10,
            "range": "Medium",
            "power": 4,
            "damage": "1D",
            "cost": 0.5,
            "traits": "(beam laser turrets DM+4 to attack)",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 10,
            "range": "Medium",
            "power": 4,
            "damage": "1D",
            "cost": 0.5,
            "traits": "(beam laser turrets DM+4 to attack)",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Beam Laser",
          "Beam Laser",
          "Missile Rack"
        ]
      }
    ],
    "staterooms": 10,
    "lowBerths": 8,
    "barracks": 0,
    "cargo": 65,
    "craft": [
      "Light Fighters x10"
    ],
    "systems": [
      "Fuel Processor (20 tons/day)",
      "Cargo Net",
      "Heavy Grappling Arm",
      "Type I Docking Clamps x10"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 3
      },
      {
        "role": "Fighter Pilot",
        "count": 10
      }
    ],
    "total": 184.96,
    "purchase": 184.96,
    "maintenance": 15413,
    "fuelTons": 81,
    "powerReq": {
      "basic": 60,
      "mDrive": 40,
      "jDrive": 80,
      "sensors": 2,
      "weapons": 27,
      "other": [
        [
          "Fuel Processor",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 10,
      "bis": false,
      "fib": false
    },
    "notes": "Power plant is Fusion TL12, Power 135. The power block prints manoeuvre 40 and jump 80, as in the book.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-vulture-salvage-hauler",
    "name": "Salvage Hauler",
    "cls": "Vulture class",
    "role": "Salvage",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 21
    },
    "tl": 15,
    "tons": 400,
    "hull": "Standard",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 2,
    "power": 135,
    "fuel": "J-2, 8 weeks of operation",
    "structure": 160,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (pulse lasers)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 4,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 16,
    "craft": [
      "Launch"
    ],
    "systems": [
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Cargo Scoop",
      "Loading Belt (TL12)",
      "Probe Drones x5",
      "Forced Linkage Apparatus (TL12)",
      "Grappling Arm",
      "Heavy Grappling Arm",
      "Docking Space (20 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 1
      }
    ],
    "total": 98.822,
    "purchase": 98.822,
    "maintenance": 8235,
    "fuelTons": 82,
    "powerReq": {
      "basic": 80,
      "mDrive": 40,
      "jDrive": 80,
      "sensors": 1,
      "weapons": 9,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "notes": "Weapon power (9) and the total cost are worked out, not read: the text for them is missing. Power plant is Fusion TL12, Power 135.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-buccaneer-blockade-runner",
    "name": "Blockade Runner",
    "cls": "Buccaneer class",
    "role": "Blockade runner",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 10
    },
    "tl": 15,
    "tons": 400,
    "hull": "Streamlined",
    "armour": {
      "type": "Bonded Superdense",
      "value": 5
    },
    "thrust": 3,
    "jump": 2,
    "power": 300,
    "fuel": "J-2, 4 weeks of operation, plus Launch; thruster fuel for a 2 hour burn",
    "structure": 160,
    "computer": "Computer/5bis",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (pulse lasers)",
        "mount": "Turret",
        "count": 2,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Double Turret (sandcaster, pulse laser)",
        "mount": "Turret",
        "count": 2,
        "perMount": 2,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Long",
            "power": 4,
            "damage": "2D",
            "cost": 1,
            "traits": "--",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Sandcaster",
          "Pulse Laser"
        ]
      }
    ],
    "staterooms": 8,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 62,
    "craft": [
      "Launch"
    ],
    "systems": [
      "H.B. Thruster (Thrust 3 more for a 2 hour burn, combined Thrust 6)",
      "Sandcaster Barrel x40",
      "Fuel Processor (100 tons/day)",
      "Fuel Scoops",
      "Docking Space (20 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 3
      },
      {
        "role": "Gunner",
        "count": 4
      }
    ],
    "total": 160.187,
    "purchase": 157.347,
    "maintenance": 13348,
    "fuelTons": 81,
    "powerReq": {
      "basic": 80,
      "mDrive": 120,
      "jDrive": 80,
      "sensors": 4,
      "weapons": 28,
      "other": [
        [
          "Fuel Processor",
          5
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "notes": "Built to run blockades and deliver small high-value cargoes. The high-burn thruster gives a combined Thrust 6 for two hours, enough to break orbit and reach the 100-diameter limit of most worlds.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-fiery-gunship",
    "name": "Gunship",
    "cls": "Fiery class",
    "role": "Warship",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 12
    },
    "tl": 12,
    "tons": 400,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 6
    },
    "thrust": 6,
    "jump": 2,
    "power": 525,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 160,
    "computer": "Computer/20fib",
    "sensors": "Military Grade",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Small Fusion Gun Bay",
        "mount": "Bay",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": null,
          "range": null,
          "power": 50,
          "damage": null,
          "cost": null,
          "traits": "Small fusion gun bay: stats not entered; power 50 is the remainder of the book's weapon total",
          "source": "derived"
        }
      },
      {
        "name": "Particle Barbette",
        "mount": "Barbette",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 11,
          "range": "Very Long",
          "power": 15,
          "damage": "4D",
          "cost": 8,
          "traits": "Radiation",
          "source": "High Guard barbette table (given by user)"
        }
      },
      {
        "name": "Double Turret (beam lasers)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (sandcasters x2, beam laser)",
        "mount": "Turret",
        "count": 1,
        "perMount": 3,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 10,
            "range": "Medium",
            "power": 4,
            "damage": "1D",
            "cost": 0.5,
            "traits": "(beam laser turrets DM+4 to attack)",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Sandcaster",
          "Sandcaster",
          "Beam Laser"
        ]
      }
    ],
    "staterooms": 9,
    "lowBerths": 0,
    "barracks": 30,
    "cargo": 6,
    "craft": [],
    "systems": [
      "Enhanced Signal Processing",
      "Sandcaster Barrel x40",
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Breaching Tube",
      "Armoury",
      "Brig"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Evade",
        "rating": 2,
        "tl": 11,
        "bw": 15
      },
      {
        "name": "Fire Control",
        "rating": 3,
        "tl": 11,
        "bw": 15
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Officer",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 4
      },
      {
        "role": "Marine",
        "count": 30
      }
    ],
    "total": 208.65,
    "purchase": 208.65,
    "maintenance": 17387,
    "fuelTons": 84,
    "powerReq": {
      "basic": 80,
      "mDrive": 240,
      "jDrive": 80,
      "sensors": 3,
      "weapons": 79,
      "other": [
        [
          "Fuel Processor",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 20,
      "bis": false,
      "fib": true
    },
    "notes": "The small fusion gun bay has no stats here; its 50 power is what is left of the book's weapon total of 79.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 30
    },
    "polity": "Imperium"
  },
  {
    "id": "b3-ghost-of-the-reach",
    "name": "Heavy Scout",
    "cls": "The Ghost of the Reach",
    "role": "Scout",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 15
    },
    "tl": 15,
    "tons": 400,
    "hull": "Streamlined (Superior Stealth, Emissions Absorption Grid)",
    "armour": {
      "type": "Bonded Superdense",
      "value": 6
    },
    "thrust": 3,
    "jump": 3,
    "power": 360,
    "fuel": "J-3, 4 weeks of operation, plus Ship's Boat",
    "structure": 160,
    "computer": "Computer/15fib",
    "sensors": "Advanced",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Double Turret (beam lasers)",
        "mount": "Turret",
        "count": 4,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 10,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 36.8,
    "craft": [
      "Ship's Boat"
    ],
    "systems": [
      "Sensor Station",
      "Enhanced Signal Processing",
      "Fuel Processor (120 tons/day)",
      "Fuel Scoops",
      "Probe Drones",
      "Armoury",
      "Briefing Room",
      "Medical Bay",
      "Laboratory",
      "Docking Space (30 tons)"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Evade",
        "rating": 2,
        "tl": 11,
        "bw": 15
      },
      {
        "name": "Fire Control",
        "rating": 3,
        "tl": 11,
        "bw": 15
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Sensor Operator",
        "count": 1
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Gunner",
        "count": 4
      },
      {
        "role": "Marine",
        "count": 6
      }
    ],
    "total": 625.142,
    "purchase": 625.142,
    "maintenance": 52095,
    "fuelTons": 123,
    "powerReq": {
      "basic": 80,
      "mDrive": 120,
      "jDrive": 120,
      "sensors": 8,
      "weapons": 36,
      "other": [
        [
          "Fuel Processor",
          6
        ]
      ]
    },
    "computerSpec": {
      "processor": 15,
      "bis": false,
      "fib": true
    },
    "notes": "A Zhodani long-range heavy scout with a sensor-baffling hull coat and strong electronic countermeasures. Its ship's boat can flank fast-moving targets.",
    "softwareBw": {
      "jumpControl": 15,
      "other": 30
    },
    "polity": "Zhodani"
  },
  {
    "id": "b3-hraye-scout",
    "name": "Scout",
    "cls": "Hraye class (Aslan)",
    "role": "Scout",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 62
    },
    "tl": 13,
    "tons": 100,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 2,
    "jump": 2,
    "power": 45,
    "fuel": "J-2, 12 weeks of operation",
    "structure": 40,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (pulse laser/missile rack)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 9,
            "range": "Long",
            "power": 4,
            "damage": "2D",
            "cost": 1,
            "traits": "--",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Pulse Laser",
          "Missile Rack"
        ]
      }
    ],
    "staterooms": 4,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 15,
    "craft": [],
    "systems": [
      "Fuel Processor (20 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Probe Drones x5"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      }
    ],
    "total": 39.045,
    "purchase": 39.045,
    "maintenance": 3253,
    "fuelTons": 23,
    "powerReq": {
      "basic": 20,
      "mDrive": 20,
      "jDrive": 20,
      "sensors": 1,
      "weapons": 5,
      "other": [
        [
          "Fuel Processor",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "notes": "Power plant is Fusion TL12, Power 45. A ship of more than 100 tons must have a Shrine to Heroes; smaller ships may.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-ihateisho-scout",
    "name": "Scout",
    "cls": "Ihateisho class (Aslan)",
    "role": "Scout",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 64
    },
    "tl": 13,
    "tons": 100,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 2,
    "jump": 4,
    "power": 60,
    "fuel": "J-4, 12 weeks of operation",
    "structure": 40,
    "computer": "Computer/15bis",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (pulse lasers)",
        "mount": "Turret",
        "count": 1,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 1,
    "lowBerths": 1,
    "barracks": 0,
    "cargo": 4.5,
    "craft": [
      "Air/Raft"
    ],
    "systems": [
      "Fuel Processor (20 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Docking Space (4 tons)"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 4,
        "tl": 13,
        "bw": 20
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 3,
        "tl": 11,
        "bw": 15
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      }
    ],
    "total": 58.51,
    "purchase": 58.51,
    "maintenance": 4876,
    "fuelTons": 43,
    "powerReq": {
      "basic": 20,
      "mDrive": 20,
      "jDrive": 40,
      "sensors": 2,
      "weapons": 13,
      "other": [
        [
          "Fuel Processor",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 15,
      "bis": true,
      "fib": false
    },
    "notes": "Given to the ihatei of nobles to roam in search of territory to conquer. Power plant is Fusion TL12, Power 60. The book lists one Standard stateroom and one Low Berth.",
    "softwareBw": {
      "jumpControl": 20,
      "other": 15
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-ktiyhui-courier",
    "name": "Courier",
    "cls": "Ktiyhui class (Aslan)",
    "role": "Courier",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 66
    },
    "tl": 13,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 12
    },
    "thrust": 4,
    "jump": 3,
    "power": 135,
    "fuel": "J-3, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/10bis",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (pulse laser/missile rack)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 9,
            "range": "Long",
            "power": 4,
            "damage": "2D",
            "cost": 1,
            "traits": "--",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Pulse Laser",
          "Missile Rack"
        ]
      },
      {
        "name": "Double Turret (sandcaster/missile rack)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Sandcaster",
          "Missile Rack"
        ]
      }
    ],
    "staterooms": 7,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 3,
    "craft": [],
    "systems": [
      "Missiles x12",
      "Sandcaster Barrels x20",
      "Fuel Processor (40 tons/day)",
      "Fuel Scoops",
      "Shrine"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 2,
        "tl": 10,
        "bw": 10
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Purser",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 2
      }
    ],
    "total": 103.905,
    "purchase": 103.905,
    "maintenance": 8659,
    "fuelTons": 61,
    "powerReq": {
      "basic": 40,
      "mDrive": 80,
      "jDrive": 60,
      "sensors": 4,
      "weapons": 6,
      "other": [
        [
          "Fuel Processor",
          2
        ]
      ]
    },
    "computerSpec": {
      "processor": 10,
      "bis": true,
      "fib": false
    },
    "notes": "Staterooms: 6 standard and 1 luxury. Power plant is Fusion TL12, Power 135.",
    "softwareBw": {
      "jumpControl": 15,
      "other": 10
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-kteiroa-seeker",
    "name": "Seeker",
    "cls": "Kteiroa class (Aslan)",
    "role": "Mining",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 68
    },
    "tl": 11,
    "tons": 200,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 2,
    "jump": 2,
    "power": 90,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Small",
    "weapons": [],
    "staterooms": 4,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 61,
    "craft": [],
    "systems": [
      "Fuel Scoops",
      "Fuel Processor (20 tons/day)",
      "Mining Drones x20",
      "Shrine"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      }
    ],
    "total": 57.495,
    "purchase": 57.495,
    "maintenance": 4791,
    "fuelTons": 41,
    "powerReq": {
      "basic": 40,
      "mDrive": 40,
      "jDrive": 40,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "notes": "A prospecting vessel for asteroid belts; the four staterooms are more than the crew needs, so it often carries passengers. Power plant is Fusion TL8, Power 90.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-iyeliy-messenger",
    "name": "Messenger",
    "cls": "Iyeliy class (Aslan)",
    "role": "Courier",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 70
    },
    "tl": 14,
    "tons": 200,
    "hull": "Not stated",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 5,
    "power": 150,
    "fuel": "J-5, 4 weeks of operation",
    "structure": 80,
    "computer": "Computer/20bis",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (pulse lasers)",
        "mount": "Turret",
        "count": 1,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 2,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 8,
    "craft": [],
    "systems": [
      "Shrine",
      "Mail Distribution Array (TL13)"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 5,
        "tl": 14,
        "bw": 25
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Purser",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 1
      }
    ],
    "total": 99.85,
    "purchase": 99.85,
    "maintenance": 8238,
    "fuelTons": 101,
    "powerReq": {
      "basic": 40,
      "mDrive": 20,
      "jDrive": 100,
      "sensors": 2,
      "weapons": 13,
      "other": []
    },
    "computerSpec": {
      "processor": 20,
      "bis": true,
      "fib": false
    },
    "notes": "The Aslan equivalent of the Imperial X-boat, with five-parsec jumps. The book does not state the hull configuration. Power plant is Fusion TL12, Power 150.",
    "softwareBw": {
      "jumpControl": 25,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-aoaiw-light-trader",
    "name": "Light Trader",
    "cls": "Aoa'iw class (Aslan)",
    "role": "Merchant",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 72
    },
    "tl": 11,
    "tons": 300,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 1,
    "jump": 2,
    "power": 130,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 120,
    "computer": "Computer/10",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Double Turret (beam lasers)",
        "mount": "Turret",
        "count": 2,
        "perMount": 2,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Double Turret (missile rack, sandcaster)",
        "mount": "Turret",
        "count": 1,
        "perMount": 2,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Missile Rack",
          "Sandcaster"
        ]
      }
    ],
    "staterooms": 8,
    "lowBerths": 12,
    "barracks": 0,
    "cargo": 86,
    "craft": [
      "Air/Raft",
      "Launch"
    ],
    "systems": [
      "Missiles x12",
      "Sandcaster Barrels x20",
      "Shrine",
      "Fuel Scoops",
      "Docking Space (4 tons)",
      "Docking Space (20 tons)"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 2
      }
    ],
    "total": 91.777,
    "purchase": 91.777,
    "maintenance": 7648,
    "fuelTons": 62,
    "powerReq": {
      "basic": 60,
      "mDrive": 30,
      "jDrive": 60,
      "sensors": 1,
      "weapons": 19,
      "other": []
    },
    "computerSpec": {
      "processor": 10,
      "bis": false,
      "fib": false
    },
    "notes": "Power plant is Fusion TL8, Power 130.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-eakhau-trader",
    "name": "Trader",
    "cls": "Eakhau class (Aslan)",
    "role": "Merchant",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 74
    },
    "tl": 12,
    "tons": 400,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 2,
    "power": 165,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 160,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 13,
    "lowBerths": 16,
    "barracks": 0,
    "cargo": 173.5,
    "craft": [],
    "systems": [
      "Fuel Processor (20 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Re-entry Capsules x13"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 1
      }
    ],
    "total": 95.145,
    "purchase": 95.145,
    "maintenance": 7928,
    "fuelTons": 82,
    "powerReq": {
      "basic": 80,
      "mDrive": 40,
      "jDrive": 80,
      "sensors": 1,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          1
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-hkiyrerao-researcher",
    "name": "Researcher",
    "cls": "Hkiyrerao class (Aslan)",
    "role": "Survey",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 76
    },
    "tl": 14,
    "tons": 400,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "jump": 3,
    "power": 240,
    "fuel": "J-3, 16 weeks of operation",
    "structure": 160,
    "computer": "Computer/25",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 15,
    "lowBerths": 10,
    "barracks": 0,
    "cargo": 28,
    "craft": [
      "Pinnace"
    ],
    "systems": [
      "Fuel Scoops",
      "Fuel Processor (60 tons/day)",
      "Shrine",
      "Laboratories",
      "Docking Space (40 tons)"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Executive Officer/Head Scientist",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      }
    ],
    "total": 157.832,
    "purchase": 157.832,
    "maintenance": 13153,
    "fuelTons": 128,
    "powerReq": {
      "basic": 80,
      "mDrive": 40,
      "jDrive": 120,
      "sensors": 4,
      "weapons": 0,
      "other": [
        [
          "Fuel Processor",
          3
        ]
      ]
    },
    "computerSpec": {
      "processor": 25,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 15,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-khtukhao-clan-transport",
    "name": "Clan Transport",
    "cls": "Khtukhao class (Aslan)",
    "role": "Transport",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 78
    },
    "tl": 12,
    "tons": 600,
    "hull": "Standard",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 2,
    "jump": 2,
    "power": 255,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 240,
    "computer": "Computer/5bis",
    "sensors": "Civilian Grade",
    "bridge": "Standard",
    "weapons": [],
    "staterooms": 25,
    "lowBerths": 30,
    "barracks": 0,
    "cargo": 149,
    "craft": [
      "Shuttle"
    ],
    "systems": [
      "Shrine",
      "Docking Space (95 tons)"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      }
    ],
    "total": 187.662,
    "purchase": 187.662,
    "maintenance": 15639,
    "fuelTons": 122,
    "powerReq": {
      "basic": 120,
      "mDrive": 120,
      "jDrive": 120,
      "sensors": 1,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-owatarl-tender",
    "name": "Tender",
    "cls": "Owatarl class (Aslan)",
    "role": "Tender",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 80
    },
    "tl": 12,
    "tons": 600,
    "hull": "Dispersed",
    "armour": {
      "type": "Crystaliron",
      "value": 4
    },
    "thrust": 1,
    "jump": 2,
    "power": 255,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 240,
    "computer": "Computer/10",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (beam lasers x2, sandcaster)",
        "mount": "Turret",
        "count": 3,
        "perMount": 3,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 10,
            "range": "Medium",
            "power": 4,
            "damage": "1D",
            "cost": 0.5,
            "traits": "(beam laser turrets DM+4 to attack)",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 10,
            "range": "Medium",
            "power": 4,
            "damage": "1D",
            "cost": 0.5,
            "traits": "(beam laser turrets DM+4 to attack)",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Beam Laser",
          "Beam Laser",
          "Sandcaster"
        ]
      }
    ],
    "staterooms": 10,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 211,
    "craft": [
      "Shuttle"
    ],
    "systems": [
      "Sandcaster Barrels x20",
      "Shrine",
      "Docking Space (95 tons)"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 2,
        "tl": 10,
        "bw": 10
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 2
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser/Executive Officer",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 2
      },
      {
        "role": "Gunner",
        "count": 3
      }
    ],
    "total": 165.027,
    "purchase": 165.027,
    "maintenance": 13752,
    "fuelTons": 122,
    "powerReq": {
      "basic": 120,
      "mDrive": 60,
      "jDrive": 120,
      "sensors": 2,
      "weapons": 27,
      "other": []
    },
    "computerSpec": {
      "processor": 10,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 10,
      "other": 10
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-ekawsiykua-escort",
    "name": "Escort",
    "cls": "Ekawsiykua class (Aslan)",
    "role": "Warship",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 82
    },
    "tl": 13,
    "tons": 800,
    "hull": "Dispersed",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 4,
    "jump": 4,
    "power": 540,
    "fuel": "J-4, 4 weeks of operation",
    "structure": 320,
    "computer": "Computer/20",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (pulse lasers)",
        "mount": "Turret",
        "count": 3,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (missile racks)",
        "mount": "Turret",
        "count": 3,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 7,
          "range": "Special",
          "power": 0,
          "damage": "4D",
          "cost": 0.75,
          "traits": "Smart",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (sandcasters)",
        "mount": "Turret",
        "count": 2,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Special",
          "power": 0,
          "damage": "Special",
          "cost": 0.25,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 20,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 19,
    "craft": [
      "Pinnace with pulse laser x2",
      "Light Fighters x5"
    ],
    "systems": [
      "Missiles x240",
      "Sandcaster Barrels x240",
      "Shrine",
      "Docking Space (40 tons) x2",
      "Docking Space (10 tons) x5"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 4,
        "tl": 13,
        "bw": 20
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 4,
        "tl": 12,
        "bw": 20
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser/Executive Officer",
        "count": 1
      },
      {
        "role": "Officer",
        "count": 3
      },
      {
        "role": "Pilot",
        "count": 7
      },
      {
        "role": "Medic",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 5
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 10
      },
      {
        "role": "Marine",
        "count": 10
      }
    ],
    "total": 400.464,
    "purchase": 400.464,
    "maintenance": 33372,
    "fuelTons": 324,
    "powerReq": {
      "basic": 160,
      "mDrive": 320,
      "jDrive": 320,
      "sensors": 4,
      "weapons": 44,
      "other": []
    },
    "computerSpec": {
      "processor": 20,
      "bis": false,
      "fib": false
    },
    "softwareBw": {
      "jumpControl": 20,
      "other": 20
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-aositaoh-cruiser",
    "name": "Cruiser",
    "cls": "Aositaoh class (Aslan)",
    "role": "Warship",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 84
    },
    "tl": 12,
    "tons": 1000,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 6
    },
    "thrust": 4,
    "jump": 3,
    "power": 705,
    "fuel": "J-3, 4 weeks of operation",
    "structure": 400,
    "computer": "Computer/20",
    "sensors": "Improved",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Triple Turret (pulse lasers)",
        "mount": "Turret",
        "count": 6,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 4,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (missile racks)",
        "mount": "Turret",
        "count": 3,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 7,
          "range": "Special",
          "power": 0,
          "damage": "4D",
          "cost": 0.75,
          "traits": "Smart",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (sandcasters)",
        "mount": "Turret",
        "count": 1,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Special",
          "power": 0,
          "damage": "Special",
          "cost": 0.25,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 54,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 13,
    "craft": [
      "Pinnace x2",
      "Air/Raft x2",
      "ATV x4"
    ],
    "systems": [
      "Missiles x216",
      "Sandcaster Barrels x120",
      "Fuel Processor (60 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Docking Space (40 tons) x2",
      "Docking Space (4 tons) x2",
      "Docking Space (10 tons) x4"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 4,
        "tl": 12,
        "bw": 20
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser/Executive Officer",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 2
      },
      {
        "role": "Engineer",
        "count": 5
      },
      {
        "role": "Maintenance",
        "count": 2
      },
      {
        "role": "Gunner",
        "count": 10
      },
      {
        "role": "Marine",
        "count": 80
      }
    ],
    "total": 467.48,
    "purchase": 467.48,
    "maintenance": 38957,
    "fuelTons": 305,
    "powerReq": {
      "basic": 200,
      "mDrive": 400,
      "jDrive": 300,
      "sensors": 4,
      "weapons": 82,
      "other": [
        [
          "Fuel Processor",
          3
        ]
      ]
    },
    "computerSpec": {
      "processor": 20,
      "bis": false,
      "fib": false
    },
    "notes": "The book prints the purchase cost as MCr4567.48, which looks like a typo for the table total of MCr467.48; the total is stored. Carries a launch, two pinnaces, four ATVs and four air/rafts: two full platoons from orbit.",
    "softwareBw": {
      "jumpControl": 15,
      "other": 20
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-hkisyeleaa-slaver",
    "name": "Slaver",
    "cls": "Hkisyeleaa class (Aslan)",
    "role": "Transport",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 87
    },
    "tl": 12,
    "tons": 1000,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 2,
    "jump": 2,
    "power": 510,
    "fuel": "J-2, 4 weeks of operation",
    "structure": 400,
    "computer": "Computer/5bis",
    "sensors": "Military Grade",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Triple Turret (beam laser, missile rack, sandcaster)",
        "mount": "Turret",
        "count": 3,
        "perMount": 3,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 10,
            "range": "Medium",
            "power": 4,
            "damage": "1D",
            "cost": 0.5,
            "traits": "(beam laser turrets DM+4 to attack)",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Beam Laser",
          "Missile Rack",
          "Sandcaster"
        ]
      }
    ],
    "staterooms": 12,
    "lowBerths": 750,
    "barracks": 0,
    "cargo": 114,
    "craft": [
      "ATVs x8"
    ],
    "systems": [
      "Missiles x36",
      "Sandcaster Barrels x60",
      "Fuel Processor (60 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Docking Space (10 tons) x8"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 2
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser",
        "count": 1
      },
      {
        "role": "Engineer",
        "count": 4
      },
      {
        "role": "Maintenance",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 3
      }
    ],
    "total": 302.327,
    "purchase": 302.327,
    "maintenance": 25194,
    "fuelTons": 204,
    "powerReq": {
      "basic": 200,
      "mDrive": 200,
      "jDrive": 200,
      "sensors": 4,
      "weapons": 15,
      "other": [
        [
          "Fuel Processor",
          3
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": true,
      "fib": false
    },
    "notes": "A converted agricultural transport; the 750 low berths were meant for food animals. The book says it can carry 1,500 if the captain crams two bodies into each berth, which is highly dangerous.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 0
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-halaheike-pocket-warship",
    "name": "Pocket Warship",
    "cls": "Halaheike class (Aslan)",
    "role": "Warship",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 90
    },
    "tl": 14,
    "tons": 1200,
    "hull": "Streamlined, Reinforced",
    "armour": {
      "type": "Bonded Superdense",
      "value": 10
    },
    "thrust": 3,
    "jump": 3,
    "power": 720,
    "fuel": "J-3, 4 weeks of operation",
    "structure": 528,
    "computer": "Computer/30fib",
    "sensors": "Improved",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Small Particle Beam Bay",
        "mount": "Bay",
        "count": 2,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": null,
          "range": null,
          "power": 27,
          "damage": null,
          "cost": null,
          "traits": "Small particle beam bay: stats not entered; power 27 each is what is left of the book's weapon total of 112",
          "source": "derived"
        }
      },
      {
        "name": "Triple Turret (beam lasers)",
        "mount": "Turret",
        "count": 4,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (missile racks x2, sandcaster)",
        "mount": "Turret",
        "count": 6,
        "perMount": 3,
        "mountPower": 1,
        "mixed": [
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 7,
            "range": "Special",
            "power": 0,
            "damage": "4D",
            "cost": 0.75,
            "traits": "Smart",
            "source": "High Guard turret weapon table"
          },
          {
            "tl": 9,
            "range": "Special",
            "power": 0,
            "damage": "Special",
            "cost": 0.25,
            "traits": "--",
            "source": "High Guard turret weapon table"
          }
        ],
        "names": [
          "Missile Rack",
          "Missile Rack",
          "Sandcaster"
        ]
      }
    ],
    "staterooms": 30,
    "lowBerths": 0,
    "barracks": 0,
    "cargo": 65,
    "craft": [
      "Light Fighters x10",
      "Launch x2"
    ],
    "systems": [
      "Missiles x360",
      "Sandcaster Barrels x240",
      "Fuel Processor (60 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Docking Space (10 tons) x10",
      "Docking Space (20 tons) x2"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 3,
        "tl": 12,
        "bw": 15
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 5,
        "tl": 13,
        "bw": 25
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 14
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Executive Officer",
        "count": 1
      },
      {
        "role": "Officer",
        "count": 3
      },
      {
        "role": "Engineer",
        "count": 5
      },
      {
        "role": "Maintenance",
        "count": 3
      },
      {
        "role": "Gunner",
        "count": 12
      }
    ],
    "total": 720.864,
    "purchase": 720.864,
    "maintenance": 60072,
    "fuelTons": 364,
    "powerReq": {
      "basic": 240,
      "mDrive": 360,
      "jDrive": 360,
      "sensors": 4,
      "weapons": 112,
      "other": [
        [
          "Fuel Processor",
          3
        ]
      ]
    },
    "computerSpec": {
      "processor": 30,
      "bis": false,
      "fib": true
    },
    "notes": "The bay can be converted to hold troops or about 200 low berths. Known for maintenance problems and jump drive failures.",
    "softwareBw": {
      "jumpControl": 15,
      "other": 25
    },
    "polity": "Aslan"
  },
  {
    "id": "b3-sakhai-assault-carrier",
    "name": "Assault Carrier",
    "cls": "Sakhai class (Aslan)",
    "role": "Warship",
    "source": {
      "book": "Pirates of Drinax, Book 3: Ships of the Reach",
      "page": 93
    },
    "tl": 12,
    "tons": 2000,
    "hull": "Streamlined, Reinforced",
    "armour": {
      "type": "Crystaliron",
      "value": 8
    },
    "thrust": 3,
    "jump": 3,
    "power": 1500,
    "fuel": "J-3, 4 weeks of operation",
    "structure": 880,
    "computer": "Computer/25",
    "sensors": "Improved",
    "bridge": "Standard",
    "weapons": [
      {
        "name": "Medium Fusion Gun Bay",
        "mount": "Bay",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": null,
          "range": null,
          "power": 90,
          "damage": null,
          "cost": null,
          "traits": "Medium fusion gun bay: stats not entered; power 90 is what is left of the book's weapon total of 218",
          "source": "derived"
        }
      },
      {
        "name": "Small Missile Bay",
        "mount": "Bay",
        "count": 2,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": null,
          "range": null,
          "power": 0,
          "damage": null,
          "cost": null,
          "traits": "Small missile bay: stats not entered",
          "source": "derived"
        }
      },
      {
        "name": "Particle Barbette",
        "mount": "Barbette",
        "count": 3,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 11,
          "range": "Very Long",
          "power": 15,
          "damage": "4D",
          "cost": 8,
          "traits": "Radiation",
          "source": "High Guard barbette table (given by user)"
        }
      },
      {
        "name": "Triple Turret (beam lasers)",
        "mount": "Turret",
        "count": 6,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "High Guard turret weapon table"
        }
      },
      {
        "name": "Triple Turret (sandcasters)",
        "mount": "Turret",
        "count": 5,
        "perMount": 3,
        "mountPower": 1,
        "stats": {
          "tl": 9,
          "range": "Special",
          "power": 0,
          "damage": "Special",
          "cost": 0.25,
          "traits": "--",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 17,
    "lowBerths": 200,
    "barracks": 160,
    "cargo": 6,
    "craft": [],
    "systems": [
      "Missiles x600",
      "Sandcaster Barrels x120",
      "Fuel Processor (120 tons/day)",
      "Fuel Scoops",
      "Shrine",
      "Armoury",
      "Briefing Room"
    ],
    "software": [
      {
        "name": "Jump Control",
        "rating": 2,
        "tl": 11,
        "bw": 10
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 5,
        "tl": 13,
        "bw": 25
      }
    ],
    "crew": [
      {
        "role": "Captain",
        "count": 1
      },
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Astrogator",
        "count": 1
      },
      {
        "role": "Purser/Executive Officer",
        "count": 1
      },
      {
        "role": "Officer",
        "count": 18
      },
      {
        "role": "Pilot",
        "count": 2
      },
      {
        "role": "Engineer",
        "count": 5
      },
      {
        "role": "Maintenance",
        "count": 4
      },
      {
        "role": "Gunner",
        "count": 18
      },
      {
        "role": "Marine",
        "count": 160
      }
    ],
    "total": 857.15,
    "purchase": 857.15,
    "maintenance": 71429,
    "fuelTons": 610,
    "powerReq": {
      "basic": 400,
      "mDrive": 600,
      "jDrive": 600,
      "sensors": 4,
      "weapons": 218,
      "other": [
        [
          "Fuel Processor",
          6
        ]
      ]
    },
    "computerSpec": {
      "processor": 25,
      "bis": false,
      "fib": false
    },
    "notes": "Cargo (6) is the last row of the tons column. Carries 160 marines in barracks plus 200 low berths.",
    "softwareBw": {
      "jumpControl": 10,
      "other": 25
    },
    "polity": "Aslan"
  },
  {
    "id": "hg-ultralight-fighter",
    "name": "Ultralight Fighter",
    "cls": "Small craft",
    "role": "Fighter",
    "source": {
      "book": "High Guard",
      "page": 136
    },
    "tl": 12,
    "tons": 6,
    "hull": "Streamlined (Stealth Improved)",
    "armour": {
      "type": "Crystaliron",
      "value": 3
    },
    "thrust": 6,
    "power": 15,
    "fuel": "4 weeks of operation",
    "structure": 2,
    "computer": "Computer/5",
    "sensors": "Civilian Grade",
    "bridge": "Cockpit",
    "weapons": [
      {
        "name": "Fixed Mount (pulse laser)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 3,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "power as printed on the small craft sheet (the turret table gives 4)"
        }
      }
    ],
    "staterooms": 0,
    "cargo": 0.06,
    "craft": [],
    "systems": [
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 7.036,
    "purchase": 6.3324,
    "maintenance": 528,
    "powerReq": {
      "basic": 2,
      "mDrive": 4,
      "jDrive": 0,
      "sensors": 1,
      "weapons": 3,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Built to fly in flights of four from a 30-ton Fighter Frame Module. Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-light-fighter",
    "name": "Light Fighter",
    "cls": "Small craft",
    "role": "Fighter",
    "source": {
      "book": "High Guard",
      "page": 137
    },
    "tl": 12,
    "tons": 10,
    "hull": "Streamlined",
    "armour": {
      "type": "Crystaliron",
      "value": 2
    },
    "thrust": 6,
    "power": 15,
    "fuel": "4 weeks of operation",
    "structure": 4,
    "computer": "Computer/5",
    "sensors": "Improved",
    "bridge": "Cockpit",
    "weapons": [
      {
        "name": "Fixed Mount (pulse laser)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 3,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "power as printed on the small craft sheet (the turret table gives 4)"
        }
      }
    ],
    "staterooms": 0,
    "cargo": 1.7,
    "craft": [],
    "systems": [
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Fire Control",
        "rating": 1,
        "tl": 9,
        "bw": 5
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 10.48,
    "purchase": 9.432,
    "maintenance": 786,
    "powerReq": {
      "basic": 2,
      "mDrive": 6,
      "jDrive": 0,
      "sensors": 4,
      "weapons": 3,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 5
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-military-gig",
    "name": "Military Gig",
    "cls": "Close escort variant",
    "role": "Gig",
    "source": {
      "book": "High Guard",
      "page": 138
    },
    "tl": 14,
    "tons": 20,
    "hull": "Streamlined (Stealth Improved)",
    "armour": {
      "type": "Bonded Superdense",
      "value": 4
    },
    "thrust": 8,
    "power": 30,
    "fuel": "4 weeks of operation",
    "structure": 8,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Holographic Controls",
    "weapons": [
      {
        "name": "Fixed Mount (pulse laser, intense focus, high yield)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 9,
          "range": "Long",
          "power": 3,
          "damage": "2D",
          "cost": 1,
          "traits": "--",
          "source": "power as printed on the small craft sheet (the turret table gives 4)"
        }
      }
    ],
    "staterooms": 0,
    "cargo": 2.096,
    "craft": [],
    "systems": [
      "Fuel Scoops",
      "Acceleration Seats x6",
      "Emergency Low Berths x3",
      "Airlock"
    ],
    "software": [
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 1
      }
    ],
    "total": 15.187,
    "purchase": 13.6683,
    "maintenance": 1139,
    "powerReq": {
      "basic": 4,
      "mDrive": 16,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 3,
      "other": [
        [
          "Emergency Low Berths",
          3
        ]
      ]
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-launch",
    "name": "Launch",
    "cls": "Small craft",
    "role": "Small craft",
    "source": {
      "book": "High Guard",
      "page": 139
    },
    "tl": 12,
    "tons": 20,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 1,
    "power": 10,
    "fuel": "4 weeks of operation (Fusion TL8)",
    "structure": 8,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Basic",
    "weapons": [],
    "staterooms": 0,
    "cargo": 14.8,
    "craft": [],
    "systems": [
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 2.63,
    "purchase": 2.367,
    "maintenance": 197,
    "powerReq": {
      "basic": 4,
      "mDrive": 2,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Also called a lifeboat. Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-ships-boat",
    "name": "Ship's Boat",
    "cls": "Small craft",
    "role": "Small craft",
    "source": {
      "book": "High Guard",
      "page": 140
    },
    "tl": 12,
    "tons": 30,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 5,
    "power": 23,
    "fuel": "4 weeks of operation",
    "structure": 12,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Basic",
    "weapons": [
      {
        "name": "Fixed Mount (empty)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 0,
        "mountPower": 0,
        "stats": null
      }
    ],
    "staterooms": 0,
    "cargo": 12,
    "craft": [],
    "systems": [
      "Cabin Space x6",
      "Airlock",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 7.58,
    "purchase": 6.822,
    "maintenance": 569,
    "powerReq": {
      "basic": 6,
      "mDrive": 15,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-slow-boat",
    "name": "Slow Boat",
    "cls": "Small craft",
    "role": "Small craft",
    "source": {
      "book": "High Guard",
      "page": 141
    },
    "tl": 12,
    "tons": 30,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 3,
    "power": 15,
    "fuel": "4 weeks of operation",
    "structure": 12,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Basic",
    "weapons": [
      {
        "name": "Fixed Mount (empty)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 0,
        "mountPower": 0,
        "stats": null
      }
    ],
    "staterooms": 0,
    "cargo": 19.1,
    "craft": [],
    "systems": [
      "Cabin Space x2",
      "Airlock",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 5.58,
    "purchase": 5.022,
    "maintenance": 419,
    "powerReq": {
      "basic": 6,
      "mDrive": 9,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-pinnace",
    "name": "Pinnace",
    "cls": "Small craft",
    "role": "Small craft",
    "source": {
      "book": "High Guard",
      "page": 142
    },
    "tl": 12,
    "tons": 40,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 5,
    "power": 30,
    "fuel": "4 weeks of operation",
    "structure": 16,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Basic",
    "weapons": [
      {
        "name": "Fixed Mount (empty)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 0,
        "mountPower": 0,
        "stats": null
      }
    ],
    "staterooms": 0,
    "cargo": 21,
    "craft": [],
    "systems": [
      "Cabin Space x6",
      "Airlock",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 9.68,
    "purchase": 8.712,
    "maintenance": 726,
    "powerReq": {
      "basic": 8,
      "mDrive": 20,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-slow-pinnace",
    "name": "Slow Pinnace",
    "cls": "Small craft",
    "role": "Small craft",
    "source": {
      "book": "High Guard",
      "page": 143
    },
    "tl": 12,
    "tons": 40,
    "hull": "Streamlined",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 3,
    "power": 20,
    "fuel": "4 weeks of operation (Fusion TL8)",
    "structure": 16,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Basic",
    "weapons": [
      {
        "name": "Fixed Mount (empty)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 0,
        "mountPower": 0,
        "stats": null
      }
    ],
    "staterooms": 0,
    "cargo": 30.8,
    "craft": [],
    "systems": [
      "Airlock",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 6.63,
    "purchase": 5.967,
    "maintenance": 497,
    "powerReq": {
      "basic": 8,
      "mDrive": 9,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-modular-cutter",
    "name": "Modular Cutter",
    "cls": "Small craft",
    "role": "Small craft",
    "source": {
      "book": "High Guard",
      "page": 144
    },
    "tl": 12,
    "tons": 50,
    "hull": "Streamlined (Modular Hull, 30 tons)",
    "armour": {
      "type": "None",
      "value": 0
    },
    "thrust": 4,
    "power": 30,
    "fuel": "4 weeks of operation",
    "structure": 20,
    "computer": "Computer/5",
    "sensors": "Basic",
    "bridge": "Basic",
    "weapons": [
      {
        "name": "Fixed Mount (empty)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 0,
        "mountPower": 0,
        "stats": null
      }
    ],
    "staterooms": 0,
    "cargo": 4,
    "craft": [],
    "systems": [
      "Cabin Space x4",
      "Airlock",
      "Fuel Scoops",
      "Modular Hull: 30 tons for a cutter module"
    ],
    "software": [
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Manoeuvre",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      }
    ],
    "total": 11.93,
    "purchase": 10.737,
    "maintenance": 895,
    "powerReq": {
      "basic": 10,
      "mDrive": 20,
      "jDrive": 0,
      "sensors": 0,
      "weapons": 0,
      "other": []
    },
    "computerSpec": {
      "processor": 5,
      "bis": false,
      "fib": false
    },
    "notes": "Carries a 30-ton cutter module (vehicle cradle, personnel transport, fuel skimmer, assault boat, pressurised shelter and others); the modules are not in the catalogue. Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 0
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  },
  {
    "id": "hg-heavy-fighter",
    "name": "Heavy Fighter",
    "cls": "Small craft",
    "role": "Fighter",
    "source": {
      "book": "High Guard",
      "page": 148
    },
    "tl": 15,
    "tons": 50,
    "hull": "Streamlined, Reinforced",
    "armour": {
      "type": "Bonded Superdense",
      "value": 15
    },
    "thrust": 9,
    "power": 70,
    "fuel": "4 weeks of operation",
    "structure": 22,
    "computer": "Computer/35",
    "sensors": "Advanced",
    "bridge": "Advanced",
    "weapons": [
      {
        "name": "Single Turret (beam laser)",
        "mount": "Turret",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 10,
          "range": "Medium",
          "power": 4,
          "damage": "1D",
          "cost": 0.5,
          "traits": "(beam laser turrets DM+4 to attack)",
          "source": "power as printed on the Heavy Fighter sheet"
        }
      },
      {
        "name": "Fixed Mount (missile rack)",
        "mount": "Fixed",
        "count": 1,
        "perMount": 1,
        "mountPower": 0,
        "stats": {
          "tl": 7,
          "range": "Special",
          "power": 0,
          "damage": "4D",
          "cost": 0.75,
          "traits": "Smart",
          "source": "High Guard turret weapon table"
        }
      }
    ],
    "staterooms": 2,
    "cargo": 0.95,
    "craft": [],
    "systems": [
      "Missile Storage (60 missiles)",
      "Armoured Bulkheads (bridge, manoeuvre drive, power plant, sensors)",
      "Airlock",
      "Fuel Scoops"
    ],
    "software": [
      {
        "name": "Evade",
        "rating": 2,
        "tl": 11,
        "bw": 15
      },
      {
        "name": "Fire Control",
        "rating": 4,
        "tl": 12,
        "bw": 20
      },
      {
        "name": "Library",
        "rating": null,
        "tl": 8,
        "bw": 0
      },
      {
        "name": "Intellect",
        "rating": null,
        "tl": 11,
        "bw": 0
      }
    ],
    "crew": [
      {
        "role": "Pilot",
        "count": 1
      },
      {
        "role": "Gunner",
        "count": 1
      }
    ],
    "total": 76.57,
    "purchase": 68.913,
    "maintenance": 5743,
    "powerReq": {
      "basic": 10,
      "mDrive": 45,
      "jDrive": 0,
      "sensors": 6,
      "weapons": 4,
      "other": []
    },
    "computerSpec": {
      "processor": 35,
      "bis": false,
      "fib": false
    },
    "notes": "Fuel tank tonnage is not read for small craft.",
    "softwareBw": {
      "jumpControl": 0,
      "other": 35
    },
    "jump": 0,
    "lowBerths": 0,
    "barracks": 0,
    "fuelTons": null,
    "polity": "Imperium"
  }
];
