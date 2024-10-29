import { Astro } from '@mytypes/Astro';
import { useEffect, useRef, useState } from 'react';
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

  const handleHover = (isHover: boolean) => {
    setCardHover(isHover);
  };

  const handleNext = () => {
    if (iterator.current) {
      setCurrentAstro(iterator.current.next());
    }
  };

  const handleBefore = () => {
    if (iterator.current) {
      setCurrentAstro(iterator.current.before());
    }
  };

  // const cardVariants: Variants = {
  //   initial: {
  //     opacity: 0,
  //   },
  //   animate: {
  //     opacity: 1,
  //   },
  //   exit: {
  //     opacity: 0,
  //   },
  // };

  return (
    <div className="flex flex-row w-fit">
      <ArrowSlider toLeft onClick={handleBefore} cardHover={cardHover} />
      <div
        className="size-48 relative border-transparent border-t-primary hover:border-t-secondary border-b-primary hover:border-b-secondary border-2"
      >
        {currentAstro && (
          <div
            key={currentAstro.astro.name}
            className="absolute size-full transition-all [&:enter]:opacity-0 [&:enter]:state-duration-0 state-duration-1000 [&:leave]:opacity-0"
            // variants={cardVariants}
            // initial="initial"
            // animate="animate"
            // exit="exit"
            // transition={{ duration: 0.2 }}
            // layout
          >
            <AstroCard
              astro={currentAstro.astro}
              onClick={currentAstro.onClick}
              // fontTitle="font-exo"
              className="rounded-none border-none px-6"
              handExHover={handleHover}
              size="small"
            />
          </div>
        )}

      </div>
      <ArrowSlider onClick={handleNext} cardHover={cardHover} />
    </div>
  );
}
