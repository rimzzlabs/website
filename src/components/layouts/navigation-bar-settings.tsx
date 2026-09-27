import {
	ArrowsHorizontalIcon,
	ArrowsInLineHorizontalIcon,
	ArrowsOutLineHorizontalIcon,
	LaptopIcon,
	PowerIcon,
	SlidersHorizontalIcon,
	TranslateIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import {
	HTML_LANG,
	isLocale,
	LOCALE_COOKIE,
	LOCALE_NAMES,
	LOCALES,
	type Locale,
	localizePath,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import {
	applyLayoutSetting,
	isLayoutSetting,
	type LayoutSetting,
	readLayoutSetting,
} from "@/lib/layout";
import {
	applyMotionSetting,
	isMotionSetting,
	type MotionSetting,
	readMotionSetting,
} from "@/lib/motion";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
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
	const [motion, setMotion] = useState<MotionSetting>("system");
	const [layout, setLayout] = useState<LayoutSetting>("default");

	useEffect(() => {
		setMotion(readMotionSetting());
		setLayout(readLayoutSetting());
	}, []);

	const changeMotion = (next: unknown) => {
		if (!isMotionSetting(next)) return;
		applyMotionSetting(next);
		setMotion(next);
	};

	const changeLayout = (next: unknown) => {
		if (!isLayoutSetting(next)) return;
		applyLayoutSetting(next);
		setLayout(next);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
				<SlidersHorizontalIcon />
				<span className="sr-only">{props.copy.settings}</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				sideOffset={8}
				side={props.side}
				className="min-w-40"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{props.copy.language}</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={props.locale}
						onValueChange={switchLocale}
					>
						{LOCALES.map((locale) => (
							<DropdownMenuRadioItem key={locale} value={locale}>
								<TranslateIcon />
								<span lang={HTML_LANG[locale]}>{LOCALE_NAMES[locale]}</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuLabel>{props.copy.animation}</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={motion} onValueChange={changeMotion}>
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

				<DropdownMenuSeparator className="hidden lg:block" />

				<DropdownMenuGroup className="hidden lg:block">
					<DropdownMenuLabel>{props.copy.layout}</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={layout} onValueChange={changeLayout}>
						<DropdownMenuRadioItem value="default">
							<ArrowsInLineHorizontalIcon /> {props.copy.layoutDefault}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="wide">
							<ArrowsOutLineHorizontalIcon /> {props.copy.layoutWide}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="wider">
							<ArrowsHorizontalIcon /> {props.copy.layoutWider}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
