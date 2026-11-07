export interface Inspiration {
	name: string;
	url: string;
}

// People whose personal sites inspired this one, in the order the page shows.
export const INSPIRATIONS: ReadonlyArray<Inspiration> = [
	{ name: "Lee Robinson", url: "https://leerob.io" },
	{ name: "Dan Abramov", url: "https://overreacted.io" },
	{ name: "Guillermo Rauch", url: "https://rauchg.com" },
	{ name: "Emil Kowalski", url: "https://emilkowal.ski" },
	{ name: "Anthony Fu", url: "https://antfu.me" },
	{ name: "Dominik Dorfmeister", url: "https://tkdodo.eu/blog" },
	{ name: "Kent C. Dodds", url: "https://kentcdodds.com" },
	{ name: "Matt Pocock", url: "https://www.totaltypescript.com/articles" },
	{ name: "Rizzky", url: "https://rizzky.xyz" },
	{ name: "Abdul Malik", url: "https://up2dul.dev" },
];

export function inspirationDomain(inspiration: Inspiration) {
	return new URL(inspiration.url).hostname.replace(/^www\./, "");
}
