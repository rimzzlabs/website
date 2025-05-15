import { ArrowRight, CornerUpLeft, MenuIcon, X } from "lucide-react";
import { Button, ButtonLink } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { NAVIGATIONS } from "../navigations";

export function NavbarSheet() {
  return (
    <Drawer>
      <Button
        asChild
        variant="ghost"
        aria-label="Toggle Drawer"
        className="sm:hidden"
      >
        <DrawerTrigger>
          <MenuIcon size="1rem" />
          <span className="sr-only">Toggle Drawer</span>
        </DrawerTrigger>
      </Button>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            Navigate between pages with this tray UI
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-10">
          <nav className="grid grid-cols-2 gap-2">
            {NAVIGATIONS.map((navItem) => (
              <ButtonLink
                key={navItem.pathname}
                href={navItem.pathname}
                variant="outline"
              >
                <navItem.icon className="size-4" />
                {navItem.label}
              </ButtonLink>
            ))}
          </nav>
        </div>

        <DrawerFooter className="flex-row flex">
          <Button className="w-1/2" variant="secondary" asChild>
            <DrawerClose>
              <X />
              Close
            </DrawerClose>
          </Button>
          <Button className="w-1/2" variant="ghost" asChild>
            <DrawerClose>
              <CornerUpLeft />
              Back
            </DrawerClose>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
