import type { APIRoute } from "astro";

import { AGENT_SKILLS, type AgentSkill } from "@/lib/agent/skills";

export function getStaticPaths() {
	return AGENT_SKILLS.map((skill) => ({
		params: { name: skill.name },
		props: { skill },
	}));
}

export const GET: APIRoute = (context) => {
	const skill = (context.props as { skill: AgentSkill }).skill;
	return new Response(skill.body, {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
};
