import { Suspense } from 'react';

import Image from 'next/image';

import Faqs from '@/app/(marketing)/_components/faq';
import Marquee from '@/app/(marketing)/_components/marquee';
import ProjectCard from '@/app/(marketing)/_components/project-card';
import ShopSection from '@/app/(marketing)/_components/section/shop';
import WritingSection, {
  WritingLoading,
} from '@/app/(marketing)/_components/section/writing';
import { Spotlight } from '@/app/(marketing)/_components/spotlight';
import Time from '@/app/(marketing)/_components/time';
import { CursorContainer } from '@/components/animation/cursor-container';
import Heading from '@/components/heading';
import { ArrowLink, UnderlineLink } from '@/components/links';
import { projects } from '@/constant/projects';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

const HomePage = () => {
  return (
    <CursorContainer>
      <section className="relative flex h-[calc(100vh-56px)] flex-col pt-32">
        <Spotlight />
        <div className="layout relative z-10">
          <Heading>INTRO</Heading>
          <h1 className="h0 mt-2 max-w-4xl font-medium leading-tight">
            Full-stack dev by day,{' '}
            <span className="border-b-2 border-primary">story weaver</span> by
            night. Building elegant solutions with Next.js, Prisma, & more.
            Let's craft pixels to{' '}
            <span className="group z-20 border-b-2 border-primary">
              proposals
            </span>{' '}
            & beyond!
          </h1>
          <p className="mt-5 font-mono text-sm uppercase">
            {'>>'} Chandraprakash aka Rega
          </p>
          <p className="mt-2">
            Don't forget to sign my{' '}
            <UnderlineLink href="/guestbook">guestbook</UnderlineLink>!
          </p>
        </div>
        <div className="font-sm layout relative mt-auto flex items-center justify-between font-mono">
          <div className="absolute bottom-12 right-0 aspect-[1848/2772] w-56 overflow-hidden rounded-lg bg-primary/50">
            <Image
              width={1000}
              height={1800}
              src="/images/my.jpeg"
              alt="Chandraprakash"
              className="object-cover opacity-100 mix-blend-multiply transition-all"
            />
          </div>
          <p>India भारत</p>
          <Time time={new Date()} />
        </div>
        <div className="mt-2 w-[100vw] bg-primary py-[1rem] text-primary-foreground">
          <Marquee />
        </div>
      </section>
      {/* Shop */}
      <section id="sec-shop" className="relative flex flex-col pt-32">
        <div className="layout relative">
          <div className="flex items-center justify-center lg:justify-between">
            <Heading>
              FEATURED /
              <ArrowLink href="https://rega.lemonsqueezy.com/">SHOP</ArrowLink>
            </Heading>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            <ShopSection />
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="sec-work" className="relative flex flex-col pt-32">
        <div className="layout relative">
          <Heading>FEATURED / WORK</Heading>

          <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard {...project} key={project.title} />
            ))}
          </div>
        </div>
      </section>
      {/* Article */}
      <section className="relative flex flex-col pt-32">
        <div className="layout relative">
          <Heading>
            FEATURED / <ArrowLink href="/writing">WRITING</ArrowLink>
          </Heading>

          <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<WritingLoading />}>
              <WritingSection type="BLOG" />
            </Suspense>
          </div>
        </div>
      </section>
      {/* Snippet */}
      <section className="relative flex flex-col pt-32">
        <div className="layout relative">
          <Heading>
            FEATURED / <ArrowLink href="/snippet">SNIPPET</ArrowLink>
          </Heading>

          <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<WritingLoading />}>
              <WritingSection type="SNIPPET" />
            </Suspense>
          </div>
        </div>
      </section>
      {/* About */}
      <section id="sec-about" className="relative flex flex-col pt-32">
        <div className="layout relative">
          <Heading>
            About
            {/* FEATURED /<ArrowLink href='/work'>WORK</ArrowLink> */}
          </Heading>
          <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Image
                width={1000}
                height={1800}
                src="/images/my.jpeg"
                alt="Chandraprakash"
                className="h-96 w-full rounded-lg border object-cover object-top grayscale lg:h-full"
              />
            </div>

            <div className="prose prose-invert flex flex-col py-0 lg:col-span-3">
              <h2 className="mt-0">
                Craft compelling experiences &amp; boost performance -{' '}
                <strong>you've got your developer in me!</strong>
              </h2>
              <p>
                I'm a passionate full-stack developer with a drive to turn ideas
                into pixel-perfect realities. By day, I'm building{' '}
                <strong>Products</strong>, a platform fueled by{' '}
                <strong>Next.js, Prisma, Typescript and TailwindCSS </strong>.
                By night, I explore the world of storytelling through filmmaking
                (more on that in another portfolio!).
              </p>
              <p>
                <strong>Here's what I bring to the table:</strong>
              </p>
              <ul>
                <li>
                  <strong>Performance Wizard:</strong> Want to{' '}
                  <strong>rocket-charge your website speed</strong> and user
                  experience? You've found your booster! I optimize code,
                  leverage modern tools, and stay ahead of the curve to ensure
                  your projects fly.
                </li>
                <li>
                  <strong>Full-Stack Mastery:</strong> From frontend finesse to
                  backend muscle, I handle it all. Need a feature-rich web app
                  or a sleek landing page? Consider it built.
                </li>
                <li>
                  <strong>Storytelling Mindset:</strong> Every line of code
                  tells a story. I think creatively, design for impact, and
                  craft experiences that resonate with your users.
                </li>
              </ul>
              <p>
                <strong>Ready to build something amazing?</strong> Contact me
                and let's discuss how I can help you achieve your goals.
              </p>
              {/* <p>
                    <strong>P.S.</strong> Don't forget to check out my
                    filmmaking portfolio for a glimpse into my creative side!
                  </p> */}
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col pt-32">
        <div className="layout relative z-10">
          <Heading>
            Capabilities
            {/* FEATURED /<ArrowLink href='/work'>WORK</ArrowLink> */}
          </Heading>
          <ul className="mt-4 flex w-full flex-wrap gap-6 *:rounded-full *:border *:p-2 *:px-3">
            <li>Solution Architecting</li>
            <li>Full-Stack Development</li>
            <li>Website Optimization</li>
            <li>Code Review</li>
            <li>API Development</li>
          </ul>
        </div>
      </section>
      <section className="relative flex flex-col pt-32">
        <div className="layout relative z-10">
          <Heading>
            FAQs
            {/* FEATURED /<ArrowLink href='/work'>WORK</ArrowLink> */}
          </Heading>
          <div className="mt-4 flex w-full flex-wrap gap-6 *:rounded-[45px] *:border">
            <Faqs />
          </div>
        </div>
      </section>
    </CursorContainer>
  );
};

export default HomePage;
