const supabase = require('../config/supabase');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const CERT_AMOUNT = 500000; // 5,000 KES in kobo (Paystack lowest unit)
const CURRENCY = 'KES';
const CERT_AMOUNT_KES = CERT_AMOUNT / 100;

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

function normalizeKenyanPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (/^0\d{9}$/.test(digits)) return `+254${digits.slice(1)}`;
  if (/^254\d{9}$/.test(digits)) return `+${digits}`;
  return null;
}

async function fetchPaystackTransaction(reference) {
  if (!PAYSTACK_SECRET) {
    const error = new Error('PAYSTACK_SECRET_KEY is not configured');
    error.statusCode = 503;
    throw error;
  }

  const psRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  });
  const psData = await psRes.json();
  return { psRes, psData };
}

async function recordSuccessfulPayment({ userId, courseId, reference, payment }) {
  if (payment.currency !== CURRENCY || payment.amount < CERT_AMOUNT) {
    const error = new Error('Payment amount or currency mismatch');
    error.statusCode = 402;
    throw error;
  }

  const { error } = await supabase
    .from('certificate_payments')
    .upsert({
      user_id: userId,
      course_id: parseInt(courseId, 10),
      paystack_reference: reference,
      amount: payment.amount,
      currency: payment.currency,
      channel: payment.channel,
      status: 'success',
      paid_at: payment.paid_at || new Date().toISOString(),
    }, { onConflict: 'user_id,course_id' });

  if (error) {
    console.error('Supabase upsert error:', error);
    if (!error.message?.includes('duplicate')) {
      const dbError = new Error('Failed to record payment');
      dbError.statusCode = 500;
      throw dbError;
    }
  }
}

/* ── Start an M-Pesa STK push through Paystack ── */
exports.requestMpesaPayment = async (req, res) => {
  const { course_id, phone, amount } = req.body;
  const amountKes = Number(amount);
  const normalizedPhone = normalizeKenyanPhone(phone);

  if (!course_id || !Number.isInteger(Number(course_id))) {
    return res.status(400).json({ success: false, message: 'A valid course_id is required' });
  }
  if (!normalizedPhone) {
    return res.status(400).json({
      success: false,
      message: 'Enter a valid Kenyan Safaricom number, for example 0712345678',
    });
  }
  if (!Number.isFinite(amountKes) || amountKes !== CERT_AMOUNT_KES) {
    return res.status(400).json({
      success: false,
      message: `The certificate fee must be KES ${CERT_AMOUNT_KES.toLocaleString()}`,
    });
  }
  if (!req.user?.email) {
    return res.status(400).json({ success: false, message: 'Your account email is required for payment' });
  }

  try {
    if (!PAYSTACK_SECRET) {
      return res.status(503).json({ success: false, message: 'Payment service is not configured' });
    }

    const psRes = await fetch('https://api.paystack.co/charge', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: req.user.email,
        amount: CERT_AMOUNT,
        currency: CURRENCY,
        mobile_money: {
          phone: normalizedPhone,
          provider: 'mpesa',
        },
        metadata: {
          course_id: Number(course_id),
          certificate: true,
          student_name: req.user.user_metadata?.full_name || req.user.email,
        },
      }),
    });
    const psData = await psRes.json();

    if (!psRes.ok || !psData.status || !psData.data?.reference) {
      console.error('Paystack M-Pesa charge error:', psData);
      return res.status(502).json({
        success: false,
        message: psData.message || 'Could not send the M-Pesa payment prompt',
      });
    }

    return res.json({
      success: true,
      data: {
        reference: psData.data.reference,
        status: psData.data.status,
        display_text: psData.data.display_text || 'Check your phone and enter your M-Pesa PIN to complete payment.',
      },
    });
  } catch (err) {
    console.error('requestMpesaPayment error:', err);
    return res.status(err.statusCode || 502).json({
      success: false,
      message: err.statusCode === 503 ? 'Payment service is not configured' : 'Could not connect to the payment service',
    });
  }
};

/* ── Verify a payment reference with Paystack and store it ── */
exports.verifyPayment = async (req, res) => {
  const { reference, course_id } = req.body;
  const userId = req.user.id;

  if (!reference || !course_id) {
    return res.status(400).json({ success: false, message: 'reference and course_id are required' });
  }

  try {
    const { psData } = await fetchPaystackTransaction(reference);

    if (!psData.status || psData.data?.status !== 'success') {
      return res.status(402).json({ success: false, message: 'Payment not successful', detail: psData.message });
    }

    await recordSuccessfulPayment({
      userId,
      courseId: course_id,
      reference,
      payment: psData.data,
    });

    return res.json({ success: true, message: 'Payment verified and recorded' });
  } catch (err) {
    console.error('verifyPayment error:', err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Payment verification failed',
    });
  }
};

/* ── Poll the status of an M-Pesa payment while the customer authorises it ── */
exports.getMpesaPaymentStatus = async (req, res) => {
  const { reference } = req.params;
  const { course_id } = req.query;

  if (!reference || !course_id || !Number.isInteger(Number(course_id))) {
    return res.status(400).json({ success: false, message: 'reference and valid course_id are required' });
  }

  try {
    const { psRes, psData } = await fetchPaystackTransaction(reference);
    if (!psRes.ok || !psData.data) {
      return res.status(502).json({ success: false, message: psData.message || 'Could not check payment status' });
    }

    const payment = psData.data;
    if (payment.status === 'success') {
      await recordSuccessfulPayment({
        userId: req.user.id,
        courseId: course_id,
        reference,
        payment,
      });
      return res.json({ success: true, status: 'success', paid: true });
    }

    const failedStatuses = new Set(['failed', 'abandoned', 'reversed']);
    return res.json({
      success: true,
      status: failedStatuses.has(payment.status) ? 'failed' : 'pending',
      paid: false,
      message: payment.gateway_response || payment.message || 'Waiting for M-Pesa authorisation',
    });
  } catch (err) {
    console.error('getMpesaPaymentStatus error:', err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Could not check payment status',
    });
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
