import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { ArrowUpRight, CalendarClock, Handshake, Send } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLinkItem,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { $contactOpen } from "@/lib/stores/contact";
import { itemClass } from "./constants";

/** Merged "get in touch" menu: schedule a call + send an email. */
export function DockMenuConnect({ lang }: { lang: Lang }) {
	const t = getDictionary(lang).nav.connect;
	return (
		<DropdownMenu modal={false}>
			<Tooltip>
				<TooltipPrimitive.Trigger
					render={
						<MenuPrimitive.Trigger
							render={
								<button type="button" aria-label={t.trigger} className={itemClass}>
									<Handshake className="size-4" />
								</button>
							}
						/>
					}
				/>
				<TooltipContent>{t.trigger}</TooltipContent>
			</Tooltip>

			<DropdownMenuContent align="end" className="min-w-16">
				<DropdownMenuLinkItem
					className="text-sm"
					href="https://cal.com/rimzzlabs"
					target="_blank"
					rel="noopener noreferrer"
				>
					<CalendarClock className="size-4" /> {t.scheduleCall}{" "}
					<ArrowUpRight className="size-3 -ml-1" />
				</DropdownMenuLinkItem>
				<DropdownMenuItem className="text-sm" onClick={() => $contactOpen.set(true)}>
					<Send className="size-4" /> {t.sendEmail}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
