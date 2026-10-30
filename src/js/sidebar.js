supabaseClient.auth.getSession().then(({ data: { session } }) => {
  const el = document.getElementById('sidebar-user');
  if (el && session) {
    el.textContent = session.user.user_metadata?.display_name || session.user.email;
    el.title = 'Click to edit display name';
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => editDisplayName(session.user, el));
    showCampaignName(el);
  }
});

async function editDisplayName(user, el) {
  const current = user.user_metadata?.display_name || '';
  const next = prompt('Display name (shown on your characters):', current);
  if (next === null) return;
  const trimmed = next.trim();
  if (!trimmed || trimmed === current) return;

  const { data, error } = await supabaseClient.auth.updateUser({
    data: { display_name: trimmed }
  });
  if (error) {
    alert('Could not update display name: ' + error.message);
    return;
  }
  el.textContent = trimmed;
  user.user_metadata = data.user.user_metadata;

  const { error: charError } = await supabaseClient
    .from('characters')
    .update({ player_name: trimmed })
    .eq('user_id', user.id);
  if (charError) {
    alert('Display name updated, but could not update it on your existing characters: ' + charError.message);
  }
}

// Small "Campaign: name" line under the user name (change campaign on the Roster).
async function showCampaignName(userEl) {
  const list = await loadCampaigns();
  const id = await currentCampaignId();
  const c = list.find(x => x.id === id);
  if (!c) return;
  const div = document.createElement('div');
  div.className = 'sidebar-campaign';
  div.textContent = 'Campaign: ' + c.name;
  div.title = 'Change campaign on the Roster';
  div.style.cssText = 'font-size:0.68rem;color:#4a9ab8;margin-top:4px;letter-spacing:0.04em;';
  userEl.after(div);
}
