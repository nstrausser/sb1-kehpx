-- Create enum types
CREATE TYPE user_role AS ENUM ('LEAD', 'INSTALLER', 'TRAINING');
CREATE TYPE installation_status AS ENUM ('COMPLETED', 'IN_PROGRESS', 'NEEDS_RECUT');
CREATE TYPE cut_status AS ENUM ('COMPLETED', 'RECUT', 'FAILED');
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE service_type AS ENUM ('FULL_BODY', 'PARTIAL_BODY', 'CUSTOM', 'TOUCH_UP');

-- Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'INSTALLER',
  joined_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ppf_rolls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE NOT NULL,
  roll_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  length_feet DECIMAL NOT NULL,
  width_inches DECIMAL NOT NULL,
  price DECIMAL NOT NULL,
  category TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  customer_name TEXT NOT NULL,
  vehicle_info TEXT NOT NULL,
  installer_id UUID NOT NULL REFERENCES users(id),
  status installation_status NOT NULL DEFAULT 'IN_PROGRESS',
  total_area DECIMAL NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cuts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id UUID NOT NULL REFERENCES installations(id),
  panel_name TEXT NOT NULL,
  square_feet DECIMAL NOT NULL,
  roll_id UUID NOT NULL REFERENCES ppf_rolls(id),
  film_type TEXT NOT NULL,
  status cut_status NOT NULL DEFAULT 'COMPLETED',
  recut_reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  vehicle_info TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  estimated_duration INTEGER NOT NULL,
  installer_id UUID NOT NULL REFERENCES users(id),
  status appointment_status NOT NULL DEFAULT 'SCHEDULED',
  service_type service_type NOT NULL,
  estimated_square_feet DECIMAL NOT NULL,
  quoted_price DECIMAL NOT NULL,
  deposit DECIMAL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_installations_installer_id ON installations(installer_id);
CREATE INDEX idx_installations_date ON installations(date);
CREATE INDEX idx_cuts_installation_id ON cuts(installation_id);
CREATE INDEX idx_cuts_roll_id ON cuts(roll_id);
CREATE INDEX idx_appointments_installer_id ON appointments(installer_id);
CREATE INDEX idx_appointments_date ON appointments(date);