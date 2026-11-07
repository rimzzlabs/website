-- Language the message was written in, so the UI can tag a comment that does
-- not match the locale the reader is on.
-- Apply:  pnpm wrangler d1 migrations apply guestbook --local   (and --remote)
ALTER TABLE comments ADD COLUMN lang TEXT NOT NULL DEFAULT 'en';

-- Every comment written before this column existed is Indonesian.
UPDATE comments SET lang = 'id';
