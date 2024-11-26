import { kepler22b, proximaCentauriB } from '@lib/mock';
import { Exoplanet } from '@mytypes/astros';
import { AsyncData, AsyncResponse } from '@mytypes/index';
import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Outlet } from 'react-router';

const ExoplanetsCont = createContext(null);

export function useExoplanets() {
  return useContext(ExoplanetsCont);
}

export default function ExoplanetsProvider() {
  const [exoplanets, setExoplanets] = useState<AsyncData<Exoplanet[]>>({ state: 'loading' });
  const [leakedExos, setLeakedExos] = useState<AsyncData<Exoplanet[]>>({ state: 'loading' });
  const [selectedExo, setSelectedExo] = useState<Exoplanet>();
  useEffect(() => {
    const data: AsyncResponse<Exoplanet[]> = {
      state: 'loaded',
      data: [kepler22b, proximaCentauriB],
    };
    setExoplanets(data);
    setLeakedExos(data);
    setSelectedExo(kepler22b);
  }, []);
  const exoData = useMemo(() => ({
    exoplanets, leakedExos, setLeakedExos, selectedExo, setSelectedExo,
  }), [exoplanets, leakedExos, setLeakedExos, selectedExo, setSelectedExo]);
  return (
    <ExoplanetsCont.Provider
      value={exoData}
    >
      <Outlet />
    </ExoplanetsCont.Provider>
  );
}
