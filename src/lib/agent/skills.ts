import guestbook from "@/data/agent-skills/guestbook.md?raw";
import notes from "@/data/agent-skills/notes.md?raw";

export interface AgentSkill {
	name: string;
	description: string;
	body: string;
}

function readDescription(body: string) {
	return body.match(/^description: (.+)$/m)?.[1] ?? "";
}

export const AGENT_SKILLS: ReadonlyArray<AgentSkill> = [
	{ name: "guestbook", body: guestbook },
	{ name: "notes", body: notes },
].map((skill) => ({ ...skill, description: readDescription(skill.body) }));

export async function sha256(text: string) {
	const bytes = new TextEncoder().encode(text);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return [...new Uint8Array(digest)]
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}
