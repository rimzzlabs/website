import type { TWritingFrontmatter } from "@/@types/mdx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock } from "lucide-react";

export function ReadingTime(
  props: Readonly<Pick<TWritingFrontmatter, "readingTime">>,
) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center gap-x-2 font-medium text-neutral-400">
          <Clock size="1rem" />
          <span>{props.readingTime.text}</span>
        </TooltipTrigger>

        <TooltipContent side="right" className="max-w-sm">
          <p className="text-sm text-white">
            This post has <strong>{props.readingTime.words} words</strong>,
            reading time is calculated using{" "}
            <strong>238 words per minutes reading speeds</strong>.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
