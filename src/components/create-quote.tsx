import { JwtPayload } from 'jwt-decode';
import { Images, X } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { createQuote, uploadImage } from '@/lib/services';

interface IProps {
  user?: JwtPayload;
}

const createQuoteSchema = z.object({
  text: z.string().min(1, 'Quote is required'),
});

type CrateQuoteSchema = z.infer<typeof createQuoteSchema>;

const src = `https://avatar.iran.liara.run/public/${Math.random() * 10}`;

export default function CreateQuote({ user }: IProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);

  const form = useForm<CrateQuoteSchema>({
    resolver: zodResolver(createQuoteSchema),
    defaultValues: {
      text: '',
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      if (e.target.files) {
        e.target.files = null;
      }
    }
  };

  const onSubmit = async ({ text }: CrateQuoteSchema) => {
    let uploadedFile = null;
    if (selectedImage) {
      const fileData = new FormData();
      fileData.append('file', selectedImage);
      uploadedFile = await uploadImage(fileData);
    }
    if (selectedImage && !uploadedFile) {
      toast({
        title: 'Error',
        description: 'Error uploading Image',
        variant: 'destructive',
      });
      return;
    }
    const mediaUrl = uploadedFile && uploadedFile.length > 0 ? uploadedFile[0].url : undefined;
    const res = await createQuote({ text, mediaUrl });
    if (res === null) {
      toast({
        title: 'Error',
        description: 'Error posting Quote',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Success',
      description: 'Posted',
      variant: 'success',
    });
    form.resetField('text');
    setSelectedImage(null);
    navigate('/home');
  };

  return (
    <div className="mx-auto max-w-xl w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="my-4">
            <CardContent className="p-5 pb-2">
              <div className="flex space-x-2">
                <div className="">
                  <img
                    src={src}
                    loading="lazy"
                    alt={`${user?.username ?? 'user'}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={2}
                            placeholder={`What's on your mind, ${user?.username || 'user'}?`}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 resize-none outline-none border-none lg:text-lg text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedImage && (
                    <div className="p-1 relative">
                      <div
                        className="bg-slate-800 z-20 rounded-full absolute right-2 top-2 cursor-pointer hover:bg-slate-900 transition-colors p-2"
                        onClick={() => {
                          setSelectedImage(null);
                          if (inputRef.current) {
                            inputRef.current.files = null;
                          }
                        }}
                      >
                        <X className="text-white text-sm" />
                      </div>
                      <img
                        width={'100'}
                        height={'100'}
                        className="w-full h-full rounded-lg"
                        src={URL.createObjectURL(selectedImage)}
                        alt="post"
                      />
                    </div>
                  )}
                  <Separator />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 pb-2">
              <img
                src={'src'}
                loading="lazy"
                alt={`${user?.username}'s avatar`}
                width={40}
                height={40}
                className="rounded-full mr-2 opacity-0"
              />
              <div className="flex flex-1">
                <Input
                  accept="image/*"
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
                <Images
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  className="cursor-pointer"
                />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || form.getValues().text.length === 0}
                className="ms-auto bg-slate-800"
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Post
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
