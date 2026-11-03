// Spacecraft reference data shared by the Spacecraft Record and the Fleet pages.

// Critical hit effects by location, severity 1 to 6 in order
const CRIT_EFFECTS = {
  "Sensors":      ["All checks to use sensors suffer DM−2.","Sensors inoperative beyond Medium range.","Sensors inoperative beyond Short range.","Sensors inoperative beyond Close range.","Sensors inoperative beyond Adjacent range.","Sensors disabled."],
  "Power Plant":  ["Power reduced by 10%.","Power reduced by 10%.","Power reduced by 50%.","Power reduced to 0.","Hull Severity +1. Power reduced to 0.","Hull Severity +1D. Power reduced to 0."],
  "Fuel":         ["Leak — lose 1D tons/hour.","Leak — lose 1D tons/round.","Lose 1D×10% of fuel.","Fuel tank destroyed.","Fuel tank destroyed. Hull Severity +1.","Fuel tank destroyed. Hull Severity +1D."],
  "Weapon":       ["Random weapon DM−1.","Random weapon disabled.","Random weapon destroyed.","Random weapon explodes. Hull Severity +1.","D3 weapons explode. Hull Severity +1.","1D weapons explode. Hull Severity +1."],
  "Armour":       ["Armour −1.","Armour −D3.","Armour −1D.","Armour −1D.","Armour −2D. Hull Severity +1.","Armour −2D. Hull Severity +1."],
  "Hull":         ["Suffers 1D damage.","Suffers 2D damage.","Suffers 3D damage.","Suffers 4D damage.","Suffers 5D damage.","Suffers 6D damage."],
  "M-Drive":      ["Control checks DM−1.","Control checks DM−1. Thrust −1.","Control checks DM−1. Thrust −1.","Control checks DM−1. Thrust −1.","Thrust reduced to zero.","Thrust reduced to zero. Hull Severity +1."],
  "Cargo":        ["10% of cargo destroyed.","1D×10% of cargo destroyed.","2D×10% of cargo destroyed.","All cargo destroyed.","All cargo destroyed. Hull Severity +1.","All cargo destroyed. Hull Severity +1."],
  "J-Drive":      ["Jump drive checks DM−2.","Jump drive disabled.","Jump drive destroyed.","Jump drive destroyed. Hull Severity +1.","Jump drive destroyed. Hull Severity +1.","Jump drive destroyed. Hull Severity +1."],
  "Crew":         ["Random occupant 1D damage.","1D occupants 2D damage.","1D occupants 2D damage.","1D occupants 2D damage.","1D occupants 3D damage.","All occupants 4D damage."],
  "Bridge":       ["Random bridge station disabled.","Life support fails in 1D hours.","Life support fails in 1D rounds.","Computer reboots — software unavailable this round and next.","Computer damaged. Bandwidth −50%.","Bridge station destroyed. Occupant 1D×1D damage. Hull Severity +1."]
};

// Sensor grades: TL, DM applied to Electronics checks made aboard, power needed, equipment
const SENSOR_GRADES = {
  "Basic":          { tl:8,  dm:-4, power:0, suite:"Lidar, Radar" },
  "Civilian Grade": { tl:9,  dm:-2, power:1, suite:"Lidar, Radar" },
  "Military Grade": { tl:10, dm:0,  power:2, suite:"Jammers, Lidar, Radar" },
  "Improved":       { tl:12, dm:1,  power:4, suite:"Densitometer, Jammers, Lidar, Radar" },
  "Advanced":       { tl:15, dm:2,  power:6, suite:"Densitometer, Jammers, Lidar, Neural Activity Sensor, Radar" }
};
