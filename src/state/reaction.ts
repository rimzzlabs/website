import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

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
