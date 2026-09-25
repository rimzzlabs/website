import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "react-email";

import { EMAIL_COLORS, EMAIL_FONTS } from "./theme";

interface FeedbackEmailProps {
	topic: string;
	page: string;
	message: string;
	environment: string;
	name: string;
	email: string;
	screenshots: ReadonlyArray<FeedbackScreenshot>;
}

interface FeedbackScreenshot {
	name: string;
	src: string;
}

const PREVIEW_LENGTH = 90;

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

function Detail(props: { label: string; children: React.ReactNode }) {
	return (
		<>
			<Text style={LABEL_STYLE}>{props.label}</Text>
			<Text style={VALUE_STYLE}>{props.children}</Text>
		</>
	);
}

export function FeedbackEmail(props: FeedbackEmailProps) {
	const preview = `${props.topic}: ${props.message.slice(0, PREVIEW_LENGTH)}`;
	const sender = props.name || "Someone";

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
			<Preview>{preview}</Preview>
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
						rimzzlabs.com · feedback form
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
						New feedback: {props.topic}
					</Heading>
					<Text
						style={{
							color: EMAIL_COLORS.mutedForeground,
							fontSize: "14px",
							lineHeight: "22px",
							margin: "0 0 24px",
						}}
					>
						From {sender}
						{props.email && ` <${props.email}>`}
					</Text>

					<Section
						style={{
							backgroundColor: EMAIL_COLORS.card,
							border: `1px solid ${EMAIL_COLORS.border}`,
							borderRadius: "12px",
							padding: "20px 24px 4px",
						}}
					>
						<Text style={LABEL_STYLE}>What happened</Text>
						<Text style={{ ...VALUE_STYLE, whiteSpace: "pre-wrap" }}>
							{props.message}
						</Text>

						<Hr
							style={{ borderColor: EMAIL_COLORS.border, margin: "0 0 16px" }}
						/>

						<Detail label="Page">
							{props.page ? (
								<Link href={props.page} style={{ color: EMAIL_COLORS.primary }}>
									{props.page}
								</Link>
							) : (
								"Not given"
							)}
						</Detail>
						<Detail label="Browser and assistive technology">
							{props.environment || "Not given"}
						</Detail>
					</Section>

					{props.screenshots.length > 0 && (
						<Section style={{ padding: "24px 0 0" }}>
							<Text style={LABEL_STYLE}>Screenshots</Text>
							{props.screenshots.map((screenshot) => (
								<Section key={screenshot.name} style={{ padding: "8px 0 0" }}>
									<Link href={screenshot.src}>
										<Img
											src={screenshot.src}
											alt={screenshot.name}
											width="560"
											style={{
												border: `1px solid ${EMAIL_COLORS.border}`,
												borderRadius: "12px",
												display: "block",
												height: "auto",
												maxWidth: "100%",
											}}
										/>
									</Link>
									<Text
										style={{
											...LABEL_STYLE,
											margin: "6px 0 0",
										}}
									>
										{screenshot.name}
									</Text>
								</Section>
							))}
						</Section>
					)}

					{props.email && (
						<Section style={{ padding: "24px 0 0" }}>
							<Button
								href={`mailto:${props.email}`}
								style={{
									backgroundColor: EMAIL_COLORS.primary,
									borderRadius: "8px",
									color: EMAIL_COLORS.primaryForeground,
									fontSize: "14px",
									fontWeight: 500,
									padding: "10px 18px",
								}}
							>
								Reply to {sender}
							</Button>
						</Section>
					)}

					<Text
						style={{
							color: EMAIL_COLORS.mutedForeground,
							fontSize: "13px",
							lineHeight: "20px",
							margin: "32px 0 0",
						}}
					>
						The site did not store this feedback or its screenshots. They only
						exist in this email.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

FeedbackEmail.PreviewProps = {
	topic: "Accessibility",
	page: "https://rimzzlabs.com/notes",
	message:
		"The image viewer traps focus after I close it with Escape. VoiceOver keeps reading the old slide.",
	environment: "Safari on iPhone 15 with VoiceOver",
	name: "Jane Doe",
	email: "jane@example.com",
	screenshots: [
		{
			name: "screenshot-1.png",
			src: "https://placehold.co/1120x700/png?text=screenshot-1.png",
		},
	],
} satisfies FeedbackEmailProps;

export default FeedbackEmail;
