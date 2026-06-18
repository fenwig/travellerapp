const SKILLS = [
  {
    name: "Admin",
    category: "social",
    desc: "Admin covers bureaucracies and administration of all sorts, including the navigation of bureaucratic obstacles or disasters. It also covers tracking inventories, ship manifests and other records. A Traveller with Admin can smooth over encounters with officials, manage a ship's paperwork, or navigate complex legal and governmental systems. Higher levels represent expertise with interstellar bureaucracy and the ability to exploit or circumvent administrative processes entirely.",
    specialties: [],
    examples: [
      { text: "Dealing with a bureaucratic process without delays", difficulty: "Average (8+)", time: "1D hours", char: "INT or SOC" },
      { text: "Reducing the legal entanglements of a starship crew after an incident", difficulty: "Average (8+)", time: "1D days", char: "EDU" }
    ]
  },
  {
    name: "Advocate",
    category: "social",
    desc: "Advocate gives a knowledge of common legal codes and practices, especially interstellar law. It also gives the Traveller experience in oratory, debate and public speaking, making it an excellent skill for lawyers and politicians. A skilled Advocate can argue cases in court, draft contracts and agreements, and identify the legal angles in any situation. At higher levels, an Advocate can navigate the complex and often contradictory laws of different worlds and interstellar jurisdictions.",
    specialties: [],
    examples: [
      { text: "Identifying the legal aspects of a situation", difficulty: "Average (8+)", time: "1D hours", char: "INT" },
      { text: "Defending a colleague in a legal dispute", difficulty: "Average (8+)", time: "1D days", char: "INT or EDU" }
    ]
  },
  {
    name: "Animals",
    category: "knowledge",
    desc: "This skill, rare on industrialised or technologically advanced worlds, is for the care of animals. It covers handling, training and the medical treatment of both familiar and exotic creatures. A Traveller with Animals can ride mounts into combat, tame strange alien beasts, and keep livestock healthy on long voyages. The skill becomes increasingly valuable on frontier and agri-worlds where animal labour and husbandry remain essential.",
    specialties: [
      { name: "Handling", desc: "Working with animals on a day-to-day basis — riding, herding, and managing their behaviour in the field." },
      { name: "Training", desc: "Teaching animals to obey commands, perform tasks, or act as working companions." },
      { name: "Veterinary", desc: "Diagnosing and treating injuries and illness in animals." }
    ],
    examples: [
      { text: "Calming a nervous animal", difficulty: "Average (8+)", time: "1D minutes", char: "DEX or INT" },
      { text: "Training an animal to perform a task", difficulty: "Average (8+)", time: "1D weeks", char: "INT" }
    ]
  },
  {
    name: "Art",
    category: "knowledge",
    desc: "The Traveller is trained in a type of creative art. Art covers the full range of creative disciplines, from performing on stage to writing, sculpting and recording holographic media. Beyond simple expression, Art can be used to make a living, win social influence, spread propaganda, or deceive — a skilled performer can convince an audience they are someone else entirely. Each speciality represents a distinct discipline that must be learned separately.",
    specialties: [
      { name: "Holography", desc: "Creating and manipulating three-dimensional holographic images and recordings." },
      { name: "Instrument", desc: "Playing a musical instrument with skill and expression." },
      { name: "Performer", desc: "Acting, dancing, singing or other live performance arts." },
      { name: "Sculpt", desc: "Creating physical sculptures and three-dimensional works of art." },
      { name: "Write", desc: "Crafting written works — fiction, journalism, technical writing or poetry." }
    ],
    examples: [
      { text: "Creating a piece of art", difficulty: "Average (8+)", time: "1D days", char: "EDU or SOC" },
      { text: "Performing for an audience", difficulty: "Average (8+)", time: "1D hours", char: "SOC" }
    ]
  },
  {
    name: "Astrogation",
    category: "spacecraft",
    desc: "Astrogation is used for plotting the courses of starships and calculating accurate jumps. A standard jump is relatively straightforward, but unusual routes — through dense star clusters, using gravity slingshots, or recovering from a misjump — require considerably more skill. The Astrogation check for a jump suffers DM- equal to the jump distance, so longer jumps are significantly harder to plot precisely. A skilled Astrogator can shave travel time, exploit unusual routes and guide a ship safely through the most hazardous regions of space.",
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
    desc: "The Traveller is a trained athlete and is physically fit. Athletics effectively augments a Traveller's physical characteristics — whatever you can do with Strength alone, you can also add your Athletics (strength) DM to. Athletics is also the principal skill used in adverse gravitational environments: Athletics (dexterity) in low or zero-G situations, and Athletics (strength) in high-G locations. A Traveller without this skill can still perform physical tasks, but will struggle in demanding conditions that a trained athlete handles with ease.",
    specialties: [
      { name: "Dexterity", desc: "Acrobatics, coordination, zero-gravity manoeuvring and fine physical control." },
      { name: "Endurance", desc: "Long-distance running, swimming and sustained physical effort over time." },
      { name: "Strength", desc: "Feats of raw strength — weight-lifting, arm wrestling, breaking down doors." }
    ],
    examples: [
      { text: "Arm wrestling", difficulty: "Opposed", time: "1D minutes", char: "STR" },
      { text: "Feats of strength", difficulty: "Average (8+)", time: "1D x 10 seconds", char: "STR" },
      { text: "Complicated task in high gravity", difficulty: "Difficult (10+)", time: "1D seconds", char: "STR" }
    ]
  },
  {
    name: "Broker",
    category: "social",
    desc: "The Broker skill allows a Traveller to negotiate trades and arrange fair deals, and is heavily used throughout the Trade chapter. A skilled Broker knows how to find buyers and sellers, assess the true value of goods and services, and strike advantageous contracts. Broker can also be used to gamble Benefit rolls during Traveller creation for a chance at greater rewards. At high levels, a Broker can navigate the complex interstellar commodities markets and identify profitable trade routes that less experienced traders would overlook.",
    specialties: [],
    examples: [
      { text: "Negotiating a deal", difficulty: "Average (8+)", time: "1D hours", char: "INT" },
      { text: "Finding a buyer", difficulty: "Average (8+)", time: "1D hours", char: "SOC" }
    ]
  },
  {
    name: "Carouse",
    category: "social",
    desc: "Carousing is the art of socialising — having fun, but also ensuring other people have fun, with infectious good humour. It also covers social awareness and subterfuge in such situations. A skilled carouser can work a room, extract information from loose-lipped contacts, and blend into any social setting from dockside bars to noble receptions. Carouse is particularly useful for gathering intelligence in informal settings, where people are more likely to let slip things they would never say in a formal context.",
    specialties: [],
    examples: [
      { text: "Drinking someone under the table", difficulty: "Opposed", time: "1D hours", char: "END" },
      { text: "Gathering rumours at a party", difficulty: "Average (8+)", time: "1D hours", char: "SOC" }
    ]
  },
  {
    name: "Deception",
    category: "social",
    desc: "Deception allows a Traveller to lie fluently, disguise themselves, perform sleight of hand and fool onlookers. Most underhanded ways of cheating and lying fall under this skill. It can be opposed by a Recon check when someone is actively looking for signs of deception. A skilled deceiver can pass forged documents, impersonate authority figures, blend into enemy organisations, and maintain a cover identity under sustained scrutiny. Deception is one of the most versatile social skills for Travellers who prefer cunning over confrontation.",
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
    desc: "Diplomat is for negotiating deals, establishing peaceful contact and smoothing over social faux pas. It includes how to behave in high society and proper ways to address nobles, from local dignitaries to the Emperor himself. It is a much more formal skill than Persuade, and the appropriate choice in official settings where protocol matters. A skilled Diplomat can represent their crew in interstellar negotiations, defuse tense first contacts with alien species, and navigate the elaborate social rituals of the Imperial nobility.",
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
    desc: "Drive is for controlling ground vehicles of various types, from tracked military vehicles to wheeled groundcars and exotic mole machines. Each speciality covers a fundamentally different vehicle type requiring distinct techniques. A Traveller without the appropriate Drive speciality can still attempt to operate a vehicle but suffers the unskilled DM-3 penalty. At higher levels, a driver can push vehicles well beyond their rated performance, execute difficult manoeuvres under fire, and handle vehicles in extreme terrain and weather conditions.",
    specialties: [
      { name: "Hovercraft", desc: "Vehicles that rely on a cushion of air and thrusters for motion." },
      { name: "Mole", desc: "Vehicles that move through solid matter using drills, plasma torches or cavitation." },
      { name: "Track", desc: "Tanks and other vehicles that move on tracks." },
      { name: "Walker", desc: "Vehicles that use two or more legs to manoeuvre." },
      { name: "Wheel", desc: "Automobiles, groundcars and similar wheeled vehicles." }
    ],
    examples: [
      { text: "Manoeuvring a hovercraft through a tight canal", difficulty: "Difficult (10+)", time: "1D minutes", char: "DEX" },
      { text: "Driving a groundcar in a short race", difficulty: "Opposed", time: "1D minutes", char: "DEX" },
      { text: "Avoiding an unexpected obstacle on the road", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Electronics",
    category: "technical",
    desc: "Electronics is used to operate electronic devices such as computers and ship-board systems. Higher levels represent the ability to repair and even create electronic devices and systems from scratch. The skill covers everything from routine communications and sensor sweeps to sophisticated computer intrusion and electronic warfare. A Traveller using a comms or hacking system with a higher Technology Level than their opponent gains DM+1 for every TL of difference, making cutting-edge equipment a genuine advantage.",
    specialties: [
      { name: "Comms", desc: "Using telecommunications — opening channels, querying networks, jamming signals and communicating with starports and other spacecraft." },
      { name: "Computers", desc: "Using and controlling computer systems. Covers accessing data, running ship programs and hacking secure networks." },
      { name: "Remote Ops", desc: "Using telepresence to remotely control drones, missiles, robots and other devices." },
      { name: "Sensors", desc: "Operating and interpreting data from electronic sensor devices — observation satellites, remote probes, thermal imaging and densitometers." }
    ],
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
    desc: "Engineer is used to operate and maintain spacecraft and advanced vehicles, and to make repairs on damaged spacecraft systems. For repairs on simpler machines, use the Mechanic skill instead. A ship's engineer keeps the drives running, manages power distribution, maintains life support, and can push the ship's systems beyond normal limits in emergencies. Each speciality covers a distinct spacecraft system, and a competent engineer will typically have expertise in more than one area to keep a ship fully operational far from port.",
    specialties: [
      { name: "J-drive", desc: "Maintaining and operating a spacecraft's jump drive — the system that allows faster-than-light travel." },
      { name: "Life Support", desc: "Covers oxygen generators, heating, lighting and other systems necessary to keep the crew alive." },
      { name: "M-drive", desc: "Maintaining and operating a spacecraft's manoeuvre drive, as well as its artificial gravity systems." },
      { name: "Power", desc: "Maintaining and operating a spacecraft's power plant — the reactor that keeps everything running." }
    ],
    examples: [
      { text: "Making a jump", difficulty: "Easy (4+)", time: "1D x 10 minutes", char: "EDU" },
      { text: "Overcharging a thruster plate to increase agility", difficulty: "Difficult (10+)", time: "1D minutes", char: "INT" },
      { text: "Safely reducing power to life support", difficulty: "Average (8+)", time: "1D minutes", char: "EDU" }
    ]
  },
  {
    name: "Explosives",
    category: "combat",
    desc: "The Explosives skill covers the use of demolition charges and other explosive devices, including assembling or disarming bombs. It is used both for controlled demolition and for setting breaching charges in combat situations, where the damage from the explosive is multiplied by the Effect of the check. A failed Explosives check with an Effect of -4 or less can result in a bomb detonating prematurely — a serious risk when working under pressure. At high levels, an expert can place charges with surgical precision, collapsing only a specific wall while leaving adjacent structures intact.",
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
    desc: "The various specialities of Flyer cover different types of flying vehicles. Flyers only work in an atmosphere; vehicles that can leave the atmosphere and enter orbit use the Pilot skill instead. Grav vehicles — air/rafts and similar craft — are by far the most common type encountered throughout the Imperium, making Flyer (grav) the most widely useful speciality. A skilled Flyer can push atmospheric craft to their performance limits, navigate through severe weather, and land on improvised surfaces in emergency situations.",
    specialties: [
      { name: "Airship", desc: "Dirigibles, blimps and other powered lighter-than-air craft." },
      { name: "Grav", desc: "Air/rafts, grav belts and other vehicles that use gravitic technology to fly." },
      { name: "Ornithopter", desc: "Vehicles that fly through the use of flapping wings, mimicking bird flight." },
      { name: "Rotor", desc: "Helicopters, tilt-rotors and aerodynes that use rotating blades for lift." },
      { name: "Wing", desc: "Jets, vectored thrust aircraft and fixed-wing aeroplanes using a lifting body." }
    ],
    examples: [
      { text: "Landing safely", difficulty: "Routine (6+)", time: "1D minutes", char: "DEX" },
      { text: "Racing another flyer", difficulty: "Opposed", time: "1D x 10 minutes", char: "DEX" }
    ]
  },
  {
    name: "Gambler",
    category: "social",
    desc: "The Traveller is familiar with a wide variety of gambling games — poker, roulette, blackjack, horse-racing, sports betting and more — and has an excellent grasp of statistics and probability. Gambler 1 or better gives DM+1 to all cash Benefit rolls during Traveller creation, representing the Traveller's ability to turn their earnings into greater wealth. In play, it can be used to earn credits at legal and illegal gambling establishments. At high levels, a Gambler understands odds well enough to spot cheating, run their own games, and identify when the house has weighted things against them.",
    specialties: [],
    examples: [
      { text: "A casual game of poker", difficulty: "Opposed", time: "1D hours", char: "INT" },
      { text: "Picking the right horse to bet on", difficulty: "Average (8+)", time: "1D minutes", char: "INT" }
    ]
  },
  {
    name: "Gun Combat",
    category: "combat",
    desc: "Gun Combat covers the use of a variety of personal ranged weapons in combat. Each speciality covers a fundamentally different weapons technology, and a Traveller must choose their speciality when they reach level 1. Without the appropriate speciality, the full unskilled DM-3 penalty applies. The base difficulty for firing a gun is Average (8+), but range, movement, cover and other combat conditions all apply modifiers. See the Combat chapter for the full rules on ranged combat.",
    specialties: [
      { name: "Archaic", desc: "Primitive weapons that are not thrown — bows, crossbows and blowpipes." },
      { name: "Energy", desc: "Advanced energy weapons such as laser pistols, laser rifles and plasma rifles." },
      { name: "Slug", desc: "Weapons that fire a solid projectile — autorifles, gauss rifles and shotguns." }
    ],
    examples: [
      { text: "Firing a gun", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Gunner",
    category: "spacecraft",
    desc: "Gunner covers the operation of ship-mounted weapons in space combat. Most Travellers have smaller ships equipped solely with turret weapons, making Gunner (turret) the most commonly needed speciality. Ortillery (orbital artillery) is used for planetary bombardment or attacks on stationary targets, while Screen covers the activation of energy defence systems. Capital weapons — bay weapons and spinal mounts — are found only on larger military vessels. A gunner's effectiveness is strongly influenced by the sensors available to them and the manoeuvring of their own ship.",
    specialties: [
      { name: "Capital", desc: "Operating bay or spinal mount weapons on large warships — the heaviest ship-mounted armaments." },
      { name: "Ortillery", desc: "Orbital Artillery — using a ship's weapons for planetary bombardment or attacks on stationary targets." },
      { name: "Screen", desc: "Activating and using a ship's defensive energy screens such as Black Globe generators or meson screens." },
      { name: "Turret", desc: "Operating turret-mounted weapons on board a ship — the most common type of ship armament." }
    ],
    examples: [
      { text: "Firing a turret at an enemy ship", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" },
      { text: "Firing ortillery at a planetary target", difficulty: "Average (8+)", time: "1D minutes", char: "INT" },
      { text: "Activating a screen to intercept enemy fire", difficulty: "Difficult (10+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Heavy Weapons",
    category: "combat",
    desc: "Heavy Weapons covers portable and vehicle-mounted weapons that cause extreme property damage — rocket launchers, mortars, artillery, flamethrowers and large plasma and fusion guns. These weapons are qualitatively different from personal arms, capable of destroying vehicles and structures. Artillery can be fired at visible targets or using indirect fire, with indirect fire being considerably harder. Vehicle-mounted heavy weapons represent the kind of armament found on tanks, gunships and fortified positions.",
    specialties: [
      { name: "Artillery", desc: "Fixed guns, mortars and other indirect-fire weapons requiring coordinated targeting." },
      { name: "Portable", desc: "Missile launchers, flamethrowers and portable fusion and plasma guns carried by infantry." },
      { name: "Vehicle", desc: "Large weapons typically mounted on vehicles or strongpoints, such as tank guns and autocannon." }
    ],
    examples: [
      { text: "Firing an artillery piece at a visible target", difficulty: "Average (8+)", time: "1D seconds", char: "DEX" },
      { text: "Firing artillery using indirect fire", difficulty: "Difficult (10+)", time: "1D x 10 seconds", char: "INT" }
    ]
  },
  {
    name: "Investigate",
    category: "knowledge",
    desc: "The Investigate skill incorporates keen observation, forensics and detailed analysis. It is used to gather and interpret evidence at crime scenes, surveil locations and individuals, and piece together complex chains of events from fragmentary clues. Investigate can be used as part of a task chain alongside other skills — a successful Investigate check might reveal information that grants a DM to a subsequent Deception, Advocate or Recon check. At high levels, an Investigator can reconstruct events from minimal physical evidence and spot deceptions that would fool most observers.",
    specialties: [],
    examples: [
      { text: "Searching a crime scene for clues", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "INT" },
      { text: "Watching security monitors for a specific criminal", difficulty: "Difficult (10+)", time: "1D hours", char: "INT" }
    ]
  },
  {
    name: "Jack-of-All-Trades",
    category: "knowledge",
    desc: "Jack-of-All-Trades works differently to all other skills. Rather than granting bonuses, it reduces the DM-3 unskilled penalty by one for every level. A Traveller with Jack-of-All-Trades 2 suffers only DM-1 when attempting skills they have no training in, and at level 3 the penalty is entirely negated. There is no benefit to having Jack-of-All-Trades 0, and levels above 3 provide no additional benefit. This skill cannot be raised above level 3 using the connections rule during Traveller creation, and it cannot be taken as a connections skill at all.",
    specialties: [],
    examples: [
      { text: "Attempting any skill without training — penalty reduced by Jack-of-All-Trades level", difficulty: "Varies", time: "Varies", char: "Varies" }
    ]
  },
  {
    name: "Language",
    category: "knowledge",
    desc: "There are numerous Language specialities, each one covering reading, writing and speaking in a different language. All Travellers can speak and read their native language without needing the skill, and automated computer translator programs mean Language is not always required on other worlds. Having Language 0 implies a smattering of simple phrases in a few common languages. A fluent speaker can access untranslated documents, communicate nuance in diplomatic situations, and operate in regions where translators are unavailable or would arouse suspicion.",
    specialties: [
      { name: "Galanglic", desc: "The common trade language of the Third Imperium, derived from the English spoken in the Rule of Man." },
      { name: "Gvegh", desc: "The spoken language of the Vargr, a canine-descended species prominent in the Extents." },
      { name: "Oynprith", desc: "The Droyne ritual language, used by this ancient and enigmatic species for formal and ceremonial communication." },
      { name: "Trokh", desc: "The spoken language of the Aslan, a proud and honour-bound feline-descended species." },
      { name: "Vilani", desc: "The language of the Vilani of the First Imperium — considered the 'Latin' of the Third Imperium." },
      { name: "Zdetl", desc: "The spoken language of the Zhodani, a psionic-focused human Major Race from the Zhodani Consulate." }
    ],
    examples: [
      { text: "Ordering a meal, asking for basic directions", difficulty: "Routine (6+)", time: "1D seconds", char: "EDU" },
      { text: "Holding a simple conversation", difficulty: "Average (8+)", time: "1D x 10 seconds", char: "EDU" },
      { text: "Understanding a complex technical document", difficulty: "Very Difficult (12+)", time: "1D minutes", char: "EDU" }
    ]
  },
  {
    name: "Leadership",
    category: "social",
    desc: "Leadership is for directing, inspiring and rallying allies and comrades. In combat, a Traveller may use their action to make a Leadership check; the Effect of the check provides that many DM+1 bonuses to distribute among allies' checks, including attack rolls. The Traveller must be able to freely communicate to grant a bonus, and no single Traveller can benefit from more than one such bonus per check. Crucially, a failed Leadership check is dangerous — negative Effect allows the opposing side to impose DM-1 penalties on the Traveller's allies, so poor leadership can cost a battle.",
    specialties: [],
    examples: [
      { text: "Shouting an order", difficulty: "Average (8+)", time: "1D seconds", char: "SOC" },
      { text: "Rallying shaken troops", difficulty: "Difficult (10+)", time: "1D seconds", char: "SOC" }
    ]
  },
  {
    name: "Mechanic",
    category: "technical",
    desc: "Mechanic allows a Traveller to maintain and repair most equipment. Unlike the narrower and more focused Engineer or Science skills, Mechanic does not allow a Traveller to build new devices or alter existing ones — it is purely for repairs and maintenance. However, it covers all types of equipment, from personal gear and vehicle engines to non-critical ship systems. Some advanced equipment and spacecraft components require the Engineer skill instead. A competent mechanic is invaluable on a long voyage, keeping a ship operational long after its warranty has expired.",
    specialties: [],
    examples: [
      { text: "Repairing a damaged system in the field", difficulty: "Average (8+)", time: "1D minutes", char: "INT or EDU" }
    ]
  },
  {
    name: "Medic",
    category: "knowledge",
    desc: "Medic covers emergency first aid and battlefield triage, as well as diagnosis, treatment, surgery and long-term care. First aid restores characteristic points equal to the Effect of the check, must be applied within one minute of injury, and can only be successfully applied once per injury. Long-term care under a skilled medic allows faster recovery of characteristics. Note that failed Medic checks can easily end up causing the patient more damage — only trained doctors are recommended. See the Injury and Recovery section for full healing rules.",
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
    desc: "Melee covers attacking in hand-to-hand combat and the use of close combat weapons. On a successful melee attack, the attacker adds their STR DM to the damage rolled, in addition to the Effect of the attack roll. When within two metres of an enemy, combatants are locked in close combat — at this range, only single-handed ranged weapons like pistols may be used, larger weapons can only serve as clubs, and moving away invites a free attack with DM+2 against you. Grappling rules also apply at this range, allowing a Traveller to wrestle, disarm or throw their opponent.",
    specialties: [
      { name: "Blade", desc: "Attacking with swords, rapiers, knives and other edged weapons." },
      { name: "Bludgeon", desc: "Attacking with maces, clubs, staves and similar blunt weapons." },
      { name: "Natural", desc: "Using natural weapons that are part of an alien or creature, such as claws or teeth." },
      { name: "Unarmed", desc: "Punching, kicking and wrestling; also covers using improvised weapons in a brawl." }
    ],
    examples: [
      { text: "Swinging a sword", difficulty: "Average (8+)", time: "1D seconds", char: "STR or DEX" }
    ]
  },
  {
    name: "Navigation",
    category: "technical",
    desc: "Navigation is the planetside counterpart of Astrogation, covering the plotting of courses and finding directions on the ground. It includes reading terrain, using satellite beacons and orbital maps, surviving in unknown wilderness, and guiding a group through hostile environments. While basic navigation on a developed world with good infrastructure is simple, guiding an expedition through dense jungle, trackless desert or an unmapped moon requires genuine expertise. Navigation is often used as part of a task chain with Survival and Recon on wilderness adventures.",
    specialties: [],
    examples: [
      { text: "Plotting a course using an orbiting satellite beacon", difficulty: "Routine (6+)", time: "1D x 10 minutes", char: "INT or EDU" },
      { text: "Avoiding getting lost in thick jungle", difficulty: "Difficult (10+)", time: "1D hours", char: "INT" }
    ]
  },
  {
    name: "Persuade",
    category: "social",
    desc: "Persuade is a more casual, informal version of Diplomat. It covers fast talking, bargaining, wheedling and bluffing, and also encompasses bribery and outright intimidation. Unlike the formal protocols of Diplomat, Persuade thrives in street-level encounters, market negotiations and heated arguments. It is the go-to skill for talking your way past guards, haggling for a better price on cargo, or convincing an alien space princess to reconsider her life choices. Persuade is almost always opposed, pitting the Traveller's wits against the target's resistance.",
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
    desc: "Pilot covers the flying and manoeuvring of spacecraft of all sizes. Each speciality corresponds to a different class of vessel, and a Traveller must choose a speciality at level 1. Flying a ship of a class you are not trained in imposes the full DM-3 unskilled penalty. Pilot is used both for routine station-keeping and for demanding manoeuvres in combat — evasive action, attack runs and emergency landings. See the Spacecraft Operations chapter for the full rules on how Pilot interacts with thrust, fuel and combat manoeuvring.",
    specialties: [
      { name: "Capital Ships", desc: "Battleships, dreadnoughts and other massive military vessels over 5,000 tons." },
      { name: "Small Craft", desc: "Shuttles, fighters and other craft under 100 tons — often launched from larger ships." },
      { name: "Spacecraft", desc: "Trade ships, scouts and other vessels between 100 and 5,000 tons — the most common class." }
    ],
    examples: [
      { text: "Routine manoeuvring in open space", difficulty: "Routine (6+)", time: "1D minutes", char: "DEX" },
      { text: "Docking with a space station", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "DEX" },
      { text: "Evasive manoeuvres under fire", difficulty: "Difficult (10+)", time: "1D seconds", char: "DEX" }
    ]
  },
  {
    name: "Profession",
    category: "knowledge",
    desc: "A Traveller with a Profession skill is trained in producing useful goods or services. Each speciality works the same way — the Traveller makes a Profession check to earn money on a planet that supports that trade, earning Cr250 x the Effect of the check per month. Unlike other skills with specialities, levels in Profession do not grant the ability to use other specialities at level 0; each must be learned individually. A Traveller with Profession 0 has a general grasp of working for a living but little experience beyond the most menial jobs. On some worlds, other skills such as Animals or Electronics (computers) may substitute for a Profession check.",
    specialties: [
      { name: "Belter", desc: "Mining asteroids for valuable ores and minerals — an independent and dangerous livelihood." },
      { name: "Biologicals", desc: "Engineering and managing artificial organisms and bio-engineered life." },
      { name: "Civil Engineering", desc: "Designing and overseeing the construction of structures and buildings." },
      { name: "Construction", desc: "Building orbital habitats, space stations and megastructures." },
      { name: "Hydroponics", desc: "Growing crops and managing food production in hostile or space environments." },
      { name: "Polymers", desc: "Designing and using advanced polymer materials in manufacturing." }
    ],
    examples: [
      { text: "Earning a living from your profession", difficulty: "Average (8+)", time: "1 month", char: "INT or EDU" }
    ]
  },
  {
    name: "Recon",
    category: "physical",
    desc: "A Traveller trained in Recon is able to scout out dangers and spot threats, unusual objects and out-of-place people. It is the primary skill used to oppose Stealth checks, and a skilled Recon user is difficult to surprise or ambush. Recon is commonly used before entering a dangerous area to assess threats, work out guard patrol patterns, and identify advantageous positions. It functions in both urban and wilderness environments and is often the first check made at the start of a potentially dangerous encounter.",
    specialties: [],
    examples: [
      { text: "Working out the routine of guard patrols", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "INT" },
      { text: "Spotting a sniper before they shoot", difficulty: "Opposed vs Stealth", time: "1D x 10 seconds", char: "INT" }
    ]
  },
  {
    name: "Science",
    category: "knowledge",
    desc: "Science covers not just knowledge but also the practical application of that knowledge where such application is possible. There are an enormous range of specialities, each representing a distinct field of study. A Traveller with Science can identify unknown organisms, analyse alien artefacts, interpret sensor data beyond what Electronics alone can determine, and contribute meaningfully to research projects. Science checks frequently appear in task chains, with a successful Science result granting DMs to subsequent Engineering, Medic or Electronics checks.",
    specialties: [
      { name: "Archaeology", desc: "The study of ancient civilisations, including previous Imperiums and the Ancients. Covers investigation and excavation techniques." },
      { name: "Astronomy", desc: "The study of stars, celestial phenomena and the physical properties of space." },
      { name: "Biology", desc: "The study of living organisms, ecosystems and biochemistry." },
      { name: "Chemistry", desc: "The study of matter at the atomic, molecular and macromolecular levels." },
      { name: "Cosmology", desc: "The study of the universe's origin, structure and eventual fate." },
      { name: "Cybernetics", desc: "The study of blending living and synthetic life — implants, prosthetics and artificial intelligence." },
      { name: "Economics", desc: "The study of trade, markets and the flow of resources across worlds and systems." },
      { name: "Genetics", desc: "The study and manipulation of genetic codes and engineered organisms." },
      { name: "History", desc: "The study of the past through documents and records, as opposed to physical artefacts." },
      { name: "Linguistics", desc: "The academic study of how languages work, evolve and relate to one another." },
      { name: "Philosophy", desc: "The study of beliefs, ethics, logic and religion across cultures and species." },
      { name: "Physics", desc: "The study of the fundamental forces — gravity, electromagnetism, and the principles underlying jump drive theory." },
      { name: "Planetology", desc: "The study of planet formation, geology and environmental evolution." },
      { name: "Psionicology", desc: "The study of psionic powers and phenomena — controversial in many parts of the Imperium." },
      { name: "Psychology", desc: "The study of thought, behaviour and social structures in individuals and societies." },
      { name: "Robotics", desc: "The study of robot construction, programming and use in industry and exploration." },
      { name: "Sophontology", desc: "The study of intelligent living creatures — their cultures, biology and history." },
      { name: "Xenology", desc: "The study of alien life forms, both intelligent and non-intelligent." }
    ],
    examples: [
      { text: "Remembering a commonly known fact", difficulty: "Routine (6+)", time: "1D minutes", char: "EDU" },
      { text: "Researching a problem related to a field of science", difficulty: "Average (8+)", time: "1D days", char: "INT" }
    ]
  },
  {
    name: "Seafarer",
    category: "technical",
    desc: "Seafarer covers all manner of watercraft and ocean travel, from small personal craft to large motorised ocean-going vessels. It is an uncommon skill in the spacefaring population of the Third Imperium but invaluable on water-dominant worlds or during planetary surface operations near large bodies of water. Ocean-going worlds with significant maritime trade or naval forces will have many Travellers with this skill. Each speciality covers a distinct category of vessel requiring different techniques and handling characteristics.",
    specialties: [
      { name: "Ocean Ships", desc: "Motorised sea-going vessels — cargo ships, patrol boats and ocean liners." },
      { name: "Personal", desc: "Very small waterborne craft such as canoes, kayaks and rowboats." },
      { name: "Sail", desc: "Wind-driven watercraft of all sizes, from small dinghies to tall ships." },
      { name: "Submarine", desc: "Vehicles that travel underwater, including submersibles and underwater habitats." }
    ],
    examples: [
      { text: "Controlling a canoe in a violent storm", difficulty: "Formidable (14+)", time: "1D hours", char: "END" }
    ]
  },
  {
    name: "Stealth",
    category: "physical",
    desc: "A Traveller trained in Stealth is adept at staying unseen, unheard and unnoticed. Stealth checks are almost always opposed by the Recon skill of anyone actively watching for intruders. The skill covers moving silently through terrain, concealing oneself in cover, and avoiding detection by security systems and patrols. It is used both in wilderness environments and urban settings, from sneaking through a corporate facility to following a target through a busy starport without being made.",
    specialties: [],
    examples: [
      { text: "Sneaking past a guard", difficulty: "Opposed vs Recon", time: "1D x 10 seconds", char: "DEX" },
      { text: "Avoiding detection by a security patrol", difficulty: "Opposed vs Recon", time: "1D minutes", char: "DEX" }
    ]
  },
  {
    name: "Steward",
    category: "social",
    desc: "Steward allows the Traveller to serve and care for nobles and high-class passengers. It covers everything from proper forms of address and court behaviour to cooking, tailoring and basic management skills. A Traveller with the Steward skill is required on any ship offering high passage — without one, the ship cannot legally carry high passengers. Beyond passenger service, a skilled Steward can smooth over social incidents, manage a noble household, and act as a liaison between a wealthy patron and the rest of the crew.",
    specialties: [],
    examples: [
      { text: "Cooking a fine meal", difficulty: "Average (8+)", time: "1D hours", char: "EDU" },
      { text: "Calming down an angry duke", difficulty: "Difficult (10+)", time: "1D minutes", char: "SOC" }
    ]
  },
  {
    name: "Streetwise",
    category: "social",
    desc: "A Traveller with Streetwise understands the urban environment and power structures in society. On their homeworld and related systems they know criminal contacts and fixers; on other worlds they can quickly intuit the local power structures and fit into the underworld. Streetwise is the skill for finding illegal goods and services, making contact with criminal organisations, evading law enforcement, and operating in the grey areas that exist in every starport. It is an essential skill for Travellers who spend time in lower-class areas or who need to operate outside the law.",
    specialties: [],
    examples: [
      { text: "Finding a dealer in illegal materials", difficulty: "Average (8+)", time: "1D x 10 hours", char: "INT" },
      { text: "Evading a police search", difficulty: "Opposed vs Recon", time: "1D x 10 minutes", char: "INT" }
    ]
  },
  {
    name: "Survival",
    category: "physical",
    desc: "Survival is for staying alive in hostile environments — wilderness, vacuum, extreme heat or cold, and other threatening conditions. It covers finding food and water, building shelters, identifying natural hazards and predators, and predicting dangerous weather. On worlds with hostile biospheres or extreme environments, Survival checks may be required regularly just to remain safe. It is frequently used in task chains with Navigation and Recon on ground missions, and complements Vacc Suit when operating in space or on airless worlds.",
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
    desc: "Tactics covers tactical planning and decision-making in both ground and space combat. At the start of a combat, so long as the Traveller is not surprised, one Traveller may make a Tactics check; the Effect of this check is applied to the Initiative of everyone on the same side. Military tactics covers ground engagements — troop positioning, assault and defence planning, reading terrain. Naval tactics covers space combat — fleet positioning, engagement ranges and coordinated ship manoeuvres. A skilled tactician can turn a disadvantageous situation around through superior positioning and decision-making.",
    specialties: [
      { name: "Military", desc: "Ground combat tactics — troop positioning, fire and manoeuvre, assault planning and defensive operations." },
      { name: "Naval", desc: "Space combat tactics — fleet positioning, engagement ranges, sensor use and coordinated ship manoeuvres." }
    ],
    examples: [
      { text: "Tactical planning before a combat", difficulty: "Average (8+)", time: "1D minutes", char: "INT" },
      { text: "Initiative bonus — Effect applied to whole side's Initiative at combat start", difficulty: "Average (8+)", time: "Instant", char: "INT" }
    ]
  },
  {
    name: "Vacc Suit",
    category: "spacecraft",
    desc: "Vacc Suit covers the use of vacuum suits, hostile environment suits and combat armour in zero or low atmosphere conditions. Without this skill, a Traveller suffers DM-2 to every skill check made while wearing a vacc suit — a significant hindrance when performing EVAs, boarding actions or surface operations. A trained Vacc Suit user can work efficiently in a suit, conduct repairs on hull exteriors, and operate in zero-gravity environments without the Athletics (dexterity) checks that would otherwise be required to avoid spinning out of control.",
    specialties: [],
    examples: [
      { text: "Performing an EVA (extravehicular activity)", difficulty: "Average (8+)", time: "1D x 10 minutes", char: "DEX" },
      { text: "Repairing a hull breach in a vacc suit", difficulty: "Difficult (10+)", time: "1D x 10 minutes", char: "DEX or INT" }
    ]
  }
];
