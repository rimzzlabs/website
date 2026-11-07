-- Anonymous ownership + edit timestamp for the guestbook.
-- Apply:  pnpm wrangler d1 migrations apply guestbook --local   (and --remote)
ALTER TABLE comments ADD COLUMN owner_hash TEXT;
ALTER TABLE comments ADD COLUMN updated_at INTEGER;

CREATE INDEX IF NOT EXISTS idx_comments_owner ON comments (owner_hash);
