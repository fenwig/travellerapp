supabaseClient.auth.getSession().then(({ data: { session } }) => {
  const el = document.getElementById('sidebar-user');
  if (el && session) {
    el.textContent = session.user.user_metadata?.display_name || session.user.email;
  }
});
