// Piracy tables — The Pirates of Drinax, Book 1: Campaign, Chapter 3 "A Pirate's Life For Me" (pp.8–23).

// Prey Encounter (p.14). Roll D66; first die gets the first-die DMs, second die the second-die DMs.
// The first digit runs 0-7 and the second 0-8 (results beyond the table use its last row/column).
// Values: a prey type name, 'None' (no encounter), or ['None', 'Naval Patrol', n] = roll 1D, 1..n none, else patrol.
const PREY_TABLE = {
  '00':'Traveller','01':'Traveller','02':'None','03':'None','04':'Small Freighter','05':'None','06':'None','07':'None','08':'Naval Patrol',
  '10':'Traveller','11':'None','12':'None','13':'None','14':'Small Freighter','15':'None','16':'None','17':'Medium Freighter','18':['None','Naval Patrol',3],
  '20':'Traveller','21':'None','22':'None','23':'Small Freighter','24':'Medium Freighter','25':'None','26':'Unusual Vessel','27':'System Defence Boat','28':['None','Naval Patrol',3],
  '30':'Traveller','31':'Small Freighter','32':'Convoy','33':'Unusual Vessel','34':'Medium Freighter','35':'None','36':'None','37':'Rich Freighter','38':['None','Naval Patrol',3],
  '40':'Small Freighter','41':'Traveller','42':'Convoy','43':'Heavy Freighter','44':'None','45':'None','46':'Liner','47':'System Defence Boat','48':['None','Naval Patrol',3],
  '50':'Traveller','51':'Convoy','52':'Small Freighter','53':'Medium Freighter','54':'None','55':'Heavy Freighter','56':'Liner','57':'System Defence Boat','58':['None','Naval Patrol',2],
  '60':'Traveller','61':'Convoy','62':'Small Freighter','63':'Medium Freighter','64':'Liner','65':'Convoy','66':'Rich Freighter','67':'System Defence Boat','68':'Naval Patrol',
  '70':'Traveller','71':'Small Freighter','72':'Medium Freighter','73':'Convoy','74':'Unusual Vessel','75':'Liner','76':'Rich Freighter','77':'System Defence Boat','78':'Naval Patrol'
};

const PREY_INFO = {
  'Traveller':          'A vessel other than a cargo ship: scout, small military ship, fast courier or even another pirate. A poor target (unlikely to carry valuable cargo) but can be looted for parts.',
  'Small Freighter':    'A far trader, free trader or other 100–300 ton trade vessel. Ideal prey: quickly looted and unlikely to have significant defences.',
  'Medium Freighter':   'A trader of 400–1,000 tons. A good target, but sorting through the cavernous hold may take more time than the pirate can afford.',
  'Heavy Freighter':    'A freighter of 1,000 tons or more. Travels with escorts or carries its own fighters or defences; may be more than the average pirate can handle.',
  'Liner':              'A passenger vessel, colony ship, troop transport or tourist vessel. Passengers carry valuables, but the pirates will be outnumbered if they storm aboard.',
  'Unusual Vessel':     "A noble's yacht, science vessel, X-boat, mercenary transport, survey ship or other rare type. Anywhere from useless to a rich prize. Could even be a rival pirate.",
  'System Defence Boat':'A classic SDB: heavily armed, fast-moving, no jump drive. Extremely dangerous, but a clever pirate can avoid or escape it.',
  'Q-Ship':             'A small freighter refitted with concealed weapons as a honey trap for pirates. When the attack begins it reveals its weapons and launches fighters.',
  'Convoy':             'A convoy of 2–12 ships: Heavy, Medium and Rich Freighters plus armed escorts.',
  'Naval Patrol':       'A heavily armed navy ship, from a small escort or pirate hunter up to a full-size warship. Destroying it guarantees the navy will hunt the pirate down.',
  'Rich Freighter':     'A freighter carrying an especially valuable cargo.'
};

// Morale classes (p.15)
const MORALE_CLASS = {
  merchant: { label: 'Merchant (1D+3)', base: 3 },
  armed:    { label: 'Armed ship (1D+6)', base: 6 },
  naval:    { label: 'Naval ship (1D+8)', base: 8 }
};
const PREY_MORALE = {
  'Traveller':'merchant','Small Freighter':'merchant','Medium Freighter':'merchant','Heavy Freighter':'merchant','Liner':'merchant',
  'Unusual Vessel':'merchant','Convoy':'merchant','System Defence Boat':'armed','Q-Ship':'armed','Naval Patrol':'naval'
};

