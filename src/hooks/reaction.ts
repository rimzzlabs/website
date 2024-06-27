import {
  initializeUserReactionAtom,
  updateUserReactionCounterAtom,
  userReactionAtom,
} from "@/state/reaction";
import type { TReactionResponseSchema } from "@/validations/reaction";
import { animate } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai/react";
import { useEffect, useRef, useState } from "react";
import { P, match } from "ts-pattern";

let getReactions = async () => {
  let slug = window.location.pathname.split("/blog/")[1];
  return await fetch(`/api/reaction?slug=${slug}`).then(
    (r) => r.json() as unknown as TReactionResponseSchema,
  );
};

let { data } = await getReactions();

export function useReaction(reaction: string) {
  let emojiRef = useRef<HTMLSpanElement | null>(null);
  let [reactionCount, setReactionCount] = useState(
    () =>
      data?.reactions?.find?.((value) => value.reaction === reaction)?.count ??
      0,
  );

  let userReaction = useAtomValue(userReactionAtom);
  let initializeUserReaction = useSetAtom(initializeUserReactionAtom);
  let updateUserReactionCounter = useSetAtom(updateUserReactionCounterAtom);

  let slug = window.location.pathname.split("/blog/")[1];
  let disabled = match(userReaction?.[slug]?.[reaction])
    .with(P.number.gte(10), () => true)
    .otherwise(() => false);

  let postReaction = async (reaction: string) => {
    let body = JSON.stringify({ slug, reaction });

    emojiRef.current &&
      animate(emojiRef.current, {
        y: -6,
        scale: 1.2,
        opacity: 0.5,
        transitionDuration: 0.25,
      });
    setTimeout(() => {
      emojiRef.current &&
        animate(emojiRef.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          transitionDuration: 0.1,
        });
    }, 100);
    setReactionCount((prev) => prev + 1);

    await fetch("/api/reaction/send", {
      body,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    let { data } = await getReactions();
    let count = match(data)
      .with(P.nullish, () => 0)
      .otherwise(
        ({ reactions }) =>
          reactions?.find((r) => r.reaction === reaction)?.count ?? 0,
      );

    updateUserReactionCounter({ reaction, slug });
    setReactionCount(count);
  };

  useEffect(() => {
    if (data) {
      initializeUserReaction({ data: data, slug });
    }
  }, [data, slug]);

  return { getReactions, postReaction, reactionCount, disabled, emojiRef };
}