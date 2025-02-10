import React from 'react';

import Heading from '@/components/heading';
import { Icons } from '@/components/icons';
import { UnderlineLink } from '@/components/links';
import { social } from '@/constant/social';
import { Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <section id="sec-contact" className="relative flex flex-col py-14">
        <div className="layout relative z-10">
          <Heading className="mx-auto w-max md:mx-0">Contact</Heading>
          <div className="flex flex-col md:flex-row w-full pt-4 pb-12 items-center gap-4 justify-between">
            <span className="text-center font-mono tracking-wider">
              <Copyright className="inline-block w-4 h-4" /> Chandrarakash{' '}
              {new Date().getFullYear()}
            </span>
            <div className="flex w-max gap-6">
              {social.map((item, index) => {
                const Icon = Icons[item.name];
                return (
                  <UnderlineLink
                    className="flex max-w-max gap-2 capitalize text-muted-foreground"
                    href={item.url}
                    key={index}
                    trackEventTag={`Contact - ${item.name}`}
                  >
                    <Icon className="w-6 h-6" {...item} /> {item.name}
                  </UnderlineLink>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
