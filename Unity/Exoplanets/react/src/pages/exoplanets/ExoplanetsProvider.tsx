import { kepler22b, proximaCentauriB } from '@lib/mock';
import { Exoplanet } from '@mytypes/astros';
import { AsyncData, AsyncResponse } from '@mytypes/index';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

const ExoplanetsCont = createContext<{
  exoplanets: AsyncData<Exoplanet[]>,
  selectedExo: Exoplanet,
  changeSelectedExo:(exo: Exoplanet, redir?: boolean) => void
}>(null);

export function useExoplanets() {
  return useContext(ExoplanetsCont);
}

export default function ExoplanetsProvider() {
  const nav = useNavigate();
  const { name } = useParams();
  const [exoplanets, setExoplanets] = useState<AsyncData<Exoplanet[]>>({ state: 'loading' });

  const [selectedExo, setSelectedExo] = useState<Exoplanet>();
  useEffect(() => {
    const data: AsyncResponse<Exoplanet[]> = {
      state: 'loaded',
      data: [kepler22b, proximaCentauriB],
    };
    setExoplanets(data);
    const exoRoute = data.data.find((exo) => exo.name === name);
    if (exoRoute) setSelectedExo(exoRoute);
    else setSelectedExo(kepler22b);
  }, []);
  const changeSelectedExo = useCallback((exo: Exoplanet, redir?: boolean) => {
    setSelectedExo(exo);
    if (redir) nav(exo.name, { replace: true });
  }, []);
  const exoData = useMemo(() => ({
    exoplanets, selectedExo, changeSelectedExo,
  }), [exoplanets, selectedExo, changeSelectedExo]);
  return (
    <ExoplanetsCont.Provider
      value={exoData}
    >
      <Outlet />
    </ExoplanetsCont.Provider>
  );
}
