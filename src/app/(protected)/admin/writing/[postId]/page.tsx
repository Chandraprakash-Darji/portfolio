import { notFound } from 'next/navigation';

import Editor from '@/components/protected/editor/editor';
import { Separator } from '@/components/ui/separator';
import { protectedEditorConfig } from '@/config/protected';
import { currentAdmin } from '@/lib/auth/queries/current-user';
import getPost from '@/lib/query/writing/get-post';
import { Metadata } from 'next';

export const revalidate = 0;

interface PostEditorPageProps {
  params: { postId: string };
}

export async function generateMetadata({
  params,
}: PostEditorPageProps): Promise<Metadata> {
  const post = await getPost(params.postId);
  if (!post) {
    return {};
  }
  return {
    title: `Editing: ${post.title}`,
  };
}

export default async function PostEditorPage({ params }: PostEditorPageProps) {
  const user = await currentAdmin();
  if (!user || !user.id) return notFound();
  const post = await getPost(params.postId, user?.id);
  if (!post) return notFound();

  return (
    <div className="layout-wide">
      <div>
        <h3 className="text-lg font-medium">{protectedEditorConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">
          {protectedEditorConfig.description}
        </p>
      </div>
      <Separator className="mb-5 max-w-2xl" />
      <Editor post={post} userId={user.id} />
    </div>
  );
}
