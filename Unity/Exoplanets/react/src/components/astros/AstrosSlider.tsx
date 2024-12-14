/* eslint-disable react/no-unknown-property */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ArrayInfIterator } from '@lib/utils';
import { Astro } from '@mytypes/astros';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import { AdjustCamera } from '@mytypes/unity';
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
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera = useGlobals().AuxiliarCamera2 as UnityEngine.Camera;
  const viewRef = useRef<ReactUnity.UGUI.ContainerComponent>();
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
  useEffect(() => {
    if (viewRef.current) {
      adjustCamera.AdjustSecondAuxiliar(viewRef.current);
    }
  }, [viewRef, adjustCamera]);

  return (
    <div className="flex flex-row flex-initial basis-1/2">
      <ArrowSlider toLeft onClick={handleBefore} cardHover={cardHover} />
      <div
        className="relative flex-grow basis-1/3 min-h-[42%] border-transparent border-t-primary hover:border-t-secondary border-b-primary hover:border-b-secondary border-2"
        ref={viewRef}
      >
        <render
          width={500}
          height={500}
          camera={auxiliarCamera}
          onScroll={(ev: UnityEngine.EventSystems.PointerEventData) => {
            auxiliarCamera.transform.Translate(
              0,
              0,
              Math.fround(ev.scrollDelta.y * 10),
              Interop.UnityEngine.Space.Self,
            );
          }}
          onMount={(ev) => ev.gameObject.SetActive(true)}
          onUnmount={(ev) => ev.gameObject.SetActive(false)}
          className="absolute inset-0"
        />
        {currentAstro && (
          <AstroCard
            key={currentAstro.name}
            astro={currentAstro}
            onClick={() => onCardClick(currentAstro)}
            className="absolute inset-0 rounded-none border-none px-6 transition-all duration-700 enter:opacity-0 enter:state-duration-0 state-duration-700 leave:opacity-0"
            handExHover={handleHover}
          />
        )}

      </div>
      <ArrowSlider onClick={handleNext} cardHover={cardHover} />
    </div>
  );
}
