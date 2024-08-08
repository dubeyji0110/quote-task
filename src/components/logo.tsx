import { CSSProperties, MouseEventHandler } from 'react';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Logo({ className, style, onClick }: IProps) {
  return (
    <div
      style={style}
      onClick={onClick}
      className={cn('flex justify-center items-center', className)}
    >
      <img className="me-2 rounded-full" width={50} height={50} src={'/logo.png'} alt="logo" />
      <span className="text-2xl font-bold">Quoto</span>
    </div>
  );
}
