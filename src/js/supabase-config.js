const SUPABASE_URL = 'https://hwyagtoteiupergbtowf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TLUbpBqvGqT7VZJTadM0Ww_aGab77Q4';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
