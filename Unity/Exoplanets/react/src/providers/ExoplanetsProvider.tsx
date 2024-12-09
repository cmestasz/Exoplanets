import { AlertContext } from '@components/modals/AlertContext';
import { Exoplanet } from '@mytypes/astros';
import { AsyncData } from '@mytypes/index';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useParams } from 'react-router';
import { API_URL } from 'src/config';

const ExoplanetsCont = createContext<{
  exoplanets: AsyncData<Exoplanet[]>,
  selectedExo: Exoplanet,
  changeSelectedExo:(exo: Exoplanet, redir?: boolean) => void,
  get_next_exos: (amount?: number) => void
}>(null);

export function useExoplanets() {
  return useContext(ExoplanetsCont);
}

export default function ExoplanetsProvider() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { param } = useParams();
  const [exoplanets, setExoplanets] = useState<AsyncData<Exoplanet[]>>({ state: 'loading' });
  const showAlert = useContext(AlertContext);
  const [selectedExo, setSelectedExo] = useState<Exoplanet>();
  const [rendered, setRendered] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const changeSelectedExo = useCallback((exo: Exoplanet, redir?: boolean) => {
    setSelectedExo(exo);
    if (redir) nav(exo.name, { replace: true });
  }, [nav]);
  const get_next_exos = useCallback((amount: number = 20) => {
    const url = `${API_URL}/get_some_exoplanets`;
    setExoplanets((oldExos) => ({
      state: 'loading',
      data: oldExos.data,
    }));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        index,
        amount,
      }),
    })
      .then((res) => res.json())
      .then((exos: string) => {
        const normalizedExos = JSON.parse(exos);
        setExoplanets((oldExos) => {
          const data = oldExos.data ? [...oldExos.data, ...normalizedExos] : normalizedExos;
          return {
            state: 'loaded',
            data,
          };
        });
        setIndex((prevIndex) => prevIndex + amount);
      })
      .catch((e) => {
        showAlert({ message: t('pages.exoplanets.fetch-error'), type: 'error' });
        console.log(e.message);
        setExoplanets((oldExos) => ({
          state: 'error',
          data: oldExos.data,
        }));
      });
  }, [t, index, showAlert]);
  useEffect(() => {
    if (!rendered) {
      get_next_exos();
      setRendered(true);
    }
  }, [rendered, get_next_exos]);
  useEffect(() => {
    if (!selectedExo && Array.isArray(exoplanets.data)) {
      const exoRoute = exoplanets.data.find((exo) => param && exo.name === param);
      if (exoRoute) setSelectedExo(exoRoute);
      else if (exoplanets.data.length > 0) setSelectedExo(exoplanets.data[0]);
    }
  }, [exoplanets, selectedExo, param]);
  const exoData = useMemo(() => ({
    exoplanets, selectedExo, changeSelectedExo, get_next_exos,
  }), [exoplanets, selectedExo, changeSelectedExo, get_next_exos]);
  return (
    <ExoplanetsCont.Provider
      value={exoData}
    >
      <Outlet />
    </ExoplanetsCont.Provider>
  );
}
