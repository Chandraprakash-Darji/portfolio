import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePostMeta } from '@/actions/writing/update-post';
import {
  EditorUploadCoverImageItem,
  EditorUploadCoverImagePlaceHolder,
} from '@/components/protected/editor/upload';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { protectedEditorConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { PostModel } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { isValidImageLink } from '@/lib/utils';

const FormSchema = PostModel.pick({ image: true });
const PropsSchema = PostModel.pick({
  image: true,
  id: true,
  imageBlurhash: true,
}).extend({
  userId: z.string(),
});

type TPropsSchema = z.infer<typeof PropsSchema>;

const ImageSetting = ({
  id,
  userId,
  imageBlurhash,
  ...defaultValues
}: TPropsSchema) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const router = useRouter();
  const { isLoading, execute } = useAction(updatePostMeta, {
    onSuccess: () => {
      router.refresh();
      toast.success('Post updated');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await execute({
      id,
      image: isValidImageLink(data.image)
        ? data.image.slice()
        : process.env.NEXT_PUBLIC_PLACEHOLDER_IMG,
      keys: ['image'],
    });
  });

  return (
    <Form {...form}>
      {/* Title */}
      <form onSubmit={onSubmit} className="space-y-8">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{protectedEditorConfig.coverImageTitle}</CardTitle>
            <CardDescription>
              {protectedEditorConfig.coverImageDescription}
            </CardDescription>
          </CardHeader>
          <Separator className="mb-8" />
          <CardContent className="space-y-4">
            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...field } }) => (
                <FormItem className="w-full max-w-xl">
                  <FormControl>
                    <Input
                      placeholder={protectedEditorConfig.placeholderImage}
                      value={value || ''}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex w-full flex-col">
              {defaultValues.image ? (
                <EditorUploadCoverImageItem
                  userId={userId}
                  postId={id}
                  imageUrl={defaultValues.image}
                  blurDataURL={imageBlurhash}
                />
              ) : (
                <EditorUploadCoverImagePlaceHolder />
              )}
            </div>
          </CardContent>
          <Separator className="mb-8" />
          <CardFooter>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              {isLoading && <Loader className="mr-2 h-4 w-3 animate-spin" />}
              {protectedEditorConfig.submit}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ImageSetting;
