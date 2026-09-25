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

interface ContactEmailProps {
	name: string;
	email: string;
	message: string;
}

const COLORS = {
	background: "#faf9f5",
	card: "#f5f4ef",
	foreground: "#3d3929",
	muted: "#ede9de",
	mutedForeground: "#6e6d68",
	border: "#dad9d4",
	primary: "#c96442",
	primaryForeground: "#ffffff",
};

const FONTS = {
	serif: "Lora, Georgia, 'Times New Roman', serif",
	sans: "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
	mono: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
};

const PREVIEW_LENGTH = 90;

export function ContactEmail(props: ContactEmailProps) {
	const preview = `${props.name}: ${props.message.slice(0, PREVIEW_LENGTH)}`;

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
					backgroundColor: COLORS.background,
					color: COLORS.foreground,
					fontFamily: FONTS.sans,
					margin: 0,
					padding: "40px 16px",
				}}
			>
				<Container style={{ maxWidth: "560px", margin: "0 auto" }}>
					<Text
						style={{
							color: COLORS.mutedForeground,
							fontFamily: FONTS.mono,
							fontSize: "12px",
							letterSpacing: "0.04em",
							margin: "0 0 16px",
						}}
					>
						rimzzlabs.com · contact form
					</Text>

					<Heading
						as="h1"
						style={{
							fontFamily: FONTS.serif,
							fontSize: "26px",
							fontWeight: 600,
							letterSpacing: "-0.01em",
							lineHeight: "32px",
							margin: "0 0 24px",
						}}
					>
						Someone just sent you a message
					</Heading>

					<Section
						style={{
							backgroundColor: COLORS.card,
							border: `1px solid ${COLORS.border}`,
							borderRadius: "12px",
							padding: "20px 24px",
						}}
					>
						<Text
							style={{
								fontSize: "16px",
								fontWeight: 600,
								lineHeight: "24px",
								margin: 0,
							}}
						>
							{props.name}
						</Text>
						<Link
							href={`mailto:${props.email}`}
							style={{
								color: COLORS.primary,
								fontSize: "14px",
								lineHeight: "22px",
							}}
						>
							{props.email}
						</Link>

						<Hr style={{ borderColor: COLORS.border, margin: "16px 0" }} />

						<Text
							style={{
								fontSize: "15px",
								lineHeight: "26px",
								margin: 0,
								whiteSpace: "pre-wrap",
							}}
						>
							{props.message}
						</Text>
					</Section>

					<Section style={{ padding: "24px 0 0" }}>
						<Button
							href={`mailto:${props.email}`}
							style={{
								backgroundColor: COLORS.primary,
								borderRadius: "8px",
								color: COLORS.primaryForeground,
								fontSize: "14px",
								fontWeight: 500,
								padding: "10px 18px",
							}}
						>
							Reply to {props.name}
						</Button>
					</Section>

					<Text
						style={{
							color: COLORS.mutedForeground,
							fontSize: "13px",
							lineHeight: "20px",
							margin: "32px 0 0",
						}}
					>
						You can also reply to this email. It goes straight to {props.name}.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

ContactEmail.PreviewProps = {
	name: "Jane Doe",
	email: "jane@example.com",
	message:
		"Hi Rizki,\n\nI am building a small fintech tool and I would love to hear your thoughts on the frontend. Are you open to a short call next week?\n\nThanks,\nJane",
} satisfies ContactEmailProps;

export default ContactEmail;
