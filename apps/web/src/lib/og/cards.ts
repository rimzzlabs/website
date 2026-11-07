import {
	byline,
	description,
	dot,
	frame,
	h,
	img,
	label,
	OG_COLORS,
	type OgAssets,
	type OgChild,
	pill,
	rule,
	title,
	topRow,
} from "./elements";

export interface HomeCard {
	kind: "home";
	tagline: string;
	status: string;
}

export interface NoteCard {
	kind: "note";
	label: string;
	date: string;
	title: string;
	description: string;
	readTime: string;
}

export interface ListCard {
	kind: "list";
	label: string;
	meta: string;
	title: string;
	items: ReadonlyArray<{ meta: string; text: string }>;
	bullets: boolean;
	highlight: boolean;
}

export interface GuestbookCard {
	kind: "guestbook";
	label: string;
	title: string;
	signers: ReadonlyArray<{ name: string; avatar: string | null }>;
	signed: string;
}

export interface PageCard {
	kind: "page";
	label: string;
	meta: string;
	title: string;
	description: string;
	watermark: string;
}

export type OgCard = HomeCard | NoteCard | ListCard | GuestbookCard | PageCard;

const SIGNER_TINTS = ["#e9d8cf", "#dfe4d6", "#d9dfe8", "#eadfc9", "#e6d6e2"];

function homeCard(card: HomeCard, assets: OgAssets) {
	return frame(
		h(
			"div",
			{ flex: 1, alignItems: "center", justifyContent: "space-between" },
			h(
				"div",
				{ flexDirection: "column", gap: 28, maxWidth: 600 },
				label("rimzzlabs.com"),
				h(
					"div",
					{
						fontFamily: "Lora",
						fontWeight: 600,
						fontSize: 104,
						lineHeight: 1,
						letterSpacing: -2,
						color: OG_COLORS.strong,
					},
					"Rizki Citra",
				),
				description(card.tagline, 3),
				h(
					"div",
					{
						alignItems: "center",
						gap: 14,
						fontFamily: "Mono",
						fontSize: 22,
						color: OG_COLORS.primary,
					},
					dot(),
					card.status,
				),
			),
			img(assets.portrait, {
				width: 380,
				height: 458,
				borderRadius: 28,
				border: `2px solid ${OG_COLORS.border}`,
				objectFit: "cover",
			}),
		),
	);
}

function noteCard(card: NoteCard, assets: OgAssets) {
	return frame(
		topRow(label(card.label), label(card.date)),
		h(
			"div",
			{ flexDirection: "column", gap: 24 },
			rule(),
			title(card.title, 60),
			description(card.description),
		),
		byline(assets, pill([dot(), card.readTime])),
	);
}

function listItem(card: ListCard, item: ListCard["items"][number]): OgNode {
	if (card.bullets) {
		return h(
			"div",
			{ alignItems: "center", gap: 16, fontSize: 26 },
			dot(8, OG_COLORS.muted),
			item.text,
		);
	}
	return h(
		"div",
		{ alignItems: "center", gap: 24, fontSize: 24 },
		h(
			"div",
			{
				fontFamily: "Mono",
				fontSize: 20,
				color: OG_COLORS.muted,
				width: 130,
			},
			item.meta,
		),
		item.text,
	);
}

function listMeta(card: ListCard): OgChild {
	if (card.highlight) return pill([dot(), card.meta], OG_COLORS.primary);
	return label(card.meta);
}

function listCard(card: ListCard, assets: OgAssets) {
	return frame(
		topRow(label(card.label), listMeta(card)),
		h(
			"div",
			{ flexDirection: "column", gap: 22 },
			rule(),
			title(card.title, 60),
			h(
				"div",
				{ flexDirection: "column", gap: 12, marginTop: 6 },
				...card.items.map((item) => listItem(card, item)),
			),
		),
		byline(assets),
	);
}

function signer(signer: GuestbookCard["signers"][number], index: number) {
	const style = {
		width: 64,
		height: 64,
		borderRadius: 999,
		border: `3px solid ${OG_COLORS.background}`,
		marginLeft: -16,
	};
	if (signer.avatar) return img(signer.avatar, style);
	return h(
		"div",
		{
			...style,
			backgroundColor: SIGNER_TINTS[index % SIGNER_TINTS.length],
			alignItems: "center",
			justifyContent: "center",
			fontFamily: "Mono",
			fontSize: 22,
			color: OG_COLORS.foreground,
		},
		signer.name.slice(0, 1).toUpperCase(),
	);
}

function signerRow(card: GuestbookCard): OgChild {
	if (card.signers.length === 0) return null;
	return h(
		"div",
		{ alignItems: "center", gap: 20, marginTop: 8 },
		h("div", { paddingLeft: 16 }, ...card.signers.map(signer)),
		h("div", { fontSize: 26, color: OG_COLORS.muted }, card.signed),
	);
}

function guestbookCard(card: GuestbookCard, assets: OgAssets) {
	return frame(
		topRow(label(card.label)),
		h(
			"div",
			{ flexDirection: "column", gap: 24 },
			rule(),
			title(card.title),
			signerRow(card),
		),
		byline(assets),
	);
}

function watermark(text: string): OgChild {
	if (!text) return null;
	return h(
		"div",
		{
			position: "absolute",
			right: 56,
			bottom: -70,
			fontFamily: "Lora",
			fontWeight: 600,
			fontSize: 250,
			letterSpacing: -8,
			color: OG_COLORS.watermark,
		},
		text,
	);
}

function pageMeta(text: string): OgChild {
	if (!text) return null;
	return label(text);
}

function pageCard(card: PageCard, assets: OgAssets) {
	return frame(
		watermark(card.watermark),
		topRow(label(card.label), pageMeta(card.meta)),
		h(
			"div",
			{ flexDirection: "column", gap: 24 },
			rule(),
			title(card.title),
			description(card.description),
		),
		byline(assets),
	);
}

type OgNode = ReturnType<typeof h>;

export function toCardTree(card: OgCard, assets: OgAssets): OgNode {
	switch (card.kind) {
		case "home":
			return homeCard(card, assets);
		case "note":
			return noteCard(card, assets);
		case "list":
			return listCard(card, assets);
		case "guestbook":
			return guestbookCard(card, assets);
		case "page":
			return pageCard(card, assets);
	}
}
