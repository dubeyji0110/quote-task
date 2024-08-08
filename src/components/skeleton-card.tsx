import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface IProps {
  style?: CSSProperties;
  className?: string;
}

export function SkeletonCard({ className, style }: IProps) {
  return (
    <div className={cn('flex flex-col space-y-3', className)} style={style}>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
