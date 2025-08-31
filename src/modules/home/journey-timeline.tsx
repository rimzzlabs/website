import { Timeline } from '@/components/ui/timeline'
import type { TimelineEntry } from '@/components/ui/timeline'
import { TimelineSubHeading } from '@/components/ui/timeline-sub-heading'
import { TimelineText } from '@/components/ui/timeline-text'
import { TimelineImage } from '@/components/ui/timeline-image'
import pc0 from '@/assets/pc-0.webp'
import pc1 from '@/assets/pc-1.webp'
import pc2 from '@/assets/pc-2.webp'
import classroom from '@/assets/classroom.webp'
import labs from '@/assets/pc-labs.webp'
import laptop from '@/assets/laptop.webp'
import selfie from '@/assets/selfie.webp'
import wfc0 from '@/assets/wfc-0.webp'
import wfc1 from '@/assets/wfc-1.webp'
import rebuild0 from '@/assets/rebuild-0.webp'
import rebuild1 from '@/assets/rebuild-1.webp'
import rebuild2 from '@/assets/rebuild-2.webp'
import rebuild3 from '@/assets/rebuild-3.webp'
import festivalPass from '@/assets/fest-pass.webp'
import coinfest0 from '@/assets/coinfest-0.webp'
import coinfest1 from '@/assets/coinfest-1.webp'
import coinfest2 from '@/assets/coinfest-2.webp'
import finalAssignment0 from '@/assets/final-assignment-0.webp'
import graduation0 from '@/assets/graduation-0.webp'
import { Lightbox } from '@/components/ui/lightbox'
import { Fragment } from 'react/jsx-runtime'

