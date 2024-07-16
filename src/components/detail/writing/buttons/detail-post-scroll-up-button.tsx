'use client';

import React from 'react';

import ScrollToTop from 'react-scroll-to-top';

const DetailPostScrollUpButton = () => {
  return (
    <>
      <ScrollToTop
        style={{
          height: '40px',
          width: '40px',
          borderRadius: '50%',
        }}
        className="rounded-full !bg-primary p-2.5 shadow-lg shadow-primary-foreground hover:scale-110 transition-all"
        smooth
        component={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-5 w-5 rotate-90 text-foreground"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        }
      />
    </>
  );
};

export default DetailPostScrollUpButton;
