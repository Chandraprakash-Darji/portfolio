import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePostMeta } from '@/actions/writing/update-post';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { protectedEditorConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { PostModel } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, SparklesIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import slugify from 'react-slugify';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = PostModel.pick({ title: true, slug: true });
const PropsSchema = PostModel.pick({ title: true, slug: true, id: true });

type TPropsSchema = z.infer<typeof PropsSchema>;

const TitleSlugSetting = ({ id, ...defaultValues }: TPropsSchema) => {
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
      title: data.title || 'Untitled',
      slug: data.slug || `untitled-${nanoid()}`,
      keys: ['title', 'slug'],
    });
  });

  return (
    <Form {...form}>
      {/* Title */}
      <form onSubmit={onSubmit} className="space-y-8">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{protectedEditorConfig.generalTitle}</CardTitle>
            <CardDescription>
              {protectedEditorConfig.generalDescription}
            </CardDescription>
          </CardHeader>
          <Separator className="mb-8" />
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full max-w-md">
                  <FormLabel>{protectedEditorConfig.formTitle}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={protectedEditorConfig.placeHolderTitle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="w-full max-w-md">
                  <FormLabel>{protectedEditorConfig.slug}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={protectedEditorConfig.placeholderSlug}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        field.onChange(slugify(form.getValues('title')))
                      }
                    >
                      <SparklesIcon className="mr-2 h-4 w-4" />
                      {protectedEditorConfig.generateSlug}
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default TitleSlugSetting;
