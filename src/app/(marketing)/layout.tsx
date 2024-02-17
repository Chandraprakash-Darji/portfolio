import * as React from 'react';

import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

const MarketingLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MarketingLayout;
