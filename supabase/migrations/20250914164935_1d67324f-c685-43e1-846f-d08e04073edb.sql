-- Create table for logging email sending errors
CREATE TABLE IF NOT EXISTS public.email_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  function_name TEXT NOT NULL,
  context TEXT,
  recipient TEXT,
  subject TEXT,
  payload JSONB,
  error_message TEXT,
  status_code INT
);

-- Enable RLS
ALTER TABLE public.email_errors ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view logs
CREATE POLICY "Authenticated users can view email errors"
ON public.email_errors
FOR SELECT
USING (auth.role() = 'authenticated');

-- No public inserts/updates/deletes; edge functions use service role which bypasses RLS
