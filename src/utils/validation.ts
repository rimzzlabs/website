import type { ZodIssue } from "astro/zod";

export function transformZodIssuesToMessage(issues: Array<ZodIssue>) {
  return issues.map((i) => i.message).join(", ");
}
