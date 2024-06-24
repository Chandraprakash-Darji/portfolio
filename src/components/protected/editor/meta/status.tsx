import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePostMeta } from '@/actions/writing/update-post';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { protectedEditorConfig, protectedPostConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { PostModel } from '@/lib/zod';
import { toast } from 'sonner';
import { z } from 'zod';

const PropsSchema = PostModel.pick({ published: true, id: true });

type TPropsSchema = z.infer<typeof PropsSchema>;

const StatusSetting = ({ id, published }: TPropsSchema) => {
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
          <Label>{protectedEditorConfig.publishTitle}</Label>
          <p className="text-[0.8rem] text-muted-foreground">
            {protectedEditorConfig.publishDescription}
          </p>
        </div>
        <Switch
          checked={published}
          disabled={isLoading}
          onCheckedChange={(published) => {
            execute({
              id,
              published,
              keys: ['published'],
            });
          }}
        />
      </CardContent>
    </Card>
  );
};

export default StatusSetting;
