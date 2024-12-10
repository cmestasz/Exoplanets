import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { Astro } from '@mytypes/astros';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ReactUnity, useGlobals } from '@reactunity/renderer';
import { AstroPrefabBuilder } from '@mytypes/unity';
import { MATERIAL_AMOUNT } from '@lib/constants';

export interface AstroCardProps {
  astro: Astro;
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
  const astroPrefab = useGlobals().AstroPrefabBuilder as AstroPrefabBuilder;
  const prefabRef = useRef<ReactUnity.UGUI.PrefabComponent>();

  const buttonBaseStyle = 'relative font-exo flex flex-col items-center transition-all duration-200 hover:ease-out border-2 rounded-2xl ease-in-out active:scale-[0.98] active:ease-out py-6 px-10 gap-1 text-5xl flex-initial';
  const buttonColorStyle = invertedStyle ? `${INVERTED_COLOR} border-secondary hover:border-primary` : `${DEFAULT_COLOR} border-primary hover:border-secondary`;
  const handleHover = (ishover: boolean) => {
    setIsHover(ishover);
    if (handExHover) handExHover(ishover);
  };
  useEffect(() => {
    if (prefabRef.current) {
      astroPrefab.Build(prefabRef.current, astro.id % MATERIAL_AMOUNT);
    }
  }, [prefabRef, astroPrefab, astro.id]);
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
      style={{ aspectRatio: '1' }}
    >
      <prefab
        ref={prefabRef}
        className="flex-1 basis-64"
      />
      <p className="flex-initial text-ellipsis overflow-hidden whitespace-nowrap leading-[4rem] max-w-full">
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
