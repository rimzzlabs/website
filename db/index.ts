import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const TURSO_DATABASE_URL = import.meta.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = import.meta.env.TURSO_AUTH_TOKEN;

if (!(TURSO_DATABASE_URL && TURSO_AUTH_TOKEN)) {
  throw new Error("missing env");
}

export const db = drizzle(
  createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  }),
);
