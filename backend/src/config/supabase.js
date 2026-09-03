const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const publicKey = process.env.SUPABASE_ANON_KEY
  || process.env.VITE_SUPABASE_ANON_KEY
  || serviceRoleKey;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  db: { schema: 'public' },
  realtime: { transport: ws },
});

// Keep auth signup on a public client so it follows Supabase's normal
// confirmation-email behavior. The admin client above remains private and is
// used for trusted profile/database operations.
supabaseAdmin.publicAuth = createClient(supabaseUrl, publicKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

module.exports = supabaseAdmin;
