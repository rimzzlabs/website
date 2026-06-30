import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { ArrowUpRight, CalendarClock, FileText, Handshake } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLinkItem,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { itemClass } from "./constants";

/** Merged "get in touch" menu: schedule a meeting + résumé. */
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
				<DropdownMenuLinkItem
					className="text-sm"
					href="/attachments/resume-rimzzlabs.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FileText className="size-4" /> {t.resume} <ArrowUpRight className="size-3 -ml-1" />
				</DropdownMenuLinkItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
