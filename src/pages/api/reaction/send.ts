import { insertReaction } from "@/service/reaction";
import {
  composeResponse,
  composeResponseHeaders,
  safeParseJSON,
} from "@/utils/req-res";
import { transformZodIssuesToMessage } from "@/utils/validation";
import { sendReactionSchema } from "@/validations/reaction";
import { tryit } from "radash";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  let body = await safeParseJSON(request);
  if (!body) {
    return Response.json(
      composeResponse("error", { message: "Missing body payload" }),
      composeResponseHeaders(400),
    );
  }

  let parsed = sendReactionSchema.safeParse(body);
  if (parsed.error) {
    return Response.json(
      composeResponse("error", {
        message: transformZodIssuesToMessage(parsed.error.issues),
      }),
      composeResponseHeaders(400),
    );
  }

  let [error, id] = await tryit(insertReaction)(parsed.data);
  if (error) {
    return Response.json(
      composeResponse("error", { message: "Internal server error" }),
      composeResponseHeaders(500),
    );
  }

  return Response.json(
    composeResponse("success", {
      message: "Reacted! \\uwu//",
      data: { id },
    }),
    composeResponseHeaders(201),
  );
}
