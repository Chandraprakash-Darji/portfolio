import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePostMeta } from '@/actions/writing/update-post';
import { AutosizeTextarea } from '@/components/autosize-textarea';
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
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { protectedEditorConfig, protectedPostConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { PostModel } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = PostModel.pick({ description: true });
const PropsSchema = PostModel.pick({ description: true, id: true });

type TPropsSchema = z.infer<typeof PropsSchema>;

const DescriptionSetting = ({ id, ...defaultValues }: TPropsSchema) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const router = useRouter();
  const { isLoading, execute } = useAction(updatePostMeta, {
    onSuccess: () => {
      router.refresh();
      toast.success(protectedPostConfig.successUpdate);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await execute({
      id,
      description: data.description || '',
      keys: ['description'],
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{protectedEditorConfig.shortDescriptionTitle}</CardTitle>
            <CardDescription>
              {protectedEditorConfig.shortDescriptionDescription}
            </CardDescription>
          </CardHeader>
          <Separator className="mb-8" />
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder={protectedEditorConfig.placeholderDescription}
                      value={value || ''}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
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

export default DescriptionSetting;