// Pirate Hunter Response (p.21), 2D + DMs
function hunterResponse(total) {
  if (total <= 5)  return 'No response. Roll again in one hour.';
  if (total <= 7)  return 'A vessel launches from the starport to investigate.';
  if (total <= 9)  return 'A vessel launches from the starport or from the hundred-diameter jump limit, whichever is closer.';
  if (total === 10) return 'A vessel in orbit responds. Response time 1D+1 hours.';
  if (total === 11) return 'A vessel in orbit responds. Response time 1D hours.';
  if (total === 12) return 'A vessel in orbit responds. Response time 1D × 10 minutes.';
  return 'A vessel in orbit responds. Response time 1D × 5 minutes.';
}
// Response time dice for the "in orbit" results: [dice, multiplier, plus, unit]
function hunterTime(total) {
  if (total === 10) return [1, 1, 1, 'hours'];
  if (total === 11) return [1, 1, 0, 'hours'];
  if (total === 12) return [1, 10, 0, 'minutes'];
  if (total >= 13) return [1, 5, 0, 'minutes'];
  return null;
}

// Prey Quirks (p.19), D66
const PREY_QUIRKS = {
  11:['Coward','Surrenders easily. Reduce starting MOR by 1D.'],
  12:['Deceitful','Pretends to surrender in order to lure the pirates into docking, then fights back at Short range.'],
  13:['Smuggler','The really valuable cargo is hidden in a secret compartment.'],
  14:['Eccentric','The captain is insane, drunk or otherwise eccentric.'],
  15:['No Surrender','The crew will not surrender under any circumstances. Ignore MOR.'],
  16:['Duel of Honour','The captain challenges one of the pirates to a rapier duel in vacc suits on the exterior hull of his ship.'],
  21:['Noble','There is a noble on board. If ransomed, she is worth considerably more than normal.'],
  22:['Alien','There is an exotic alien like a Hiver on board.'],
  23:['Family',"The captain's family travel on board the ship."],
  24:['Diplomat','There is an Imperial or Aslan diplomat on board, carrying a secret message.'],
  25:['Stowaway',"Someone is hidden inside a cargo container that the pirates just stole."],
  26:['Prisoner',"There is a criminal (perhaps a captured pirate) in the ship's brig."],
  31:['Plague Ship','The crew are infected with a potentially fatal disease.'],
  32:['Dying Ship','The ship misjumped and is running low on food, oxygen or fuel.'],
  33:['Damaged Ship','The ship has sustained 1D critical hits, each of Severity D3 already.'],
  34:['Treasure Map','While looting the ship, the Travellers find a map pointing to a hidden supply cache, mineral deposit or other valuable treasure.'],
  35:['Important Document',"The ship's safe contains the deeds to a property, a letter of marque, a corporate contract or some other valuable document."],
  36:['Message Pod','The ship carries a 5-dton data drum containing mail. Decoding this data may reveal useful information.'],
  41:['Heavily Armed','The merchant ship is ready for a fight. Any hardpoints are equipped with turrets filled with lasers or missile racks.'],
  42:['Berserker','One of the merchant crew is a trained marine equipped with battle dress or boarding vacc suit, and a heavy weapon.'],
  43:['Self Destruct',"The captain would rather die than lose his ship. Unless the pirates can stop him, he'll scuttle his ship rather than lose his cargo."],
  44:['Mission of Mercy','The ship is carrying vitally needed supplies, like medicine or food, to a troubled colony.'],
  45:['Die Hard',"One of the merchant's crew hides when the ship is boarded, and sneaks onto the Travellers' ship to sabotage them."],
  46:['Psionic Defender','One of the crew of the merchant ship is a psion.'],
  51:['Unlikely Cargo','The merchant ship is carrying an unexpected cargo. What are they doing out here?'],
  52:['Perishable Cargo',"The merchant's cargo is valuable, but only if sold within the month."],
  53:['Dangerous Cargo',"The merchant's cargo is dangerous to have on board."],
  54:['Living Cargo','The cargo is alive: animals, insects, or even slaves.'],
  55:['Hot Cargo','The cargo was stolen, and the real owner wants it back.'],
  56:['Alien Cargo','The merchant is carrying something from a very distant part of space, or even an Ancient relic.'],
  61:['Traitor',"One of the merchant's crew is willing to betray his shipmates for a large payoff."],
  62:['Infestation',"There's something alive on board the ship."],
  63:['Ghost Ship','This ship has been drifting dead for centuries. The Travellers were attacked by automated weapons.'],
  64:['Strange Curio',"There's a relic or other strange item in the captain's cabin."],
  65:["It's a Trap",'This "merchant" is actually a disguised q-ship or pirate hunter.'],
  66:['Drinaxian on Board',"One of the characters from The Trojan Reach page 24 is on board. What are they doing here?"]
};

