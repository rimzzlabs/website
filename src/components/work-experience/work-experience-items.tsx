import { Card } from "../ui/card";
import type { TimelineEntry } from "../ui/timeline";
import { WorkExperienceParagraph } from "./work-experience-paragraph";
import { WorkExperienceTitle } from "./work-experience-title";
import pc0 from "@/assets/pc-0.webp?url";
import pc1 from "@/assets/pc-1.webp?url";
import pc2 from "@/assets/pc-2.webp?url";
import classroom from "@/assets/classroom.webp?url";
import labs from "@/assets/pc-labs.webp?url";
import laptop from "@/assets/laptop.webp?url";
import selfie from "@/assets/selfie.webp?url";
import wfc0 from "@/assets/wfc-0.webp?url";
import wfc1 from "@/assets/wfc-1.webp?url";
import rebuild0 from "@/assets/rebuild-0.webp?url";
import rebuild1 from "@/assets/rebuild-1.webp?url";
import rebuild2 from "@/assets/rebuild-2.webp?url";
import rebuild3 from "@/assets/rebuild-3.webp?url";

export const WORK_EXPERIENCE_ITEMS = [
  {
    title: "2024",
    content: (
      <div className="space-y-1.5">
        <WorkExperienceTitle>
          New Challenges, New Opportunities, and University Graduation
        </WorkExperienceTitle>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className="space-y-1.5">
        <WorkExperienceTitle>Maintaining Work-Life Balance</WorkExperienceTitle>

        <WorkExperienceParagraph>
          In 2023, I continued working as a Frontend Developer at Skyshi. One of
          my notable projects was building{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moladinfinance.com"
            className="underline underline-offset-2 hover:text-orange-700 decoration-orange-500"
          >
            moladinfinance.com
          </a>{" "}
          for Moladin, which I completed in just 5 weeks. Afterward, I was
          assigned to other confidential projects bound by NDAs, further
          expanding my experience in handling diverse challenges.
        </WorkExperienceParagraph>

        <WorkExperienceParagraph>
          I then started rebuilding my custom PC, upgrading it piece by piece
          from my previous build while keeping costs low. After a year without a
          PC, I was excited to return to a more comfortable programming setup,
          with a larger screen and better ergonomics compared to my laptop.
        </WorkExperienceParagraph>

        <div className="grid grid-cols-5 gap-2.5">
          <Card className="py-0 overflow-hidden col-span-2">
            <img
              src={rebuild1}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rebuilding Rizki's PC"
              className="object-cover object-bottom h-32 lg:h-44"
            />
          </Card>
          <Card className="py-0 col-span-3 overflow-hidden">
            <img
              src={rebuild0}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rebuilding Rizki's PC"
              className="object-cover object-bottom h-32 lg:h-44"
            />
          </Card>
          <Card className="py-0 col-span-3 overflow-hidden">
            <img
              src={rebuild3}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rebuilding Rizki's PC"
              className="object-cover object-bottom h-32 lg:h-44"
            />
          </Card>
          <Card className="py-0 col-span-2 overflow-hidden">
            <img
              src={rebuild2}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rebuilding Rizki's PC"
              className="object-cover object-bottom h-32 lg:h-44"
            />
          </Card>
        </div>

        <WorkExperienceParagraph>
          Throughout this period, I maintained a balance between my full-time
          job and university studies. I also took on freelance work with a
          friend through Facebook, completing projects within three months
          without conflicts or interruptions to my primary responsibilities. The
          freelance experience added another layer to my skill set and
          reinforced my ability to manage multiple commitments effectively.
        </WorkExperienceParagraph>

        <WorkExperienceParagraph>
          Looking back, I&apos;m surprised by how much I achieved during this
          time—balancing work, studies, and personal projects. Despite the
          challenges, I remained focused on improving my expertise in software
          engineering, knowing that continuous learning is key to growth in this
          field.
        </WorkExperienceParagraph>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div className="space-y-1.5">
        <WorkExperienceTitle>
          First Internship and Full-Time Work
        </WorkExperienceTitle>

        <WorkExperienceParagraph>
          In late December 2021, I was accepted as an intern at Skyshi Digital
          Indonesia, a software company based in Gamping, Yogyakarta. The
          internship began in early 2022, with the team working remotely due to
          the pandemic—a setup the company decided to maintain for operational
          efficiency. My first few weeks were challenging, as I had no prior
          professional experience, but I quickly adapted to the company&apos;s
          culture and workflow. I was assigned to contribute to{" "}
          <a
            target="_blank"
            href="https://gethired.id"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-orange-700 decoration-orange-500"
          >
            gethired.id
          </a>
          , an internal project designed to help users practice and enhance
          their skills to secure jobs, similar to an online course platform.
        </WorkExperienceParagraph>
        <div className="grid grid-cols-5 gap-2.5">
          <Card className="py-0 overflow-hidden col-span-3">
            <img
              src={wfc0}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki working from cafe"
              className="object-cover object-bottom h-32 lg:h-44"
            />
          </Card>
          <Card className="py-0 col-span-2 overflow-hidden">
            <img
              src={wfc1}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki working from cafe"
              className="object-cover object-bottom h-32 lg:h-44"
            />
          </Card>
        </div>
        <WorkExperienceParagraph>
          After three months of interning, I was hired as a Full-Time Frontend
          Developer. My role shifted to working on external projects, some of
          which were bound by NDAs. Over the course of my first year in this
          position, I contributed to multiple projects, further honing my
          technical skills and gaining valuable industry experience. The
          transition from intern to full-time developer marked a significant
          step in my professional growth.
        </WorkExperienceParagraph>

        <WorkExperienceParagraph>
          By late 2022 and into 2023, I maintained a balance between my
          university studies and my full-time role. This period was marked by
          steady progress, both academically and professionally, as I continued
          to refine my expertise as a Frontend Developer while managing the
          demands of work and education.
        </WorkExperienceParagraph>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className="space-y-1.5">
        <WorkExperienceTitle>Starting University</WorkExperienceTitle>
        <WorkExperienceParagraph>
          Early 2021 marked the beginning of my journey into software
          development. With the world still under pandemic restrictions, I
          focused on learning the fundamentals of web development—HTML, CSS, and
          JavaScript—through self-study and online resources. By May, I realized
          that while I was gaining technical knowledge, my lack of formal
          experience made it difficult to secure a job. To address this, I
          decided to pursue formal education and began applying to universities
          offering free admission programs due to financial constraints. During
          this time, I sold my custom PC and bought a new, affordable laptop to
          accommodate my needs while moving in and out of different places.
        </WorkExperienceParagraph>
        <div className="grid grid-cols-3 gap-2.5">
          <Card className="py-0 overflow-hidden">
            <img
              src={selfie}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki's selfie"
              className="object-cover object-bottom h-32 lg:h-48"
            />
          </Card>
          <Card className="py-0 col-span-2 overflow-hidden">
            <img
              src={laptop}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki's laptop"
              className="object-cover object-bottom h-32 lg:h-48"
            />
          </Card>
        </div>
        <WorkExperienceParagraph>
          By late 2021, my efforts paid off when I was accepted into an
          Associate Degree program for Informatics Management. This marked a
          turning point in my journey, as it provided structure and
          opportunities to complement my self-taught skills. Throughout the
          year, I continued practicing coding and working on small projects to
          refine my abilities, ensuring I stayed sharp while balancing the
          transition to formal education. It was a year of growth, discipline,
          and laying the foundation for my career as a Frontend Software
          Engineer.
        </WorkExperienceParagraph>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div className="space-y-1.5">
        <WorkExperienceTitle>Pandemic Continue</WorkExperienceTitle>

        <WorkExperienceParagraph>
          It&apos;s been a year since the start of the pandemic. I&apos;ve been
          studying from home for the past year.
        </WorkExperienceParagraph>

        <WorkExperienceParagraph>
          I&apos;m in my last year of high school, and I&apos;ve decided to
          start earning some money by taking on freelance jobs in my local
          village.
        </WorkExperienceParagraph>

        <div className="grid items-end grid-cols-4 gap-2.5">
          <Card className="col-span-4 p-0 overflow-hidden">
            <img
              src={pc0}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki's first setup"
              className="object-cover object-bottom h-32 lg:h-48"
            />
          </Card>

          <Card className="col-span-2 p-0 overflow-hidden">
            <img
              src={pc1}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki's first setup"
              className="object-cover object-bottom h-28 lg:h-36"
            />
          </Card>

          <Card className="p-0 col-span-2 overflow-hidden">
            <img
              src={pc2}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              alt="Rizki's first setup"
              className="object-cover object-bottom h-28 lg:h-36"
            />
          </Card>
        </div>

        <WorkExperienceParagraph>
          By the middle of 2020, I had saved up enough money to buy computer
          parts. Some PC parts cost too much for me, so I buy them one at a
          time.
        </WorkExperienceParagraph>

        <WorkExperienceParagraph>
          The goal isn&apos;t clear yet, but like any other teenager, I spent
          most of my time playing video games on my PC, like Minecraft and
          CS:GO.
        </WorkExperienceParagraph>
      </div>
    ),
  },
  {
    title: "2019",
    content: (
      <div className="space-y-1.5">
        <WorkExperienceTitle>The Pandemic Breakout</WorkExperienceTitle>

        <div className="grid gap-2.5 grid-cols-3">
          <Card className="overflow-hidden py-0 col-span-2">
            <img
              src={classroom}
              alt="Classroom"
              className="h-32 object-cover"
              fetchPriority="high"
              loading="lazy"
              decoding="async"
              width={800}
              height={400}
            />
          </Card>
          <Card className="overflow-hidden py-0">
            <img
              src={labs}
              alt="Computer Labs"
              className="h-32 object-cover object-bottom-right"
              fetchPriority="high"
              loading="lazy"
              decoding="async"
              width={800}
              height={400}
            />
          </Card>
        </div>

        <WorkExperienceParagraph>
          I was in the second year of high school when the pandemic began. I
          can&apos;t say anything about it, but I've been studying from home
          ever since.
        </WorkExperienceParagraph>
      </div>
    ),
  },
] satisfies Array<TimelineEntry>;
