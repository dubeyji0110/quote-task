import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { JwtPayload } from 'jwt-decode';

import CreateButton from '@/components/create-button';
import Header from '@/components/header';
import QuoteCard from '@/components/quote-card';
import { SkeletonCard } from '@/components/skeleton-card';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { IQuote } from '@/lib/interfaces';
import { getQuotes } from '@/lib/services';
import CreateQuote from '@/components/create-quote';
import { useStateValue } from '@/lib/context';

interface IProps {
  user?: JwtPayload;
}

export default function Home({ user }: IProps) {
  const navigate = useNavigate();
  const [auth, dispatch] = useStateValue();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [offset, setOffset] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitialQuotes = useCallback(async () => {
    const _quotes = await getQuotes({ offset: 0, limit: 10 });
    if (_quotes) {
      setQuotes(_quotes);
    } else {
      toast({
        title: 'Error',
        description: 'Error fetching Quotes',
        variant: 'destructive',
      });
      dispatch!({
        type: 'SET',
        payload: null,
      });
      navigate(0);
    }
  }, [dispatch, navigate, toast]);

  const fetchQuotes = async () => {
    const _quotes = await getQuotes({ offset, limit: 10 });
    if (_quotes) {
      setQuotes((prev) => [...prev, ..._quotes]);
      if (_quotes.length < 10) setHasMore(false);
      setOffset((pre) => pre + 10);
    } else {
      toast({
        title: 'Error',
        description: 'Error fetching Quotes',
        variant: 'destructive',
      });
      dispatch!({
        type: 'SET',
        payload: null,
      });
      navigate(0);
    }
  };

  useEffect(() => {
    axios.defaults.headers.common.Authorization = auth;
    fetchInitialQuotes();
  }, [auth, fetchInitialQuotes]);

  return (
    <>
      <Header />
      <CreateQuote user={user} />
      <div className="max-w-xl w-full mx-auto my-4">
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchQuotes}
          loader={<SkeletonCard className="w-100" />}
          endMessage={
            <p className="font-semibold text-center pb-4 text-muted-foreground">
              ************* End Of Data *************
            </p>
          }
          dataLength={quotes.length}
        >
          {quotes.map((quote) => (
            <QuoteCard quote={quote} key={quote.id} />
          ))}
        </InfiniteScroll>
      </div>
      <CreateButton />
    </>
  );
}
