import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutMebutton() {
  const onClick = () => {
    console.info("I clicked");
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <Button onClick={onClick} variant="secondary" className="group">
      More about me <User size="1rem" className="ml-1" />
    </Button>
  );
}
