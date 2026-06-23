supabaseClient.auth.getSession().then(({ data: { session } }) => {
  const el = document.getElementById('sidebar-user');
  if (el && session) {
    el.textContent = session.user.user_metadata?.display_name || session.user.email;
    el.title = 'Click to edit display name';
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => editDisplayName(session.user, el));
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
