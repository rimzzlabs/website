-- Heart reactions on notes, backing GET/POST /api/reactions/:slug.
-- One row per visitor per note. A visitor is an anonymous random ID kept in
-- a cookie, so the table holds no personal data.
-- Apply locally:  pnpm wrangler d1 migrations apply guestbook --local
-- Apply remote:   pnpm wrangler d1 migrations apply guestbook --remote
CREATE TABLE IF NOT EXISTS note_reactions (
	slug TEXT NOT NULL,
	visitor TEXT NOT NULL,
	created_at INTEGER NOT NULL,
	PRIMARY KEY (slug, visitor)
);
