CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('amulets', 'coins', 'collectibles')),
  name TEXT NOT NULL,
  eyebrow TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  status TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  year TEXT NOT NULL,
  material TEXT NOT NULL,
  condition TEXT NOT NULL,
  provenance TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products (created_at DESC);
