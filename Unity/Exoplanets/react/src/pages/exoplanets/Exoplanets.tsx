import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { AsyncData } from '@mytypes/index';
import { Exoplanet } from '@mytypes/astros';
import ShowExoplanets from './ShowExoplanets';
import Preview from './Preview';
import { useExoplanets } from './ExoplanetsProvider';

export default function Exoplanets() {
  const { t } = useTranslation();
  const {
    exoplanets, leakedExos, setLeakedExos, selectedExo, setSelectedExo,
  } = useExoplanets();
  const changeLeakedExos = (data: AsyncData<Exoplanet[]>) => {
    setLeakedExos(data);
  };
  const filterExos = useCallback((name: string) => {
    // Petición para filtrar exoplanetas
    if (exoplanets.state === 'loaded') {
      setLeakedExos({
        state: 'loaded',
        data: exoplanets.data.filter(
          (exo) => exo.name.toLowerCase().includes(name.toLowerCase()),
        ),
      });
    }
  }, [exoplanets, setLeakedExos]);
  const handleSelect = useCallback((exo: Exoplanet) => {
    setSelectedExo(exo);
  }, [setSelectedExo]);
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
        className="flex flex-row portrait:flex-col-reverse gap-10 flex-auto"
      >
        <ShowExoplanets
          handleSelect={handleSelect}
          filterExos={filterExos}
          leakedExos={leakedExos}
          changeLeakedExos={changeLeakedExos}
        />
        <Preview
          currentExoplanet={selectedExo}
        />
      </view>
    </view>
  );
}
