'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { postComment } from '@/actions/writing/post-comment';
import { AutosizeTextarea } from '@/components/autosize-textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { detailCommentConfig } from '@/config/detail';
import { useAction } from '@/hooks/use-action';
import { useCurrentUser } from '@/hooks/use-current-user';
import { CommentModel } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendIcon, Loader2 as SpinnerIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const commentFormSchema = CommentModel.pick({
  content: true,
}).extend({
  email: z.string().email().optional(),
});

type FormValues = z.infer<typeof commentFormSchema>;

interface DetailPostCommentFormProps {
  postId: string;
}

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  content: '',
};

const DetailPostCommentForm: React.FC<DetailPostCommentFormProps> = ({
  postId,
}) => {
  const router = useRouter();
  const user = useCurrentUser();
  const form = useForm<FormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { isLoading, execute } = useAction(postComment, {
    onSuccess: (data) => {
      router.refresh();
      toast.success(
        data.email
          ? detailCommentConfig.successAdd
          : `Your comment will be reviewed by the admin before it's published.`
      );
      form.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  async function onSubmit(data: FormValues) {
    await execute({
      postId: postId,
      content: data.content,
      email: data.email,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {!user && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email{' '}
                  <span className="text-muted-foreground">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{detailCommentConfig.title}</FormLabel>
              <FormControl>
                <AutosizeTextarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} variant="gooeyRight">
          {isLoading ? (
            <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SendIcon className="mr-2 h-4 w-4" />
          )}
          {detailCommentConfig.submit}
        </Button>
      </form>
    </Form>
  );
};

export default DetailPostCommentForm;
