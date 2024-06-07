export type TWritingFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  status: "published" | "draft";
  featured: boolean;
  tags: Array<string>;
  keywords: Array<string>;
  readingTime: {
    text: string;
    words: number;
  };
};
