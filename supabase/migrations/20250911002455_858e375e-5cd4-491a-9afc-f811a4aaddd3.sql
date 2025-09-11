-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to submit contacts (public form)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Create policy for authenticated users to view contacts
CREATE POLICY "Authenticated users can view contacts" 
ON public.contacts 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);