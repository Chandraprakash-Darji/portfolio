import * as React from 'react';

import { Navbar } from '@/components/navbar';

const MarketingLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MarketingLayout;
