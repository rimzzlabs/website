import type { Snippet } from 'rizkicitra'

/**
 * A function to sort snippets by latest created.
 * @returns a number.
 */
export const getNewestSnippet = (a: Snippet, b: Snippet) => {
  return new Date(a.created_at) < new Date(b.created_at) ? 1 : new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
}
