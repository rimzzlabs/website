import { HomeContactDialog } from "@/components/home/home-contact/home-contact-dialog";
import { HomeContactDrawer } from "@/components/home/home-contact/home-contact-drawer";
import type { Dictionary } from "@/i18n/en";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

interface HomeContactMessageProps {
	copy: Dictionary["contact"];
}

export function HomeContactMessage(props: HomeContactMessageProps) {
	const desktop = useMediaQuery("(min-width: 48rem)");

	if (desktop) return <HomeContactDialog copy={props.copy} />;
	return <HomeContactDrawer copy={props.copy} />;
}