const JOURNEY_TIMELINE_ITEMS = [
	{
		title: '2024',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>
					New Challenges, New Opportunities, and University Graduation
				</TimelineSubHeading>

				<TimelineText>
					In late 2023, I began exploring new interests in crypto, web3, and cryptocurrency trading.
					I reached out to a friend who had been working in this field for years to learn how things
					worked and expand my knowledge into these emerging areas. By February 2024, I decided to
					resign from Skyshi Digital Indonesia to pursue new opportunities.
				</TimelineText>

				<TimelineText>
					Coincidentally, the next day, a friend introduced me to Bitwyre , a company specializing
					in cryptocurrency, web3, and crypto trading. I applied immediately, went through
					interviews with their CTO and CEO, and was accepted as a Software Engineer (Frontend) on
					their Engineering team. It was fascinating how an area of personal interest became the
					field I now work in professionally.
				</TimelineText>

				<TimelineText>
					My first few months at Bitwyre involved adapting to a vastly different company culture. As
					a diverse organization with employees from around the world, fromCanada, America, India,
					Europe, and more, it was a unique environment. Despite English being my third language, it
					didn&apos;t hinder collaboration across continents.
				</TimelineText>

				<div className='grid grid-cols-5 gap-1'>
					<Lightbox
						images={[
							{
								src: festivalPass.src,
								alt: "Rizki's festival pass of Coinfest Asia",
								title: "Rizki's festival pass of Coinfest Asia",
							},
							{
								src: coinfest1.src,
								alt: 'Rizki with Indodax mascott',
								title: 'Rizki with Indodax mascott',
							},
							{
								src: coinfest0.src,
								alt: 'Rizki with Indodax mascott',
								title: 'Rizki with Indodax mascott',
							},
							{
								src: coinfest2.src,
								alt: "Rizki's potrait with Mandala Chain team",
								title: "Rizki's potrait with Mandala Chain team",
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={festivalPass.src}
									width={festivalPass.width}
									height={festivalPass.height}
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(0)}
									alt="Rizki's festival pass of Coinfest Asia"
									title="Rizki's festival pass of Coinfest Asia"
									className='h-32 lg:h-60 object-top cursor-pointer'
								/>
								<TimelineImage
									src={coinfest1.src}
									width={coinfest1.width}
									height={coinfest1.height}
									onClick={() => onOpenLightbox(1)}
									containerClassName='col-span-3'
									alt='Rizki with Indodax mascott'
									title='Rizki with Indodax mascott'
									className='h-32 lg:h-60 object-bottom cursor-pointer'
								/>

								<TimelineImage
									src={coinfest0.src}
									width={coinfest0.width}
									className='h-28 lg:h-44'
									height={coinfest0.height}
									onClick={() => onOpenLightbox(2)}
									alt='Rizki with the Engineering Team'
									title='Rizki with the Engineering Team'
									containerClassName='col-span-3 cursor-pointer'
								/>
								<TimelineImage
									src={coinfest2.src}
									width={coinfest2.width}
									height={coinfest2.height}
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(3)}
									alt="Rizki's potrait with Mandala Chain team"
									title="Rizki's potrait with Mandala Chain team"
									className='h-28 lg:h-44 object-left-bottom cursor-pointer'
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>

				<TimelineText>
					In August 2024, the company attended Coinfest Asia , a crypto/web3 event in Bali.
					Alongside the Engineering team, I joined the trip, combining work with a week-long stay
					that included a small internal hackathon at a villa. The event provided valuable
					connections, insights, and experiences, further solidifying my adaptability to the
					fast-paced crypto world.
				</TimelineText>

				<div className='grid grid-cols-2 gap-1'>
					<Lightbox
						images={[
							{
								src: finalAssignment0.src,
								title: "Interviewing local shop for Rizki's final assignment",
								alt: "Interviewing local shop for Rizki's final assignment",
							},
							{
								src: graduation0.src,
								title: "Rizki's graduation potrait with his Mother and his Sister",
								alt: "Rizki's graduation potrait with his Mother and his Sister",
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={finalAssignment0.src}
									width={finalAssignment0.width}
									height={finalAssignment0.height}
									onClick={() => onOpenLightbox(0)}
									className='h-28 lg:h-44 object-center cursor-pointer'
									alt="Interviewing local shop for Rizki's final assignment"
									title="Interviewing local shop for Rizki's final assignment"
								/>

								<TimelineImage
									src={graduation0.src}
									width={graduation0.width}
									height={graduation0.height}
									onClick={() => onOpenLightbox(1)}
									className='h-28 lg:h-44 object-left-bottom cursor-pointer'
									alt="Rizki's graduation potrait with his Mother and his Sister"
									title="Rizki's graduation potrait with his Mother and his Sister"
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>

				<TimelineText>
					By late 2024, I graduated from university, marking the end of a three-year journey. While
					the institution I attended may not compare in size or prestige to larger universities like
					Gadjah Mada or the University of Indonesia, the experience I gained was invaluable. Time
					flew by, and though the academic environment wasn’t overwhelming, it gave me the
					foundation to grow. This milestone reinforced my readiness to continue advancing in both
					my career and personal pursuits.
				</TimelineText>
			</div>
		),
	},
	{
		title: '2023',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Maintaining Work-Life Balance</TimelineSubHeading>

				<TimelineText>
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
				</TimelineText>

				<TimelineText>
					I then started rebuilding my custom PC, upgrading it piece by piece from my previous build
					while keeping costs low. After a year without a PC, I was excited to return to a more
					comfortable programming setup, with a larger screen and better ergonomics compared to my
					laptop.
				</TimelineText>

				<div className='grid grid-cols-5 gap-1'>
					<Lightbox
						images={[
							{
								src: rebuild1.src,
								alt: "Rizki's 2nd PC Build With A Laptop",
								title: "Rizki's 2nd PC Build With A Laptop",
							},
							{
								src: rebuild0.src,
								alt: "Rizki's 2nd PC Build Parts",
								title: "Rizki's 2nd PC Build Parts",
							},
							{
								src: rebuild3.src,
								alt: "Rizki's 2nd PC Build With A Laptop",
								title: "Rizki's 2nd PC Build With A Laptop",
							},
							{
								src: rebuild2.src,
								alt: "Rizki's 2nd PC Build Parts",
								title: "Rizki's 2nd PC Build Parts",
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={rebuild1.src}
									width={rebuild1.width}
									height={rebuild1.height}
									containerClassName='col-span-2'
									alt="Rizki's 2nd PC Build Parts"
									title="Rizki's 2nd PC Build Parts"
									onClick={() => onOpenLightbox(0)}
									className='object-bottom lg:h-44 cursor-pointer'
								/>
								<TimelineImage
									src={rebuild0.src}
									width={rebuild0.width}
									height={rebuild0.height}
									containerClassName='col-span-3'
									onClick={() => onOpenLightbox(1)}
									alt="Rizki's 2nd PC Build With A Laptop"
									title="Rizki's 2nd PC Build With A Laptop"
									className='object-bottom lg:h-44 cursor-pointer'
								/>
								<TimelineImage
									src={rebuild3.src}
									width={rebuild3.width}
									height={rebuild3.height}
									containerClassName='col-span-3'
									onClick={() => onOpenLightbox(2)}
									title='Dual Booting Windows with Endavour OS'
									alt='Dual Booting Windows with Endavour OS'
									className='object-top lg:h-44 cursor-pointer'
								/>
								<TimelineImage
									src={rebuild2.src}
									width={rebuild2.width}
									height={rebuild2.height}
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(3)}
									alt="Rizki's 2nd PC Build Final Look"
									title="Rizki's 2nd PC Build Final Look"
									className='object-bottom lg:h-44 cursor-pointer'
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>

				<TimelineText>
					Throughout this period, I maintained a balance between my full-time job and university
					studies. I also took on freelance work with a friend through Facebook, completing projects
					within three months without conflicts or interruptions to my primary responsibilities. The
					freelance experience added another layer to my skill set and reinforced my ability to
					manage multiple commitments effectively.
				</TimelineText>

				<TimelineText>
					Looking back, I&apos;m surprised by how much I achieved during this time balancing work,
					studies, and personal projects. Despite the challenges, I remained focused on improving my
					expertise in software engineering, knowing that continuous learning is key to growth in
					this field.
				</TimelineText>
			</div>
		),
	},
	{
		title: '2022',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>First Internship and Full-Time Work</TimelineSubHeading>

				<TimelineText>
					In late December 2021, I was accepted as an intern at Skyshi Digital Indonesia, a software
					company based in Gamping, Yogyakarta. The internship began in early 2022, with the team
					working remotely due to the pandemic, a setup the company decided to maintain for
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
				</TimelineText>
				<div className='grid grid-cols-5 gap-1'>
					<Lightbox
						images={[
							{
								src: wfc0.src,
								alt: "Rizki's laptop WFC setup with an iced coffee",
								title: "Rizki's laptop WFC setup with an iced coffee",
							},
							{
								src: wfc1.src,
								alt: 'Rizki potrait working from cafe',
								title: 'Rizki potrait working from cafe',
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={wfc0.src}
									width={wfc0.width}
									height={wfc0.height}
									containerClassName='col-span-3'
									onClick={() => onOpenLightbox(0)}
									alt="Rizki's laptop WFC setup with an iced coffee"
									title="Rizki's laptop WFC setup with an iced coffee"
									className='lg:h-44 object-bottom-left cursor-pointer'
								/>

								<TimelineImage
									src={wfc1.src}
									width={wfc1.width}
									height={wfc1.height}
									containerClassName='col-span-2'
									className='lg:h-44 cursor-pointer'
									onClick={() => onOpenLightbox(1)}
									alt='Rizki potrait working from cafe'
									title='Rizki potrait working from cafe'
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>
				<TimelineText>
					After three months of interning, I was hired as a Full-Time Frontend Developer. My role
					shifted to working on external projects, some of which were bound by NDAs. Over the course
					of my first year in this position, I contributed to multiple projects, further honing my
					technical skills and gaining valuable industry experience. The transition from intern to
					full-time developer marked a significant step in my professional growth.
				</TimelineText>

				<TimelineText>
					By late 2022 and into 2023, I maintained a balance between my university studies and my
					full-time role. This period was marked by steady progress, both academically and
					professionally, as I continued to refine my expertise as a Frontend Developer while
					managing the demands of work and education.
				</TimelineText>
			</div>
		),
	},
	{
		title: '2021',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Starting University</TimelineSubHeading>
				<TimelineText>
					Early 2021 marked the beginning of my journey into software development. With the world
					still under pandemic restrictions, I focused on learning the fundamentals of web
					development, HTML, CSS, and JavaScript hrough self-study and online resources. By May, I
					realized that while I was gaining technical knowledge, my lack of formal experience made
					it difficult to secure a job. To address this, I decided to pursue formal education and
					began applying to universities offering free admission programs due to financial
					constraints. During this time, I sold my custom PC and bought a new, affordable laptop to
					accommodate my needs while moving in and out of different places.
				</TimelineText>
				<div className='grid grid-cols-3 gap-1'>
					<Lightbox
						images={[
							{
								src: selfie.src,
								alt: "Rizki's smiling selfie, wet jacket after a rain",
								title: "Rizki's smiling selfie, wet jacket after a rain",
							},
							{
								src: laptop.src,
								alt: "Rizki's first laptop",
								title: "Rizki's first laptop",
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={selfie.src}
									width={selfie.width}
									height={selfie.height}
									onClick={() => onOpenLightbox(0)}
									alt="Rizki's smiling selfie, wet jacket after a rain"
									title="Rizki's smiling selfie, wet jacket after a rain"
									className='object-bottom lg:h-48'
								/>

								<TimelineImage
									src={laptop.src}
									width={laptop.width}
									height={laptop.height}
									alt="Rizki's first laptop"
									title="Rizki's first laptop"
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(1)}
									className='object-bottom lg:h-48'
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>
				<TimelineText>
					By late 2021, my efforts paid off when I was accepted into an Associate Degree program for
					Informatics Management. This marked a turning point in my journey, as it provided
					structure and opportunities to complement my self-taught skills. Throughout the year, I
					continued practicing coding and working on small projects to refine my abilities, ensuring
					I stayed sharp while balancing the transition to formal education. It was a year of
					growth, discipline, and laying the foundation for my career as a Frontend Software
					Engineer.
				</TimelineText>
			</div>
		),
	},
	{
		title: '2020',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>Pandemic Continue</TimelineSubHeading>

				<TimelineText>
					It&apos;s been a year since the start of the pandemic. I&apos;ve been studying from home
					for the past year.
				</TimelineText>

				<TimelineText>
					I&apos;m in my last year of high school, and I&apos;ve decided to start earning some money
					by taking on freelance jobs in my local village.
				</TimelineText>

				<div className='grid items-end grid-cols-4 gap-1'>
					<Lightbox
						images={[
							{
								src: pc0.src,
								alt: 'A keyboard and a mosue peripheral',
								title: 'A keyboard and a mosue peripheral',
							},
							{
								src: pc1.src,
								alt: "Rizki's first PC build setup with anime wallpaper",
								title: "Rizki's first PC build setup with anime wallpaper",
							},
							{
								src: pc2.src,
								alt: "Rizki's first PC build setup",
								title: "Rizki's first PC build setup",
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={pc0.src}
									width={pc0.width}
									height={pc0.height}
									className='h-32 lg:h-48'
									containerClassName='col-span-4'
									onClick={() => onOpenLightbox(0)}
									alt='A keyboard and a mosue peripheral'
									title='A keyboard and a mosue peripheral'
								/>
								<TimelineImage
									src={pc1.src}
									width={pc1.width}
									height={pc1.height}
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(1)}
									className='h-28 lg:h-32 object-top'
									alt="Rizki's first PC build setup with anime wallpaper"
									title="Rizki's first PC build setup with anime wallpaper"
								/>

								<TimelineImage
									src={pc2.src}
									width={pc2.width}
									height={pc2.height}
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(2)}
									alt="Rizki's first PC build setup"
									title="Rizki's first PC build setup"
									className='h-28 lg:h-32 object-center'
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>

				<TimelineText>
					By the middle of 2020, I had saved up enough money to buy computer parts. Some PC parts
					cost too much for me, so I buy them one at a time.
				</TimelineText>

				<TimelineText>
					The goal isn&apos;t clear yet, but like any other teenager, I spent most of my time
					playing video games on my PC, like Minecraft and CS:GO.
				</TimelineText>
			</div>
		),
	},
	{
		title: '2019',
		content: (
			<div className='space-y-1.5'>
				<TimelineSubHeading>The Pandemic Breakout</TimelineSubHeading>

				<div className='grid gap-1 grid-cols-3'>
					<Lightbox
						images={[
							{
								src: classroom.src,
								alt: 'The atmoshpere of the classroom',
								title: 'The atmoshpere of the classroom',
							},
							{
								src: labs.src,
								alt: 'The atmoshpere of the computer labs back in the days',
								title: 'The atmoshpere of the computer labs back in the days',
							},
						]}
					>
						{(onOpenLightbox) => (
							<Fragment>
								<TimelineImage
									src={classroom.src}
									width={classroom.width}
									height={classroom.height}
									containerClassName='col-span-2'
									onClick={() => onOpenLightbox(0)}
									alt='The atmoshpere of the classroom'
									title='The atmoshpere of the classroom'
								/>
								<TimelineImage
									src={labs.src}
									width={labs.width}
									height={labs.height}
									onClick={() => onOpenLightbox(1)}
									alt='The atmoshpere of the computer labs back in the days'
									title='The atmoshpere of the computer labs back in the days'
								/>
							</Fragment>
						)}
					</Lightbox>
				</div>

				<TimelineText>
					I was in the second year of high school when the pandemic began. I can&apos;t recall much,
					but I've been studying from home ever since.
				</TimelineText>
			</div>
		),
	},
] satisfies Array<TimelineEntry>

export function JourneyTimeline() {
	return <Timeline data={JOURNEY_TIMELINE_ITEMS} />
}
