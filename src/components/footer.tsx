import React from 'react';

import { UnderlineLink } from '@/components/links';

import { links } from '@/constant/footer-links';

const Footer = () => {
  return (
    <section className='relative flex flex-col pb-10 pt-20'>
      <div className='border-t pt-3'>
        <div className='mx-auto flex max-w-max flex-wrap items-center justify-center gap-5'>
          {links.map((link) => (
            <UnderlineLink
              key={link.href}
              href={link.href}
              className='text-foreground hover:text-primary flex items-center py-1 font-mono text-sm capitalize'
            >
              {link.name}
            </UnderlineLink>
          ))}
        </div>
      </div>
      <span className='mt-10 text-center font-mono tracking-wider'>
        &copy; Chandra Prakash {new Date().getFullYear()}
      </span>
    </section>
  );
};

export default Footer;
