import { useTranslation } from 'react-i18next';
import { useCallback, useContext, useState } from 'react';
import { AsyncData, AsyncResponse } from '@mytypes/index';
import { Exoplanet } from '@mytypes/astros';
import { API_URL } from 'src/config';
import { AlertContext } from '@components/modals/AlertContext';
import ShowExoplanets from './ShowExoplanets';
import Preview from './Preview';
import { useExoplanets } from '../../providers/ExoplanetsProvider';

export default function Exoplanets() {
  const { t } = useTranslation();
  const [leakedExos, setLeakedExos] = useState<AsyncData<Exoplanet[]>>({ state: 'loading' });
  const {
    exoplanets, selectedExo, changeSelectedExo,
  } = useExoplanets();
  const showAlert = useContext(AlertContext);
  const changeLeakedExos = (data: AsyncData<Exoplanet[]>) => {
    setLeakedExos(data);
  };
  const filterExos = useCallback((name: string) => {
    // Petición para filtrar exoplanetas
    if (exoplanets.state === 'loaded') {
      setLeakedExos({ state: 'loading' });
      const url = `${API_URL}/get_exoplanets_by_name`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
        .then((res) => res.json())
        .then((exos: Exoplanet[]) => {
          setLeakedExos({ state: 'loaded', data: exos } as AsyncResponse<Exoplanet[]>);
        })
        .catch((e) => {
          showAlert({ message: t('pages.exoplanets.fetch-error'), type: 'error' });
          console.log(e.message);
        });
    }
  }, [exoplanets, setLeakedExos, showAlert, t]);
  const handleSelect = useCallback((exo: Exoplanet) => {
    changeSelectedExo(exo);
  }, [changeSelectedExo]);
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
          exos={exoplanets}
          changeLeakedExos={changeLeakedExos}
        />
        <Preview
          currentExoplanet={selectedExo}
        />
      </view>
    </view>
  );
}
