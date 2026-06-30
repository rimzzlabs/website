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
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { localizePath, stripLocale } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { itemClass } from "./constants";

/** Mobile-only dropdown of the standalone pages (Notes, Now). */
export function DockMenuPages({ pathname, lang }: { pathname: string; lang: Lang }) {
	const nav = getDictionary(lang).nav;
	const path = stripLocale(pathname);
	const onNotes = path.startsWith("/notes");
	const onNow = path.startsWith("/now");

	return (
		<DropdownMenu modal={false}>
			<Tooltip>
				<TooltipPrimitive.Trigger
					render={
						<MenuPrimitive.Trigger
							render={
								<button
									type="button"
									aria-label={nav.availablePages}
									className={cn(itemClass, (onNotes || onNow) && "bg-muted text-foreground")}
								>
									<Files className="size-4" />
								</button>
							}
						/>
					}
				/>
				<TooltipContent>{nav.pages}</TooltipContent>
			</Tooltip>

			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{nav.availablePages}</DropdownMenuLabel>
					<DropdownMenuLinkItem
						href={localizePath("/notes", lang)}
						aria-current={onNotes ? "page" : undefined}
					>
						<NotebookText className="size-4" /> {nav.notes}
					</DropdownMenuLinkItem>
					<DropdownMenuLinkItem
						href={localizePath("/now", lang)}
						aria-current={onNow ? "page" : undefined}
					>
						<Radio className="size-4" /> {nav.now}
					</DropdownMenuLinkItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
