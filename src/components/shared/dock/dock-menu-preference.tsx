import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useStore } from "@nanostores/react";
import { Monitor, Moon, SlidersHorizontal, Sun, Zap, ZapOff } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { $motionPreference } from "@/lib/stores/motion";
import { $theme } from "@/lib/stores/theme";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { Tooltip, TooltipContent } from "../../ui/tooltip";
import { itemClass } from "./constants";

export function DockMenuPreference() {
	const theme = useTheme();
	const motionPref = useStore($motionPreference) ?? "system";

	return (
		<DropdownMenu modal={false}>
			<Tooltip>
				<TooltipPrimitive.Trigger
					render={
						<MenuPrimitive.Trigger
							render={
								<button type="button" aria-label="Preferences" className={itemClass}>
									<SlidersHorizontal className="size-4" />
								</button>
							}
						/>
					}
				/>
				<TooltipContent>Preferences</TooltipContent>
			</Tooltip>

			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => $theme.set(value as typeof theme)}
				>
					<DropdownMenuLabel>Theme</DropdownMenuLabel>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="system">
						<Monitor className="size-3.5 lg:size-4" /> System
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="light">
						<Sun className="size-3.5 lg:size-4" /> Light
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="dark">
						<Moon className="size-3.5 lg:size-4" /> Dark
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSeparator />

				<DropdownMenuRadioGroup
					value={motionPref}
					onValueChange={(value) =>
						$motionPreference.set(value === "system" ? null : (value as "on" | "off"))
					}
				>
					<DropdownMenuLabel>Animations</DropdownMenuLabel>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="system">
						<Monitor className="size-3.5 lg:size-4" /> System
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="on">
						<Zap className="size-3.5 lg:size-4" /> On
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="text-xs lg:text-sm" value="off">
						<ZapOff className="size-3.5 lg:size-4" /> Off
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
