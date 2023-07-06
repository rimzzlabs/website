/**
 * The `slugify` function takes a string as input and returns a slugified version of the string by
 * converting it to lowercase, replacing non-alphanumeric characters with hyphens, and removing leading
 * and trailing hyphens.
 * @param {string} s - The parameter `s` is a string that needs to be slugified.
 * @returns The function `slugify` returns a string that has been converted to lowercase and has all
 * non-alphanumeric characters replaced with hyphens. Additionally, any leading or trailing hyphens are
 * removed.
 */
export const slugify = (s: string) => {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
