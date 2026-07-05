// Canonical dictionary. Types are intentionally widened (no `as const`) so `id`
// can be typed as `typeof en` and the checker enforces a matching shape.
export const en = {
	htmlLang: "en",
	ogLocale: "en_US",
	dateLocale: "en-GB",

	nav: {
		home: "Home",
		notes: "Notes",
		now: "Now",
		dragToMove: "Drag to move",
		hideDock: "Hide dock",
		pages: "Pages",
		availablePages: "Available Pages",
		preferences: "Preferences",
		theme: { label: "Theme", system: "System", light: "Light", dark: "Dark" },
		animations: { label: "Animations", system: "System", on: "On", off: "Off" },
		language: { label: "Language", en: "English", id: "Indonesian" },
		connect: { trigger: "Get in touch", scheduleCall: "Schedule a call", resume: "Résumé" },
	},

	footer: {
		connect: "Connect",
		resource: "Resource",
		resume: "Résumé",
		sourceCode: "Source Code",
	},

	homeSeo: {
		title: "Rizki Citra, Software Engineer",
		description:
			"Personal site of Rizki Citra, a software engineer building fast, delightful web and AI products — with notes on frontend engineering along the way.",
	},

	hero: {
		srName: "Rizki Citra,",
		titleLead: "Passionate Software Engineer, Crafting Delightful",
		srUi: "User Interfaces",
		titleUi: " UIs.",
		srWhy: "Why software engineering? ",
		p1: "Software engineering allows me to create innovative solutions that align with my values and make a meaningful impact.",
		p2: "Its blend of structure, problem solving, and continuous evolution keeps me engaged and growing.",
		talk: "Let's Talk",
		talkSr: "(Allow you to schedule a meeting with Rizki on cal.com)",
		resume: "Résumé",
		resumeSr: "See my ",
	},

	experience: {
		heading: "Experience",
		headingSr: "My ",
		intro:
			"A quick ledger of where I've worked and what I shipped. The longer story lives further down.",
		resumeLead: "You can see a complete profile on",
		resumeLink: "my Résumé",
		resumeLinkSr: "See it here",
		items: {
			kolosal: {
				title: "Software Engineer",
				period: "Nov 2025 - Present",
				summary: "Building AI products with a small, sharp team.",
			},
			bitwyre: {
				title: "Software Engineer (Frontend)",
				period: "Feb 2024 - Nov 2025",
				summary: "Shipped the frontend for a global crypto, web3 and trading platform.",
			},
			"skyshi-fe": {
				title: "Frontend Developer",
				period: "Apr 2022 - Feb 2024",
				summary:
					"Built fast, accessible React and Next.js apps for local and international clients.",
			},
			"skyshi-intern": {
				title: "Frontend Developer Intern",
				period: "Jan 2022 - Mar 2022",
				summary: "Cut my teeth on internal products with React, Vue and Chakra UI.",
			},
		},
	},

	skill: {
		heading: "Skills",
		headingSr: "My ",
		p1: "Tools come and go, and every so often something new promises to make this craft obsolete. I've learned not to bet against it.",
		p2: "What keeps me going is curiosity, going deep where it counts while staying broad enough to adapt, and the habit of growing with whatever comes next.",
		domains: {
			Frontend: "Frontend",
			Backend: "Backend",
			"General Tooling": "General Tooling",
			"Agentic Coding": "Agentic Coding",
		},
	},

	homeNotes: {
		heading: "Notes",
		headingSr: "Read my ",
		intro:
			"A few things I've written while building for the web — and what I picked up along the way.",
		readAll: "Read all notes",
	},

	archive: {
		heading: "Archive",
		headingSr: "My Journey in Software Engineering - ",
		intro:
			"I started my software engineering journey in 2019, and ever since, I've been passionate about creating meaningful work. But there's more to recall.",
		timeline: {
			"2026": {
				title: "Happening Now",
				descriptions: [
					"I'm still at Kolosal AI, going deeper into building AI products. After years in web and then crypto, this is the fastest-moving space I've worked in; it seems to reinvent itself every few months.",
					"There's no tidy summary for a chapter still being written. For now I'm heads-down: doing good work, learning fast, and seeing where it leads.",
				],
				photoAlts: [] as string[],
			},
			"2025": {
				title: "Joined Kolosal AI",
				descriptions: [
					"Around November I joined Kolosal AI and stepped out of the crypto and web3 world into something new: artificial intelligence. Another leap, trading a domain I'd grown comfortable in for one moving at a completely different pace.",
					"The first weeks were about finding my feet alongside a genuinely great team, in a space I'd only ever watched from the outside. It quickly felt like the kind of place I'd been hoping to land. More on that another time.",
				],
				photoAlts: [] as string[],
			},
			"2024": {
				title: "Joined Bitwyre",
				descriptions: [
					"I'd been drawn to crypto, web3 and trading since late 2023, picking the brain of a friend who had worked in the space for years. In February 2024 I left Skyshi Digital Indonesia to look for something new.",
					"The very next day, that same friend introduced me to Bitwyre, a crypto, web3 and trading company. I applied on the spot, interviewed with their CTO and CEO, and joined the Engineering team as a Software Engineer (Frontend). A personal interest had quietly become my profession.",
					"Bitwyre was a different world, with teammates from Canada, the US, India, Europe and beyond. English is my third language, but it never got in the way of building together across time zones.",
					"That August we flew to Coinfest Asia in Bali, a week that mixed the conference with a small internal hackathon at a villa. Equal parts new connections, fresh ideas, and proof I could keep up with crypto's pace.",
					"By late 2024 I also graduated, closing a three-year university chapter. Not the biggest or most prestigious school, but it gave me a foundation to build on and the confidence to keep going.",
				],
				photoAlts: [
					"Rizki's festival pass for Coinfest Asia",
					"Rizki with the Indodax mascot",
					"Rizki with the Bitwyre team",
					"Rizki's portrait with the Mandala Chain team",
					"Interviewing a local shop for Rizki's final assignment",
					"Rizki's graduation portrait with his mother and sister",
				],
			},
			"2023": {
				title: "Work-Life Balance",
				descriptions: [
					"I kept building as a Frontend Developer at Skyshi. The standout was moladinfinance.com for Moladin, shipped in about five weeks, followed by a run of NDA-bound client projects.",
					"On the side, I rebuilt my custom PC part by part. After a year on just a laptop, getting back to a proper setup with a bigger screen and better ergonomics felt like a real luxury.",
					"I juggled the full-time job, university, and a little Facebook freelancing with a friend, wrapping those projects in three months without dropping anything. Looking back, I'm surprised how much fit into one year.",
				],
				photoAlts: [
					"Rizki's second PC build parts",
					"Rizki's second PC build, next to a laptop",
					"Dual-booting Windows with EndeavourOS",
					"Rizki's second PC build, final look",
				],
			},
			"2022": {
				title: "Full Time + Uni",
				descriptions: [
					"In late December 2021 I was taken on as an intern at Skyshi Digital Indonesia, a studio in Gamping, Yogyakarta. We worked fully remote, a pandemic habit the company decided to keep.",
					"The first weeks were daunting with no professional experience behind me, but I found my rhythm fast, contributing to gethired.id, an internal platform for practicing job-ready skills.",
					"Three months in, they hired me full-time as a Frontend Developer and moved me onto external, often NDA-bound projects. Going from intern to full-timer was my first real career milestone, earned while keeping up with university.",
				],
				photoAlts: [
					"Rizki's laptop cafe setup with an iced coffee",
					"Rizki's portrait working from a cafe",
				],
			},
			"2021": {
				title: "Academic",
				descriptions: [
					"This was the year I got serious about software. Still under pandemic restrictions, I drilled the fundamentals of HTML, CSS and JavaScript through self-study and whatever I could find online.",
					"By May the gap was clear: knowledge without formal experience made it hard to get hired. So I leaned into structure, and by late 2021 I was accepted into an Associate Degree in Informatics Management.",
					"Between classes I kept shipping small projects to stay sharp. A year of discipline that laid the groundwork for everything after.",
				],
				photoAlts: ["Rizki's selfie, jacket still wet after the rain", "Rizki's first laptop"],
			},
			"2020": {
				title: "Pandemic",
				descriptions: [
					"A year into the pandemic, home had become the classroom. I was in my final year of high school, restless and itching to do something with my time.",
					"So I started taking small freelance gigs around my village for a bit of money. By the middle of 2020 I'd saved enough to begin buying PC parts, one piece at a time, whenever I could afford the next.",
				],
				photoAlts: [
					"A keyboard and a mouse",
					"Rizki's first PC build with an anime wallpaper",
					"Rizki's first PC build setup",
				],
			},
			"2019": {
				title: "Where It Started",
				descriptions: [
					"Looking back, these were the gold years. Even as the pandemic crept in, it was one of the most formative stretches I've had. I was studying Rekayasa Perangkat Lunak at SMKN 8 Pandeglang, and that's where building software first clicked.",
					"The catch was that the curriculum ran years behind what the industry actually used, so I taught myself the rest from YouTube and free resources online, building the self-study habit that has carried me ever since.",
				],
				photoAlts: ["The atmosphere of the classroom", "The computer lab back in the day"],
			},
		},
	},

	now: {
		seoTitle: "Now",
		seoDescription:
			"Most sites have an /about page. This is my /now page — a snapshot of what I'm focused on at this point in my life. Inspired by nownownow.com.",
		heading: "What I'm Up To",
		introLead:
			"Most sites have an /about page. This is my /now page — a snapshot of what I'm focused on at this point in my life. Inspired by",
		items: {
			"2026-07-04": {
				title: "Building an open source ATS resume builder",
				description:
					"Apart from my work at Kolosal AI, I'm building Lanjut — an open source, ATS-friendly resume builder. The code is up on GitHub.",
				link: "https://github.com/rimzzlabs/lanjut",
			},
			"2026-06-30": {
				title: "Building an interactive canvas with SpacetimeDB",
				description:
					"Architecting the frontend for complex apps that bring together a real-time interactive canvas and AI.",
			},
			"2025-12-02": {
				title: "Building something related with AI",
				description:
					"Currently building something related with AI at Kolosal AI, the people here are amazing. I expect I'll write some notes about it down the line.",
			},
		},
	},

	notesPage: {
		seoTitle: "Notes",
		title: "Notes",
		description:
			"Notes on what I've learned and how I learned it as a frontend software engineer — problem-solving, technical deep-dives, and the occasional recipe.",
		publishedOn: "Published on",
		writtenBy: "Written by",
		onThisPage: "On this page",
		notTranslated: "This note isn't available in Indonesian yet — showing the English version.",
	},

	notFound: {
		seoTitle: "404 — Page not found",
		description: "The page you're looking for doesn't exist, or it may have moved.",
		heading: "Page not found",
		backHome: "Back home",
		orHeadTo: "Or head to",
	},

	noteNotFound: {
		seoTitle: "404 — Note not found",
		description: "Rizki hasn't written this note yet, or it's been archived or removed.",
		heading: "Note not found",
		didYouMean: "Did you mean",
	},
};

export type Dictionary = typeof en;
