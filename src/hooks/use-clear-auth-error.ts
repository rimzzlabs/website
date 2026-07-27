import { useEffect } from "react";

// A canceled/denied OAuth redirect returns with ?error=... appended. Strip it so
// the address bar doesn't keep the error string after we're back on the page.
export function useClearAuthError() {
	useEffect(() => {
		const url = new URL(window.location.href);
		if (!url.searchParams.has("error")) return;
		url.searchParams.delete("error");
		url.searchParams.delete("error_description");
		window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
	}, []);
}
