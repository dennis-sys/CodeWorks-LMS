const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');
require('dotenv').config();

module.exports = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    db: { schema: 'public' },
    realtime: { transport: ws },
  }
);
