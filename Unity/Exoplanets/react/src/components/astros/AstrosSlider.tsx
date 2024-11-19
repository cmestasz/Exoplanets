import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ArrayInfIterator } from '@lib/utils';
import AstroCard, { AstroCardProps } from './AstroCard';
import ArrowSlider from './ArrowSlider';

interface AstroSliderProps {
  astros: Omit<AstroCardProps, 'invertedStyle' | 'handExHover'>[];
}

export default function AstrosSlider({
  astros,
}: AstroSliderProps) {
  const iterator = useRef<ArrayInfIterator<
  Omit<AstroCardProps, 'invertedStyle' | 'handExHover'>
  > | null>(null);
  const [currentAstro, setCurrentAstro] = useState<Omit<AstroCardProps, 'invertedStyle' | 'handExHover'> | null>(null);
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
            className="rounded-none border-none px-6 absolute size-full transition-all duration-700 enter:opacity-0 enter:state-duration-0 state-duration-700 leave:opacity-0"
            handExHover={handleHover}
          />
        )}

      </div>
      <ArrowSlider onClick={handleNext} cardHover={cardHover} />
    </div>
  );
}
