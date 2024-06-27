import { createResponseInit } from "@/service/common";
import { insertReaction } from "@/service/reaction";
import { safeParseJSON } from "@/utils/server";
import { z } from "astro/zod";
import { tryit } from "radash";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  let body = await safeParseJSON(request);
  let check = z.object({
    slug: z.string({ message: "Slug is required" }),
    reaction: z.enum(["like", "love", "eyes", "star_struck", "rocket"]),
  });

  let parsed = check.safeParse(body);

  if (parsed.error) {
    let errors = parsed.error.errors.map((err) => ({
      message: err.message,
      key: err.path,
    }));
    let responseInit = createResponseInit(400);

    return new Response(
      JSON.stringify({
        errors,
        status: "error",
      }),
      responseInit,
    );
  }

  let [error, id] = await tryit(insertReaction)(
    parsed.data.slug,
    parsed.data.reaction,
  );

  if (error) {
    let responseInit = createResponseInit(500);

    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      responseInit,
    );
  }

  let responseInit = createResponseInit(201);

  return new Response(
    JSON.stringify({ status: "success", message: "Reacted! `uWu`", id }),
    responseInit,
  );
}
