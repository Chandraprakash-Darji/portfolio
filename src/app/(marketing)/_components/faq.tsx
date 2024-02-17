'use client';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import { faqs, IFAQ } from '@/constant/faq';

const Faqs = () => {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      {faqs.map((item) => (
        <Faq
          selected={selected === item.i}
          setSelected={() => setSelected(selected === item.i ? -1 : item.i)}
          key={item.i}
          {...item}
        />
      ))}
    </>
  );
};

export default Faqs;

type FaqProps = {
  selected: boolean;
  setSelected: () => void;
} & Omit<IFAQ, 'id'>;

const Faq = ({ selected, setSelected, q, a }: FaqProps) => {
  return (
    <div className='border-content/20 bg-card relative z-0 rounded-xl border'>
      <button
        onClick={() => setSelected()}
        className='flex w-full flex-row items-center justify-between p-5'
      >
        <h3 className='text-card-foreground text-left text-lg font-medium md:text-2xl'>
          {q}
        </h3>
        <ChevronDown
          className={`text-muted-foreground shrink-0 origin-center text-xl transition-all duration-300 md:text-3xl ${
            selected ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden px-5 pt-0 transition-all duration-300
        ${selected ? 'grid-rows-[1fr] py-5 pt-0' : 'grid-rows-[0]'}
        `}
      >
        <p className='text-muted-foreground'>{a}</p>
      </div>
    </div>
  );
};
