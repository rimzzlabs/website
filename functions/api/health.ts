// Liveness endpoint, advertised as the `status` link in /.well-known/api-catalog
// (RFC 9727) so agents can check the API before calling it.
export async function onRequestGet(): Promise<Response> {
	return new Response(JSON.stringify({ status: "ok" }), {
		status: 200,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
