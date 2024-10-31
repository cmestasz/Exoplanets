import { Astro } from '@mytypes/Astro';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ArrayInfIterator } from '@lib/utils';
import AstroCard, { AstroCardProps } from './AstroCard';
import ArrowSlider from './ArrowSlider';

interface AstroSliderProps<T extends Astro> {
  astros: Omit<AstroCardProps<T>, 'invertedStyle' | 'handExHover'>[];
}

export default function AstrosSlider<T extends Astro>({
  astros,
}: AstroSliderProps<T>) {
  const iterator = useRef<ArrayInfIterator<
  Omit<AstroCardProps<T>, 'invertedStyle' | 'handExHover'>
  > | null>(null);
  const [currentAstro, setCurrentAstro] = useState<Omit<AstroCardProps<T>, 'invertedStyle' | 'handExHover'> | null>(null);
  const [cardHover, setCardHover] = useState<boolean>(false);

  useEffect(() => {
    if (astros.length > 0) {
      iterator.current = new ArrayInfIterator(astros);
      setCurrentAstro(iterator.current.next());
    }
  }, [astros]);

  const handleHover = useCallback((isHover: boolean) => {
    setCardHover(isHover);
  }, []);

  const handleNext = useCallback(() => {
    if (iterator.current) {
      setCurrentAstro(iterator.current.next());
    }
  }, [iterator]);

  const handleBefore = useCallback(() => {
    if (iterator.current) {
      setCurrentAstro(iterator.current.before());
    }
  }, [iterator]);

  return (
    <div className="flex flex-row w-fit">
      <ArrowSlider toLeft onClick={handleBefore} cardHover={cardHover} />
      <div
        className="size-48 relative border-transparent border-t-primary hover:border-t-secondary border-b-primary hover:border-b-secondary border-2"
      >
        {currentAstro && (
          <AstroCard
            key={currentAstro.astro.name}
            astro={currentAstro.astro}
            onClick={currentAstro.onClick}
            className="rounded-none border-none px-6 absolute size-full transition-all enter:opacity-0 enter:state-duration-0 state-duration-500 leave:opacity-0"
            handExHover={handleHover}
            size="small"
          />
        )}

      </div>
      <ArrowSlider onClick={handleNext} cardHover={cardHover} />
    </div>
  );
}
