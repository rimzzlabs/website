import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { Card } from "@/components/ui/card";

interface JourneyImageProps extends ComponentPropsWithoutRef<"img"> {
  containerClassName?: string;
}
export function JourneyImage({
  containerClassName,
  ...props
}: JourneyImageProps) {
  return (
    <Card className={cn("py-0 overflow-hidden", containerClassName)}>
      <img
        {...props}
        alt={props.alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className={cn("object-cover h-32", props.className)}
      />
    </Card>
  );
}
