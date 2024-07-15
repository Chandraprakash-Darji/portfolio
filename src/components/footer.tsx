import React from 'react';

import Heading from '@/components/heading';
import { Icons } from '@/components/icons';
import { UnderlineLink, UnstyledLink } from '@/components/links';
import { links } from '@/constant/footer-links';
import { social } from '@/constant/social';
import { Copyright } from '@phosphor-icons/react/dist/ssr';

const Footer = () => {
  return (
    <>
      <section id="sec-contact" className="relative flex flex-col pt-32">
        <div className="layout relative z-10">
          <Heading>
            Contact
            {/* FEATURED /<ArrowLink href='/work'>WORK</ArrowLink> */}
          </Heading>
          <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="rounded-lg bg-card p-6 lg:col-span-2">
              <h2 className="h1 font-normal">Need a developer?</h2>
              <p className="h4 mt-4 font-normal text-muted-foreground">
                Shoot me a note with your project details at{' '}
                <UnstyledLink
                  href="mailto:prakashchandra3786@gmail.com"
                  trackEventTag="Work Email"
                >
                  prakashchandra3786@gmail.com
                </UnstyledLink>
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 md:col-span-3">
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
      <section className="relative flex flex-col pb-10 pt-20">
        <div className="border-t pt-3">
          <div className="mx-auto flex max-w-max flex-wrap items-center justify-center gap-5">
            {links.map((link) => (
              <UnderlineLink
                key={link.href}
                href={link.href}
                className="flex items-center py-1 font-mono text-sm capitalize text-foreground hover:text-primary"
                trackEventTag={`Footer Links - ${link.name}`}
              >
                {link.name}
              </UnderlineLink>
            ))}
          </div>
        </div>
        <span className="mt-10 text-center font-mono tracking-wider">
          <Copyright className="inline-block" /> Chandra Prakash{' '}
          {new Date().getFullYear()}
        </span>
      </section>
    </>
  );
};

export default Footer;
