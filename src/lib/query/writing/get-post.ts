import db from '@/lib/db';
import { replaceTweets } from '@/lib/remark-plugins';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { serialize } from 'remote-mdx/serialize';

const getPost = async (id: string, userId?: string) => {
  const post = await db.post.findUnique({
    where: {
      id,
      user: {
        id: userId,
        role: 'ADMIN',
      },
    },
    include: { categories: true, user: true },
  });

  return post;
};

export default getPost;
export type TGetPost = Awaited<ReturnType<typeof getPost>>;

export const getPostBySlug = async ({ slug }: { slug: string }) => {
  const post = await db.post.findUnique({
    where: {
      slug,
      published: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      image: true,
      imageBlurhash: true,
      updatedAt: true,
      views: true,
      type: true,
      categories: {
        select: {
          slug: true,
          name: true,
          color: true,
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
          shares: true,
        },
      },
    },
  });

  const mdxSource = await getMdxSource(post?.content || '## No content');

  if (!post) return null;
  return { ...post, mdxSource };
};
export type TGetPostBySlug = Awaited<ReturnType<typeof getPostBySlug>>;

async function getMdxSource(postContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, '[$1]($1)') ?? '';

  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets],
      rehypePlugins: [
        rehypeSlug,
        // @ts-expect-error - rehypePrettyCode types are incorrect
        () =>
          rehypePrettyCode({
            theme: 'poimandres',
          }),
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ],
    },
  });

  return mdxSource;
}

export type TGetMdxSource = Awaited<ReturnType<typeof getMdxSource>>;
