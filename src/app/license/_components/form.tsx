'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';
import { useAction } from '@/hooks/use-action';

import { Icons } from '@/components/icons';
import { UnstyledLink } from '@/components/links';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

import { activateLicense } from '@/actions/license/active';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  license_key: z.string().uuid({
    message: 'License key must be a valid UUID. Please check your email.',
  }),
});

type Props = {
  license_key?: string;
};
const LicenseForm = ({ license_key = '' }: Props) => {
  const [completed, setCompleted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      license_key,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    execute(data);
  }

  const { execute, isLoading } = useAction(activateLicense, {
    onSuccess: () => {
      toast('You have been invited to the Portfolio Repo');

      setCompleted(true);
    },
    onError: (error) => {
      toast.error(error, {
        description:
          'Please ensure you have entered the correct license key and username. If you continue to have issues, please contact support.',
        duration: 7500,
      });
      logger({ error });
    },
  });

  if (completed) {
    return (
      <div className='mt-5'>
        <Alert variant='success'>
          <CheckCircle className='h-4 w-4' />
          <AlertTitle>You're all set!</AlertTitle>
          <AlertDescription>
            We have added you to the Chandraprakash Org kits. You can now access
            the kits on GitHub. If you didn't receive an invite, please{' '}
            <UnstyledLink href='mailto:prakashchandra3786@gmail.com'>
              contact us
            </UnstyledLink>
            .
          </AlertDescription>
        </Alert>
        <div className='prose prose-invert mt-4'>
          <h4>Next steps</h4>
          <ol>
            <li>
              Accept the invites to the kits you want to use. The invites were
              sent to the email you signed up with on GitHub.
            </li>
            <li>
              Come say hello in our Discord Server. We're a friendly bunch and
              we're always happy to help.
            </li>
            <li>
              Check out the documentation for your favorite kit to get started.
            </li>
            <li>
              Do you want to contribute to the kits? Ask to be added to the
              contributors team on GitHub.
            </li>
            <li>Do you have any questions? Reach out via Email or Discord.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-5 w-2/3 space-y-6'
      >
        <FormField
          control={form.control}
          name='license_key'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your license key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                You should have received your license key via email from Lemon
                Squeezy, our payment processor.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Github Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                We will use this to add you to the MakerKit Github organization.
                Please ensure it is correct.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type='submit'
          disabled={isLoading}
          className={cn(
            'group relative flex w-full flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-3 font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40'
          )}
        >
          <div className='animate-gradient absolute inset-0 block h-full w-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]' />
          {isLoading && <Icons.loader className='mr-2 animate-spin' />}{' '}
          <span className='animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent'>
            {isLoading ? 'We are adding you to the Repo' : 'Get your invite'}
          </span>
        </button>
      </form>
    </Form>
  );
};

export default LicenseForm;
