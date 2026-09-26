import type { APIRoute } from "astro";

import { SITE } from "@/lib/agent/site";
import { AGENT_SKILLS, sha256 } from "@/lib/agent/skills";

export const GET: APIRoute = async () => {
	const skills = await Promise.all(
		AGENT_SKILLS.map(async (skill) => ({
			name: skill.name,
			type: "skill-md",
			description: skill.description,
			url: `${SITE}/.well-known/agent-skills/${skill.name}/SKILL.md`,
			digest: `sha256:${await sha256(skill.body)}`,
		})),
	);

	return Response.json({
		$schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
		skills,
	});
};
