import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ArrayInfIterator } from '@lib/utils';
import { Astro } from '@mytypes/astros';
import AstroCard from './AstroCard';
import ArrowSlider from './ArrowSlider';

interface AstroSliderProps<T extends Astro> {
  astros: T[];
  current?: T;
  onCardClick: (astro: T) => void;
}

export default function AstrosSlider<T extends Astro>({
  astros, current, onCardClick,
}: AstroSliderProps<T>) {
  const iterator = useRef<ArrayInfIterator<T>>(null);
  const [currentAstro, setCurrentAstro] = useState<T>(null);
  const [cardHover, setCardHover] = useState<boolean>(false);

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

  useEffect(() => {
    if (astros.length > 0) {
      iterator.current = new ArrayInfIterator(astros, current);
      setCurrentAstro(iterator.current.next());
    }
  }, [astros, current]);

  return (
    <div className="flex flex-row w-fit">
      <ArrowSlider toLeft onClick={handleBefore} cardHover={cardHover} />
      <div
        className="size-48 relative border-transparent border-t-primary hover:border-t-secondary border-b-primary hover:border-b-secondary border-2"
      >
        {currentAstro && (
          <AstroCard
            key={currentAstro.name}
            astro={currentAstro}
            onClick={() => onCardClick(currentAstro)}
            className="rounded-none border-none px-6 absolute size-full transition-all duration-700 enter:opacity-0 enter:state-duration-0 state-duration-700 leave:opacity-0"
            handExHover={handleHover}
          />
        )}

      </div>
      <ArrowSlider onClick={handleNext} cardHover={cardHover} />
    </div>
  );
}
