import { Timeline, type TimelineEntry } from '@/components/ui/timeline'
import { TimelineSubHeading } from '@/components/ui/timeline-sub-heading'
import { TimelineText } from '@/components/ui/timeline-text'
import { TimelineImage } from '@/components/ui/timeline-image'
import gethired from '@/assets/gethired.webp'
import globaltix from '@/assets/globaltix.webp'
import mofi from '@/assets/mofi.webp'
import bitwyreSpotTrading from '@/assets/spot-trading.webp'
import bitwyreWeb from '@/assets/bitwyre-web.webp'

const SHOWCASE_PROJECTS = [
	{
		title: 'Bitwyre',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Bitwyre Website</TimelineSubHeading>
				<TimelineText>
					I maintain and enhance the Bitwyre website, ensuring it remains up-to-date and
					user-friendly to deliver a smooth and engaging experience for users.
				</TimelineText>
				<TimelineImage
					src={bitwyreWeb.src}
					width={bitwyreWeb.width}
					height={bitwyreWeb.height}
					alt='Bitwyre Spot Trading'
					className='w-full my-5 h-44 lg:h-60 aspect-video rounded-xl object-cover'
				/>
				<TimelineText>
					I implemented internalization for the website, translating content into multiple languages
					to meet the diverse needs of users around the world. I intergrated the site with Zendesk,
					a customer support platform, to provide users with a seamless and efficient support
					experience.
				</TimelineText>
				<TimelineText>
					I also implemented blog site with Wordrpress-as-a-CMS to share news and updates related to
					Bitwyre.
				</TimelineText>
			</div>
		),
	},
	{
		title: 'Bitwyre',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Crypto Spot Trading Platform</TimelineSubHeading>
				<TimelineText>
					I spearheaded the development of robust, responsive, and high-performance user interfaces
					using Next.js. By implementing real-time interfaces with WebSocket technology , I ensured
					seamless delivery of persistent data across multiple UI components, enhancing the
					platform&apos;s reliability and user experience. Collaborating closely with UI designers,
					engineering management, and the core trading engine team, I addressed complex challenges
					unique to the fast-paced cryptocurrency trading environment, ensuring the platform
					remained competitive and functional.
				</TimelineText>

				<TimelineImage
					src={bitwyreSpotTrading.src}
					width={bitwyreSpotTrading.width}
					height={bitwyreSpotTrading.height}
					alt='Bitwyre Spot Trading'
					className='w-full my-5 h-44 lg:h-60 aspect-video rounded-xl object-cover'
				/>
				<TimelineText>
					I also drove performance optimization initiatives, significantly improving the
					platform&apos;s speed, reliability, and overall efficiency. Through cross-team
					discussions, I contributed fresh ideas to enhance intuitive features and align the product
					with business goals. This experience reinforced my ability to innovate in a dynamic field
					while delivering impactful solutions that meet both technical and user needs.
				</TimelineText>
			</div>
		),
	},
	{
		title: 'Skyshi Digital Indonesia',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Collateral Financing</TimelineSubHeading>
				<TimelineText>
					During my time in Skyshi, I had the opportunity to create the site from scratch for
					Moladin. I created the design system and implemented the frontend platform for
					Moladin&apos;s Collateral Financing.
				</TimelineText>
				<TimelineImage
					src={mofi.src}
					alt='mofi website'
					width={mofi.width}
					height={mofi.height}
					className='w-full my-5 h-44 lg:h-72 aspect-video rounded-xl object-cover'
				/>
				<TimelineText>
					I single-handedly implemented the design system and frontend platform for Moladin&apos;s
					Collateral Financing, ensuring a seamless and visually appealing experience for users.
					Leveraging Next.js and Headless UI for a responsive and interactive interface.
				</TimelineText>

				<TimelineText>
					I also integrate the submission form with Google Sheets, this allows the admin to track
					the submissions easily and efficiently without worrying about high cost of storage.
				</TimelineText>
			</div>
		),
	},
	{
		title: 'Skyshi Digital Indonesia',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Internal Ticketing System</TimelineSubHeading>
				<TimelineText>
					I contributed to the development of GlobalTIX&apos;s internal ticketing system, a critical
					tool used by their operations team to manage events and customer experiences. While
					specific technical details are confidential due to its internal nature, my role involved
					enhancing the platform&apos;s functionality and usability.
				</TimelineText>

				<TimelineImage
					src={globaltix.src}
					width={globaltix.width}
					height={globaltix.height}
					alt='GlobalTIX website'
					className='w-full my-5 h-44 lg:h-72 aspect-video rounded-xl object-cover'
				/>

				<TimelineText>
					I worked closely with cross-functional teams to ensure the application met the needs of
					both operators and resellers, streamlining processes for event management and ticket
					distribution. My contributions included optimizing performance, improving user interfaces,
					and ensuring seamless integration with existing systems. This experience reinforced my
					ability to adapt to diverse environments and deliver impactful solutions in a fast-paced
					setting.
				</TimelineText>
			</div>
		),
	},
	{
		title: 'Skyshi Digital Indonesia',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Career Preparation Platform</TimelineSubHeading>
				<TimelineText>
					As Frontend Developer for gethired.id , I played a key role in implementing the
					platform&apos;s design system to create responsive, user-friendly interfaces that improved
					overall user experience. By adhering to established guidelines, I ensured consistency in
					branding and functionality across the platform while optimizing website performance
					through bug fixes and loading speed improvements. My focus on a mobile-first design
					approach ensured seamless experiences across devices, enhancing accessibility and
					usability.
				</TimelineText>

				<TimelineImage
					src={gethired.src}
					width={gethired.width}
					height={gethired.height}
					alt='Gethired website'
					className='w-full my-5 h-44 lg:h-72 aspect-video rounded-xl object-cover'
				/>

				<TimelineText>
					I collaborated closely with cross-functional teams to refine the platform&apos;s user
					experience, including conducting user research and brainstorming sessions aimed at
					improving engagement and conversion rates. My work on gethired.id not only strengthened
					its technical foundation but also enhanced its value as a resource for users seeking to
					practice and develop skills to secure jobs.
				</TimelineText>
			</div>
		),
	},
] satisfies Array<TimelineEntry>
export function ShowcaseProjects() {
	return <Timeline data={SHOWCASE_PROJECTS} />
}
