// Runs inline in <head>, before the first paint, so stored preferences apply
// without a flash or a layout shift. Keep it small and dependency free.
// The storage keys match src/lib/motion.ts and src/lib/layout.ts.
(() => {
	const root = document.documentElement;

	const read = (key) => {
		try {
			return localStorage.getItem(key);
		} catch {
			return null;
		}
	};

	// Theme: a stored choice wins, otherwise follow the system.
	const media = window.matchMedia("(prefers-color-scheme: dark)");
	const storedTheme = () => {
		const value = read("rimzzlabs:theme");
		return value === "dark" || value === "light" ? value : null;
	};
	const applyTheme = (dark) => root.classList.toggle("dark", dark);
	const theme = storedTheme();
	applyTheme(theme ? theme === "dark" : media.matches);
	media.addEventListener("change", (event) => {
		if (storedTheme() === null) applyTheme(event.matches);
	});

	// Motion: "system" follows prefers-reduced-motion.
	const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	const applyMotion = () => {
		const value = read("rimzzlabs:motion");
		const setting = value === "on" || value === "off" ? value : "system";
		const reduce =
			setting === "off" || (setting === "system" && motionQuery.matches);
		root.dataset.motion = reduce ? "reduce" : "full";
	};
	applyMotion();
	motionQuery.addEventListener("change", applyMotion);

	// Layout: "default" needs no attribute.
	const layout = read("rimzzlabs:layout");
	if (layout === "wide" || layout === "wider") root.dataset.layout = layout;
})();
