// Running costs of a spacecraft for one maintenance period (28 days), as shown on the Spacecraft Record's
// Finance tab and on the campaign Time Tracker. Fuel is not included (it is bought when needed).
// counts: { onboard: characters aboard, hired: hired crew, passengers: passengers carried }
function shipExpenses(s, counts) {
  counts = counts || {};
  const mortgage = Math.round((parseFloat(s.mortgage_value) || 0) * 1000000 / 240);
  const maintenance = Math.round((parseFloat(s.purchase_value) || 0) * 1000000 / 12000);
  const persons = (counts.onboard || 0) + (counts.hired || 0) + (counts.passengers || 0);
  const lifeSupport = (s.staterooms || 0) * 1000 + persons * 1000;
  const salaries = s.fin_salaries || 0;
  const berthing = s.fin_berthing || 0;
  const other = s.fin_other || 0;
  return {
    mortgage, maintenance, lifeSupport, salaries, berthing, other, persons,
    total: mortgage + maintenance + lifeSupport + salaries + berthing + other
  };
}
