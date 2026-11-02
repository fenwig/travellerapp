// Pirates of Drinax — how each world can be moved toward Haven (Book 1, "Patrons and Opportunities" pp.263-268,
// plus the adventure outcomes that name a port). Text is paraphrased, not copied from the book.
// Each world has a list of ways in. Fields:
//   patron  who offers it (blank for a plain price)         — shown to players once "patron known" is ticked
//   need    what must be done or paid                       — shown to players once "requirement known" is ticked
//   reward  what the world gets, as the book words it       — shown with need
//   step    notches up the ladder (Hostile → Haven) the reward moves the port (number), or
//   set     an attitude the port is set to; neither means no attitude change
//   per     true when step is "per unit paid" (the GM is asked how many)
//   also    other worlds moved by the same mission
//   gm      referee-only notes (twists, conditions); never shown on the player page
const DRINAX_PATHS = {
  // ── Borderlands ──
  'Byrni': [{ patron: 'Regent Stoylis, Lord Commander of the Antispin Star Guard', need: 'Show that King Oleb is wise and benevolent enough to rule.', reward: 'Byrni joins the Kingdom of Drinax.',
    gm: 'Stoylis already backs the plan if Oleb proves worthy. Wisdom and benevolence are not Oleb\'s strong points.' }],
  'Acrid': [{ patron: 'Gera Hollis', need: 'Give military support to the miners\' revolt against PRQ and fend off the company\'s strike breakers.', reward: 'Acrid and Argona become Havens.', set: 'Haven', also: ['Argona'],
    gm: 'PRQ has two System Defence Boats at each world and will hire mercenary cruisers. Short, bloody war.' }],
  'Argona': [{ need: 'Donate Luxuries or Illegal Drugs: each MCr1 moves it one step.', reward: 'One step toward Haven per MCr1.', step: 1, per: true },
    { patron: 'Gera Hollis (see Acrid)', need: 'Support the revolt on Acrid.', reward: 'Argona becomes a Haven along with Acrid.', set: 'Haven' }],
  'Arunisiir': [{ patron: 'Ekaft, an Aslan landowner', need: 'Carry a message to his cousins in the Hierate, calling them to reconquer the world.', reward: 'Arunisiir becomes a Haven.', set: 'Haven',
    gm: 'This will almost certainly cause civil war, so Ekaft wants an overwhelming Aslan force.' }],
  'Cordan': [{ patron: 'Uht Vamos, leader of the cave people', need: 'Supply the descendants of the original population with many weapons.', reward: 'Cordan becomes a Haven (and drops to TL2).', set: 'Haven',
    gm: 'GeDeCo troops guard the waystation and shoot the barbarians on sight.' },
    { patron: 'Baroness Lux', need: 'Quietly remove her rivals, Baron Fero and Baron Halley.', reward: 'Land and estates on Cordan.',
      gm: 'Halley is a Zhodani puppet who reports Imperial shipping; his guards are Zhodani-trained.' }],
  'Ergo': [{ patron: 'Imperial Scout Ballis, of the No Stone Unturned', need: 'Recover Ballis\'s co-pilot Ferish from warring gangs.', reward: 'A favour from the Imperial Scout Service.' }],
  'Exe': [{ need: 'Bribe the port crew, a few thousand credits each.', reward: 'Exe becomes Friendly.', set: 'Friendly' }],
  'Falcon': [{ patron: 'John Macule', need: 'Find Zuekhvi\'s pirates, who say they planted a bomb on the asteroid, and learn where it is.', reward: 'MCr0.5 and one step toward Haven.', step: 1 }],
  'Inurin': [{ patron: 'Free trader Laro Smith', need: 'Sneak into the fungal caves and learn where the drug Sarna comes from.', reward: 'A share of any profits.' }],
  'Pandora': [{ patron: 'Administrator Thollett', need: 'Plant evidence that the old Sindalian Empire caused the colony\'s destruction.', reward: 'Two steps toward Haven.', step: 2,
    gm: 'Everyone believes a solar flare killed the old colony; this is a request to forge the cause.' }],
  'Sperle': [{ patron: 'The Free Sperle Society', need: 'Set up a smuggling route off Sperle that bypasses GeDeCo-owned shipping.', reward: 'Three steps toward Haven.', step: 3 }],
  'Tanith': [{ patron: 'Councillor Abros', need: 'Hunt down four ships carrying stowaway volay primates and destroy the animals and their parasites.', reward: 'Cr100,000.',
    gm: 'Failure could get Tanith declared a Red Zone by the Imperium.' }],
  'Umemii': [{ patron: 'Thona Zorn', need: 'Disable the starport at Tanith, Acrid or Cordan so traders must stop at Umemii.', reward: 'Umemii becomes Friendly.', set: 'Friendly' }],

  // ── Sindal ──
  'Borite': [{ patron: 'BCA Administrator Ura', need: 'Repair a broken atmosphere pump in the mine.', reward: 'Cr5,000 and one step toward Haven.', step: 1,
    gm: 'Oghman slavers are watching the pump and will target the technician.' }],
  'Chalchiutlicu': [{ patron: 'City Councillor Jilacua', need: 'Smuggle people offworld, since he cannot be seen to defy the other councillors.', reward: 'One step toward Haven per 1,000 people.', step: 1, per: true }],
  'Number One': [{ patron: 'Loank Vetis, ruler of the undersea settlement Felaka', need: 'Help build a second starport on an anti-grav platform: invest at least MCr100, provide TL13+ expertise, and defend it.', reward: 'Number One becomes a Haven, plus a cut of the new starport\'s profits.', set: 'Haven' }],
  'Salif': [{ patron: 'Tiznee Zazzle', need: '"Kidnap" her, take her to Albe for medical treatment, then let her "escape".', reward: 'Salif becomes Friendly.', set: 'Friendly',
    gm: 'She needs her anagathics adjusted, but her followers must not learn she left for medical reasons.' }],
  'Vume': [{ patron: 'Priel Marsden, for an unnamed Imperial corporation', need: 'Clear the thousands of residents out of the space station by any means.', reward: 'Vume becomes a Haven, plus MCr0.05.', set: 'Haven',
    gm: 'The corporation (PRQ or GeDeCo) wants the station for a luxury waystation and has no interest in the methods.' }],

  // ── Tliowaha ──
  'Akoaft': [{ patron: 'Taofel the Scholarly', need: 'Find a patch of rare lichen in territory now held by the Htyowao.', reward: 'Cr20,000.' }],
  'Blue': [{ patron: 'Metholde Vong', need: 'Find his daughter Kasah, who stowed away on a trader.', reward: 'Cr20,000 and one step toward Haven.', step: 1,
    gm: 'Pirates attacked the ship; she was sold into slavery in the Glorious Empire.' }],
  'Clarke': [{ patron: 'High Psychopomp Boone', need: 'Persuade Prince Harrick to join the Psychopomp faith and make it the state religion of a revived Kingdom.', reward: 'Two steps toward Haven.', step: 2,
    gm: 'Boone would step down and name Harrick his successor.' },
    { patron: 'Torpol and Clarke (Honour Among Thieves)', need: 'Bring Ferrik Redthane to justice.', reward: 'Both Torpol and Clarke move two steps toward Haven, plus the MCr2.5 bounty.', step: 2, also: ['Torpol'] }],
  'Fantasy': [{ patron: 'Tarya', need: 'Use genetic data from a wrecked Aslan slave ship to undo the limits placed on her people\'s intellect.', reward: 'Fantasy becomes a Haven.', set: 'Haven' }],
  'Hilfer': [{ need: 'Send a ship to drag water-ice asteroids to Hilfer, or spend MCr0.5 per step on water reclamation.', reward: 'One step toward Haven per ship allocated or MCr0.5 spent.', step: 1, per: true }],
  'Iroioah': [{ patron: 'The Nameless Keeper', need: 'Reopen a temple buried in the sands and activate a device inside.', reward: 'Relief from the psionic dreams the Keeper sends.',
    gm: 'TRAP: the device generates the Keeper itself, which will try to seize the Travellers\' bodies once it is repaired.' }],
  'Keaih': [{ patron: 'Takhweirl of the Company of Profits That Rise Like Mist', need: 'Smuggle restricted Aslan terraforming chemicals to Homestead, with Aslan warriors guarding them.', reward: 'A shipping contract (about 1,000 tons a month, Keaih to Vorito, Cr2,200 a ton) and documents of passage in the Hierate.' }],
  'Khusai': [{ patron: 'Hunter Syas, Guardian of Trade', need: 'Bring her information that leads to the capture or death of enemies of the Hierate.', reward: 'Cr5,000 per pirate and Cr50,000 per ship.',
    gm: 'She is hunting pirates, and especially wants to find Theev and blast it. Working for her is working against pirates.' }],
  'Kteiroa': [{ need: 'Neutral: visit the planet and the ihatei camp, then leave without trouble. Tolerant: spend Cr10,000 at the starport. Friendly: invest Cr100,000. Haven: invest MCr10.', reward: 'Steps up the ladder as each price is paid.',
      gm: 'Suspicious needs nothing. This is the ladder printed in the Ihatei! adventure.' },
    { patron: 'Utea', need: 'Steal a shipment of weapons from an Ahroay\'if clan transport and sell it through her.', reward: 'One step toward Haven.', step: 1,
      gm: 'Utea\'s information is only partly right: the weapons are not bound for Tlaiowaha but for human border worlds like Hilfer and Paal.' }],
  'Paal': [{ need: 'Donate advanced goods (Advanced Electronics, Manufactured Goods or Vehicles, Cybernetics, Luxury Consumables or Goods, Medical Supplies, Polymers, Robots, Pharmaceuticals, Vehicles): each MCr1 moves it one step.', reward: 'One step toward Haven per MCr1.', step: 1, per: true }],
  'Pourne': [{ patron: 'Nevin Yrral, Bureau of Investigation', need: 'Find where a derelict scout ship of possibly non-human design came from, and whether it is a threat.', reward: 'Cr10,000 and one step toward Haven.', step: 1 }],
  'The World': [{ patron: 'Governor Olc', need: 'Find a replacement fusion control module, or a thousand-year-old reactor part.', reward: 'The World becomes a Haven.', set: 'Haven',
    gm: 'The reactor dates from the Second Imperium; replacing the whole reactor would reveal the truth about The World, so it must be a part.' }],
  'Torpol': [{ patron: 'Provost Shala', need: 'Raid a Thalassan research facility for plant seeds and cultivation data, ideally kidnapping Dr. Thorkan.', reward: 'One category toward Haven.', step: 1 },
    { patron: 'Torpol and Clarke (Honour Among Thieves)', need: 'Bring Ferrik Redthane to justice.', reward: 'Two steps toward Haven, plus the MCr2.5 bounty (shared with Clarke).', step: 2, also: ['Clarke'] }],
  'Tyokh': [{ patron: 'The Alley Cat', need: 'Capture a dustspice freighter.', reward: 'Access to the Rea\'a Hrillkhir black market: fence at 20% at any Aslan port.',
    gm: 'She plans to poison the spice and blackmail the wealthy Aslan who eat it.' }],
  'Vorito': [{ patron: 'Lando Nierr', need: 'Only if the Travellers took the Jaskarl hologram\'s offer: make an example of Salif.', reward: 'The Travellers become Pirate Lords of Theev; Vorito counts as a Haven for selling cargo and avoiding spies.',
    gm: 'Theev is secretly run by GeDeCo. Only available through The Vorito Gambit; do not show unless that offer was taken.' }],

  // ── Tobia ──
  'Boulder': [{ patron: 'Administrator Jopple Ort', need: 'Capture a Wildeman ore processor and steal its technology.', reward: 'MCr2, or access to the Class B starport on future visits.' }],
  'Exocet': [{ patron: 'Terraforming Engineer McGrath', need: 'Supply high-yield atomic weapons and a pilot willing to drop one into an active volcano.', reward: 'Two steps toward Haven.', step: 2 }],
  'Scaladon': [{ patron: 'Themis Bioplastics', need: 'Test a bioplastic for artificial islands on a world where the Chosen cult shoots down ships.', reward: 'MCr0.5.' }],
  'Wildeman': [{ patron: 'Klim Gobbo, a belter', need: 'Find a direct descendant of the dead pirate Tamby Dour to open a vault in Dour\'s hidden base.', reward: 'Half of what is in the vault: one empty gin bottle.',
    gm: 'The vault holds nothing. The real prize is Dour\'s hidden Class B starport base on the main shipping lane. Glinnet Dour lives on Blacksand.' }],
  'Iilgan': [{ patron: 'Lord Selwyn haut-Bizlant', need: 'Intercept a bacteria shipment bound for his rival Poetachus and swap the cultures.', reward: 'MCr1 and the use of haut-Bizlant\'s land as a hideout.' }],

  // ── From the adventures ──
  'Tech-World': [{ patron: 'Dr. Gerret Hodal (The Demon\'s Eye)', need: 'Deliver regular shipments of basic goods and raw materials, supply at least four 300-ton System Defence Boats (or equivalent), protect against GeDeCo reprisals, and guarantee unrestricted research.', reward: 'Tech-World becomes Friendly, in secret.', set: 'Friendly',
    gm: 'Good Diplomat or Broker checks can reduce the demands (for example, refitted freighters as Q-ships, or paying for stolen cargo). He insists on secrecy until everything is in place.' }]
};
