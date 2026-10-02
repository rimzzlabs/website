import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Html,
	Preview,
	Section,
	Text,
} from "react-email";
import type { Dictionary } from "../i18n/en";
import { en } from "../i18n/en";
import { fill } from "../i18n/fill";
import { EMAIL_COLORS, EMAIL_FONTS } from "./theme";

interface ContactReplyEmailProps {
	copy: Dictionary["contact"]["autoReply"];
	lang: string;
	name: string;
}

const PARAGRAPH_STYLE = {
	fontSize: "15px",
	lineHeight: "26px",
	margin: "0 0 16px",
};

export function ContactReplyEmail(props: ContactReplyEmailProps) {
	return (
		<Html lang={props.lang}>
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
			<Preview>{props.copy.preview}</Preview>
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
							margin: "0 0 24px",
						}}
					>
						rimzzlabs.com
					</Text>

					<Text style={PARAGRAPH_STYLE}>
						{fill(props.copy.greeting, { name: props.name })}
					</Text>
					<Text style={PARAGRAPH_STYLE}>{props.copy.received}</Text>
					<Text style={PARAGRAPH_STYLE}>{props.copy.wait}</Text>

					<Section style={{ padding: "8px 0 24px" }}>
						<Button
							href="https://cal.com/rimzzlabs"
							style={{
								backgroundColor: EMAIL_COLORS.primary,
								borderRadius: "8px",
								color: EMAIL_COLORS.primaryForeground,
								fontSize: "14px",
								fontWeight: 500,
								padding: "10px 18px",
							}}
						>
							{props.copy.bookCall}
						</Button>
					</Section>

					<Text style={{ ...PARAGRAPH_STYLE, margin: 0 }}>
						{props.copy.signOff}
					</Text>
					<Text
						style={{
							fontFamily: EMAIL_FONTS.serif,
							fontSize: "18px",
							fontWeight: 600,
							lineHeight: "28px",
							margin: "0 0 32px",
						}}
					>
						Rizki
					</Text>

					<Text
						style={{
							color: EMAIL_COLORS.mutedForeground,
							fontSize: "13px",
							lineHeight: "20px",
							margin: 0,
						}}
					>
						{props.copy.footer}
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

ContactReplyEmail.PreviewProps = {
	copy: en.contact.autoReply,
	lang: "en",
	name: "Jane Doe",
} satisfies ContactReplyEmailProps;

export default ContactReplyEmail;
