/*
  # Portfolio Schema for Graphic Greedy

  ## Overview
  Creates database structure for an ultra-premium portfolio website storing brands, posters, and video projects.

  ## New Tables

  ### `brands`
  Stores brand identity projects with complete case study data
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Brand name
  - `slug` (text, unique) - URL-friendly identifier
  - `logo_url` (text) - Main logo image URL
  - `tagline` (text) - Brand positioning statement
  - `description` (text) - Brief overview
  - `story` (text) - Full brand story and strategic concept
  - `colors` (jsonb) - Color palette system as JSON array
  - `typography` (jsonb) - Typography system details
  - `mockup_images` (jsonb) - Array of mockup image URLs
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### `posters`
  Stores poster design projects
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Poster title
  - `image_url` (text) - Poster image URL
  - `description` (text) - Design concept description
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### `videos`
  Stores video project showcases
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Video project title
  - `thumbnail_url` (text) - Video thumbnail image
  - `video_url` (text) - Video file or embed URL
  - `description` (text) - Project description
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  All tables are public-read since this is a portfolio showcase.
  - Enable RLS on all tables
  - Allow public SELECT access
  - Restrict INSERT/UPDATE/DELETE to authenticated users only

  ## Notes
  - Using JSONB for flexible storage of colors, typography, and images
  - order_index allows custom ordering of portfolio items
  - All timestamps default to current time
*/

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text NOT NULL,
  tagline text DEFAULT '',
  description text DEFAULT '',
  story text DEFAULT '',
  colors jsonb DEFAULT '[]'::jsonb,
  typography jsonb DEFAULT '{}'::jsonb,
  mockup_images jsonb DEFAULT '[]'::jsonb,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create posters table
CREATE TABLE IF NOT EXISTS posters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  thumbnail_url text NOT NULL,
  video_url text NOT NULL,
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE posters ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio showcase
CREATE POLICY "Allow public read access to brands"
  ON brands FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to posters"
  ON posters FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to videos"
  ON videos FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can manage content
CREATE POLICY "Authenticated users can insert brands"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update brands"
  ON brands FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
UPDATE brands
SET
  colors = '[]'::jsonb,
  typography = '{}'::jsonb;


CREATE POLICY "Authenticated users can delete brands"
  ON brands FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert posters"
  ON posters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posters"
  ON posters FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posters"
  ON posters FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS brands_slug_idx ON brands(slug);
CREATE INDEX IF NOT EXISTS brands_order_idx ON brands(order_index);
CREATE INDEX IF NOT EXISTS posters_order_idx ON posters(order_index);
CREATE INDEX IF NOT EXISTS videos_order_idx ON videos(order_index);