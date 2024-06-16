import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { isObject } from "radash";

export type TReaction = {
  like: number;
  eyes: number;
  starStruck: number;
  robot: number;
  love: number;
};

export type TReactionsState = {
  [slug: string]: TReaction;
};

export type TReactionPayload = {
  slug: string;
  key: keyof TReaction;
};

export let reactionsAtom = atomWithStorage<TReactionsState>("reactions", {});
export let setReactionAtom = atom(null, (get, set, args: TReactionPayload) => {
  let reactions = get(reactionsAtom);
  let slug = args.slug;
  let reactionKey = args.key;

  let hasAtom = isObject(reactions[slug]);
  if (!hasAtom) {
    let reaction = {
      [slug]: {
        eyes: 0,
        like: 0,
        love: 0,
        robot: 0,
        starStruck: 0,
        [reactionKey]: 1,
      },
    };
    let nextState = { ...reactions, ...reaction };

    set(reactionsAtom, nextState);
    return;
  }

  let previousReaction = reactions[slug];
  // increment reaction (love, like, etc..)
  let reaction = {
    [slug]: {
      ...previousReaction,
      [reactionKey]: previousReaction[reactionKey] + 1,
    },
  };
  let nextState = { ...reactions, ...reaction };

  set(reactionsAtom, nextState);
});
