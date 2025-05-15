import { Timeline } from '@/components/ui/timeline'
import type { TimelineEntry } from '@/components/ui/timeline'
import { JourneyTimelineParagraph } from './journey-timeline-paragraph'
import { JourneyTimelineTitle } from './journey-timeline-title'
import { JourneyImage } from './journey-image'
import pc0 from '@/assets/pc-0.webp?url'
import pc1 from '@/assets/pc-1.webp?url'
import pc2 from '@/assets/pc-2.webp?url'
import classroom from '@/assets/classroom.webp?url'
import labs from '@/assets/pc-labs.webp?url'
import laptop from '@/assets/laptop.webp?url'
import selfie from '@/assets/selfie.webp?url'
import wfc0 from '@/assets/wfc-0.webp?url'
import wfc1 from '@/assets/wfc-1.webp?url'
import rebuild0 from '@/assets/rebuild-0.webp?url'
import rebuild1 from '@/assets/rebuild-1.webp?url'
import rebuild2 from '@/assets/rebuild-2.webp?url'
import rebuild3 from '@/assets/rebuild-3.webp?url'
import potrait from '@/assets/bitywre-potrait.webp?url'
import coinfest0 from '@/assets/coinfest-0.webp?url'
import coinfest1 from '@/assets/coinfest-1.webp?url'
import coinfest2 from '@/assets/coinfest-2.webp?url'
import finalAssignment0 from '@/assets/final-assignment-0.webp?url'
import finalAssignment1 from '@/assets/final-assignment-1.webp?url'
import graduation0 from '@/assets/graduation-0.webp?url'
import graduation1 from '@/assets/graduation-1.webp?url'
import graduation2 from '@/assets/graduation-2.webp?url'

