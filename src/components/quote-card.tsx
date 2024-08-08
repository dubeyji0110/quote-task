import { CSSProperties } from 'react';
import { Card, CardDescription, CardFooter, CardTitle } from './ui/card';
import { IQuote } from '@/lib/interfaces';
import { formatTime } from '@/lib/utils';

interface IProps {
  quote: IQuote;
  className?: string;
  style?: CSSProperties;
}

export default function QuoteCard({ quote }: IProps) {
  const getRandomPhoto = (id: number) => {
    return `https://picsum.photos/300/500?random=${id}`;
  };

  return (
    <Card key={quote.id} className="quote-card relative overflow-hidden my-4">
      <div className="relative">
        <img
          src={quote.mediaUrl ?? getRandomPhoto(quote.id)}
          alt="image"
          className="w-full h-full max-h-96 object-cover"
        />
        <div className="flex items-center justify-center p-4 absolute inset-0 bg-black bg-opacity-50">
          <CardTitle className="text-white text-2xl font-semibold text-center">
            {quote.text}
          </CardTitle>
        </div>
      </div>
      <CardFooter className="flex flex-row justify-between p-4">
        <CardDescription className="flex items-center text-lg font-medium text-black">
          <img
            src={`https://avatar.iran.liara.run/public/${quote.id}`}
            loading="lazy"
            alt={`${quote.username}'s avatar`}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          {quote.username}
        </CardDescription>
        <p className="text-muted-foreground">{formatTime(quote.createdAt)}</p>
      </CardFooter>
    </Card>
  );
}
