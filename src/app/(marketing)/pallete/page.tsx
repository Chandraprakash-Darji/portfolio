import React from 'react';

import Heading from '@/components/heading';

import ColorSwatch from '@/app/(marketing)/pallete/_components/color-swatch';

export const metadata = {
  title: 'Website Color Palette',
  description: 'Website Color Palette for the project',
};

const PalletePage = () => {
  return (
    <section className='relative flex flex-col pt-32'>
      <div className='layout relative z-10'>
        <Heading>Website's Design</Heading>
        <h1 className='h0 text-muted-foreground mt-2 max-w-4xl font-medium leading-tight'>
          {process.env.NEXT_PUBLIC_APP_URL?.startsWith('http://') &&
            process.env.NEXT_PUBLIC_APP_URL.replace('http://', '')}{' '}
          {process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') &&
            process.env.NEXT_PUBLIC_APP_URL.replace('https://', '')}{' '}
          Color palette
        </h1>
        <div className='mt-4 flex w-full flex-col flex-wrap gap-6 rounded-lg border-2 border-dashed p-4'>
          {' '}
          <div className='flex items-end justify-between'>
            <h2 className='capitalize'>
              Dark Mode{' '}
              <span className='text-muted-foreground text-sm'>
                (light mode soon...)
              </span>
            </h2>
          </div>
          <p className='text-muted-foreground mt-1 text-sm'>
            Font Family: DM Sans
          </p>
          <div className='grid sm:grid-cols-2'>
            {THEME_COLORS.map((color) => (
              <ColorSwatch key={color.title} {...color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PalletePage;

const THEME_COLORS = [
  {
    title: 'Background',
    subTitle: 'hsl(20 14.3% 4.1%)',
    colorClassName: 'bg-background',
  },
  {
    title: 'Foreground',
    subTitle: 'hsl(0 0% 95%',
    colorClassName: 'bg-foreground',
  },
  {
    title: 'Card Background',
    subTitle: 'hsl(24 9.8% 10%)',
    colorClassName: 'bg-card',
  },
  {
    title: 'Card foreground',
    subTitle: 'hsl(0 0% 95%)',
    colorClassName: 'bg-card-foreground',
  },
  {
    title: 'Popover Background',
    subTitle: 'hsl(0 0% 9%)',
    colorClassName: 'bg-popover',
  },
  {
    title: 'Popover foreground',
    subTitle: 'hsl(0 0% 95%)',
    colorClassName: 'bg-popover-foreground',
  },
  {
    title: 'Primary Background',
    subTitle: 'hsl(346.8 77.2% 49.8%)',
    colorClassName: 'bg-primary',
  },
  {
    title: 'Primary foreground',
    subTitle: 'hsl(355.7 100% 97.3%)',
    colorClassName: 'bg-primary-foreground',
  },
  {
    title: 'Secondary Background',
    subTitle: 'hsl(240 3.7% 15.9%;)',
    colorClassName: 'bg-secondary',
  },
  {
    title: 'Secondary foreground',
    subTitle: 'hsl(0 0% 98%)',
    colorClassName: 'bg-secondary-foreground',
  },
  {
    title: 'Muted Background',
    subTitle: 'hsl(0 0% 15%)',
    colorClassName: 'bg-muted',
  },
  {
    title: 'Muted foreground',
    subTitle: 'hsl(240 5% 64.9%)',
    colorClassName: 'bg-muted-foreground',
  },
  {
    title: 'Accent Background',
    subTitle: 'hsl(12 6.5% 15.1%)',
    colorClassName: 'bg-accent',
  },
  {
    title: 'Accent foreground',
    subTitle: 'hsl(0 0% 98%)',
    colorClassName: 'bg-accent-foreground',
  },
  {
    title: 'Destructive Background',
    subTitle: 'hsl(0 62.8% 30.6%)',
    colorClassName: 'bg-destructive',
  },
  {
    title: 'Destructive foreground',
    subTitle: 'hsl(0 85.7% 97.3%)',
    colorClassName: 'bg-destructive-foreground',
  },
  {
    title: 'Border',
    subTitle: 'hsl(240 3.7% 15.9%)',
    colorClassName: 'bg-border',
  },
  {
    title: 'Input',
    subTitle: 'hsl(240 3.7% 15.9%)',
    colorClassName: 'bg-input',
  },
  {
    title: 'Ring',
    subTitle: 'hsl(346.8 77.2% 49.8%)',
    colorClassName: 'bg-ring',
  },
];
