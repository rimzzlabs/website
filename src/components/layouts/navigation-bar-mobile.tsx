import {
	ArchiveIcon,
	HouseIcon,
	type Icon,
	NotebookIcon,
	SignatureIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { NavigationBarSettings } from "@/components/layouts/navigation-bar-settings";
import { NavigationBarTheme } from "@/components/layouts/navigation-bar-theme";
import {
	isCurrentLink,
	type NavigationLink,
	type NavigationLinkId,
} from "@/components/layouts/navigation-links";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/i18n";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";
import { Separator } from "../ui/separator";

const LINK_ICONS: Record<NavigationLinkId, Icon> = {
	home: HouseIcon,
	notes: NotebookIcon,
	guestbook: SignatureIcon,
	archive: ArchiveIcon,
};

interface NavigationBarMobileProps {
	copy: Dictionary["nav"];
	locale: Locale;
	links: ReadonlyArray<NavigationLink>;
	pathname: string;
}

export function NavigationBarMobile(props: NavigationBarMobileProps) {
	const hidden = useHideOnScroll();

	return (
		<header
			data-hidden={hidden}
			className="dark fixed inset-x-2.5 text-popover-foreground bottom-2 z-50 rounded-[calc(var(--radius-md)+0.375rem+1px)] border border-foreground/10 bg-popover/70 pb-[env(safe-area-inset-bottom)] shadow-md before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 transition-[translate,opacity] duration-300 ease-out data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-full data-[hidden=true]:opacity-0 has-focus-visible:pointer-events-auto has-focus-visible:translate-y-0 has-focus-visible:opacity-100 has-aria-expanded:pointer-events-auto has-aria-expanded:translate-y-0 has-aria-expanded:opacity-100 md:hidden"
		>
			<div className="flex h-12 items-center px-1.5">
				<nav
					aria-label={props.copy.main}
					className="inline-flex items-center gap-1 text-muted-foreground pr-4"
				>
					{props.links.map((link) => {
						const LinkIcon = LINK_ICONS[link.id];
						const current = isCurrentLink(link.href, props.pathname);
						return (
							<a
								key={link.id}
								href={link.href}
								aria-current={current ? "page" : undefined}
								className={cn(
									buttonVariants({ variant: "ghost", size: "icon" }),
									"aria-[current=page]:text-foreground",
								)}
							>
								<LinkIcon aria-hidden="true" className="size-5" />
								<span className="sr-only">{link.label}</span>
							</a>
						);
					})}
				</nav>

				<Separator
					orientation="vertical"
					className="ml-auto bg-foreground/10"
				/>

				<div className="pl-4 inline-flex items-center gap-1">
					<NavigationBarTheme copy={props.copy} />
					<NavigationBarSettings
						copy={props.copy}
						locale={props.locale}
						side="top"
					/>
				</div>
			</div>
		</header>
	);
}
