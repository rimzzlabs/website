import { atom } from "nanostores";

/**
 * Whether the shared "Send me an email" dialog is open. Opened from the hero
 * `TalkButton` and the dock connect menu; the dialog itself is mounted once in
 * `app-layout.astro`. Read it through the `useContactOpen` hook.
 */
export const $contactOpen = atom(false);
