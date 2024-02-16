import { Metadata } from 'next';

import NotFound from '@/components/NotFound';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFoundPage() {
  return <NotFound />;
}
