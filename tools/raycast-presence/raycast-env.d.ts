/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Presence Token - The PRESENCE_TOKEN secret of the Cloudflare Pages project. */
  "token": string,
  /** Endpoint - The presence API URL. */
  "endpoint": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `presence` command */
  export type Presence = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `presence` command */
  export type Presence = {}
}

