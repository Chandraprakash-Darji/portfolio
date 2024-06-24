import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePostMeta } from '@/actions/writing/update-post';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { protectedEditorConfig, protectedPostConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { PostType } from '@/lib/enums';
import { PostModel } from '@/lib/zod';
import { toast } from 'sonner';
import { z } from 'zod';

const PropsSchema = PostModel.pick({ type: true, id: true });

type TPropsSchema = z.infer<typeof PropsSchema>;

const PostTypeSetting = ({ id, type }: TPropsSchema) => {
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

  return (
    <Card className="max-w-2xl">
      <CardContent className="flex flex-row items-center justify-between rounded-lg p-6 shadow-sm">
        <div className="space-y-0.5">
          <Label>{protectedEditorConfig.postTypeTitle}</Label>
          <p className="text-[0.8rem] text-muted-foreground">
            {protectedEditorConfig.postTypeDescription}
          </p>
        </div>
        <Tabs
          defaultValue={type}
          onValueChange={(v) => {
            execute({ id, type: v as keyof typeof PostType, keys: ['type'] });
          }}
          aria-disabled={isLoading}
        >
          <TabsList>
            {Object.keys(PostType).map((key) => (
              <TabsTrigger key={key} value={key} disabled={isLoading}>
                {PostType[key as keyof typeof PostType]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostTypeSetting;
