import React, { PropsWithChildren } from 'react';
import { IoRainyOutline } from 'react-icons/io5';

const Heading = ({ children }: PropsWithChildren) => {
  return (
    <span className='flex items-center gap-2 font-mono tracking-wider'>
      <IoRainyOutline className='text-foreground h-4 w-4' />
      {children}
    </span>
  );
};

export default Heading;
