import { Button } from "@/components/ui/button";
import {
  reactionsAtom,
  setReactionAtom,
  type TReaction,
} from "@/state/reaction";
import { useAtomValue, useSetAtom } from "jotai";
import { P, match } from "ts-pattern";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BlogReactionItem(
  props: Readonly<{ emoji: string; alt: string; reactionKey: keyof TReaction }>,
) {
  let reactions = useAtomValue(reactionsAtom);
  let updateReaction = useSetAtom(setReactionAtom);
  let [flash, setFlash] = useState(false);

  let slug = window.location.pathname.split("/blog/")[1];
  let reaction = reactions[slug];
  let reactionCount = match(reaction)
    .with(P.instanceOf(Object), (reaction) => reaction[props.reactionKey])
    .otherwise(() => 0);
  let disabled = reactionCount > 100;

  let onClickReaction = () => {
    setFlash(true);
    updateReaction({ key: props.reactionKey, slug });
    setFlash(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (flash) setFlash(false);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [flash]);

  return (
    <div className="relative">
      <Button
        disabled={disabled}
        onClick={onClickReaction}
        className="flex items-center gap-x-2 text-neutral-400 font-medium select-none"
        variant="ghost"
        size="iconSm"
      >
        <span className="sr-only">{props.alt}</span>
        <span>{props.emoji}</span>
      </Button>

      <AnimatePresence>
        <motion.span
          key={reactionCount}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { y: -10, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 10, opacity: 0 },
          }}
          className="absolute inset-x-0 -bottom-4 h-4 flex items-center justify-center text-xs font-medium rounded-md text-neutral-300 bg-neutral-900"
        >
          {reactionCount}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
