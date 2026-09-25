import { NavigationBarSettings } from "@/components/layouts/navigation-bar-settings";
import { NavigationBarTheme } from "@/components/layouts/navigation-bar-theme";
import type { NavigationLink } from "@/components/layouts/navigation-links";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/i18n";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

interface NavigationBarMobileProps {
	copy: Dictionary["nav"];
	locale: Locale;
	links: ReadonlyArray<NavigationLink>;
}

export function NavigationBarMobile(props: NavigationBarMobileProps) {
	const hidden = useHideOnScroll();

	return (
		<div
			data-hidden={hidden}
			className="fixed inset-x-0 bottom-0 z-45 border-t bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-[translate,opacity] duration-300 ease-out data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-full data-[hidden=true]:opacity-0 has-focus-visible:pointer-events-auto has-focus-visible:translate-y-0 has-focus-visible:opacity-100 md:hidden"
		>
			<div className="wrapper flex h-12 items-center">
				<nav
					aria-label={props.copy.main}
					className="-ml-2.5 inline-flex items-center gap-1 text-muted-foreground"
				>
					{props.links.map((link) => (
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
					<NavigationBarTheme copy={props.copy} />
					<NavigationBarSettings
						copy={props.copy}
						locale={props.locale}
						side="top"
					/>
				</div>
			</div>
		</div>
	);
}
