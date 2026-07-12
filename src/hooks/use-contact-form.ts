import { useState } from "react";

export type ContactPayload = {
	name: string;
	email: string;
	subject: string;
	bodyHtml: string;
	bodyText: string;
	token: string;
};

export type ContactStatus = "idle" | "submitting" | "success" | "error";

const ENDPOINT = "/api/contact";

/** Submit state machine for the contact form; POSTs the payload to the edge function. */
export function useContactForm() {
	const [status, setStatus] = useState<ContactStatus>("idle");

	async function submit(payload: ContactPayload) {
		setStatus("submitting");
		try {
			const response = await fetch(ENDPOINT, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(payload),
			});
			setStatus(response.ok ? "success" : "error");
			return response.ok;
		} catch {
			setStatus("error");
			return false;
		}
	}

	function reset() {
		setStatus("idle");
	}

	return { status, submit, reset };
}