const JOURNEY_TIMELINE_ITEMS = [
	{
		title: '2024',
		content: (
			<div className='space-y-1.5'>
				<JourneyTimelineTitle>
					New Challenges, New Opportunities, and University Graduation
				</JourneyTimelineTitle>

				<JourneyTimelineParagraph>
					In late 2023, I began exploring new interests in crypto, web3, and cryptocurrency trading.
					I reached out to a friend who had been working in this field for years to learn how things
					worked and expand my knowledge into these emerging areas. By February 2024, I decided to
					resign from Skyshi Digital Indonesia to pursue new opportunities.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					Coincidentally, the next day, a friend introduced me to Bitwyre , a company specializing
					in cryptocurrency, web3, and crypto trading. I applied immediately, went through
					interviews with their CTO and CEO, and was accepted as a Software Engineer (Frontend) on
					their Engineering team. It was fascinating how an area of personal interest became the
					field I now work in professionally.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					My first few months at Bitwyre involved adapting to a vastly different company culture. As
					a diverse organization with employees from around the world—Canada, America, India,
					Europe, and more—it was a unique environment. Despite English being my third language, it
					didn&apos;t hinder collaboration across continents.
				</JourneyTimelineParagraph>

				<div className='grid grid-cols-5 gap-2.5'>
					<JourneyImage
						src={potrait}
						className='h-32 lg:h-60 object-top'
						containerClassName='col-span-2'
						alt="Rizki's potrait wearing black Bitwrye T-shirt"
						title="Rizki's potrait wearing black Bitwrye T-shirt"
					/>
					<JourneyImage
						src={coinfest1}
						className='h-32 lg:h-60 object-bottom'
						containerClassName='col-span-3'
						alt='Rizki with Indodax mascott'
						title='Rizki with Indodax mascott'
					/>

					<JourneyImage
						src={coinfest0}
						className='h-28 lg:h-44'
						containerClassName='col-span-3'
						alt='Rizki with the Engineering Team'
						title='Rizki with the Engineering Team'
					/>
					<JourneyImage
						src={coinfest2}
						className='h-28 lg:h-44 object-left-bottom'
						containerClassName='col-span-2'
						alt="Rizki's potrait with Mandala Chain team"
						title="Rizki's potrait with Mandala Chain team"
					/>
				</div>

				<JourneyTimelineParagraph>
					In August 2024, the company attended Coinfest Asia , a crypto/web3 event in Bali.
					Alongside the Engineering team, I joined the trip, combining work with a week-long stay
					that included a small internal hackathon at a villa. The event provided valuable
					connections, insights, and experiences, further solidifying my adaptability to the
					fast-paced crypto world.
				</JourneyTimelineParagraph>

				<div className='grid grid-cols-7 gap-2.5'>
					<JourneyImage
						src={finalAssignment1}
						className='h-24 ssm:h-32 lg:h-44 object-center'
						containerClassName='col-span-4'
						alt='A potrait of Rizki celebrating with his girlfriend and her friend, because they passed their thesis defense.'
						title='A potrait of Rizki celebrating with his girlfriend and her friend, because they passed their thesis defense.'
					/>

					<JourneyImage
						src={finalAssignment0}
						className='h-24 ssm:h-32 lg:h-44 object-bottom'
						containerClassName='col-span-3'
						alt="Interviewing local shop for Rizki's final assignment"
						title="Interviewing local shop for Rizki's final assignment"
					/>

					<JourneyImage
						src={graduation0}
						className='h-28 lg:h-44 object-left-bottom'
						containerClassName='col-span-3'
						alt="Rizki's graduation potrait with his Mother and his Sister"
						title="Rizki's graduation potrait with his Mother and his Sister"
					/>

					<JourneyImage
						src={graduation1}
						className='h-28 lg:h-44'
						containerClassName='col-span-4'
						alt='All students graduation landscape'
						title='All students graduation landscape'
					/>
				</div>

				<JourneyTimelineParagraph>
					By late 2024, I graduated from university, marking the end of a three-year journey. While
					the institution I attended may not compare in size or prestige to larger universities like
					Gadjah Mada or the University of Indonesia, the experience I gained was invaluable. Time
					flew by, and though the academic environment wasn’t overwhelming, it gave me the
					foundation to grow. This milestone reinforced my readiness to continue advancing in both
					my career and personal pursuits.
				</JourneyTimelineParagraph>
			</div>
		),
	},
	{
		title: '2023',
		content: (
			<div className='space-y-1.5'>
				<JourneyTimelineTitle>Maintaining Work-Life Balance</JourneyTimelineTitle>

				<JourneyTimelineParagraph>
					In 2023, I continued working as a Frontend Developer at Skyshi Digital Indonesia. One of
					my notable projects was building{' '}
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://moladinfinance.com'
						className='underline underline-offset-2 hover:text-orange-700 decoration-orange-500'
					>
						moladinfinance.com
					</a>{' '}
					for Moladin, which I completed in just around 5 weeks. Afterward, I was assigned to other
					confidential projects bound by NDAs, further expanding my experience in handling diverse
					challenges.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					I then started rebuilding my custom PC, upgrading it piece by piece from my previous build
					while keeping costs low. After a year without a PC, I was excited to return to a more
					comfortable programming setup, with a larger screen and better ergonomics compared to my
					laptop.
				</JourneyTimelineParagraph>

				<div className='grid grid-cols-5 gap-2.5'>
					<JourneyImage
						src={rebuild1}
						alt="Rizki's 2nd PC Build Parts"
						title="Rizki's 2nd PC Build Parts"
						containerClassName='col-span-2'
						className='object-bottom lg:h-44'
					/>
					<JourneyImage
						src={rebuild0}
						containerClassName='col-span-3'
						alt="Rizki's 2nd PC Build With A Laptop"
						title="Rizki's 2nd PC Build With A Laptop"
						className='object-bottom lg:h-44'
					/>
					<JourneyImage
						src={rebuild3}
						containerClassName='col-span-3'
						title='Dual Booting Windows with Endavour OS'
						alt='Dual Booting Windows with Endavour OS'
						className='object-top lg:h-44'
					/>
					<JourneyImage
						src={rebuild2}
						containerClassName='col-span-2'
						alt="Rizki's 2nd PC Build Final Look"
						title="Rizki's 2nd PC Build Final Look"
						className='object-bottom lg:h-44'
					/>
				</div>

				<JourneyTimelineParagraph>
					Throughout this period, I maintained a balance between my full-time job and university
					studies. I also took on freelance work with a friend through Facebook, completing projects
					within three months without conflicts or interruptions to my primary responsibilities. The
					freelance experience added another layer to my skill set and reinforced my ability to
					manage multiple commitments effectively.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					Looking back, I&apos;m surprised by how much I achieved during this time—balancing work,
					studies, and personal projects. Despite the challenges, I remained focused on improving my
					expertise in software engineering, knowing that continuous learning is key to growth in
					this field.
				</JourneyTimelineParagraph>
			</div>
		),
	},
	{
		title: '2022',
		content: (
			<div className='space-y-1.5'>
				<JourneyTimelineTitle>First Internship and Full-Time Work</JourneyTimelineTitle>

				<JourneyTimelineParagraph>
					In late December 2021, I was accepted as an intern at Skyshi Digital Indonesia, a software
					company based in Gamping, Yogyakarta. The internship began in early 2022, with the team
					working remotely due to the pandemic—a setup the company decided to maintain for
					operational efficiency. My first few weeks were challenging, as I had no prior
					professional experience, but I quickly adapted to the company&apos;s culture and workflow.
					I was assigned to contribute to{' '}
					<a
						target='_blank'
						href='https://gethired.id'
						rel='noopener noreferrer'
						className='underline underline-offset-2 hover:text-orange-700 decoration-orange-500'
					>
						gethired.id
					</a>
					, an internal project designed to help users practice and enhance their skills to secure
					jobs, similar to an online course platform.
				</JourneyTimelineParagraph>
				<div className='grid grid-cols-5 gap-2.5'>
					<JourneyImage
						src={wfc0}
						containerClassName='col-span-3'
						alt="Rizki's laptop WFC setup with an iced coffee"
						title="Rizki's laptop WFC setup with an iced coffee"
						className='lg:h-44 object-bottom-left'
					/>

					<JourneyImage
						src={wfc1}
						containerClassName='col-span-2'
						alt='Rizki potrait working from cafe'
						title='Rizki potrait working from cafe'
						className='lg:h-44'
					/>
				</div>
				<JourneyTimelineParagraph>
					After three months of interning, I was hired as a Full-Time Frontend Developer. My role
					shifted to working on external projects, some of which were bound by NDAs. Over the course
					of my first year in this position, I contributed to multiple projects, further honing my
					technical skills and gaining valuable industry experience. The transition from intern to
					full-time developer marked a significant step in my professional growth.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					By late 2022 and into 2023, I maintained a balance between my university studies and my
					full-time role. This period was marked by steady progress, both academically and
					professionally, as I continued to refine my expertise as a Frontend Developer while
					managing the demands of work and education.
				</JourneyTimelineParagraph>
			</div>
		),
	},
	{
		title: '2021',
		content: (
			<div className='space-y-1.5'>
				<JourneyTimelineTitle>Starting University</JourneyTimelineTitle>
				<JourneyTimelineParagraph>
					Early 2021 marked the beginning of my journey into software development. With the world
					still under pandemic restrictions, I focused on learning the fundamentals of web
					development—HTML, CSS, and JavaScript—through self-study and online resources. By May, I
					realized that while I was gaining technical knowledge, my lack of formal experience made
					it difficult to secure a job. To address this, I decided to pursue formal education and
					began applying to universities offering free admission programs due to financial
					constraints. During this time, I sold my custom PC and bought a new, affordable laptop to
					accommodate my needs while moving in and out of different places.
				</JourneyTimelineParagraph>
				<div className='grid grid-cols-3 gap-2.5'>
					<JourneyImage
						src={selfie}
						alt="Rizki's smiling selfie, wet jacket after a rain"
						title="Rizki's smiling selfie, wet jacket after a rain"
						className='object-bottom lg:h-48'
					/>

					<JourneyImage
						src={laptop}
						containerClassName='col-span-2'
						alt="Rizki's first laptop"
						title="Rizki's first laptop"
						className='object-bottom lg:h-48'
					/>
				</div>
				<JourneyTimelineParagraph>
					By late 2021, my efforts paid off when I was accepted into an Associate Degree program for
					Informatics Management. This marked a turning point in my journey, as it provided
					structure and opportunities to complement my self-taught skills. Throughout the year, I
					continued practicing coding and working on small projects to refine my abilities, ensuring
					I stayed sharp while balancing the transition to formal education. It was a year of
					growth, discipline, and laying the foundation for my career as a Frontend Software
					Engineer.
				</JourneyTimelineParagraph>
			</div>
		),
	},
	{
		title: '2020',
		content: (
			<div className='space-y-1.5'>
				<JourneyTimelineTitle>Pandemic Continue</JourneyTimelineTitle>

				<JourneyTimelineParagraph>
					It&apos;s been a year since the start of the pandemic. I&apos;ve been studying from home
					for the past year.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					I&apos;m in my last year of high school, and I&apos;ve decided to start earning some money
					by taking on freelance jobs in my local village.
				</JourneyTimelineParagraph>

				<div className='grid items-end grid-cols-4 gap-2.5'>
					<JourneyImage
						src={pc0}
						containerClassName='col-span-4'
						alt='A keyboard and a mosue peripheral'
						title='A keyboard and a mosue peripheral'
						className='h-32 lg:h-48'
					/>
					<JourneyImage
						src={pc1}
						containerClassName='col-span-2'
						alt="Rizki's first PC build setup with anime wallpaper"
						title="Rizki's first PC build setup with anime wallpaper"
						className='h-28 lg:h-32 object-top'
					/>

					<JourneyImage
						src={pc2}
						containerClassName='col-span-2'
						alt="Rizki's first PC build setup"
						title="Rizki's first PC build setup"
						className='h-28 lg:h-32 object-center'
					/>
				</div>

				<JourneyTimelineParagraph>
					By the middle of 2020, I had saved up enough money to buy computer parts. Some PC parts
					cost too much for me, so I buy them one at a time.
				</JourneyTimelineParagraph>

				<JourneyTimelineParagraph>
					The goal isn&apos;t clear yet, but like any other teenager, I spent most of my time
					playing video games on my PC, like Minecraft and CS:GO.
				</JourneyTimelineParagraph>
			</div>
		),
	},
	{
		title: '2019',
		content: (
			<div className='space-y-1.5'>
				<JourneyTimelineTitle>The Pandemic Breakout</JourneyTimelineTitle>

				<div className='grid gap-2.5 grid-cols-3'>
					<JourneyImage
						src={classroom}
						containerClassName='col-span-2'
						alt='The atmoshpere of the classroom'
						title='The atmoshpere of the classroom'
					/>
					<JourneyImage
						src={labs}
						alt='The atmoshpere of the computer labs back in the days'
						title='The atmoshpere of the computer labs back in the days'
					/>
				</div>

				<JourneyTimelineParagraph>
					I was in the second year of high school when the pandemic began. I can&apos;t recall much,
					but I've been studying from home ever since.
				</JourneyTimelineParagraph>
			</div>
		),
	},
] satisfies Array<TimelineEntry>

export function JourneyTimeline() {
	return <Timeline data={JOURNEY_TIMELINE_ITEMS} />
}
