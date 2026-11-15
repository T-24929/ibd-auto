-- ==============================================================================
-- 001_initial_schema.sql
-- Production database schema, RLS policies, triggers and seed data for ABC Motors
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vehicle_status AS ENUM ('available', 'reserved', 'sold');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'user'::user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    mileage INTEGER NOT NULL,
    fuel_type TEXT NOT NULL,       -- Petrol, Diesel, Hybrid, Electric
    transmission TEXT NOT NULL,    -- Automatic, Manual
    body_type TEXT NOT NULL,       -- Sedan, SUV, Hatchback, Truck, Coupe, Van
    color TEXT NOT NULL,
    condition TEXT DEFAULT 'Excellent' NOT NULL, -- Excellent, Good, Fair
    status vehicle_status DEFAULT 'available'::vehicle_status NOT NULL,
    description TEXT,
    images TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    location TEXT DEFAULT 'Showroom Yard, Colombo',
    doors INTEGER DEFAULT 4,
    seats INTEGER DEFAULT 5,
    engine_capacity TEXT,          -- e.g. 1,000 cc, 1,500 cc, etc.
    reg_number TEXT,               -- e.g. CBR-xxxx or Unregistered
    grade TEXT,                    -- e.g. X Grade, M Sport, etc.
    owners TEXT DEFAULT '1st Owner',
    features TEXT[] DEFAULT '{}'::TEXT[],
    service_history TEXT,          -- e.g. Toyota Lanka Maintained
    featured BOOLEAN DEFAULT false NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. APPOINTMENTS TABLE (Inspection & Test Drive Bookings)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    status appointment_status DEFAULT 'pending'::appointment_status NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. AUTOMATIC PROFILE CREATION TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone, role)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', ''),
        COALESCE(new.raw_user_meta_data->>'phone', ''),
        CASE 
            WHEN new.email = 'admin@abcmotors.com' THEN 'admin'::user_role
            ELSE 'user'::user_role
        END
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'::user_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- VEHICLES POLICIES
CREATE POLICY "Vehicles are viewable by everyone" 
ON public.vehicles FOR SELECT USING (true);

CREATE POLICY "Only admins can insert vehicles" 
ON public.vehicles FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update vehicles" 
ON public.vehicles FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete vehicles" 
ON public.vehicles FOR DELETE USING (public.is_admin());

-- APPOINTMENTS POLICIES
CREATE POLICY "Anyone can create an appointment" 
ON public.appointments FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own appointments or admins view all" 
ON public.appointments FOR SELECT USING (
    auth.uid() = user_id OR public.is_admin()
);

CREATE POLICY "Only admins can update appointments" 
ON public.appointments FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete appointments" 
ON public.appointments FOR DELETE USING (public.is_admin());

-- CONTACT MESSAGES POLICIES
CREATE POLICY "Anyone can send a contact message" 
ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages FOR SELECT USING (public.is_admin());

CREATE POLICY "Only admins can update contact messages" 
ON public.contact_messages FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete contact messages" 
ON public.contact_messages FOR DELETE USING (public.is_admin());

