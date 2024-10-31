import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { Astro } from '@mytypes/Astro';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
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
  const buttonBaseStyle = 'relative font-exo flex flex-col items-center gap-3 p-16 border-primary hover:border-secondary transition-all duration-200 ease-out hover:ease-out border-2 rounded-2xl';
  const buttonSizeStyle = size === 'normal' ? 'size-56' : 'size-48';
  const buttonColorStyle = invertedStyle ? INVERTED_COLOR : DEFAULT_COLOR;
  const buttonAnimation = 'scale-1 ease-in-out active:scale-[0.98] active:ease-out duration-100';
  const handleHover = (ishover: boolean) => {
    setIsHover(ishover);
    handExHover(ishover);
  };
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
          <icon
            key="externalLinkCard"
            className="absolute top-1 right-1 duration-300 transition-all enter:opacity-0 enter:trans-x-4 enter:-trans-y-4 enter:state-duration-0 state-duration-500 text-secondary trans-0 leave:trans-x-4 leave:-trans-y-4 leave:opacity-0 leave:text-primary m-duration-500 m-ease-out"
          >
            open_in_new
          </icon>
        )
      }
    </button>
  );
}
