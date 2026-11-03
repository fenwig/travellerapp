// Ship weapons from High Guard (2022 update), "Weapons and Screens" (printed pp.26-41).
// Rows are [name, TL, range, power, damage, cost (MCr), traits]. The PDF text scrambles the table columns, so the barbette
// and medium/large bay rows were matched to names by row order and cross-checked against the weapon power on the ship
// sheets (Fer-de-Lance, Halaheike, Sakhai, System Defence Boat) and against the user-confirmed Particle Barbette row.
// A weapon mount takes one hardpoint; a barbette takes 5 tons and counts as a heavy turret.

// Mounts: [name, TL, power, tons, cost MCr]
const MOUNTS = [
  ['Fixed Mount', null, 0, 0, 0.1],
  ['Single Turret', 7, 1, 1, 0.2],
  ['Double Turret', 8, 1, 1, 0.5],
  ['Triple Turret', 9, 1, 1, 1],
  ['Pop-Up Mounting', 10, 0, 1, 1]   // power +0, tons +1, cost +MCr1 on top of the mount
];

// Turret and fixed-mount weapons. Several weapons in a mount fire as one attack; each extra weapon adds +1 damage die.
const TURRET_WEAPONS = [
  ['Beam Laser', 10, 'Medium', 4, '1D', 0.5, 'Turret beam lasers get DM+4 to attack'],
  ['Fusion Gun', 14, 'Medium', 12, '4D', 2, 'Radiation'],
  ['Laser Drill', 8, 'Adjacent', 4, '2D', 0.15, 'AP 4'],
  ['Missile Rack', 7, 'Special', 0, '4D', 0.75, 'Smart'],
  ['Particle Beam', 12, 'Very Long', 8, '3D', 4, 'Radiation'],
  ['Plasma Gun', 11, 'Medium', 6, '3D', 2.5, '--'],
  ['Pulse Laser', 9, 'Long', 4, '2D', 1, '--'],
  ['Railgun', 10, 'Short', 2, '2D', 1, 'AP 4'],
  ['Sandcaster', 9, 'Special', 0, 'Special', 0.25, '--']
];

// Barbettes (damage multiple 3; most take 5 tons, one hardpoint).
const BARBETTE_WEAPONS = [
  ['Beam Laser Barbette', 10, 'Medium', 12, '2D', 3, '--'],
  ['Fusion Barbette', 12, 'Medium', 20, '5D', 4, 'AP 3, Radiation'],
  ['Ion Cannon Barbette', 12, 'Medium', 10, '7D', 6, 'Ion'],
  ['Missile Barbette', 7, 'Special', 0, '4D', 4, 'Smart'],
  ['Particle Barbette', 11, 'Very Long', 15, '4D', 8, 'Radiation'],
  ['Plasma Barbette', 11, 'Medium', 12, '4D', 5, 'AP 2'],
  ['Pulse Laser Barbette', 9, 'Long', 12, '3D', 6, '--'],
  ['Railgun Barbette', 10, 'Medium', 5, '3D', 2, 'AP 5'],
  ['Torpedo Barbette', 7, 'Special', 2, '6D', 3, 'Smart']
];

