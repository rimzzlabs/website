import { ArrowUpRight, CalendarClock, Send, Speech } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { $contactOpen } from "@/lib/stores/contact";

export function TalkButton({ lang }: { lang: Lang }) {
	const t = getDictionary(lang).hero;

	function openContact() {
		$contactOpen.set(true);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button />}>
				<Speech /> {t.talk}
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{t.talkMenu.callLabel}</DropdownMenuLabel>
					<DropdownMenuItem
						render={<a href="https://cal.com/rimzzlabs" target="_blank" rel="noopener" />}
					>
						<CalendarClock className="size-4" /> {t.talkMenu.scheduleCall}{" "}
						<span className="sr-only">{t.talkMenu.scheduleCallSr}</span>{" "}
						<ArrowUpRight className="size-3.5" />
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuLabel>{t.talkMenu.asyncLabel}</DropdownMenuLabel>
					<DropdownMenuItem onClick={openContact}>
						<Send className="size-4" /> {t.talkMenu.sendEmail}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
