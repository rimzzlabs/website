import { CircleHalfIcon } from "@phosphor-icons/react";
import { useTheme } from "@/lib/hooks/use-theme";
import { Button } from "../ui/button";

export function NavigationBarTheme() {
	const { toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme} size="icon" variant="ghost">
			<CircleHalfIcon weight="fill" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
