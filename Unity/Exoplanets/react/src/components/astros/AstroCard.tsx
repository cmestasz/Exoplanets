import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { Astro } from '@mytypes/Astro';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import clsx from 'clsx';

export interface AstroCardProps {
  astro: Pick<Astro, 'imageUrl' | 'name'>;
  invertedStyle?: boolean;
  onClick: () => void;
  className?: string;
  onDoubleClick?: () => void;
  handExHover?: (isHov: boolean) => void;
  size?: 'normal' | 'small';
}

export default function AstroCard({
  astro, onClick, invertedStyle, className, onDoubleClick, handExHover, size = 'normal',
}: AstroCardProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const buttonBaseStyle = 'relative font-exo flex flex-col items-center gap-3 p-10 transition-all duration-200 hover:ease-out border-2 rounded-2xl ease-in-out active:scale-[0.98] active:ease-out';
  const buttonSizeStyle = size === 'normal' ? 'size-56' : 'size-48';
  const buttonColorStyle = invertedStyle ? `${INVERTED_COLOR} border-secondary hover:border-primary` : `${DEFAULT_COLOR} border-primary hover:border-secondary`;
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
        className,
      )}
    >
      <div
        className={clsx(
          'aspect-square rounded-full overflow-clip',
          {
            'w-44 text-lg': size === 'normal',
            'w-28 text-sm': size === 'small',
          },
        )}
      >
        <image
          src={astro.imageUrl}
          alt={astro.name || ''}
          className="object-cover rounded-full"
        />
      </div>
      <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
        {astro.name}
      </p>
      {
        isHover && (
          <icon
            key="externalLinkCard"
            className={clsx(
              'absolute top-1 right-1 duration-300 transition-all enter:opacity-0 enter:trans-x-4 enter:-trans-y-4 enter:state-duration-0 state-duration-500 trans-0 leave:trans-x-4 leave:-trans-y-4 leave:opacity-0 m-duration-500 m-ease-out',
              {
                'text-secondary leave:text-primary': !invertedStyle,
                'text-primary leave:text-secondary': invertedStyle,
              },
            )}
          >
            open_in_new
          </icon>
        )
      }
    </button>
  );
}
