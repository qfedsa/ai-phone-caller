-- AI Phone Caller - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  vapi_agent_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_slug ON leads(slug);

-- Add constraint to ensure slug is lowercase and URL-friendly
ALTER TABLE leads ADD CONSTRAINT slug_format 
  CHECK (slug ~ '^[a-z0-9-]+$');

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
-- Note: Adjust this policy based on your security requirements
DROP POLICY IF EXISTS "Allow public read access" ON leads;
CREATE POLICY "Allow public read access" ON leads
  FOR SELECT USING (true);

-- Optional: Create policy for insert (only for authenticated users)
-- Uncomment if you want to restrict insertions
-- CREATE POLICY "Allow authenticated insert" ON leads
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Optional: Create policy for update (only for authenticated users)
-- Uncomment if you want to allow updates
-- CREATE POLICY "Allow authenticated update" ON leads
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- Optional: Create policy for delete (only for authenticated users)
-- Uncomment if you want to allow deletions
-- CREATE POLICY "Allow authenticated delete" ON leads
--   FOR DELETE USING (auth.role() = 'authenticated');

-- Insert example data for testing
INSERT INTO leads (slug, company_name, first_name, email, vapi_agent_id)
VALUES 
  (
    'akkadia-immobilien',
    'Akkadia Immobilien',
    'Max',
    'max.mustermann@akkadia-immobilien.de',
    'your_vapi_agent_id_here'
  ),
  (
    'demo',
    'Demo Company',
    'Sarah',
    'sarah@demo-company.de',
    'your_vapi_agent_id_here'
  )
ON CONFLICT (slug) DO NOTHING;

-- Create a function to validate email format (optional)
CREATE OR REPLACE FUNCTION validate_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

-- Add email validation constraint (optional)
-- ALTER TABLE leads ADD CONSTRAINT valid_email 
--   CHECK (validate_email(email));

-- Create updated_at trigger (optional, for tracking updates)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at column (optional)
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create trigger for updated_at (optional)
-- CREATE TRIGGER update_leads_updated_at 
--   BEFORE UPDATE ON leads
--   FOR EACH ROW
--   EXECUTE FUNCTION update_updated_at_column();

-- Verify the setup
SELECT 'Setup complete! Total leads:' AS message, COUNT(*) AS count FROM leads;