// Bays. Damage multiples: small 10, medium 20, large 100.
const BAY_WEAPONS = {
  small: [
    ['Fusion Gun Bay', 12, 'Medium', 50, '6D', 8, 'AP 6, Radiation'],
    ['Ion Cannon Bay', 12, 'Medium', 20, '6D', 15, 'Ion'],
    ['Mass Driver Bay', 8, 'Short', 15, '3D', 40, 'Orbital Bombardment'],
    ['Meson Gun Bay', 11, 'Long', 20, '5D', 50, 'AP (value not readable), Radiation'],
    ['Missile Bay', 7, 'Special', 5, '4D', 12, 'Smart'],
    ['Orbital Strike Mass Driver Bay', 10, 'Short', 35, '7D', 25, 'Orbital Strike'],
    ['Orbital Strike Missile Bay', 10, 'Medium', 5, '3D', 16, 'Orbital Strike'],
    ['Particle Beam Bay', 11, 'Very Long', 30, '6D', 20, 'Radiation'],
    ['Railgun Bay', 10, 'Short', 10, '3D', 30, 'AP 10'],
    ['Repulsor Bay', 15, 'Short', 50, 'Special', 30, '--'],
    ['Torpedo Bay', 7, 'Special', 2, '6D', 3, 'Smart']
  ],
  medium: [
    ['Fusion Gun Bay', 12, 'Medium', 80, '7D', 14, 'AP 6, Radiation'],
    ['Ion Cannon Bay', 12, 'Medium', 30, '8D', 25, 'Ion'],
    ['Mass Driver Bay', 8, 'Short', 25, '4D', 60, 'Orbital Bombardment'],
    ['Meson Gun Bay', 12, 'Long', 30, '6D', 60, 'AP (value not readable), Radiation'],
    ['Missile Bay', 7, 'Special', 10, '4D', 20, 'Smart'],
    ['Orbital Strike Mass Driver Bay', 10, 'Short', 50, '10D', 35, 'Orbital Strike'],
    ['Orbital Strike Missile Bay', 10, 'Medium', 15, '5D', 20, 'Orbital Strike'],
    ['Particle Beam Bay', 12, 'Very Long', 50, '8D', 40, 'Radiation'],
    ['Railgun Bay', 10, 'Short', 15, '5D', 50, 'AP 10'],
    ['Repulsor Bay', 14, 'Short', 100, 'Special', 60, '--'],
    ['Torpedo Bay', 7, 'Special', 5, '6D', 6, 'Smart']
  ],
  large: [
    ['Fusion Gun Bay', 12, 'Long', 100, '10D', 25, 'AP 8, Radiation'],
    ['Ion Cannon Bay', 12, 'Long', 40, '10D', 40, 'Ion'],
    ['Mass Driver Bay', 8, 'Medium', 35, '6D', 80, 'Orbital Bombardment'],
    ['Meson Gun Bay', 13, 'Long', 120, '6D', 250, 'AP (value not readable), Radiation'],
    ['Missile Bay', 7, 'Special', 20, '4D', 25, 'Smart'],
    ['Orbital Strike Mass Driver Bay', 10, 'Short', 75, '12D', 50, 'Orbital Strike'],
    ['Orbital Strike Missile Bay', 10, 'Medium', 25, '8D', 24, 'Orbital Strike'],
    ['Particle Beam Bay', 13, 'Distant', 80, '10D', 60, 'Radiation'],
    ['Railgun Bay', 10, 'Medium', 25, '6D', 70, 'AP 10'],
    ['Repulsor Bay', 13, 'Short', 200, 'Special', 90, '--'],
    ['Torpedo Bay', 7, 'Special', 10, '6D', 10, 'Smart']
  ]
};

// Point defence: [name, TL, intercept, power, tons, cost MCr]. A battery takes one hardpoint and cuts the number of
// missiles or torpedoes attacking per turn by its Intercept score. Gauss batteries carry 12 rounds between reloads.
const POINT_DEFENCE = [
  ['Point Defence Laser Battery (Type I)', 10, '+2D', 10, 20, 5],
  ['Point Defence Laser Battery (Type II)', 12, '+4D', 20, 20, 10],
  ['Point Defence Laser Battery (Type III)', 14, '+6D', 30, 20, 20],
  ['Point Defence Gauss Battery (Type I)', 10, '+2D', 5, 20, 3],
  ['Point Defence Gauss Battery (Type II)', 12, '+4D', 15, 20, 6],
  ['Point Defence Gauss Battery (Type III)', 14, '+6D', 25, 20, 10]
];

// Screens: [name, TL, power, tons, cost MCr]
const SCREENS = [
  ['Meson Screen', 13, 30, 10, 20],
  ['Nuclear Damper', 12, 20, 10, 10]
];
