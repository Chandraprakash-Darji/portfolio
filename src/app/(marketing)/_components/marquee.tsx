'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const Marquee: React.FC = () => {
  const [textWidth, setTextWidth] = useState<number>(0);
  const text = `Code Whisperer ✦ Storyteller at Heart! ✦ Open for Remote Work ✦ Let's Craft Magic Together ✦`;
  const repeatTimes = 50;
  const repeatedText = Array(repeatTimes).fill(text).join(' ');

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [textRef]);

  const tickerVariants = {
    animate: {
      x: [0, -textWidth],
      transition: {
        x: {
          duration: 450,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className='flex w-full overflow-hidden whitespace-nowrap'>
      <motion.div
        className='h4 inline-block font-mono font-light'
        variants={tickerVariants}
        initial='animate'
        animate='animate'
        ref={textRef}
      >
        {repeatedText}
      </motion.div>
      <motion.div
        className='h4 inline-block font-mono font-light'
        variants={tickerVariants}
        initial='animate'
        animate='animate'
      >
        {repeatedText}
      </motion.div>
    </div>
  );
};

export default Marquee;
