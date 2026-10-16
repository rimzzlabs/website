export const GUESTBOOK_CARD_MORPH: React.CSSProperties = {
	viewTransitionName: "guestbook-card",
	viewTransitionClass: "guestbook",
};

interface GuestbookCardProps {
	children: React.ReactNode;
}

export function GuestbookCard(props: GuestbookCardProps) {
	return (
		<div
			className="rounded-xl bg-muted p-4 sm:p-5"
			style={GUESTBOOK_CARD_MORPH}
		>
			{props.children}
		</div>
	);
}
