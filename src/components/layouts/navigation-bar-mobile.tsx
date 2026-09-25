import { NavigationBarSettings } from "@/components/layouts/navigation-bar-settings";
import { NavigationBarTheme } from "@/components/layouts/navigation-bar-theme";
import { NAVIGATION_LINKS } from "@/components/layouts/navigation-links";
import { buttonVariants } from "@/components/ui/button";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

export function NavigationBarMobile() {
	const hidden = useHideOnScroll();

	return (
		<div
			data-hidden={hidden}
			className="fixed inset-x-0 bottom-0 z-45 border-t bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-[translate,opacity] duration-300 ease-out data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-full data-[hidden=true]:opacity-0 has-focus-visible:pointer-events-auto has-focus-visible:translate-y-0 has-focus-visible:opacity-100 md:hidden"
		>
			<div className="wrapper flex h-12 items-center">
				<nav
					aria-label="Main"
					className="-ml-2.5 inline-flex items-center gap-1 text-muted-foreground"
				>
					{NAVIGATION_LINKS.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className={buttonVariants({ variant: "ghost", size: "sm" })}
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="ml-auto inline-flex items-center gap-1">
					<NavigationBarTheme />
					<NavigationBarSettings side="top" />
				</div>
			</div>
		</div>
	);
}
