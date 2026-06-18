const SKILLS = [
  {
    name: "Admin",
    category: "social",
    desc: "The Admin skill covers bureaucracies, organisations and how to navigate their processes. It also covers mundane paperwork and legalities.",
    specialties: [],
    examples: [
      { text: "Dealing with a bureaucratic process without delays", difficulty: "Average (8+)", time: "1D hours", char: "INT or SOC" },
      { text: "Reducing the legal entanglements of a starship crew after an incident", difficulty: "Average (8+)", time: "1D days", char: "EDU" }
    ]
  },
  {
    name: "Advocate",
    category: "social",
    desc: "Advocate covers knowledge of the law and legal procedures. A Traveller with Advocate can perform legal functions and argue cases.",
    specialties: [],
    examples: [
      { text: "Identifying the legal aspects of a situation", difficulty: "Average (8+)", time: "1D hours", char: "INT" },
      { text: "Defending a colleague in a legal dispute", difficulty: "Average (8+)", time: "1D days", char: "INT or EDU" }
    ]
  },
  {
    name: "Animals",
    category: "knowledge",
    desc: "Covers the care and handling of animals in a variety of settings.",
    specialties: ["Handling", "Training", "Veterinary"],
    examples: [
      { text: "Calming a nervous animal", difficulty: "Average (8+)", time: "1D minutes", char: "DEX or INT" },
      { text: "Training an animal to perform a task", difficulty: "Average (8+)", time: "1D weeks", char: "INT" }
    ]
  },
  {
    name: "Art",
    category: "knowledge",
    desc: "Covers various forms of artistic expression and the ability to create works of art.",
    specialties: ["Holography", "Instrument", "Performer", "Sculpt", "Write"],
    examples: [
      { text: "Creating a piece of art", difficulty: "Average (8+)", time: "1D days", char: "EDU or SOC" },
      { text: "Performing for an audience", difficulty: "Average (8+)", time: "1D hours", char: "SOC" }
    ]
  },
  {
    name: "Astrogation",
    category: "spacecraft",
    desc: "This skill is used for navigating spacecraft, calculating jump routes and plotting courses through space.",
    specialties: [],
    examples: [
      { text: "Plotting a jump course", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "EDU" },
      { text: "Plotting a course through a dense asteroid field", difficulty: "Difficult (10+)", time: "1D x 10 minutes", char: "INT" },
      { text: "Identifying current position after misjump", difficulty: "Difficult (10+)", time: "1D hours", char: "INT" }
    ]
  },
  {
    name: "Athletics",
    category: "physical",
    desc: "A character with the Athletics skill is physically fit and capable of feats of endurance, strength and agility.",
    specialties: ["Dexterity", "Endurance", "Strength"],
    examples: [
      { text: "Arm wrestling", difficulty: "Opposed", time: "1D minutes", char: "STR" },
      { text: "Feats of strength", difficulty: "Average (8+)", time: "1D x 10 seconds", char: "STR" },
      { text: "Complicated task in high gravity", difficulty: "Difficult (10+)", time: "1D seconds", char: "STR" }
    ]
  },
  {
    name: "Broker",
    category: "social",
    desc: "The Broker skill allows a Traveller to negotiate trades and arrange fair deals. It is heavily used when trading.",
    specialties: [],
    examples: [
      { text: "Negotiating a deal", difficulty: "Average (8+)", time: "1D hours", char: "INT" },
      { text: "Finding a buyer", difficulty: "Average (8+)", time: "1D hours", char: "SOC" }
    ]
  },
  {
    name: "Carouse",
    category: "social",
    desc: "Carousing is the art of socialising; having fun, but also ensuring other people have fun and infectious good humour. Covers social awareness and subterfuge in social situations.",
    specialties: [],
    examples: [
      { text: "Drinking someone under the table", difficulty: "Opposed", time: "1D hours", char: "END" },
      { text: "Gathering rumours at a party", difficulty: "Average (8+)", time: "1D hours", char: "SOC" }
    ]
  },
  {
    name: "Deception",
    category: "social",
    desc: "Deception allows a Traveller to lie fluently, disguise themselves, perform sleight of hand and fool onlookers. Most underhanded ways of cheating and lying fall under deception.",
    specialties: [],
    examples: [
      { text: "Convincing a guard to let you past without ID", difficulty: "Very Difficult (12+)", time: "1D minutes", char: "INT" },
      { text: "Palming a credit chit", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" },
      { text: "Disguising yourself as a wealthy noble", difficulty: "Difficult (10+)", time: "1D x 10 minutes", char: "INT or SOC" }
    ]
  },
  {
    name: "Diplomat",
    category: "social",
    desc: "The Diplomat skill is for negotiating deals, establishing peaceful contact and smoothing over social faux pas. Includes how to behave in high society and proper ways to address nobles. A much more formal skill than Persuade.",
    specialties: [],
    examples: [
      { text: "Greeting the Emperor properly", difficulty: "Difficult (10+)", time: "1D minutes", char: "SOC" },
      { text: "Negotiating a peace treaty", difficulty: "Average (8+)", time: "1D days", char: "EDU" },
      { text: "Transmitting a formal surrender", difficulty: "Average (8+)", time: "1D x 10 seconds", char: "INT" }
    ]
  },
  {
    name: "Drive",
    category: "technical",
    desc: "This skill is for controlling ground vehicles of various types.",
    specialties: ["Hovercraft", "Mole", "Track", "Walker", "Wheel"],
    examples: [
      { text: "Manoeuvring a hovercraft through a tight canal", difficulty: "Difficult (10+)", time: "1D minutes", char: "DEX" },
      { text: "Driving a groundcar in a short race", difficulty: "Opposed", time: "1D minutes", char: "DEX" },
      { text: "Avoiding an unexpected obstacle on the road", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Electronics",
    category: "technical",
    desc: "Used to operate electronic devices such as computers and ship-board systems. Higher levels represent the ability to repair and create electronic devices and systems.",
    specialties: ["Comms", "Computers", "Remote Ops", "Sensors"],
    examples: [
      { text: "Requesting landing privileges at a starport", difficulty: "Routine (6+)", time: "1D minutes", char: "EDU" },
      { text: "Searching a corporate database for evidence", difficulty: "Difficult (10+)", time: "1D hours", char: "INT" },
      { text: "Hacking into a secure computer network", difficulty: "Formidable (14+)", time: "1D x 10 hours", char: "INT" },
      { text: "Making a detailed sensor scan", difficulty: "Routine (6+)", time: "1D x 10 minutes", char: "INT or EDU" }
    ]
  },
  {
    name: "Engineer",
    category: "spacecraft",
    desc: "The Engineer skill is used to operate and maintain spacecraft and advanced vehicles. Can be used to make repairs on damaged spacecraft systems. For simpler machines, use the Mechanic skill.",
    specialties: ["J-drive", "Life Support", "M-drive", "Power"],
    examples: [
      { text: "Making a jump", difficulty: "Easy (4+)", time: "1D x 10 minutes", char: "EDU" },
      { text: "Overcharging a thruster plate to increase agility", difficulty: "Difficult (10+)", time: "1D minutes", char: "INT" },
      { text: "Safely reducing power to life support", difficulty: "Average (8+)", time: "1D minutes", char: "EDU" }
    ]
  },
  {
    name: "Explosives",
    category: "combat",
    desc: "The Explosives skill covers the use of demolition charges and other explosive devices, including assembling or disarming bombs. A failed check with Effect -4 or less can result in premature detonation.",
    specialties: [],
    examples: [
      { text: "Planting charges to collapse a wall", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "EDU" },
      { text: "Planting a breaching charge", difficulty: "Average (8+)", time: "1D x 10 seconds", char: "EDU" },
      { text: "Disarming a bomb with anti-tamper detonators", difficulty: "Formidable (14+)", time: "1D minutes", char: "DEX" }
    ]
  },
  {
    name: "Flyer",
    category: "technical",
    desc: "The various specialities cover different types of flying vehicles. Flyers only work in an atmosphere; vehicles that can leave the atmosphere use the Pilot skill.",
    specialties: ["Airship", "Grav", "Ornithopter", "Rotor", "Wing"],
    examples: [
      { text: "Landing safely", difficulty: "Routine (6+)", time: "1D minutes", char: "DEX" },
      { text: "Racing another flyer", difficulty: "Opposed", time: "1D x 10 minutes", char: "DEX" }
    ]
  },
  {
    name: "Gambler",
    category: "social",
    desc: "The Traveller is familiar with a wide variety of gambling games and has an excellent grasp of statistics and probability. Gambler 1+ gives DM+1 to cash Benefit rolls.",
    specialties: [],
    examples: [
      { text: "A casual game of poker", difficulty: "Opposed", time: "1D hours", char: "INT" },
      { text: "Picking the right horse to bet on", difficulty: "Average (8+)", time: "1D minutes", char: "INT" }
    ]
  },
  {
    name: "Gun Combat",
    category: "combat",
    desc: "The Gun Combat skill covers a variety of ranged weapons. See the Combat chapter for details on using guns in combat.",
    specialties: ["Archaic", "Energy", "Slug"],
    examples: [
      { text: "Firing a gun", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Gunner",
    category: "spacecraft",
    desc: "The various specialities deal with the operation of ship-mounted weapons in space combat.",
    specialties: ["Capital", "Ortillery", "Screen", "Turret"],
    examples: [
      { text: "Firing a turret at an enemy ship", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" },
      { text: "Firing ortillery at a planetary target", difficulty: "Average (8+)", time: "1D minutes", char: "INT" },
      { text: "Activating a screen to intercept enemy fire", difficulty: "Difficult (10+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Heavy Weapons",
    category: "combat",
    desc: "Covers portable and larger weapons that cause extreme property damage, such as rocket launchers, artillery and large plasma weapons.",
    specialties: ["Artillery", "Portable", "Vehicle"],
    examples: [
      { text: "Firing an artillery piece at a visible target", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" },
      { text: "Firing artillery using indirect fire", difficulty: "Difficult (10+)", time: "1D x 10 seconds", char: "INT" }
    ]
  },
  {
    name: "Investigate",
    category: "knowledge",
    desc: "The Investigate skill incorporates keen observation, forensics and detailed analysis.",
    specialties: [],
    examples: [
      { text: "Searching a crime scene for clues", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "INT" },
      { text: "Watching security monitors for a specific criminal", difficulty: "Difficult (10+)", time: "1D hours", char: "INT" }
    ]
  },
  {
    name: "Jack-of-All-Trades",
    category: "knowledge",
    desc: "Works differently to other skills. Reduces the unskilled penalty (DM-3) by one per level. At level 3, completely negates the unskilled penalty. No benefit at level 0 or 4+.",
    specialties: [],
    examples: [
      { text: "Attempting any skill without training — penalty reduced by Jack-of-All-Trades level", difficulty: "Varies", time: "Varies", char: "Varies" }
    ]
  },
  {
    name: "Language",
    category: "knowledge",
    desc: "Each speciality covers a different language. All Travellers speak their native language freely. Level 0 implies a smattering of simple phrases. Computer translators mean Language is not always needed.",
    specialties: ["Galanglic", "Gvegh", "Oynprith", "Trokh", "Vilani", "Zdetl"],
    examples: [
      { text: "Ordering a meal, asking for basic directions", difficulty: "Routine (6+)", time: "1D seconds", char: "EDU" },
      { text: "Holding a simple conversation", difficulty: "Average (8+)", time: "1D x 10 seconds", char: "EDU" },
      { text: "Understanding a complex technical document", difficulty: "Very Difficult (12+)", time: "1D minutes", char: "EDU" }
    ]
  },
  {
    name: "Leadership",
    category: "social",
    desc: "The Leadership skill is for directing, inspiring and rallying allies and comrades. In combat, the Effect of a Leadership check grants DM+1 bonuses to allies' checks. Negative Effect gives the opposing side penalties to inflict.",
    specialties: [],
    examples: [
      { text: "Shouting an order", difficulty: "Average (8+)", time: "1D seconds", char: "SOC" },
      { text: "Rallying shaken troops", difficulty: "Difficult (10+)", time: "1D seconds", char: "SOC" }
    ]
  },
  {
    name: "Mechanic",
    category: "technical",
    desc: "Allows a Traveller to maintain and repair most equipment. Unlike Engineer, it does not allow building new devices — it is purely for repairs and maintenance but covers all types of equipment.",
    specialties: [],
    examples: [
      { text: "Repairing a damaged system in the field", difficulty: "Average (8+)", time: "1D minutes", char: "INT or EDU" }
    ]
  },
  {
    name: "Medic",
    category: "knowledge",
    desc: "Covers emergency first aid and battlefield triage as well as diagnosis, treatment, surgery and long-term care. Note: failed Medic checks can cause additional damage.",
    specialties: [],
    examples: [
      { text: "First aid (restores END/STR/DEX equal to Effect)", difficulty: "Average (8+)", time: "1D rounds", char: "EDU" },
      { text: "Treat poison or disease", difficulty: "Average (8+)", time: "1D hours", char: "EDU" },
      { text: "Long-term care", difficulty: "Average (8+)", time: "1 day", char: "EDU" }
    ]
  },
  {
    name: "Melee",
    category: "combat",
    desc: "The Melee skill covers attacking in hand-to-hand combat and the use of suitable weapons. On a successful melee attack, add STR DM to damage rolled.",
    specialties: ["Blade", "Bludgeon", "Natural", "Unarmed"],
    examples: [
      { text: "Swinging a sword", difficulty: "Average (8+)", time: "1D seconds", char: "STR or DEX" }
    ]
  },
  {
    name: "Navigation",
    category: "technical",
    desc: "Navigation is the planetside counterpart of Astrogation, covering plotting courses and finding directions on the ground.",
    specialties: [],
    examples: [
      { text: "Plotting a course using an orbiting satellite beacon", difficulty: "Routine (6+)", time: "1D x 10 minutes", char: "INT or EDU" },
      { text: "Avoiding getting lost in thick jungle", difficulty: "Difficult (10+)", time: "1D hours", char: "INT" }
    ]
  },
  {
    name: "Persuade",
    category: "social",
    desc: "Persuade is a more casual, informal version of Diplomat. Covers fast talking, bargaining, wheedling and bluffing. Also covers bribery and intimidation.",
    specialties: [],
    examples: [
      { text: "Bluffing your way past a guard", difficulty: "Opposed", time: "1D minutes", char: "INT or SOC" },
      { text: "Haggling in a bazaar", difficulty: "Opposed", time: "1D minutes", char: "INT or SOC" },
      { text: "Intimidating a thug", difficulty: "Opposed", time: "1D minutes", char: "STR or SOC" }
    ]
  },
  {
    name: "Pilot",
    category: "spacecraft",
    desc: "The Pilot skill covers flying and manoeuvring spacecraft. See the Spacecraft Operations chapter for more details.",
    specialties: ["Capital Ships (5,000+ tons)", "Small Craft (under 100 tons)", "Spacecraft (100–5,000 tons)"],
    examples: [
      { text: "Routine manoeuvring in open space", difficulty: "Routine (6+)", time: "1D minutes", char: "DEX" },
      { text: "Docking with a space station", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "DEX" },
      { text: "Evasive manoeuvres under fire", difficulty: "Difficult (10+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Profession",
    category: "knowledge",
    desc: "A Traveller with a Profession skill is trained in producing useful goods or services. Can make a Profession check to earn Cr250 x Effect per month. Unlike other skills, each speciality must be learned individually.",
    specialties: ["Belter", "Biologicals", "Civil Engineering", "Construction", "Hydroponics", "Polymers"],
    examples: [
      { text: "Earning a living from your profession", difficulty: "Average (8+)", time: "1 month", char: "INT or EDU" }
    ]
  },
  {
    name: "Recon",
    category: "physical",
    desc: "A Traveller trained in Recon is able to scout out dangers and spot threats, unusual objects or out of place people.",
    specialties: [],
    examples: [
      { text: "Working out the routine of guard patrols", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "INT" },
      { text: "Spotting a sniper before they shoot", difficulty: "Opposed vs Stealth", time: "1D x 10 seconds", char: "INT" }
    ]
  },
  {
    name: "Science",
    category: "knowledge",
    desc: "Covers both knowledge and practical application of scientific disciplines.",
    specialties: ["Archaeology", "Astronomy", "Biology", "Chemistry", "Cosmology", "Cybernetics", "Economics", "Genetics", "History", "Linguistics", "Philosophy", "Physics", "Planetology", "Psionicology", "Psychology", "Robotics", "Sophontology", "Xenology"],
    examples: [
      { text: "Remembering a commonly known fact", difficulty: "Routine (6+)", time: "1D minutes", char: "EDU" },
      { text: "Researching a problem related to a field of science", difficulty: "Average (8+)", time: "1D days", char: "INT" }
    ]
  },
  {
    name: "Seafarer",
    category: "technical",
    desc: "The Seafarer skill covers all manner of watercraft and ocean travel.",
    specialties: ["Ocean Ships", "Personal", "Sail", "Submarine"],
    examples: [
      { text: "Controlling a canoe in a violent storm", difficulty: "Formidable (14+)", time: "1D hours", char: "END" }
    ]
  },
  {
    name: "Stealth",
    category: "physical",
    desc: "A Traveller trained in the Stealth skill is adept at staying unseen, unheard and unnoticed.",
    specialties: [],
    examples: [
      { text: "Sneaking past a guard", difficulty: "Opposed vs Recon", time: "1D x 10 seconds", char: "DEX" },
      { text: "Avoiding detection by a security patrol", difficulty: "Opposed vs Recon", time: "1D minutes", char: "DEX" }
    ]
  },
  {
    name: "Steward",
    category: "social",
    desc: "Allows the Traveller to serve and care for nobles and high-class passengers. Covers proper address, cooking and management skills. Required on any ship offering high passage.",
    specialties: [],
    examples: [
      { text: "Cooking a fine meal", difficulty: "Average (8+)", time: "1D hours", char: "EDU" },
      { text: "Calming down an angry duke", difficulty: "Difficult (10+)", time: "1D minutes", char: "SOC" }
    ]
  },
  {
    name: "Streetwise",
    category: "social",
    desc: "A Traveller with Streetwise understands the urban environment and power structures in society. Knows criminal contacts on their homeworld and can quickly intuit power structures on other worlds.",
    specialties: [],
    examples: [
      { text: "Finding a dealer in illegal materials", difficulty: "Average (8+)", time: "1D x 10 hours", char: "INT" },
      { text: "Evading a police search", difficulty: "Opposed vs Recon", time: "1D x 10 minutes", char: "INT" }
    ]
  },
  {
    name: "Survival",
    category: "physical",
    desc: "The Survival skill is for staying alive in the wilderness. Covers finding food and water, building shelters and avoiding natural hazards.",
    specialties: [],
    examples: [
      { text: "Finding food and water in the wilderness", difficulty: "Average (8+)", time: "1D hours", char: "INT or EDU" },
      { text: "Predicting the weather", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "INT or EDU" },
      { text: "Avoiding a natural predator", difficulty: "Difficult (10+)", time: "1D x 10 seconds", char: "INT" }
    ]
  },
  {
    name: "Tactics",
    category: "combat",
    desc: "Covers tactical planning and decision-making in combat. One Traveller may make a Tactics check at the start of combat; the Effect is applied to the Initiative of everyone on the same side.",
    specialties: ["Military", "Naval"],
    examples: [
      { text: "Tactical planning before a combat", difficulty: "Average (8+)", time: "1D minutes", char: "INT" },
      { text: "Initiative bonus at combat start — Effect applied to whole side's Initiative", difficulty: "Average (8+)", time: "Instant", char: "INT" }
    ]
  },
  {
    name: "Vacc Suit",
    category: "spacecraft",
    desc: "The Vacc Suit skill covers the use of vacuum suits and combat armour. Without this skill, a Traveller suffers DM-2 for every skill check made while wearing a vacc suit.",
    specialties: [],
    examples: [
      { text: "Performing an EVA (extravehicular activity)", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "DEX" },
      { text: "Repairing a hull breach in a vacc suit", difficulty: "Difficult (10+)", time: "1D x 10 minutes", char: "DEX or INT" }
    ]
  }
];
