import classroom from "@/assets/classroom.webp";
import coinfest0 from "@/assets/coinfest-0.webp";
import coinfest1 from "@/assets/coinfest-1.webp";
import coinfest2 from "@/assets/coinfest-2.webp";
import festPass from "@/assets/fest-pass.webp";
import finalAssignment0 from "@/assets/final-assignment-0.webp";
import graduation0 from "@/assets/graduation-0.webp";
import laptop from "@/assets/laptop.webp";
import pc0 from "@/assets/pc-0.webp";
import pc1 from "@/assets/pc-1.webp";
import pc2 from "@/assets/pc-2.webp";
import pcLabs from "@/assets/pc-labs.webp";
import rebuild0 from "@/assets/rebuild-0.webp";
import rebuild1 from "@/assets/rebuild-1.webp";
import rebuild2 from "@/assets/rebuild-2.webp";
import rebuild3 from "@/assets/rebuild-3.webp";
import selfie from "@/assets/selfie.webp";
import wfc0 from "@/assets/wfc-0.webp";
import wfc1 from "@/assets/wfc-1.webp";
import { Accordion } from "../../ui/accordion";
import type { Photo } from "./archive-photos";
import { ArchiveTimelineItem } from "./archive-timeline-item";

const timelines: Array<{
	year: number;
	title: string;
	descriptions: Array<string>;
	photos: Array<Photo>;
}> = [
	{
		year: 2026,
		title: "Happening Now",
		descriptions: [
			"I'm still at Kolosal AI, going deeper into building AI products. After years in web and then crypto, this is the fastest-moving space I've worked in; it seems to reinvent itself every few months.",
			"There's no tidy summary for a chapter still being written. For now I'm heads-down: doing good work, learning fast, and seeing where it leads.",
		],
		photos: [],
	},
	{
		year: 2025,
		title: "Joined Kolosal AI",
		descriptions: [
			"Around November I joined Kolosal AI and stepped out of the crypto and web3 world into something new: artificial intelligence. Another leap, trading a domain I'd grown comfortable in for one moving at a completely different pace.",
			"The first weeks were about finding my feet alongside a genuinely great team, in a space I'd only ever watched from the outside. It quickly felt like the kind of place I'd been hoping to land. More on that another time.",
		],
		photos: [],
	},
	{
		year: 2024,
		title: "Joined Bitwyre",
		descriptions: [
			"I'd been drawn to crypto, web3 and trading since late 2023, picking the brain of a friend who had worked in the space for years. In February 2024 I left Skyshi Digital Indonesia to look for something new.",
			"The very next day, that same friend introduced me to Bitwyre, a crypto, web3 and trading company. I applied on the spot, interviewed with their CTO and CEO, and joined the Engineering team as a Software Engineer (Frontend). A personal interest had quietly become my profession.",
			"Bitwyre was a different world, with teammates from Canada, the US, India, Europe and beyond. English is my third language, but it never got in the way of building together across time zones.",
			"That August we flew to Coinfest Asia in Bali, a week that mixed the conference with a small internal hackathon at a villa. Equal parts new connections, fresh ideas, and proof I could keep up with crypto's pace.",
			"By late 2024 I also graduated, closing a three-year university chapter. Not the biggest or most prestigious school, but it gave me a foundation to build on and the confidence to keep going.",
		],
		photos: [
			{ image: festPass, alt: "Rizki's festival pass for Coinfest Asia" },
			{ image: coinfest1, alt: "Rizki with the Indodax mascot" },
			{ image: coinfest0, alt: "Rizki with the Bitwyre team" },
			{ image: coinfest2, alt: "Rizki's portrait with the Mandala Chain team" },
			{ image: finalAssignment0, alt: "Interviewing a local shop for Rizki's final assignment" },
			{ image: graduation0, alt: "Rizki's graduation portrait with his mother and sister" },
		],
	},
	{
		year: 2023,
		title: "Work-Life Balance",
		descriptions: [
			"I kept building as a Frontend Developer at Skyshi. The standout was moladinfinance.com for Moladin, shipped in about five weeks, followed by a run of NDA-bound client projects.",
			"On the side, I rebuilt my custom PC part by part. After a year on just a laptop, getting back to a proper setup with a bigger screen and better ergonomics felt like a real luxury.",
			"I juggled the full-time job, university, and a little Facebook freelancing with a friend, wrapping those projects in three months without dropping anything. Looking back, I'm surprised how much fit into one year.",
		],
		photos: [
			{ image: rebuild1, alt: "Rizki's second PC build parts" },
			{ image: rebuild0, alt: "Rizki's second PC build, next to a laptop" },
			{ image: rebuild3, alt: "Dual-booting Windows with EndeavourOS" },
			{ image: rebuild2, alt: "Rizki's second PC build, final look" },
		],
	},
	{
		year: 2022,
		title: "Full Time + Uni",
		descriptions: [
			"In late December 2021 I was taken on as an intern at Skyshi Digital Indonesia, a studio in Gamping, Yogyakarta. We worked fully remote, a pandemic habit the company decided to keep.",
			"The first weeks were daunting with no professional experience behind me, but I found my rhythm fast, contributing to gethired.id, an internal platform for practicing job-ready skills.",
			"Three months in, they hired me full-time as a Frontend Developer and moved me onto external, often NDA-bound projects. Going from intern to full-timer was my first real career milestone, earned while keeping up with university.",
		],
		photos: [
			{ image: wfc0, alt: "Rizki's laptop cafe setup with an iced coffee" },
			{ image: wfc1, alt: "Rizki's portrait working from a cafe" },
		],
	},
	{
		year: 2021,
		title: "Academic",
		descriptions: [
			"This was the year I got serious about software. Still under pandemic restrictions, I drilled the fundamentals of HTML, CSS and JavaScript through self-study and whatever I could find online.",
			"By May the gap was clear: knowledge without formal experience made it hard to get hired. So I leaned into structure, and by late 2021 I was accepted into an Associate Degree in Informatics Management.",
			"Between classes I kept shipping small projects to stay sharp. A year of discipline that laid the groundwork for everything after.",
		],
		photos: [
			{ image: selfie, alt: "Rizki's selfie, jacket still wet after the rain" },
			{ image: laptop, alt: "Rizki's first laptop" },
		],
	},
	{
		year: 2020,
		title: "Pandemic",
		descriptions: [
			"A year into the pandemic, home had become the classroom. I was in my final year of high school, restless and itching to do something with my time.",
			"So I started taking small freelance gigs around my village for a bit of money. By the middle of 2020 I'd saved enough to begin buying PC parts, one piece at a time, whenever I could afford the next.",
		],
		photos: [
			{ image: pc0, alt: "A keyboard and a mouse" },
			{ image: pc1, alt: "Rizki's first PC build with an anime wallpaper" },
			{ image: pc2, alt: "Rizki's first PC build setup" },
		],
	},
	{
		year: 2019,
		title: "Where It Started",
		descriptions: [
			"Looking back, these were the gold years. Even as the pandemic crept in, it was one of the most formative stretches I've had. I was studying Rekayasa Perangkat Lunak at SMKN 8 Pandeglang, and that's where building software first clicked.",
			"The catch was that the curriculum ran years behind what the industry actually used, so I taught myself the rest from YouTube and free resources online, building the self-study habit that has carried me ever since.",
		],
		photos: [
			{ image: classroom, alt: "The atmosphere of the classroom" },
			{ image: pcLabs, alt: "The computer lab back in the day" },
		],
	},
];

export function ArchiveTimeline() {
	return (
		<Accordion
			multiple
			className="relative before:absolute before:left-0 before:top-7.5 before:bottom-7.5 before:w-0.5 before:bg-taupe-300 dark:before:bg-taupe-800"
		>
			{timelines.map((t) => (
				<ArchiveTimelineItem {...t} key={t.year} />
			))}
		</Accordion>
	);
}
