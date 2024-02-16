import { CursorContainer } from '@/components/animation/cursor-container';
import Heading from '@/components/heading';

import Marquee from '@/app/(marketing)/_components/marquee';
import { Spotlight } from '@/app/(marketing)/_components/spotlight';
import Time from '@/app/(marketing)/_components/time';

const HomePage = () => {
  return (
    <>
      <CursorContainer>
        <div className='relative flex h-[calc(100vh-56px)] flex-col pt-32'>
          <Spotlight />
          <div className='layout relative z-10'>
            <Heading>INTRO</Heading>
            <h1 className='h0 mt-2 max-w-4xl font-medium leading-tight'>
              Full-stack dev by day,{' '}
              <span className='border-primary border-b-2'>story weaver</span> by
              night. Building elegant solutions with Next.js, Prisma, & more.
              Let's craft pixels to{' '}
              <span className='border-primary border-b-2'>proposals</span> &
              beyond!
            </h1>
            <p className='mt-5 font-mono text-sm uppercase'>
              {'>>'} Chandraprakash aka Rega
            </p>
          </div>
          <div className='font-sm layout relative mt-auto flex items-center justify-between font-mono'>
            <p>India भारत</p>
            <Time time={new Date()} />
          </div>
          <div className='bg-primary text-primary-foreground mt-2 w-[200vw] py-[1rem]'>
            <Marquee />
          </div>
        </div>
      </CursorContainer>
    </>
  );
};

export default HomePage;
