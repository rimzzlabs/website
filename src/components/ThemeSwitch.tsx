import * as React from "react";

const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*:not(.theme-icon) {-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

export function ThemeSwitch() {
  let ignore = React.useRef(true);
  let [theme, setThemeState] = React.useState<"light" | "dark" | "pending">(
    "pending",
  );

  let onChangeTheme = () => {
    // Disable animations before changing the theme
    const enableAnimations = disableAnimation();

    // Update the theme state
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

    // Re-enable animations after a short delay
    setTimeout(() => {
      enableAnimations();
    }, 50); // Adjust delay to match your CSS transition duration
  };

  React.useEffect(() => {
    let isDarkMode = localStorage.getItem("app.theme") === "dark";

    setThemeState(isDarkMode ? "dark" : "light");
    ignore.current = false;
  }, []);

  React.useEffect(() => {
    if (ignore.current) return;

    let isDark = theme === "dark";

    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  if (theme === "pending") {
    return (
      <button
        disabled
        className="inline-flex size-9 cursor-not-allowed items-center justify-center opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin stroke-orange-600"
        >
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m4.9 19.1 2.9-2.9" />
          <path d="M2 12h4" />
          <path d="m4.9 4.9 2.9 2.9" />
        </svg>
      </button>
    );
  }

  return (
    <button
      data-theme={theme}
      onClick={onChangeTheme}
      className="group relative inline-flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-xl transition"
    >
      <svg
        id="theme-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-orange-600"
      >
        <circle
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:translate-y-7 group-data-[theme=dark]:scale-0"
          cx="12"
          cy="12"
          r="4"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:-translate-y-2.5 group-data-[theme=dark]:opacity-0"
          d="M12 2v2"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:translate-y-2.5 group-data-[theme=dark]:opacity-0"
          d="M12 20v2"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:-translate-x-2.5 group-data-[theme=dark]:-translate-y-2.5"
          d="m4.93 4.93 1.41 1.41"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:translate-x-2.5 group-data-[theme=dark]:translate-y-2.5"
          d="m17.66 17.66 1.41 1.41"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:-translate-x-2.5"
          d="M2 12h2"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:translate-x-2.5"
          d="M20 12h2"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:-translate-x-2.5 group-data-[theme=dark]:translate-y-2.5"
          d="m6.34 17.66-1.41 1.41"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=dark]:-translate-y-2.5 group-data-[theme=dark]:translate-x-2.5"
          d="m19.07 4.93-1.41 1.41"
        />

        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=light]:-translate-y-10 group-data-[theme=light]:translate-x-5"
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=light]:-translate-y-10"
          d="M20 3v4"
        />
        <path
          className="theme-icon origin-center transition duration-300 will-change-auto group-data-[theme=light]:-translate-y-10"
          d="M22 5h-4"
        />
      </svg>

      <span className="sr-only">Switch Theme</span>
    </button>
  );
}
