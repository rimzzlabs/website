export let reactionButtons = [
  { reaction: "like", alt: "Reaction like", emoji: "👍" },
  { reaction: "love", alt: "Reaction love", emoji: "❤️" },
  { reaction: "eyes", alt: "Reaction see", emoji: "👀" },
  { reaction: "star_struck", alt: "Reaction star struck", emoji: "🤩" },
  { reaction: "rocket", alt: "Reaction rocket", emoji: "🚀" },
];

export type TReactionButton = (typeof reactionButtons)[0];
