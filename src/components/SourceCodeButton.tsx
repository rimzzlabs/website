import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export function SourceCodeButton() {
  return (
    <Button
      asChild
      size="sm"
      variant="secondary"
      className="group mx-auto max-sm:text-xs text-neutral-300 rounded-lg flex max-w-max cursor-pointer"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/rimzzlabs/website"
      >
        See progress
        <ChevronRight
          className="group-hover:translate-x-1 transition"
          size="1rem"
        />
      </a>
    </Button>
  );
}
