import { selectReaction } from "@/service/reaction";
import { composeResponse, composeResponseHeaders } from "@/utils/req-res";
import { getCollection } from "astro:content";
import { tryit } from "radash";

export const prerender = false;

export async function GET(ctx: { params: URL; request: Request }) {
  let url = new URL(ctx.request.url);
  let slug = url.searchParams.get("slug");
  if (!slug) {
    return Response.json(
      composeResponse("error", { message: "Missing slug" }),
      composeResponseHeaders(400),
    );
  }

  let posts = await getCollection("blog", (post) =>
    import.meta.env.PROD ? post.data.status === "published" : true,
  );
  let findPost = posts.find((post) => post.slug.includes(slug ?? ""));
  if (!findPost) {
    return Response.json(
      composeResponse("error", { message: "Post not found" }),
      composeResponseHeaders(404),
    );
  }

  let [error, reactions] = await tryit(selectReaction)(slug);
  if (error && !reactions) {
    return Response.json(
      composeResponse("error", { message: "Internal server error" }),
      composeResponseHeaders(500),
    );
  }

  return Response.json(
    composeResponse("success", {
      message: "Reactions fetched successfully!",
      data: { slug, reactions },
    }),
  );
}
