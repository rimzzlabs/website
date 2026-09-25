import { HomeContactDialog } from "@/components/home/home-contact/home-contact-dialog";
import { HomeContactDrawer } from "@/components/home/home-contact/home-contact-drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export function HomeContactMessage() {
	const desktop = useMediaQuery("(min-width: 48rem)");

	if (desktop) return <HomeContactDialog />;
	return <HomeContactDrawer />;
}
