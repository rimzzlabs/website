import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import type { TReactionButton } from "@/variables";
import { useReaction } from "@/hooks/reaction";

export function BlogReactionItem(props: Readonly<TReactionButton>) {
  let { postReaction, reactionCount, disabled, emojiRef } = useReaction(
    props.reaction,
  );
  let onClickReaction = async () => await postReaction(props.reaction);

  return (
    <div className="relative">
      <Button
        disabled={disabled}
        onClick={onClickReaction}
        className="flex items-center gap-x-2 text-neutral-400 font-medium select-none"
        variant="ghost"
        size="icon"
      >
        <span className="sr-only">{props.alt}</span>
        <span ref={emojiRef}>{props.emoji}</span>
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
          className="absolute inset-x-0 -bottom-6 h-6 select-none flex items-center justify-center text-xs font-medium rounded-md text-neutral-300 bg-neutral-900"
        >
          {reactionCount}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
