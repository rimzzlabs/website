import { spawn } from "node:child_process";

export const PAGES_FUNCTIONS_PORT = 8788;

// `astro dev` serves pages only, so every request to the API in functions/
// returned a 404 in dev. Pages Functions need the workerd runtime, which only
// `wrangler pages dev` provides. This plugin starts it beside the dev server
// and stops it with the dev server; vite.server.proxy sends /api there, so the
// browser still sees one origin.
//
// `public` is the static directory wrangler serves. Only /api is proxied, so
// what it serves does not matter — this avoids a full build before every run.
export function pagesFunctionsDev() {
	return {
		name: "pages-functions-dev",
		apply: "serve",
		configureServer(server) {
			const child = spawn(
				"wrangler",
				["pages", "dev", "public", "--port", String(PAGES_FUNCTIONS_PORT), "--log-level", "warn"],
				{ stdio: ["ignore", "inherit", "inherit"] },
			);

			child.on("error", (error) => {
				server.config.logger.error(`[api] wrangler pages dev failed to start: ${error.message}`);
			});

			child.on("exit", (code) => {
				if (code) server.config.logger.error(`[api] wrangler pages dev exited with code ${code}`);
			});

			let stopped = false;
			function stop() {
				if (stopped) return;
				stopped = true;
				child.kill("SIGTERM");
			}

			server.httpServer?.on("close", stop);
			process.once("exit", stop);
			process.once("SIGINT", stop);
			process.once("SIGTERM", stop);
		},
	};
}
