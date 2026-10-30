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

// Every Active ship in the campaign with its running costs for one maintenance period.
// Returns [{ ship, ex }]. Needs supabaseClient and inCampaign (js/supabase-config.js).
async function loadShipExpenses(campaignId) {
  const { data: ships, error } = await supabaseClient.from('spacecraft').select('*')
    .eq('campaign_id', campaignId).eq('status', 'active').order('name');
  if (error) throw error;
  return Promise.all((ships || []).map(async s => {
    const [chars, hired, pass] = await Promise.all([
      supabaseClient.from('characters').select('id').eq('onboard_ship_id', s.id).eq('status', 'active'),
      supabaseClient.from('spacecraft_hired_crew').select('id').eq('spacecraft_id', s.id),
      supabaseClient.from('spacecraft_passengers').select('*').eq('spacecraft_id', s.id)
    ]);
    const passengers = (pass.data || []).reduce((n, r) =>
      n + (r.high_passage || 0) + (r.middle_passage || 0) + (r.basic_passage || 0) + (r.working_passage || 0) + (r.low_passage || 0), 0);
    return { ship: s, ex: shipExpenses(s, { onboard: (chars.data || []).length, hired: (hired.data || []).length, passengers }) };
  }));
}
