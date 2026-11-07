-- Online status, backing GET/POST /api/presence.
-- The table holds one row (id = 1). The Raycast extension on the MacBook
-- turns it on or off and sends a ping every 2 minutes while it is on.
-- Apply locally:  pnpm wrangler d1 migrations apply guestbook --local
-- Apply remote:   pnpm wrangler d1 migrations apply guestbook --remote
CREATE TABLE IF NOT EXISTS presence (
	id INTEGER PRIMARY KEY CHECK (id = 1),
	enabled INTEGER NOT NULL DEFAULT 0,
	last_seen_at INTEGER
);

INSERT OR IGNORE INTO presence (id, enabled, last_seen_at) VALUES (1, 0, NULL);
