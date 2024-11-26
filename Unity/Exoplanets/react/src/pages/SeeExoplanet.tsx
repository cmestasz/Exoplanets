import Visualization from '@components/astros/Visualization';
import AstrosSlider from '@components/astros/AstrosSlider';
import { useCallback } from 'react';
import { Exoplanet } from '@mytypes/astros';
import { useExoplanets } from './exoplanets/ExoplanetsProvider';

export default function SeeExoplanet() {
  const {
    exoplanets, changeSelectedExo,
  } = useExoplanets();
  const handleCardClick = useCallback((exoplanet: Exoplanet) => {
    changeSelectedExo(exoplanet, true);
  }, [changeSelectedExo]);
  return (
    <view
      className="flex flex-col gap-6"
    >
      <Visualization />
      <view
        className="flex flex-row gap-16"
      >
        {
          exoplanets.state === 'loaded' && (
            <AstrosSlider
              astros={exoplanets.data}
              onCardClick={handleCardClick}
            />
          )
        }
      </view>
    </view>
  );
}
