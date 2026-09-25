import { CircleHalfIcon } from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n";
import { useTheme } from "@/lib/hooks/use-theme";
import { Button } from "../ui/button";

interface NavigationBarThemeProps {
	copy: Dictionary["nav"];
}

export function NavigationBarTheme(props: NavigationBarThemeProps) {
	const { toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme} size="icon" variant="ghost">
			<CircleHalfIcon weight="fill" />
			<span className="sr-only">{props.copy.toggleTheme}</span>
		</Button>
	);
}
