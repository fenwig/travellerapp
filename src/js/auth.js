function showTab(tab) {
  ['login', 'register', 'forgot', 'reset'].forEach(f => {
    document.getElementById(f + '-form').style.display = tab === f ? 'block' : 'none';
  });
  document.querySelector('.tab-row').style.display = tab === 'reset' ? 'none' : '';
  document.querySelectorAll('.tab').forEach((el, i) => {
    el.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
  });
}

async function sendResetEmail() {
  const email = document.getElementById('forgot-email').value.trim();
  const errorEl = document.getElementById('forgot-error');
  const successEl = document.getElementById('forgot-success');
  errorEl.textContent = '';
  successEl.textContent = '';
  if (!email) { errorEl.textContent = 'Enter your email address.'; return; }

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  if (error) { errorEl.textContent = error.message; return; }
  successEl.textContent = 'If that email has an account, a reset link is on its way.';
}

async function setNewPassword() {
  const pw = document.getElementById('reset-password').value;
  const pw2 = document.getElementById('reset-password2').value;
  const errorEl = document.getElementById('reset-error');
  errorEl.textContent = '';
  if (pw.length < 6) { errorEl.textContent = 'Password must be at least 6 characters.'; return; }
  if (pw !== pw2) { errorEl.textContent = 'Passwords do not match.'; return; }

  const { data, error } = await supabaseClient.auth.updateUser({ password: pw });
  if (error) { errorEl.textContent = error.message; return; }
  showDashboard(data.user);
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
  window.location.href = 'src/pages/character-list.html';
}

// A recovery link signs the player in temporarily; show the new-password form
// instead of redirecting them into the app.
const isRecoveryLink = /type=recovery/.test(window.location.hash + window.location.search);
if (isRecoveryLink) showTab('reset');

supabaseClient.auth.onAuthStateChange((event) => {
  if (event === 'PASSWORD_RECOVERY') showTab('reset');
});

// Check if already logged in on page load
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session && !isRecoveryLink) showDashboard(session.user);
});
