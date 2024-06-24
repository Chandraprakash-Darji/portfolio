import React from 'react';

import LicenseForm from '@/app/license/_components/form';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

type Props = {
  searchParams: {
    license_key?: string;
  };
};

const LicenseActivatePage = ({ searchParams = {} }: Props) => {
  return (
    <>
      <Navbar />
      <section id="sec-work" className="relative flex flex-col pt-32">
        <div className="layout relative">
          <h1 className="font-bold">
            Hello 👋
            <br />
            Thank you for joining Chandraprakash.
          </h1>
          <h2 className="mt-5">Let's get you started.</h2>
          <p className="mt-16">
            Get invited to the Chandraprakash Github organization
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete the form below to get your invites
          </p>
          <LicenseForm license_key={searchParams.license_key} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LicenseActivatePage;
