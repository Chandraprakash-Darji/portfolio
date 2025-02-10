'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { getCalApi } from '@calcom/embed-react';

import type { ButtonProps } from './button';
import { Button } from './button';

type Props = ButtonProps & {
  'data-cal-namespace': string;
  'data-cal-link': string;
  'data-cal-config': string;
  children: ReactNode;
};

const CalBtn = (props: Props) => {
  useEffect(() => {
    void (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return <Button {...props} />;
};

export default CalBtn;
