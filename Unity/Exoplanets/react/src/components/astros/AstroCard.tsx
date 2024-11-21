import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { Astro } from '@mytypes/astros';
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
}

export default function AstroCard({
  astro, onClick, invertedStyle, className, onDoubleClick, handExHover,
}: AstroCardProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const buttonBaseStyle = 'relative font-exo flex flex-col items-center transition-all duration-200 hover:ease-out border-2 rounded-2xl ease-in-out active:scale-[0.98] active:ease-out flex-auto max-w-sm max-h-sm py-8 px-10 gap-1';
  const buttonColorStyle = invertedStyle ? `${INVERTED_COLOR} border-secondary hover:border-primary` : `${DEFAULT_COLOR} border-primary hover:border-secondary`;
  const handleHover = (ishover: boolean) => {
    setIsHover(ishover);
    if (handExHover) handExHover(ishover);
  };
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className={twMerge(
        buttonBaseStyle,
        buttonColorStyle,
        className,
      )}
    >
      <div
        className={clsx(
          'rounded-full flex-auto p-5',
        )}
      >
        <img
          src={astro.imageUrl}
          alt={astro.name || ''}
          className="w-full"
        />
      </div>
      <p className="text-ellipsis overflow-hidden whitespace-nowrap flex-auto text-5xl leading-[4rem]">
        {astro.name}
      </p>
      {
        isHover && (
          <icon
            key="externalLinkCard"
            className={clsx(
              'absolute top-2 right-2 duration-300 transition-all enter:opacity-0 enter:trans-x-4 enter:-trans-y-4 enter:state-duration-0 state-duration-500 trans-0 leave:trans-x-4 leave:-trans-y-4 leave:opacity-0 m-duration-500 m-ease-out text-5xl',
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
