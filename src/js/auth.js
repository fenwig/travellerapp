function showTab(tab) {
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
  document.querySelectorAll('.tab').forEach((el, i) => {
    el.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
  });
}

async function signIn() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) { errorEl.textContent = error.message; return; }
  showDashboard(data.user);
}

async function register() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errorEl = document.getElementById('reg-error');
  const successEl = document.getElementById('reg-success');
  errorEl.textContent = '';
  successEl.textContent = '';

  const { error } = await supabaseClient.auth.signUp({
    email, password,
    options: { data: { display_name: name } }
  });

  if (error) { errorEl.textContent = error.message; return; }
  successEl.textContent = 'Account created! Check your email to confirm, then sign in.';
}

async function signOut() {
  await supabaseClient.auth.signOut();
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('auth-section').style.display = 'block';
}

function showDashboard(user) {
  window.location.href = 'src/pages/character-record.html';
}

// Check if already logged in on page load
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) showDashboard(session.user);
});
