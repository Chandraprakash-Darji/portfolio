import { notFound } from 'next/navigation';

import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { getPostBySlug } from '@/lib/query/writing/get-post';

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  return (
    <>
      <Navbar />
      <div className="layout-wide min-h-full bg-background py-3">
        {children}
      </div>
      <Footer />
    </>
  );
}
