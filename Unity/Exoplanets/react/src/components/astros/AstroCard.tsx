import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { Astro } from '@mytypes/Astro';
import { FiExternalLink } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { useInOutAnimation } from '@lib/hooks';
import clsx from 'clsx';

export interface AstroCardProps<T extends Astro> {
  astro: T;
  invertedStyle?: boolean;
  onClick: () => void;
  className?: string;
  onDoubleClick?: () => void;
  handExHover: (isHov: boolean) => void;
  size?: 'normal' | 'small';
}

export default function AstroCard<T extends Astro>({
  astro, onClick, invertedStyle, className, onDoubleClick, handExHover, size = 'normal',
}: AstroCardProps<T>) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { state, setState } = useInOutAnimation({ durationIn: 200 });
  const buttonBaseStyle = 'relative font-exo flex flex-col items-center gap-3 p-16 border-primary hover:border-secondary transition-all duration-200 ease-out hover:ease-out border-2 rounded-2xl';
  const buttonSizeStyle = size === 'normal' ? 'size-56' : 'size-48';
  const buttonColorStyle = invertedStyle ? INVERTED_COLOR : DEFAULT_COLOR;
  const buttonAnimation = 'scale-1 ease-in-out active:scale-[0.98] active:ease-out duration-100';
  const handleHover = (ishover: boolean) => {
    setIsHover(ishover);
    handExHover(ishover);
    if (ishover) {
      setState('in');
    } else {
      setState('out');
    }
  };
  useEffect(() => {
  }, [state, isHover]);
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className={twMerge(
        buttonBaseStyle,
        buttonSizeStyle,
        buttonColorStyle,
        buttonAnimation,
        className,
      )}
    >
      <div
        className="relative aspect-square rounded-full overflow-clip w-fit"
      >
        <image
          src={astro.imageUrl}
          alt={astro.name || ''}
          className={twMerge(
            'object-cover rounded-full',
            clsx({
              'w-40': size === 'normal',
              'w-28': size === 'small',
            }),
          )}
        />
      </div>
      <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
        {astro.name}
      </p>
      {
        isHover && (
          <FiExternalLink
            key="externalLinkCard"
            className="absolute top-2 right-2 duration-300 transition-all [&:enter]:opacity-0 [&:enter]:trans-x-4 [&:enter]:-trans-y-4 [&:enter]:scale-75 [&:enter]:state-duration-0 state-duration-500 text-secondary trans-0 [&:leave]:trans-x-4 [&:leave]:-trans-y-4 [&:leave]:opacity-0 [&:leave]:text-primary [&:leave]:scale-70"
            style={{ motion: '0.5s 0s ease-out' }}
          />
        )
      }
    </button>
  );
}