// Prey Complications (p.20), D66
const PREY_COMPLICATIONS = {
  11:['Solar Flares',"The system's primary sun spits out huge flares and high levels of radiation. All ships take 3D × 100 rads per hour."],
  12:['Debris Field','The encounter takes place in a debris field. Pilot checks are needed to avoid floating obstacles; on the bright side, there may be some salvage here.'],
  13:['Ice Field',"The planet is surrounded by a ring of ice particles, and the quarry takes refuge there. Direct-fire weapons are limited to Short range."],
  14:['Comms Jamming',"Something in the system blocks communications. The victim can't call for help."],
  15:['Behind The Moon',"There's a nearby moon. What's lurking there? Another pirate? An interceptor? An Aslan spy?"],
  16:['Incoming Escort',"The merchant has an escort, but they haven't jumped in yet. They'll be here any minute."],
  21:['Rival Pirate',"There's another pirate after the same prize."],
  22:['Slow Leak',"The Travellers' fuel tank has a slow leak; they're losing 1D tons of fuel per round."],
  23:['Out of Control','The quarry loses control of its attitude thrusters and starts spinning wildly. It is now easy to catch but very hard to dock with.'],
  24:['Cargo Spilled','In a panic, the merchant jettisons most of its cargo, sending an expanding flock of canisters into space.'],
  25:['Collision Warning!','Both ships nearly collide with a small asteroid or other piece of space debris.'],
  26:['Misjump','The first ship to jump out misjumps when they flee.'],
  31:['Observer',"There's another ship nearby. They steer clear of the dogfight, but they're watching..."],
  32:['Bad Jump','This was a bad jump: the pirates have arrived well outside the travelled parts of the system.'],
  33:['Unfortunate Timing','Another ship jumps right into the middle of the battle.'],
  34:['Crew Dissent',"One of the crew on board the Travellers' ship is having problems that affect the battle. Perhaps they object to this particular target, are drunk, or are deliberately sabotaging the attack."],
  35:['System Failure','A key system fails on board the pirate ship. Roll for a random critical hit with a Severity of D3.'],
  36:['Escape Pods',"The merchant's crew flee their ship in escape pods and small craft. They could be carrying treasure on board those pods, but the pirates have time to chase down only one of them."],
  41:['Rapid Reaction','The security forces here respond very quickly. Apply DM+4 to the response time roll.'],
  42:['Corrupt Cops','The security forces can be bribed to ignore the attack.'],
  43:['Nearby Asteroid',"There's an asteroid close to the battle; the merchant can fly to the refuge and hide behind it. The asteroid might even be inhabited."],
  44:['Sensor Jamming','Conditions in the system block sensors.'],
  45:['Imperial Patrol',"There's an Imperial or Aslan patrol in the system, hunting for pirates. They're far enough away that the Travellers might be able to complete the attack before the first fighters arrive."],
  46:['Distress Call','The Travellers detect a distress call from a stricken ship. Do they call off their attack?'],
  51:['High Guard',"There's an unexpected ship refuelling at the system's gas giant (or another source of hydrogen, like a lake). Why are they avoiding the starport?"],
  52:['Spy in the System','A spy in the system contacts the Travellers by radio, offering them useful information about traffic.'],
  53:['Screamer','The merchant ship frantically warns everyone who will listen about the pirates: not just in this system, but in every other system the merchant visits.'],
  54:['Incoming!','The starport below launches ground-to-space missiles. The first missile hits in 1D+10 rounds.'],
  55:['Tricky Calculation','The complex arrangement of moons and planets in this system make jump calculations harder. Apply DM-4 to any Astrogation checks.'],
  56:['Pull Up!',"The merchant doesn't slow down as it approaches the planet. Instead, they plan to use aerobraking to slow their descent."],
  61:['The Black Signal',"The pirates pick up the fabled 'black signal' on the ship: a pattern of radiation burned into the hull, denoting that this ship is an enemy of the pirates of Theev."],
  62:['Familiar Ship','The Travellers have encountered this merchant ship before...'],
  63:['Aslan Raiders','Several Aslan raiders led by an ambitious ihatei warlord arrive in the system.'],
  64:['Under The Shield of the Sunburst',"An Imperial patrol jumps in; they're not pirate hunting, they're here to enforce the Third Imperium's will on the planetary government."],
  65:["Didn't Expect To Find You Here",'A Contact (or Ally, or Enemy) of a Traveller is on board the merchant.'],
  66:['Anomaly','The Travellers run into something unusual, like a wrecked ship or a spatial anomaly.']
};

// House-rule special cargo (Imperium/Hierate trade): 2D result -> id on the Trade Goods table (trade-goods.js).
// "Basic Manufactured/Raw Materials" use the Common Manufactured Goods (13) / Common Raw Materials (14) entries.
const IMPERIUM_HIERATE = { 2:24, 3:33, 4:35, 5:34, 6:51, 7:13, 8:26, 9:42, 10:23, 11:22, 12:64 };
const HIERATE_IMPERIUM = { 2:45, 3:53, 4:35, 5:34, 6:52, 7:14, 8:43, 9:31, 10:54, 11:44, 12:65 };

// Pirate hunters' sources of loot (p.23): values used for the loot summary
const LOOT = {
  safePer100Tons: 20000,       // ship's safe treasure per 100 tons of ship
  high: 10000, middle: 5000, low: 1000,   // passenger treasure
  perCrew: 1000,               // crew equipment (must be fenced)
  vehiclePerTon: 250000        // a 20-ton launch is worth MCr5 (must be fenced)
};
