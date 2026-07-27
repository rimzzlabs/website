-- Verified (OAuth) authorship for the guestbook.
-- Apply:  pnpm wrangler d1 migrations apply guestbook --local   (and --remote)
ALTER TABLE comments ADD COLUMN author_type TEXT NOT NULL DEFAULT 'anon';
ALTER TABLE comments ADD COLUMN author_id TEXT;
ALTER TABLE comments ADD COLUMN avatar_url TEXT;

CREATE INDEX IF NOT EXISTS idx_comments_author ON comments (author_type, author_id);
