import { createResponse, createResponseInit } from "@/service/common";
import { selectReaction } from "@/service/reaction";
import { tryit } from "radash";

export const prerender = false;

export async function GET(ctx: { params: URL; request: Request }) {
  let url = new URL(ctx.request.url);
  let slug = url.searchParams.get("slug");

  if (!slug) {
    let responseInit = createResponseInit(400);

    return new Response(
      createResponse("error", { message: "Invalid slug" }),
      responseInit,
    );
  }

  let [error, reactions] = await tryit(selectReaction)(slug);

  if (error && !reactions) {
    let responseInit = createResponseInit(500);
    return new Response(
      createResponse("error", { message: "Server error" }),
      responseInit,
    );
  }

  let responseInit = createResponseInit(200);
  return new Response(
    createResponse("success", {
      message: "fetch success, \\uWu//`",
      data: { slug, reactions },
    }),
    responseInit,
  );
}
