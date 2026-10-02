import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "react-email";

import { EMAIL_COLORS, EMAIL_FONTS } from "./theme";

interface ActivityEmailProps {
	source: string;
	title: string;
	summary: string;
	quote?: string;
	details: ReadonlyArray<ActivityDetail>;
	action: ActivityAction;
}

export interface ActivityDetail {
	label: string;
	value: string;
	href?: string;
}

interface ActivityAction {
	label: string;
	href: string;
}

const LABEL_STYLE = {
	color: EMAIL_COLORS.mutedForeground,
	fontFamily: EMAIL_FONTS.mono,
	fontSize: "12px",
	letterSpacing: "0.04em",
	lineHeight: "18px",
	margin: "0 0 4px",
};

const VALUE_STYLE = {
	fontSize: "15px",
	lineHeight: "24px",
	margin: "0 0 16px",
};

function DetailValue(props: ActivityDetail) {
	if (!props.href) return props.value;
	return (
		<Link href={props.href} style={{ color: EMAIL_COLORS.primary }}>
			{props.value}
		</Link>
	);
}

function Detail(props: ActivityDetail) {
	return (
		<>
			<Text style={LABEL_STYLE}>{props.label}</Text>
			<Text style={VALUE_STYLE}>
				<DetailValue {...props} />
			</Text>
		</>
	);
}

export function ActivityEmail(props: ActivityEmailProps) {
	return (
		<Html lang="en">
			<Head>
				<Font
					fontFamily="Lora"
					fallbackFontFamily="Georgia"
					webFont={{
						url: "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787zAvBJBkq18ndeYxZ0.woff2",
						format: "woff2",
					}}
					fontWeight={600}
					fontStyle="normal"
				/>
			</Head>
			<Preview>{props.summary}</Preview>
			<Body
				style={{
					backgroundColor: EMAIL_COLORS.background,
					color: EMAIL_COLORS.foreground,
					fontFamily: EMAIL_FONTS.sans,
					margin: 0,
					padding: "40px 16px",
				}}
			>
				<Container style={{ maxWidth: "560px", margin: "0 auto" }}>
					<Text
						style={{
							color: EMAIL_COLORS.mutedForeground,
							fontFamily: EMAIL_FONTS.mono,
							fontSize: "12px",
							letterSpacing: "0.04em",
							margin: "0 0 16px",
						}}
					>
						rimzzlabs.com · {props.source}
					</Text>

					<Heading
						as="h1"
						style={{
							fontFamily: EMAIL_FONTS.serif,
							fontSize: "26px",
							fontWeight: 600,
							letterSpacing: "-0.01em",
							lineHeight: "32px",
							margin: "0 0 8px",
						}}
					>
						{props.title}
					</Heading>
					<Text
						style={{
							color: EMAIL_COLORS.mutedForeground,
							fontSize: "14px",
							lineHeight: "22px",
							margin: "0 0 24px",
						}}
					>
						{props.summary}
					</Text>

					<Section
						style={{
							backgroundColor: EMAIL_COLORS.card,
							border: `1px solid ${EMAIL_COLORS.border}`,
							borderRadius: "12px",
							padding: "20px 24px 4px",
						}}
					>
						{props.quote && (
							<>
								<Text style={{ ...VALUE_STYLE, whiteSpace: "pre-wrap" }}>
									{props.quote}
								</Text>
								<Hr
									style={{
										borderColor: EMAIL_COLORS.border,
										margin: "0 0 16px",
									}}
								/>
							</>
						)}
						{props.details.map((detail) => (
							<Detail key={detail.label} {...detail} />
						))}
					</Section>

					<Section style={{ padding: "24px 0 0" }}>
						<Button
							href={props.action.href}
							style={{
								backgroundColor: EMAIL_COLORS.primary,
								borderRadius: "8px",
								color: EMAIL_COLORS.primaryForeground,
								fontSize: "14px",
								fontWeight: 500,
								padding: "10px 18px",
							}}
						>
							{props.action.label}
						</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

ActivityEmail.PreviewProps = {
	source: "guestbook",
	title: "Jane Doe signed the guestbook",
	summary: "Jane Doe signed as an anonymous visitor.",
	quote: "Love the Pulosari scene on the home page. Keep writing!",
	details: [
		{ label: "Name", value: "Jane Doe" },
		{ label: "Signed with", value: "Anonymous" },
		{
			label: "Website",
			value: "https://jane.dev",
			href: "https://jane.dev",
		},
	],
	action: {
		label: "Open the guestbook",
		href: "https://rimzzlabs.com/guestbook/",
	},
} satisfies ActivityEmailProps;

export default ActivityEmail;
