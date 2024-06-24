'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import { updatePostMeta } from '@/actions/writing/update-post';
import DescriptionSetting from '@/components/protected/editor/meta/description';
import ImageSetting from '@/components/protected/editor/meta/image';
import PostTypeSetting from '@/components/protected/editor/meta/post-type';
import StatusSetting from '@/components/protected/editor/meta/status';
import TitleSlugSetting from '@/components/protected/editor/meta/title-slug';
import WysiwygEditor from '@/components/protected/editor/wysiwyg/wysiwyg-editor';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { protectedEditorConfig, protectedPostConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { TGetPost } from '@/lib/query/writing/get-post';
import { PostModel } from '@/lib/zod';
import { Loader2 as SpinnerIcon } from 'lucide-react';
import { toast } from 'sonner';

import { defaultEditorContent } from './wysiwyg/default-content';

export const dynamic = 'force-dynamic';

export const postEditFormSchema = PostModel.pick({
  content: true,
});

interface EditorProps {
  post: NonNullable<TGetPost>;
  userId: string;
}

const Editor: FC<EditorProps> = ({ post, userId }) => {
  const router = useRouter();
  const [content, setContent] = useState<string>(
    post?.content || JSON.stringify(defaultEditorContent)
  );

  const { isLoading, execute } = useAction(updatePostMeta, {
    onSuccess: () => {
      router.refresh();
      toast.success('Post updated');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  async function onSubmit() {
    await execute({
      id: post.id,
      content,
      keys: ['content'],
    });
  }

  return (
    <>
      <div className="space-y-8">
        <TitleSlugSetting id={post.id} title={post.title} slug={post.slug} />

        <StatusSetting id={post.id} published={post.published} />

        <PostTypeSetting id={post.id} type={post.type} />

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{protectedEditorConfig.categoryTitle}</CardTitle>
            <CardDescription>
              {protectedEditorConfig.categoryDescription}
            </CardDescription>
          </CardHeader>
          <Separator className="mb-8" />
          <CardContent className="space-y-4">Adding Soon</CardContent>
        </Card>

        <DescriptionSetting id={post.id} description={post.description} />

        <ImageSetting
          id={post.id}
          userId={userId}
          image={post.image}
          imageBlurhash={post.imageBlurhash}
        />

        <WysiwygEditor
          defaultValue={content ? JSON.parse(content) : defaultEditorContent}
          onDebouncedUpdate={(editor) => {
            setContent(JSON.stringify(editor?.getJSON()));
          }}
        />

        <div className="inline-flex items-center justify-start space-x-3">
          <Button
            type="submit"
            className="flex px-10"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {protectedEditorConfig.submit}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="flex"
            variant="outline"
            disabled={isLoading}
          >
            {protectedEditorConfig.cancel}
          </Button>
        </div>
      </div>
      <AlertDialog open={isLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedPostConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Editor;
