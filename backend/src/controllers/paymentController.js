const supabase = require('../config/supabase');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const CERT_AMOUNT = 500000; // 5,000 KES in kobo (Paystack lowest unit)
const CURRENCY = 'KES';

const MIGRATION_SQL = `
-- Run once in Supabase SQL Editor → dashboard.supabase.com → SQL Editor
CREATE TABLE IF NOT EXISTS certificate_payments (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             uuid NOT NULL,
  course_id           integer NOT NULL,
  paystack_reference  text NOT NULL,
  amount              integer NOT NULL,
  currency            text NOT NULL DEFAULT 'KES',
  channel             text,
  status              text NOT NULL DEFAULT 'success',
  paid_at             timestamptz NOT NULL DEFAULT now(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
CREATE INDEX IF NOT EXISTS idx_cert_payments_user ON certificate_payments (user_id);
ALTER TABLE certificate_payments ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='certificate_payments' AND policyname='Users can view own payments') THEN
    CREATE POLICY "Users can view own payments" ON certificate_payments FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;
`.trim();

/* ── Check table exists on startup ── */
(async () => {
  const { error } = await supabase.from('certificate_payments').select('id').limit(1);
  if (error?.code === 'PGRST205' || error?.message?.includes('not find the table')) {
    console.warn('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn('⚠️  CERTIFICATE PAYMENTS TABLE MISSING');
    console.warn('Run the following SQL in your Supabase SQL Editor:');
    console.warn('dashboard.supabase.com → SQL Editor → New query');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn(MIGRATION_SQL);
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } else {
    console.log('✅ certificate_payments table ready');
  }
})();

/* ── Verify a payment reference with Paystack and store it ── */
exports.verifyPayment = async (req, res) => {
  const { reference, course_id } = req.body;
  const userId = req.user.id;

  if (!reference || !course_id) {
    return res.status(400).json({ success: false, message: 'reference and course_id are required' });
  }

  try {
    // 1. Verify with Paystack API
    const psRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const psData = await psRes.json();

    if (!psData.status || psData.data?.status !== 'success') {
      return res.status(402).json({ success: false, message: 'Payment not successful', detail: psData.message });
    }

    const pd = psData.data;

    // 2. Validate amount and currency
    if (pd.currency !== CURRENCY || pd.amount < CERT_AMOUNT) {
      return res.status(402).json({ success: false, message: 'Payment amount or currency mismatch' });
    }

    // 3. Upsert into certificate_payments (idempotent)
    const { error } = await supabase
      .from('certificate_payments')
      .upsert({
        user_id: userId,
        course_id: parseInt(course_id, 10),
        paystack_reference: reference,
        amount: pd.amount,
        currency: pd.currency,
        channel: pd.channel,
        status: 'success',
        paid_at: pd.paid_at || new Date().toISOString(),
      }, { onConflict: 'user_id,course_id' });

    if (error) {
      console.error('Supabase upsert error:', error);
      // Don't fail if already exists
      if (!error.message?.includes('duplicate')) {
        return res.status(500).json({ success: false, message: 'Failed to record payment' });
      }
    }

    return res.json({ success: true, message: 'Payment verified and recorded' });
  } catch (err) {
    console.error('verifyPayment error:', err);
    return res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};

/* ── Get payment status for the current user's earned certificates ── */
exports.getPaymentStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('certificate_payments')
      .select('course_id, status, paid_at, channel')
      .eq('user_id', userId)
      .eq('status', 'success');

    if (error) throw error;

    // Return a map of course_id → payment info
    const statusMap = {};
    for (const row of (data || [])) {
      statusMap[row.course_id] = { paid: true, paid_at: row.paid_at, channel: row.channel };
    }

    return res.json({ success: true, data: statusMap });
  } catch (err) {
    console.error('getPaymentStatus error:', err);
    return res.status(500).json({ success: false, message: 'Could not fetch payment status' });
  }
};
