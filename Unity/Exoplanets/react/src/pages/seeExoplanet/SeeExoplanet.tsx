import Visualization from '@components/astros/Visualization';
import AstrosSlider from '@components/astros/AstrosSlider';
import { useCallback } from 'react';
import { Exoplanet } from '@mytypes/astros';
import { useExoplanets } from '../../providers/ExoplanetsProvider';
import ExoData from './ExoData';

export default function SeeExoplanet() {
  const {
    exoplanets, selectedExo, changeSelectedExo,
  } = useExoplanets();
  const handleCardClick = useCallback((exoplanet: Exoplanet) => {
    changeSelectedExo(exoplanet, true);
  }, [changeSelectedExo]);
  return (
    <view
      className="flex flex-col flex-auto gap-6"
    >
      <Visualization />
      <view
        className="flex flex-row portrait:flex-col-reverse gap-16 flex-initial"
      >
        {
          exoplanets.state === 'loaded' && (
            <AstrosSlider
              astros={exoplanets.data}
              onCardClick={handleCardClick}
              current={selectedExo}
            />
          )
        }
        <ExoData
          exo={selectedExo}
        />
      </view>
    </view>
  );
}
