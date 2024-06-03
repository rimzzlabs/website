import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

export function ButtonReadBlog() {
  let title = "Blog";

  return (
    <Button asChild variant="outline" className="group">
      <a href="/blog" title={title}>
        {title}
        <SendHorizonal
          size="1rem"
          className="ml-2 group-hover:translate-x-1 transition"
        />
      </a>
    </Button>
  );
}
