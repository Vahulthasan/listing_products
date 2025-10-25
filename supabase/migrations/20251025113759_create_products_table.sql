/*
  # Create products table for Munishwaraa Hardwares and Electricals

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text, not null) - Product name
      - `tamil_name` (text) - Product name in Tamil
      - `category` (text, not null) - Product category (Hardware, Electrical, Plumbing, Tools, etc.)
      - `subcategory` (text) - Product subcategory
      - `description` (text) - Product description
      - `price` (decimal, not null) - Product price in INR
      - `unit` (text, default 'piece') - Unit of measurement (piece, kg, meter, box, etc.)
      - `stock_quantity` (integer, default 0) - Available stock quantity
      - `brand` (text) - Product brand
      - `image_url` (text) - Product image URL
      - `is_available` (boolean, default true) - Product availability status
      - `created_at` (timestamptz, default now()) - Record creation timestamp
      - `updated_at` (timestamptz, default now()) - Record update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (shop listings are public)
    - Add policy for authenticated users to manage products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tamil_name text,
  category text NOT NULL,
  subcategory text,
  description text,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  unit text DEFAULT 'piece',
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  brand text,
  image_url text,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available products"
  ON products FOR SELECT
  USING (is_available = true);

CREATE POLICY "Authenticated users can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);