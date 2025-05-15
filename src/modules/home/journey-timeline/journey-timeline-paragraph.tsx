import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export function JourneyTimelineParagraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "text-sm lg:text-base text-muted-foreground",
        props.className
      )}
    />
  );
}
