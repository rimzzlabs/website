import {
	LaptopIcon,
	PowerIcon,
	SlidersHorizontalIcon,
	TranslateIcon,
} from "@phosphor-icons/react";

import {
	isLocale,
	LOCALE_COOKIE,
	LOCALE_NAMES,
	LOCALES,
	type Locale,
	localizePath,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface NavigationBarSettingsProps {
	copy: Dictionary["nav"];
	locale: Locale;
	side?: "top" | "bottom";
}

function switchLocale(next: unknown) {
	if (!isLocale(next)) return;
	// biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is not in Firefox yet.
	document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
	const path = localizePath(window.location.pathname, next);
	window.location.assign(
		`${path}${window.location.search}${window.location.hash}`,
	);
}

export function NavigationBarSettings(props: NavigationBarSettingsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
				<SlidersHorizontalIcon />
				<span className="sr-only">{props.copy.settings}</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" side={props.side} className="min-w-40">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{props.copy.language}</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={props.locale}
						onValueChange={switchLocale}
					>
						{LOCALES.map((locale) => (
							<DropdownMenuRadioItem key={locale} value={locale}>
								<TranslateIcon /> {LOCALE_NAMES[locale]}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>

				<DropdownMenuGroup>
					<DropdownMenuLabel>{props.copy.animation}</DropdownMenuLabel>
					<DropdownMenuRadioGroup>
						<DropdownMenuRadioItem value="system">
							<LaptopIcon /> {props.copy.animationSystem}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="on">
							<PowerIcon weight="fill" /> {props.copy.animationOn}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="off" className="group">
							<PowerIcon /> {props.copy.animationOff}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
