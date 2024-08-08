'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Icons } from '@/components/icons';
import { signIn } from '@/lib/services';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '@/lib/context';

// eslint-disable-next-line react-refresh/only-export-components
export const signInSchema = z.object({
  username: z.string().min(1, 'Required'),
  otp: z.string().min(1, 'Required'),
});

export type SignInSchema = z.infer<typeof signInSchema>;

const SignInForm = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      otp: '',
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    const token = await signIn(data);
    if (token) {
      dispatch!({
        type: 'SET',
        payload: token,
      });
      navigate('/home', { replace: true });
    } else {
      dispatch!({
        type: 'SET',
        payload: null,
      });
      toast({
        title: 'Error',
        description: 'Invalid Credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username or Email"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="OTP"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
