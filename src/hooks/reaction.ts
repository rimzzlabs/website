import type { TSelectReaction } from "@/service/reaction";
import {
  updateUserReactionCounterAtom,
  userReactionAtom,
} from "@/state/reaction";
import { getData } from "@/utils/http";
import type { TResponse } from "@/utils/req-res";
import { animate } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai/react";
import { useRef, useState } from "react";
import { P, match } from "ts-pattern";

let slug = window.location.pathname.split("/blog/")[1];
let res = await getData<
  TResponse<{ reactions: TSelectReaction; slug: string }>
>(`/api/reaction?slug=${slug}`);

let data = res.data;

export function useReaction(reaction: string) {
  let emojiRef = useRef<HTMLSpanElement | null>(null);
  let [reactionCount, setReactionCount] = useState(
    () =>
      data?.reactions?.find?.((value) => value.reaction === reaction)?.count ??
      0,
  );

  let userReaction = useAtomValue(userReactionAtom);
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

    let { data } = await getData<
      TResponse<{ reactions: TSelectReaction; slug: string }>
    >(`/api/reaction?slug=${slug}`);

    let count = match(data)
      .with(P.nullish, () => 0)
      .otherwise(
        ({ reactions }) =>
          reactions?.find((r) => r.reaction === reaction)?.count ?? 0,
      );

    updateUserReactionCounter({ reaction, slug });
    setReactionCount(count);
  };

  return { postReaction, reactionCount, disabled, emojiRef };
}
