-- Run this once in your Supabase SQL Editor
-- dashboard.supabase.com → SQL Editor → New query → paste & Run
-- Safe to run multiple times.

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

-- Enable Row Level Security
ALTER TABLE certificate_payments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own payment records
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'certificate_payments'
      AND policyname = 'Users can view own payments'
  ) THEN
    CREATE POLICY "Users can view own payments"
      ON certificate_payments FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Only service role can insert/update (done via backend with service role key)
