'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';

export const CursorContainer = ({ children }: React.PropsWithChildren) => {
  const isTouchScreen = useMediaQuery('(hover: none)');
  const [mousePosition, setMousePosition] = useState<{
    x: number | string;
    y: number | string;
  }>({ x: '50%', y: '50%' });
  const containerRef = useRef<HTMLDivElement>(null);

  const mousemove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const mouseLeave = () => {
    setMousePosition({ x: '50%', y: '50%' });
  };
  useEffect(() => {
    containerRef.current?.addEventListener('mousemove', mousemove);
    containerRef.current?.addEventListener('mouseleave', mouseLeave);
    return () => {
      containerRef.current?.removeEventListener('mousemove', mousemove);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className={cn('relative')}>
      <motion.div
        className='bg-foreground pointer-events-none absolute z-[100] aspect-square w-2 -translate-x-1/2 -translate-y-1/2 rounded-lg mix-blend-difference'
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          display: isTouchScreen ? 'none' : 'block',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      ></motion.div>
      {children}
    </motion.div>
  );
};
