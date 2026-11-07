-- Guestbook comments, backing GET/POST /api/guestbook.
-- Apply locally:  pnpm wrangler d1 migrations apply guestbook --local
-- Apply remote:   pnpm wrangler d1 migrations apply guestbook --remote
CREATE TABLE IF NOT EXISTS comments (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	site TEXT,
	message TEXT NOT NULL,
	created_at INTEGER NOT NULL
);

-- Newest-first pagination (offset-based, for the client's infinite scroll).
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments (created_at DESC);
