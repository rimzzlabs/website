// Gouache palette taken from the reference illustration: saturated, warm,
// slightly chalky. Every mesh in the scene picks its colors from here.
export const PALETTE = {
	skyTop: "#5f9fe0",
	skyBottom: "#b9d8f2",
	skyStreak: "#8fc0ec",
	cloud: "#fdf7ea",
	cloudLine: "#dfe8f2",
	cloudShade: "#d3dfee",
	cloudLight: "#ffffff",
	haze: "#a9c8e4",

	nightTop: "#0b1233",
	nightBottom: "#26325f",
	nightHaze: "#1c2750",
	milkyWay: "#c9c3ff",
	star: "#fff6dc",
	firefly: "#e8ff8a",
	bird: "#2b3440",

	mountainShadow: "#2f6a55",
	mountainMid: "#4c9460",
	mountainLight: "#8cc66f",
	ridgeShadow: "#3a7a5d",

	riceGold: "#f0cf52",
	riceGoldDeep: "#dcae3a",
	riceGreen: "#a8cf55",
	riceGreenDeep: "#6fae48",
	bund: "#5d8f3c",

	road: "#e9dcc0",
	roadEdge: "#c9b48c",

	trunk: "#8b6a4b",
	frond: "#3f8a4c",
	frondLight: "#79bb57",
	banana: "#5fae52",
	bananaLight: "#9fd46a",

	wall: "#fff5e3",
	wallShade: "#e9dcc4",
	roof: "#d8483a",
	roofShade: "#a93a31",

	coconutTrunk: "#9a7b5a",
	treeTrunk: "#6f5540",
	canopy: ["#3f8a4c", "#4c9460", "#5da35a", "#2f6a55", "#79bb57"],
	forest: ["#3f8a5c", "#468f5e", "#4c9460", "#539a5f", "#5b9f62"],

	schoolWall: "#fbf7ee",
	schoolDado: "#9fd4bd",
	schoolPillar: "#c93a33",
	schoolRoof: "#8e3b2e",
	schoolRoofShade: "#6f2d24",
	schoolWindow: "#2d3440",
	fence: "#9cc9d6",
	fencePanel: "#243044",
	fenceLeaf: "#2c4f8f",
	flagRed: "#e03a32",
	flagWhite: "#fbfaf6",
	pole: "#6c6f73",

	mangoLeaves: ["#7cc242", "#5aa83a", "#3f8a3a", "#9fd35a", "#2f6f35"],

	buffalo: "#6b6b76",
	buffaloBelly: "#8d8793",
	horn: "#d9cdb4",

	rice: "#8cc04a",
	riceDeep: "#5f9a3c",
	panicle: "#e3b33a",

	bushes: ["#4c9460", "#79bb57", "#f19bb6", "#e2553f", "#f2c14e", "#3f8a4c"],
	flowers: ["#e8553f", "#e64c8a", "#fff8ee", "#f2c14e"],
	flowerCenter: "#f2c14e",
	stalk: "#7aa83f",
	grain: "#e9b93a",
} as const;
