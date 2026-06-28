import { Accordion } from "../ui/accordion";
import { JourneyTimelineItem } from "./journey-timeline-item";

const timelines = [
	{
		year: 2026,
		title: "Happening Now",
		descriptions: [
			"Right now I'm still at Kolosal AI, going deeper into building AI products and growing as an engineer in a field that seems to reinvent itself every few months. After years in web and crypto, this is the most fast-moving space I've worked in.",
			"This is the happening-now chapter, so there's no tidy summary yet. I'm focused on doing good work, learning quickly, and seeing where this AI journey takes me.",
		],
	},
	{
		year: 2025,
		title: "Joined Kolosal AI",
		descriptions: [
			"Near the end of the year, around November, I joined Kolosal AI, stepping out of the crypto and web3 world I'd been part of and into something new: artificial intelligence. It was another big shift, trading a domain I'd grown comfortable in for a field moving at a completely different pace.",
			"The first weeks were about settling into a genuinely amazing team and getting my bearings in a space I'd previously only watched from the outside. The people here made the transition easy, and it quickly felt like the kind of environment I'd been hoping to find, something I expect I'll write more about down the line.",
		],
	},
	{
		year: 2024,
		title: "Joined Bitwyre",
		descriptions: [
			"I started getting into crypto, web3 and trading in late 2023. I got in touch with a friend who'd been working in this field for years to find out how things worked and learn more about these emerging areas. Then in February 2024, I decided to leave Skyshi Digital Indonesia to look for new opportunities.",
			"The next day, a friend introduced me to Bitwyre, a company specialising in cryptocurrency, web3 and crypto trading. I applied immediately, went through interviews with their CTO and CEO, and was accepted as a Software Engineer (Frontend) on their Engineering team. It was fascinating how an area of personal interest became the field I now work in professionally.",
			"My first few months at Bitwyre involved adapting to a vastly different company culture. As a diverse organization with employees from around the world, fromCanada, America, India, Europe, and more, it was a unique environment. Despite English being my third language, it didn't hinder collaboration across continents.",
			"In August 2024, the company attended Coinfest Asia , a crypto/web3 event in Bali. Alongside the Engineering team, I joined the trip, combining work with a week-long stay that included a small internal hackathon at a villa. The event provided valuable connections, insights, and experiences, further solidifying my adaptability to the fast-paced crypto world.",
			"By late 2024, I graduated from university, marking the end of a three-year journey. While the institution I attended may not compare in size or prestige to larger universities like Gadjah Mada or the University of Indonesia, the experience I gained was invaluable. Time flew by, and though the academic environment wasn’t overwhelming, it gave me the foundation to grow. This milestone reinforced my readiness to continue advancing in both my career and personal pursuits.",
		],
	},
	{
		year: 2023,
		title: "Work-Life Balance",
		descriptions: [
			"In 2023, I continued working as a Frontend Developer at Skyshi Digital Indonesia. One of my notable projects was building moladinfinance.com for Moladin, which I completed in just around 5 weeks. Afterward, I was assigned to other confidential projects bound by NDAs, further expanding my experience in handling diverse challenges.",

			"I then started rebuilding my custom PC, upgrading it piece by piece from my previous build while keeping costs low. After a year without a PC, I was excited to return to a more comfortable programming setup, with a larger screen and better ergonomics compared to my laptop.",
			"Throughout this period, I maintained a balance between my full-time job and university studies. I also took on freelance work with a friend through Facebook, completing projects within three months without conflicts or interruptions to my primary responsibilities. The freelance experience added another layer to my skill set and reinforced my ability to manage multiple commitments effectively.",
			"Looking back, I'm surprised by how much I achieved during this time balancing work, studies, and personal projects. Despite the challenges, I remained focused on improving my expertise in software engineering, knowing that continuous learning is key to growth in this field.",
		],
	},
	{
		year: 2022,
		title: "Full Time + Uni",
		descriptions: [
			"In late December 2021, I was accepted as an intern at Skyshi Digital Indonesia, a software company based in Gamping, Yogyakarta. The internship began in early 2022, with the team working remotely due to the pandemic, a setup the company decided to maintain for operational efficiency.",
			"My first few weeks were challenging, as I had no prior professional experience, but I quickly adapted to the company's culture and workflow. I was assigned to contribute to gethired.id, an internal project designed to help users practice and enhance their skills to secure jobs, similar to an online course platform.",
			"After three months of interning, I was hired as a Full-Time Frontend Developer. My role shifted to working on external projects, some of which were bound by NDAs. Over the course of my first year in this position, I contributed to multiple projects, further honing my technical skills and gaining valuable industry experience. The transition from intern to full-time developer marked a significant step in my professional growth.",
			"By late 2022 and into 2023, I maintained a balance between my university studies and my full-time role. This period was marked by steady progress, both academically and professionally, as I continued to refine my expertise as a Frontend Developer while managing the demands of work and education.",
		],
	},
	{
		year: 2021,
		title: "Academic",
		descriptions: [
			"Early 2021 marked the beginning of my journey into serious software development. With the world still under pandemic restrictions, I focused on learning the fundamentals of web development, HTML, CSS, and JavaScript hrough self-study and online resources. By May, I realized that while I was gaining technical knowledge, my lack of formal experience made it difficult to secure a job.",
			"By late 2021, my efforts paid off when I was accepted into an Associate Degree program for Informatics Management. This marked a turning point in my journey, as it provided structure and opportunities to complement my self-taught skills.",
			"Throughout the year, I continued practicing coding and working on small projects to refine my abilities, ensuring I stayed sharp while balancing the transition to formal education. It was a year of growth, discipline, and laying the foundation for my career as a Frontend Software Engineer.",
		],
	},
	{
		year: 2020,
		title: "Pandemic",
		descriptions: [
			"It's been a year since the start of the pandemic. I've been studying from home for the past year.",

			"I'm in my last year of high school, and I've decided to start earning some money by taking on freelance jobs in my local village.",

			"By the middle of 2020, I had saved up enough money to buy computer parts. Some PC parts cost too much for me, so I buy them one at a time.",
		],
	},
	{
		year: 2019,
		title: "Where It Started",
		descriptions: [
			"Looking back, these were gold times. Even with the start of the pandemic creeping in, it was one of the most formative stretches I've had. I was studying Rekayasa Perangkat Lunak at SMKN 8 Pandeglang, and that's where my real interest in building software took root.",
			"The catch was that the curriculum in most Indonesian high schools was years behind what the industry actually used, so I couldn't rely on it alone. I ended up teaching myself most of what mattered from YouTube and free resources online, building the self-study habit that has carried me ever since.",
		],
	},
];

export function JourneyTimeline() {
	return (
		<Accordion
			multiple
			className="relative before:absolute before:left-0 before:top-7.5 before:bottom-7.5 before:w-0.5 before:bg-neutral-300"
		>
			{timelines.map((t) => (
				<JourneyTimelineItem {...t} key={t.year} />
			))}
		</Accordion>
	);
}
