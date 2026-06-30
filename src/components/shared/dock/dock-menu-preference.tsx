import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useStore } from "@nanostores/react";
import { Languages, Monitor, Moon, SlidersHorizontal, Sun, Zap, ZapOff } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { localizePath } from "@/i18n/utils";
import { $motionPreference } from "@/lib/stores/motion";
import { $theme } from "@/lib/stores/theme";
import { itemClass } from "./constants";

export function DockMenuPreference({ lang }: { lang: Lang }) {
	const theme = useTheme();
	const motionPref = useStore($motionPreference) ?? "system";
	const t = getDictionary(lang).nav;

	function handleLanguageChange(value: string) {
		const target = value as Lang;
		if (target === lang) return;
		// Persist the explicit choice so the edge Function honors it over Accept-Language.
		// biome-ignore lint/suspicious/noDocumentCookie: a single first-party locale cookie
		document.cookie = `locale=${target}; path=/; max-age=31536000; samesite=lax`;
		window.location.href = localizePath(window.location.pathname, target);
	}

	return (
		<DropdownMenu modal={false}>
			<Tooltip>
				<TooltipPrimitive.Trigger
					render={
						<MenuPrimitive.Trigger
							render={
								<button type="button" aria-label={t.preferences} className={itemClass}>
									<SlidersHorizontal className="size-4" />
								</button>
							}
						/>
					}
				/>
				<TooltipContent>{t.preferences}</TooltipContent>
			</Tooltip>

			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => $theme.set(value as typeof theme)}
				>
					<DropdownMenuLabel>{t.theme.label}</DropdownMenuLabel>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="system">
						<Monitor className="size-3.5 lg:size-4" /> {t.theme.system}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="light">
						<Sun className="size-3.5 lg:size-4" /> {t.theme.light}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="dark">
						<Moon className="size-3.5 lg:size-4" /> {t.theme.dark}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSeparator />

				<DropdownMenuRadioGroup
					value={motionPref}
					onValueChange={(value) =>
						$motionPreference.set(value === "system" ? null : (value as "on" | "off"))
					}
				>
					<DropdownMenuLabel>{t.animations.label}</DropdownMenuLabel>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="system">
						<Monitor className="size-3.5 lg:size-4" /> {t.animations.system}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="on">
						<Zap className="size-3.5 lg:size-4" /> {t.animations.on}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="off">
						<ZapOff className="size-3.5 lg:size-4" /> {t.animations.off}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSeparator />

				<DropdownMenuRadioGroup value={lang} onValueChange={handleLanguageChange}>
					<DropdownMenuLabel>{t.language.label}</DropdownMenuLabel>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="en">
						<Languages className="size-3.5 lg:size-4" /> {t.language.en}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="id">
						<Languages className="size-3.5 lg:size-4" /> {t.language.id}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
