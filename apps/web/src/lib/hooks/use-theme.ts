import { B, pipe } from "@mobily/ts-belt";
import { useState } from "react";

export function useTheme() {
	const [theme, setTheme] = useState<null | "dark" | "light">(null);

	function toggleTheme() {
		const root = document.documentElement;

		const theme = pipe(
			root.classList.contains("dark"),
			B.ifElse(
				() => "dark" as const,
				() => "light" as const,
			),
		);

		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		localStorage.setItem("rimzzlabs:theme", nextTheme);
		root.classList.toggle("dark");
	}

	return { theme, toggleTheme };
}
