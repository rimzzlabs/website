import {
	AMBULANCE_ZIG_ZAG_URL,
	formatRupiah,
	ntuNoteUrl,
	RIZKY_URL,
} from "./links";
import * as photo from "./photos";
import type { ArchiveYear } from "./types";

export const ARCHIVE_EN: ReadonlyArray<ArchiveYear> = [
	{
		year: 2026,
		title: "Happening Now",
		paragraphs: [
			"I'm still at Kolosal AI, and I keep going deeper into building AI products. After years in web and then crypto, this is by far the fastest-moving space I've worked in. It seems to reinvent itself every few months.",
			"This chapter is still being written, so there's no neat summary yet. For now, I'm heads-down: doing good work, learning fast, and seeing where it takes me.",
		],
		sections: [
			{
				heading: "An Idea Worth Building",
				paragraphs: [
					`In early August, my friend <a href="${RIZKY_URL}" target="_blank" rel="noopener noreferrer">Rizky<span class="sr-only">, opens in a new tab</span></a> and I signed up for a hackathon hosted by Nanyang Technological University together with SNZ Holding. The theme was blockchain and web3.`,
					"The idea was Rizky's. Indonesia, and Bali especially, sits on a lot of people's travel bucket lists, and he wanted to build payment infrastructure around that. The plan was to win something first and give the project a bit of runway. Then he asked for my help, and I didn't need long to think about it. It sounded awesome.",
					"We started building Mayarin in August, with the submission deadline in the middle of the month. After a week of judging, the news came in: we were finalists, and the finals would take place at NTU itself.",
				],
			},
			{
				heading: "Crypto In, Rupiah Out",
				paragraphs: [
					"It was just the two of us. Rizky took care of R&D and infrastructure, and I built the software.",
					"Mayarin is an SDK that sits between crypto and local money. Picture a tourist in Bali who wants to pay with Ethereum. Mayarin converts it into a stablecoin on the fly, so the price doesn't swing while the payment goes through. From there, a payment gateway turns the stablecoin into rupiah for the merchant.",
					"Getting all the way there isn't simple. In Indonesia, crypto is still a bit taboo, and outside of Gen Z and people who work in tech, most people don't know much about it. Converting crypto straight into rupiah is also tightly regulated, and we have to follow the law. So the version we brought to the judges stopped one step short: the customer pays in crypto like Ethereum, and the merchant receives a stablecoin.",
					"The hackathon was about blockchain, so not every judge liked the idea. The people from SNZ Holding were clearly interested, though, and they asked a lot of questions. Each team only had seven minutes, which is never enough when the people in front of you actually want to hear more.",
				],
			},
			{
				heading: "First Time Abroad",
				paragraphs: [
					"Getting to Singapore was an adventure of its own. We missed our first flight and spent the night in capsule pods at Soekarno-Hatta. We got lost between Changi and the NTU campus, and a 7-Eleven top-up rescued our transit card. Then came two days of building in Room B2 of the ARC before we pitched on Sunday.",
					"We came home with the Builder Recognition Award, worth USD 500. The bigger win for me was the trip itself. It was the first time I'd ever flown out of Indonesia, and I got to spend three days at one of the top universities in the world.",
					`On the last morning, we raced to see the Merlion before our flight, and I was home by August 24. I wrote the whole trip down, missed flight and all, in <a href="${ntuNoteUrl("en")}">My First Trip Abroad Was a Hackathon at NTU</a>.`,
				],
				photos: [
					{
						src: photo.ntuCampus,
						alt: "An NTU campus road under full sun, buildings in every direction",
					},
					{
						src: photo.ntuGrindingInB2,
						alt: "Me and Rizky working at a round table in Room B2 of the ARC",
					},
					{
						src: photo.ntuProfWen,
						alt: "From left to right: me, Prof. Wen Yonggang of NTU, and Rizky",
					},
					{
						src: photo.ntuMerlion,
						alt: "The Merlion mid-spout over Marina Bay on our last morning",
					},
				],
			},
		],
		photos: [],
	},
	{
		year: 2025,
		title: "Joined Kolosal AI",
		paragraphs: [
			"Around November, I joined Kolosal AI and left the crypto and web3 world for something new: artificial intelligence. It was another leap, from a space I'd grown comfortable in to one that moves at a completely different pace.",
			"The first few weeks were about finding my feet in a field I'd only ever watched from the outside, next to a genuinely great team. It didn't take long to feel like the place I'd been hoping to land.",
		],
		sections: [
			{
				heading: "A Pan on Fire",
				paragraphs: [
					"A few weeks into the new job, I managed to set a pan on fire. It was around 3 p.m. I'd just fried some tempeh and left it to cool while I sat down, with the stove still on.",
					"My little sister was the one who noticed. \"What's that light?\" No idea, I told her, I'd only fried some tempeh. Then it clicked. I got up, turned off the stove, and sat back down, but it was already too late. The pan had pushed the leftover oil past its burning point, and now it was on fire.",
					"Panic took over. All I could think about was stopping this from turning into a real house fire. It was drizzling outside, so my plan was simple: carry the pan out and let the rain deal with it.",
					"It wasn't a good plan. On the way out, a gust of wind pushed the flames right at my face. I flinched, and that one reflex tilted the pan. Hot oil poured onto my left foot and splashed my right. I tried to brush it off with my left hand, so that got burned too.",
					"While I waited for the ambulance, I asked ChatGPT for first aid. The advice was to let cool water run gently over the burns, a slow and steady stream rather than a spray.",
				],
			},
			{
				heading: "Ambulance Zig Zag",
				paragraphs: [
					`The ambulance showed up 30 minutes late, and the ride cost me ${formatRupiah(900_000, "en")}. The driver blamed the traffic, but honestly, that one was on me. My phone hadn't shared my location, so the booking went to an ambulance nowhere near me.`,
					"It took me to the ER of the nearest hospital. Fun fact: that was the first time I'd ever set foot in one.",
					`Then came the bureaucracy. I didn't have <em lang="id">BPJS</em>, Indonesia's national health insurance, and Iwan Fals's <a href="${AMBULANCE_ZIG_ZAG_URL}" target="_blank" rel="noopener noreferrer">“Ambulance Zig Zag”<span class="sr-only">, opens in a new tab</span></a> suddenly felt a little too real. They put me on a bed and left me there. Nobody checked on me until my friend had sorted out my ID and the payment.`,
					"Only then did a nurse come over. She put cream on the burns, told me to calm down and slow my breathing, and hooked me up to a saline (NaCl) drip, another first for me. They sent me home with pills too, which I quietly stopped taking after a month. I'm just not a pills person.",
					"They offered to keep me overnight. I said no. One night there would have cost a fortune.",
					"I called my mom first, and she gave me advice the way only moms can. Then I called my girlfriend, who was still at work, to tell her I was in the hospital. She said she was on her way. After about five hours there, I was back home around 10 p.m.",
				],
			},
			{
				heading: "Two Months of Help",
				paragraphs: [
					"For the next two months, my girlfriend looked after me. Even the simplest things, like getting to the bathroom, were a struggle. Of course, she had her own things to handle, but after every shift she came over to cook and clean for me.",
					"I never asked her to, and we never really talked about it. She just showed up. Maybe that's simply who she is: she's been working since she finished high school. Plenty of people would have found an excuse. She didn't, and I'm more grateful than I can put into words.",
					"Work was the other worry. I'd only just joined Kolosal AI, and I was sure this would cost me the job. I sent them proof of what happened, and the CEO was nothing but kind. They told me to focus on recovering and said they were hoping I'd get well soon. It meant a lot to be at a company like that.",
					"A month later, I could barely walk. By early February 2026, the bandages were off and I was fully back on my feet.",
				],
			},
			{
				heading: "What I Learned About Burns",
				paragraphs: [
					"If there's one thing I took away from all this, it's how burns are graded. A first-degree burn only hurts the top layer of skin. It stings and turns red, like when you touch a hot pan for a split second or get splashed with hot water.",
					"A second-degree burn goes deeper. It's redder and a lot more painful, and it's the one I got. According to the doctor, mine was closer to a two and a half. It had almost reached my nerves, and if the oil had stayed on my foot any longer, it would have been third degree.",
					"Third degree is the one you really don't want. It burns through the skin completely, nerves included, and the skin can't grow back on its own, so you need a skin graft from another part of your body. I'm very thankful I got off lighter than that.",
				],
				figure: "burn-classification",
			},
		],
		photos: [],
	},
	{
		year: 2024,
		title: "Joined Bitwyre",
		paragraphs: [
			"Since late 2023, I'd been hooked on crypto, web3, and trading, mostly by picking the brain of a friend who'd worked in the space for years. In February 2024, I left Skyshi Digital Indonesia to find something new.",
			"The very next day, that same friend introduced me to Bitwyre, a crypto, web3, and trading company. I applied on the spot, interviewed with the CTO and the CEO, and joined the engineering team as a frontend software engineer. Just like that, an interest had become my job.",
			"Bitwyre was a different world. My teammates were spread across Canada, the US, India, Europe, and beyond. English is my third language, but it never stopped us from building together across time zones.",
			"That August, we flew to Bali for Coinfest Asia. The week mixed the conference with a small internal hackathon at a villa, and I came home with new connections, fresh ideas, and proof that I could keep up with crypto's pace.",
			"In late 2024, I also graduated, closing a three-year chapter at university. It wasn't the biggest or most prestigious school, but it gave me a foundation to build on and the confidence to keep going.",
		],
		photos: [
			{ src: photo.festPass, alt: "Rizki's festival pass for Coinfest Asia" },
			{ src: photo.coinfest1, alt: "Rizki with the Indodax mascot" },
			{ src: photo.coinfest0, alt: "Rizki with the Bitwyre team" },
			{
				src: photo.coinfest2,
				alt: "Rizki's portrait with the Mandala Chain team",
			},
			{
				src: photo.finalAssignment0,
				alt: "Interviewing a local shop for Rizki's final assignment",
			},
			{
				src: photo.graduation0,
				alt: "Rizki's graduation portrait with his mother and girlfriend",
			},
		],
	},
	{
		year: 2023,
		title: "Work-Life Balance",
		paragraphs: [
			"I kept building as a frontend developer at Skyshi. The highlight was moladinfinance.com for Moladin, which we shipped in about five weeks. After that came a run of client projects I'm still not allowed to talk about.",
			"On the side, I rebuilt my PC, one part at a time. After a year on nothing but a laptop, having a proper setup again, with a bigger screen and better ergonomics, felt like pure luxury.",
			"I was also juggling the full-time job, university, and some freelance work with a friend that came through Facebook. We wrapped those projects up in three months without dropping anything. Looking back, I'm still surprised how much fit into one year.",
		],
		photos: [
			{ src: photo.rebuild1, alt: "Rizki's second PC build parts" },
			{ src: photo.rebuild0, alt: "Rizki's second PC build, next to a laptop" },
			{ src: photo.rebuild3, alt: "Dual-booting Windows with EndeavourOS" },
			{ src: photo.rebuild2, alt: "Rizki's second PC build, final look" },
		],
	},
	{
		year: 2022,
		title: "Intern to Full-Time",
		paragraphs: [
			"In late December 2021, Skyshi Digital Indonesia, a studio in Gamping, Yogyakarta, took me on as an intern. We worked fully remote, a pandemic habit the company decided to keep.",
			"With zero professional experience behind me, the first weeks were daunting. I found my rhythm fast, though, working on gethired.id, an internal platform for practicing job-ready skills.",
			"Three months in, they hired me full-time as a frontend developer and moved me onto client projects, most of them under NDA. Going from intern to full-timer while keeping up with university was my first real career milestone.",
		],
		photos: [
			{ src: photo.wfc0, alt: "Rizki's laptop cafe setup with an iced coffee" },
			{ src: photo.wfc1, alt: "Rizki's portrait working from a cafe" },
		],
	},
	{
		year: 2021,
		title: "Back to School",
		paragraphs: [
			"This was the year I got serious about software. With the pandemic still keeping everyone at home, I drilled the basics of HTML, CSS, and JavaScript through self-study and whatever I could find online.",
			"By May, I'd hit a wall: knowing things without any formal experience made it hard to get hired. So I went looking for structure, and by late 2021 I'd been accepted into an associate degree in Informatics Management.",
			"Between classes, I kept shipping small projects to stay sharp. That year of discipline laid the groundwork for everything that came after.",
		],
		photos: [
			{
				src: photo.selfie,
				alt: "Rizki's selfie, jacket still wet after the rain",
			},
			{ src: photo.laptop, alt: "Rizki's first laptop" },
		],
	},
	{
		year: 2020,
		title: "One Part at a Time",
		paragraphs: [
			"The pandemic turned home into a classroom. I was in my final year of high school, restless and itching to do something with my time.",
			"So I started picking up small freelance gigs around my village for some pocket money. By the middle of 2020, I'd saved enough to start buying PC parts, one piece at a time, whenever I could afford the next one.",
		],
		photos: [
			{ src: photo.pc0, alt: "A keyboard and a mouse" },
			{ src: photo.pc1, alt: "Rizki's first PC build with an anime wallpaper" },
			{ src: photo.pc2, alt: "Rizki's first PC build setup" },
		],
	},
	{
		year: 2019,
		title: "Where It Started",
		paragraphs: [
			`Looking back, these were the golden years. I was studying <em lang="id">Rekayasa Perangkat Lunak</em> (software engineering) at SMKN 8 Pandeglang, a public vocational high school, and that's where building software first clicked. Even with the pandemic creeping in, it was one of the most formative stretches of my life.`,
			"The catch? The curriculum was years behind what the industry actually used. So I taught myself the rest from YouTube and free resources online, and that's how I built the self-study habit that's carried me ever since.",
		],
		photos: [
			{ src: photo.classroom, alt: "The atmosphere of the classroom" },
			{ src: photo.pcLabs, alt: "The computer lab back in the day" },
		],
	},
];
