import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { Files, NotebookText, Radio } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuLinkItem,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { itemClass } from "./constants";

/** Mobile-only dropdown of the standalone pages (Notes, Now). */
export function DockMenuPages({ pathname }: { pathname: string }) {
	const onNotes = pathname.startsWith("/notes");
	const onNow = pathname.startsWith("/now");

	return (
		<DropdownMenu modal={false}>
			<Tooltip>
				<TooltipPrimitive.Trigger
					render={
						<MenuPrimitive.Trigger
							render={
								<button
									type="button"
									aria-label="Available pages"
									className={cn(itemClass, (onNotes || onNow) && "bg-muted text-foreground")}
								>
									<Files className="size-4" />
								</button>
							}
						/>
					}
				/>
				<TooltipContent>Pages</TooltipContent>
			</Tooltip>

			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Available Pages</DropdownMenuLabel>
					<DropdownMenuLinkItem href="/notes" aria-current={onNotes ? "page" : undefined}>
						<NotebookText className="size-4" /> Notes
					</DropdownMenuLinkItem>
					<DropdownMenuLinkItem href="/now" aria-current={onNow ? "page" : undefined}>
						<Radio className="size-4" /> Now
					</DropdownMenuLinkItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
