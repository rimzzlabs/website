import { BlogReactionItem } from "./blog-reaction-item";

let reactions = [
  { reactionKey: "like", alt: "Reaction like", emoji: "👍" },
  { reactionKey: "love", alt: "Reaction love", emoji: "❤️" },
  { reactionKey: "eyes", alt: "Reaction see", emoji: "👀" },
  { reactionKey: "starStruck", alt: "Reaction star struck", emoji: "🤩" },
  { reactionKey: "robot", alt: "Reaction robot", emoji: "🤖" },
] as const;

export function BlogReaction() {
  return (
    <section className="w-11/12 max-w-5xl mx-auto pt-10 pb-20">
      <h2 className="text-center text-2xl mb-4 lg:text-3xl font-semibold text-neutral-400">
        <span className="sr-only">Reaction - </span>
        <span className="title" title="Short for: What do you think?">
          wdyt
        </span>
        ?
      </h2>

      <div className="flex items-center justify-center gap-x-2">
        {reactions.map((reaction) => (
          <BlogReactionItem {...reaction} key={reaction.reactionKey} />
        ))}
      </div>
    </section>
  );
}
