// Ship catalogue: published designs from High Guard (2022 update), read from the ship pages.
// SAMPLE of five ships to check before the rest are added. Costs are in MCr: "total" is the table total and
// "purchase" the purchase cost printed in the book (use purchase). maintenance = Cr per month. page = printed page of
// the spec table. power = power plant output; powerReq = the book's Power Requirements block (feeds the Spacecraft
// Record's power allocation: basic, mDrive, jDrive, sensors, weapons, other = extra labelled lines). structure = hull
// points ("Hull: N"). fuelTons = fuel tank tonnage from the spec table. software bw = the package bandwidth from the Core Rulebook ship software table, tl its TL; softwareBw splits the total into Jump Control and other packages. A /bis computer runs Jump Control as if its Processing were 5 higher. computerSpec = the Spacecraft Record computer fields (processor, bis, fib). Sensor grade names match the record's grades.
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
        "count": 1
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
        }
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
        "count": 2
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
        }
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
  }
];
