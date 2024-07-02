import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  DetailPostComment,
  DetailPostFloatingBar,
  DetailPostHeading,
} from '@/components/detail/writing';
import { DetailPostScrollUpButton } from '@/components/detail/writing/buttons';
import DetailPostContent from '@/components/detail/writing/detail-post-content';
import { seoData } from '@/config/root/seo';
import getComments from '@/lib/query/writing/get-comments';
import { getPostBySlug } from '@/lib/query/writing/get-post';
import { getAllPostSlugs } from '@/lib/query/writing/get-posts';
import { getOgImageUrl, getUrl } from '@/lib/utils';
import { format } from 'date-fns';
import readingTime, { ReadTimeResults } from 'reading-time';
import updateViews from '@/lib/query/writing/update-views';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPostSlugs({
    type: 'SNIPPET',
  });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug({ slug: params.slug, type: 'SNIPPET' });
  const truncateDescription =
    post?.description?.slice(0, 100) + ('...' as string);
  const slug = '/writing/' + post?.slug;

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
    openGraph: {
      title: post.title as string,
      description: post.description as string,
      type: 'article',
      url: getUrl() + slug,
      images: [
        {
          url: getOgImageUrl(
            post.title as string,
            truncateDescription as string,
            post.categories.map((category) => category.name),
            slug as string
          ),
          width: 1200,
          height: 630,
          alt: post.title as string,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title as string,
      description: post.description as string,
      images: [
        getOgImageUrl(
          post.title as string,
          truncateDescription as string,
          post.categories.map((category) => category.name),
          slug as string
        ),
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug({ slug: params.slug, type: 'SNIPPET' });
  if (!post) return notFound();
  // Get comments
  const comments = await getComments(post.id);
  await updateViews(post.id);
  const readTime = readingTime(post.content ? post.content : '');

  return (
    <>
      <DetailPostHeading
        title={post.title}
        image={post.image}
        authorName={post.user.name}
        authorImage={post.user.image}
        imageBlurhash={post.imageBlurhash}
        date={format(post.updatedAt, 'MMMM dd, yyyy')}
        categories={post.categories}
        readTime={readTime as ReadTimeResults}
        views={post.views}
        likes={post.likes}
        type={post.type}
      />
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,450px)_1fr] xl:gap-10">
        <div className="mx-auto h-max w-full max-w-lg space-y-4 rounded-2xl border-l-2 border-r-2 p-4 xl:sticky xl:top-20 xl:border-r-0 xl:pr-0">
          {post.description && <p className="h4">{post.description}</p>}
          <DetailPostFloatingBar
            title={post.title as string}
            text={post.description as string}
            url={`${getUrl()}${encodeURIComponent(`/writing/${post.slug}`)}`}
            totalComments={comments?.length}
            id={post.id}
            likes={post.likes || 0}
          />
        </div>
        <DetailPostContent content={post.content || '[]'} />
        <DetailPostComment postId={post.id as string} comments={comments} />
      </div>
      <DetailPostScrollUpButton />
    </>
  );
}