-- 9. SEED DATA (High quality verified Sri Lankan pre-owned inventory)
INSERT INTO public.vehicles (title, make, model, year, price, mileage, fuel_type, transmission, body_type, color, condition, status, description, images, location, doors, seats, engine_capacity, reg_number, grade, owners, features, service_history, featured)
VALUES
(
    '2024 Toyota Yaris X Grade (Japanese Version)',
    'Toyota',
    'Yaris',
    2024,
    8700000.00,
    8800,
    'Petrol',
    'Automatic',
    'Hatchback',
    'Black / Bronze Accents',
    'Excellent',
    'available',
    'Genuine Japanese import Toyota Yaris Premium X Grade. Sparingly used in brand-new condition with only 8,800 genuine km. Fully maintained by Toyota Lanka with all service records intact. Features 4-way multi-angle parking camera, Nano ceramic paint protection, premium alloy wheels, and immaculate interior.',
    ARRAY[
        'https://www.autolanka.com/files/11-2026/ad975718/2024-toyota-yaris-used-217432798_large.jpg',
        'https://www.autolanka.com/files/11-2026/ad975718/2024-toyota-yaris-used-348112082.jpg',
        'https://www.autolanka.com/files/11-2026/ad975718/2024-toyota-yaris-used-2007968584.jpg',
        'https://www.autolanka.com/files/11-2026/ad975718/2024-toyota-yaris-used-1904783083.jpg'
    ],
    'Jambugasmulla Road, Nugegoda',
    5,
    5,
    '1,000 cc',
    'CBR-xxxx',
    'X Grade Premium',
    '1st Owner',
    ARRAY['4-Way Camera', 'Nano Coating', 'Alloy Wheels', 'Push Start', 'Apple CarPlay', 'Toyota Safety Sense'],
    'Toyota Lanka Maintained with Service Logs',
    true
),
(
    '2021 Toyota RAV4 Hybrid XSE AWD',
    'Toyota',
    'RAV4 Hybrid',
    2021,
    29800000.00,
    32400,
    'Hybrid',
    'Automatic',
    'SUV',
    'Blizzard Pearl / Black Roof',
    'Excellent',
    'available',
    'Immaculately maintained single-owner RAV4 Hybrid XSE. Features full sport suspension, panoramic moonroof, JBL audio, Apple CarPlay, heated SofTex seats, and clean vehicle history report. Complete service record available from Toyota Lanka.',
    ARRAY[
        'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    'Colombo 03 Showroom Yard',
    5,
    5,
    '2,500 cc Hybrid',
    'CAB-xxxx',
    'XSE Package',
    '1st Owner',
    ARRAY['Panoramic Moonroof', 'JBL Audio', 'SofTex Heated Seats', 'AWD Hybrid System'],
    'Toyota Lanka Maintained',
    true
),
(
    '2020 Honda Civic Touring Turbo Sedan',
    'Honda',
    'Civic Touring',
    2020,
    16900000.00,
    41200,
    'Petrol',
    'Automatic',
    'Sedan',
    'Platinum White Pearl',
    'Excellent',
    'available',
    'Top-tier Touring trim with turbocharged engine, leather-trimmed interior, wireless charging pad, premium 450-watt sound system, adaptive cruise control, and Lane Keeping Assist. 100% accident free and verified agent service history.',
    ARRAY[
        'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80'
    ],
    'Nugegoda Display Yard',
    4,
    5,
    '1,500 cc Turbo',
    'WP CBG-xxxx',
    'Touring Turbo',
    '1st Owner',
    ARRAY['Leather Seats', 'Sunroof', 'Wireless Phone Charger', 'Honda Sensing'],
    'Stafford Motors Maintained',
    true
),
(
    '2022 BMW 3 Series 330i M Sport',
    'BMW',
    '3 Series 330i',
    2022,
    38500000.00,
    21500,
    'Petrol',
    'Automatic',
    'Sedan',
    'Portimao Blue Metallic',
    'Excellent',
    'available',
    'Stunning M Sport package with aerodynamic bodywork, Shadowline trim, Live Cockpit Pro with navigation, head-up display, M Sport brakes, and ambient lighting. Certified pre-owned standards passed with full Prestige Automobile records.',
    ARRAY[
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80'
    ],
    'Colombo 07 Premium Bay',
    4,
    5,
    '2,000 cc TwinPower Turbo',
    'CBA-xxxx',
    'M Sport Edition',
    '1st Owner',
    ARRAY['M Sport Bodykit', 'Harmon Kardon Sound', 'Head-Up Display', 'Ambient Lighting'],
    'Prestige Automobile Maintained',
    true
),
(
    '2019 Mercedes-Benz GLC 300 4MATIC AMG Line',
    'Mercedes-Benz',
    'GLC 300',
    2019,
    33500000.00,
    54000,
    'Petrol',
    'Automatic',
    'SUV',
    'Obsidian Black Metallic',
    'Good',
    'available',
    'Luxury all-wheel drive SUV with Burmester surround sound, panoramic sunroof, power liftgate, heated steering wheel, and 19-inch 5-spoke AMG wheels. DIMO maintained on schedule.',
    ARRAY[
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    'Kohuwala Showroom',
    5,
    5,
    '2,000 cc Turbocharged',
    'WP CAZ-xxxx',
    'AMG Line',
    '1st Owner',
    ARRAY['Burmester Surround', 'Panoramic Sunroof', '19" AMG Wheels', 'Power Tailgate'],
    'DIMO Maintained with Agent Records',
    false
)
ON CONFLICT DO NOTHING;
