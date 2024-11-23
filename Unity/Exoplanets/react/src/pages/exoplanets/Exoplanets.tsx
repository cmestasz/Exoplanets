import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { AsyncData } from '@mytypes/index';
import { Exoplanet } from '@mytypes/astros';
import { kepler22b, proximaCentauriB } from '@lib/mock';
import ShowExoplanets from './ShowExoplanets';
import Preview from './Preview';

export default function Exoplanets() {
  const { t } = useTranslation();
  const [exoplanets, setExoplanets] = useState<AsyncData<Exoplanet[]>>({ state: 'loading' });
  const [selectedExo, setSelectedExo] = useState<Exoplanet>();
  const handleSelect = useCallback((exo: Exoplanet) => {
    setSelectedExo(exo);
  }, []);
  useEffect(() => {
    setExoplanets({ state: 'loaded', data: [kepler22b, proximaCentauriB] });
    setSelectedExo(kepler22b);
  }, []);
  return (
    <view
      className="flex flex-col flex-auto gap-2"
    >
      <h1
        className="font-audiowide text-5xl text-primary"
      >
        {t('pages.exoplanets.title')}
      </h1>
      <view
        className="flex flex-row gap-10 flex-auto"
      >
        <ShowExoplanets exoplanets={exoplanets} handleSelect={handleSelect} />
        <Preview currentExoplanet={selectedExo} />
      </view>
    </view>
  );
}
