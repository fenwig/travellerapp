// Ship catalogue: published designs from High Guard (2022 update), read from the ship pages.
// SAMPLE of five ships to check before the rest are added. Costs are in MCr: "total" is the table total and
// "purchase" the purchase cost printed in the book (use purchase). maintenance = Cr per month. page = printed page of
// the spec table. power = power plant output; powerReq = the book's Power Requirements block (feeds the Spacecraft
// Record's power allocation: basic, mDrive, jDrive, sensors, weapons, other = extra labelled lines). structure = hull
// points ("Hull: N"). fuelTons = fuel tank tonnage from the spec table. software bw = the package bandwidth from the Core Rulebook ship software table, tl its TL; softwareBw splits the total into Jump Control and other packages. A /bis computer runs Jump Control as if its Processing were 5 higher. computerSpec = the Spacecraft Record computer fields (processor, bis, fib). Sensor grade names match the record's grades.
// Weapons: count = number of mounts; perMount = weapons in each mount; mountPower = the mount's own power (turrets 1, barbettes 0).
// Check: sum of count x (mountPower + perMount x weapon power) should equal powerReq.weapons.
// draft: true marks a ship read from the book text and not yet checked by hand against the page.
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
    }
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
    }
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
    }
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
    }
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
    }
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
    "draft": true
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
    "draft": true
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
    "draft": true
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
    "draft": true
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
    "draft": true
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
    "draft": true
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
    "draft": true
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
    "draft": true
  }
];
