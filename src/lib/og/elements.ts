export interface OgNode {
	type: string;
	props: Record<string, unknown>;
}

export type OgChild = OgNode | string | null;

export interface OgAssets {
	avatar: string;
	portrait: string;
}

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
	background: "#faf9f5",
	foreground: "#3d3929",
	strong: "#1f1d17",
	muted: "#66655f",
	border: "#dad9d4",
	primary: "#b55230",
	tint: "rgba(181,82,48,0.16)",
	watermark: "rgba(61,57,41,0.06)",
};

type Style = Record<string, string | number>;

// A tiny hyperscript, so the cards read like JSX without a JSX runtime.
// Satori needs display: flex on every element with more than one child.
export function h(
	type: string,
	style: Style,
	...children: Array<OgChild | Array<OgChild>>
): OgNode {
	const flat = children.flat().filter((child) => child !== null);
	const props = { style: { display: "flex", ...style }, children: flat };
	// Satori counts an array as many children, which block text elements reject.
	if (flat.length === 1)
		return { type, props: { ...props, children: flat[0] } };
	return { type, props };
}

export function img(src: string, style: Style): OgNode {
	return { type: "img", props: { src, style } };
}

export function label(text: string, color = OG_COLORS.muted) {
	return h(
		"div",
		{
			fontFamily: "Mono",
			fontSize: 22,
			letterSpacing: 2,
			color,
			textTransform: "uppercase",
		},
		text,
	);
}

export function dot(size = 12, color = OG_COLORS.primary) {
	return h("div", {
		width: size,
		height: size,
		borderRadius: 999,
		backgroundColor: color,
	});
}

export function pill(children: Array<OgChild>, color = OG_COLORS.foreground) {
	return h(
		"div",
		{
			alignItems: "center",
			gap: 10,
			padding: "10px 20px",
			borderRadius: 999,
			border: `2px solid ${OG_COLORS.border}`,
			backgroundColor: OG_COLORS.background,
			fontFamily: "Mono",
			fontSize: 20,
			color,
		},
		children,
	);
}

export function rule() {
	return h("div", {
		width: 56,
		height: 6,
		borderRadius: 3,
		backgroundColor: OG_COLORS.primary,
	});
}

export function title(text: string, size = 68) {
	return h(
		"div",
		{
			fontFamily: "Lora",
			fontWeight: 600,
			fontSize: size,
			lineHeight: 1.12,
			letterSpacing: -1,
			color: OG_COLORS.strong,
			maxWidth: 1000,
			display: "block",
			lineClamp: 3,
		},
		text,
	);
}

export function description(text: string, lines = 2) {
	return h(
		"div",
		{
			fontSize: 28,
			lineHeight: 1.45,
			color: OG_COLORS.muted,
			maxWidth: 940,
			display: "block",
			lineClamp: lines,
		},
		text,
	);
}

export function topRow(left: OgChild, right: OgChild = null) {
	return h(
		"div",
		{ justifyContent: "space-between", alignItems: "center" },
		left,
		right,
	);
}

export function byline(assets: OgAssets, meta: OgChild = null) {
	return h(
		"div",
		{ alignItems: "center", justifyContent: "space-between", width: "100%" },
		h(
			"div",
			{ alignItems: "center", gap: 18 },
			img(assets.avatar, {
				width: 60,
				height: 60,
				borderRadius: 999,
				border: `2px solid ${OG_COLORS.border}`,
			}),
			h(
				"div",
				{ flexDirection: "column" },
				h(
					"div",
					{
						fontFamily: "Inter",
						fontWeight: 500,
						fontSize: 26,
						color: OG_COLORS.strong,
					},
					"Rizki Citra",
				),
				h(
					"div",
					{ fontFamily: "Inter", fontSize: 22, color: OG_COLORS.muted },
					"rimzzlabs.com",
				),
			),
		),
		meta,
	);
}

export function frame(...children: Array<OgChild>) {
	return h(
		"div",
		{
			width: OG_SIZE.width,
			height: OG_SIZE.height,
			backgroundColor: OG_COLORS.background,
			padding: "64px 72px",
			flexDirection: "column",
			justifyContent: "space-between",
			position: "relative",
			fontFamily: "Inter",
			color: OG_COLORS.foreground,
		},
		h("div", {
			position: "absolute",
			top: -260,
			right: -200,
			width: 640,
			height: 640,
			borderRadius: 999,
			backgroundImage: `radial-gradient(circle, ${OG_COLORS.tint}, rgba(181,82,48,0) 70%)`,
		}),
		...children,
	);
}
