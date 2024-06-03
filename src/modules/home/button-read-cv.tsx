import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonReadCv() {
  return (
    <Button asChild className="max-md:order-2 group">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://read.cv/rimzzlabs"
      >
        Read CV{" "}
        <ChevronRight
          size="1rem"
          className="ml-1 group-hover:translate-x-1 transition"
        />
      </a>
    </Button>
  );
}
