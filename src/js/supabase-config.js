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
