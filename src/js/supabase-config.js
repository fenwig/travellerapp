const SUPABASE_URL = 'https://hwyagtoteiupergbtowf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TLUbpBqvGqT7VZJTadM0Ww_aGab77Q4';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// GM accounts get full access (view/edit/delete any character) in pages
// that otherwise restrict actions to a record's owner. This is a UI-only
// guard, not real server-side enforcement — anyone with API access could
// bypass it. If that ever matters, add a matching Supabase RLS policy.
const GM_EMAILS = ['mikelasagna@gmail.com'];
function isGM(user) {
  return !!user && GM_EMAILS.includes(user.email);
}


// ── Campaigns ──
// Each character and spacecraft belongs to one campaign. The campaign being viewed is picked on the
// Roster and remembered in this browser. If the campaigns table doesn't exist yet, these return
// empty/null and every page behaves as it did before campaigns.
const CAMPAIGN_KEY = 'traveller_campaign';
let _campaignsPromise = null;

function loadCampaigns() {
  if (!_campaignsPromise) {
    _campaignsPromise = supabaseClient.from('campaigns').select('id,name').order('created_at')
      .then(({ data, error }) => (error ? [] : data || []));
  }
  return _campaignsPromise;
}

async function currentCampaignId() {
  const list = await loadCampaigns();
  if (!list.length) return null;
  let id = null;
  try { id = localStorage.getItem(CAMPAIGN_KEY); } catch (e) {}
  if (!list.some(c => c.id === id)) { id = list[0].id; setCampaignId(id); }
  return id;
}

function setCampaignId(id) {
  try { localStorage.setItem(CAMPAIGN_KEY, id); } catch (e) {}
}

// Worlds listed on the Attitudes page for this campaign (name, UWP, trade codes...), for the world dropdowns.
// Empty if the table doesn't exist yet. Only worlds that have a UWP are returned.
let _worldsPromise = null;
function loadCampaignWorlds() {
  if (!_worldsPromise) {
    _worldsPromise = currentCampaignId().then(cid => !cid ? [] :
      supabaseClient.from('port_attitudes').select('world,sector,hex,uwp,trade_codes,attitude').eq('campaign_id', cid).order('sector').order('hex')
        .then(({ data, error }) => (error ? [] : (data || []).filter(w => w.uwp))));
  }
  return _worldsPromise;
}
// <option>s for a world dropdown, grouped by sector.
function worldOptions(worlds) {
  const by = {}; worlds.forEach(w => { (by[w.sector] = by[w.sector] || []).push(w); });
  return '<option value="">Pick a listed world…</option>' + Object.keys(by).map(s =>
    '<optgroup label="' + s + '">' + by[s].map(w => '<option value="' + w.world.replace(/"/g, '&quot;') + '">' + w.world + ' (' + w.uwp + ')</option>').join('') + '</optgroup>').join('');
}

// Limit a query to a campaign (no change when there is no campaign id).
function inCampaign(query, id) {
  return id ? query.eq('campaign_id', id) : query;
}
