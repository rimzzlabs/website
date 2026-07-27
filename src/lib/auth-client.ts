import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export type AuthProvider = "github" | "google";
