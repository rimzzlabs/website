import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { ArrowUpRight, CalendarClock, FileText, Handshake } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLinkItem } from "../../ui/dropdown-menu";
import { Tooltip, TooltipContent } from "../../ui/tooltip";
import { itemClass } from "./constants";

/** Merged "get in touch" menu: schedule a meeting + résumé. */
export function DockMenuConnect() {
	return (
		<DropdownMenu modal={false}>
			<Tooltip>
				<TooltipPrimitive.Trigger
					render={
						<MenuPrimitive.Trigger
							render={
								<button type="button" aria-label="Get in touch" className={itemClass}>
									<Handshake className="size-4" />
								</button>
							}
						/>
					}
				/>
				<TooltipContent>Get in touch</TooltipContent>
			</Tooltip>

			<DropdownMenuContent align="end" className="min-w-16">
				<DropdownMenuLinkItem
					className="text-sm"
					href="https://cal.com/rimzzlabs"
					target="_blank"
					rel="noopener noreferrer"
				>
					<CalendarClock className="size-4" /> Schedule a call{" "}
					<ArrowUpRight className="size-3 -ml-1" />
				</DropdownMenuLinkItem>
				<DropdownMenuLinkItem
					className="text-sm"
					href="/attachments/resume-rimzzlabs.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FileText className="size-4" /> Résumé <ArrowUpRight className="size-3 -ml-1" />
				</DropdownMenuLinkItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
