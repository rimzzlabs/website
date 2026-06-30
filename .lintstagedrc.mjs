function runBiome(filenames) {
	const filtered = filenames.filter((f) => !f.includes("/LICENSE/") && !f.includes("\\LICENSE\\"));
	if (filtered.length === 0) return "echo No files to check";
	return `biome check --write ${filtered.join(" ")}`;
}

const config = {
	"*.{js,ts,tsx,json,mjs}": [runBiome],
};

export default config;
