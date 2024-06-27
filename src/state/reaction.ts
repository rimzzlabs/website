import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import type { TReactionResponseSchema } from "@/validations/reaction";

export type TUserReactionAtomState = {
  [slug: string]: {
    [reaction: string]: number;
  };
};

export let userReactionAtom = atomWithStorage<TUserReactionAtomState>(
  "x-user-atom",
  {},
);

export let updateUserReactionCounterAtom = atom(
  null,
  (get, set, args: { reaction: string; slug: string }) => {
    let userReaction = get(userReactionAtom);
    let postSlug = args?.slug?.toLowerCase?.();
    let reactionType = args.reaction;
    if (!postSlug || !reactionType) return;

    set(userReactionAtom, {
      ...userReaction,
      [postSlug]: {
        ...userReaction[postSlug],
        [reactionType]: (userReaction[postSlug]?.[reactionType] || 0) + 1,
      },
    });
  },
);

export let initializeUserReactionAtom = atom(
  null,
  (get, set, args: { slug: string; data: TReactionResponseSchema["data"] }) => {
    let userReaction = get(userReactionAtom);
    let postSlug = args?.slug?.toLowerCase();
    if (!postSlug || !args?.data) return;

    let incomingReactions = args.data.reactions.reduce(
      (reactions, { reaction, count }) => {
        reactions[reaction] = count;
        return reactions;
      },
      {} as Record<string, number>,
    );

    set(userReactionAtom, { ...userReaction, [postSlug]: incomingReactions });
  },
);
