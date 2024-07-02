import { notFound } from 'next/navigation';

import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { getPostBySlug } from '@/lib/query/writing/get-post';
import { DetailPostHeader } from '@/components/detail/writing';

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const post = await getPostBySlug({ slug: params.slug, type: 'BLOG' });

  if (!post) return notFound();

  return (
    <>
      <Navbar />
      <DetailPostHeader />
      <div className="layout-wide min-h-full bg-background py-3">
        {children}
      </div>
      <Footer />
    </>
  );
}
