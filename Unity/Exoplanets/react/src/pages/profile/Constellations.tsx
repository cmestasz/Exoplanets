import { Text } from '@components/ui/Text';
import {
  Alpha_Centauri_A, Alpha_Centauri_B, Kepler_21, Kepler_22, ProximaCentauri,
} from '@lib/mock';
import { Constellation } from '@mytypes/astros';
import { AsyncData } from '@mytypes/index';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function Constellations() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [userConst, setUserConst] = useState<AsyncData<Constellation[]>>({ state: 'loading' });
  const [selectedConstellation, setSelectedConst] = useState<Constellation>();
  // Only for tests
  // eslint-disable-next-line max-len
  const timeout = (ms: number) => new Promise<number>((resolve: (value: number) => void) => { setTimeout(() => resolve(ms), ms); });
  const handleSelected = (constellation: Constellation) => {
    setSelectedConst(constellation);
  };
  const getConstellations = useCallback(async () => {
    await timeout(2000);
    setUserConst({
      state: 'loaded',
      data: [
        { name: 'SampleConstellation1', stars: [Kepler_22, ProximaCentauri] },
        { name: 'SampleConstellation2', stars: [Kepler_21, Alpha_Centauri_A, Alpha_Centauri_B] },
      ],
    });
    setSelectedConst({ name: 'SampleConstellation1', stars: [Kepler_22, ProximaCentauri] });
  }, []);
  useEffect(() => {
    // Is caching the constellations a good idea?
    let isMounted = true;
    getConstellations().catch((r) => {
      if (isMounted) {
        console.log('Error thowed by me: ', r);
        setUserConst({ state: 'error' });
      }
    });
    return () => { isMounted = false; };
  }, [getConstellations]);
  if (userConst.state === 'loading') return <div>Loading</div>;
  if (userConst.state !== 'loaded' || !selectedConstellation) return null;
  return (
    <view
      className="flex flex-col gap-8 pt-8 flex-auto"
    >
      <view
        className="flex-auto gap-5"
      >
        <h2
          className="text-primary text-5xl font-audiowide leading-10"
        >
          {selectedConstellation.name}
        </h2>
        <view
          className="flex-auto border-primary border-2 rounded-lg"
        >
          Visualization
        </view>
      </view>
      <view
        className="gap-5"
      >
        <header className="flex flex-row justify-between">
          <h2 className="text-primary text-5xl font-audiowide leading-10">
            {t('pages.profile.constellations.visit')}
          </h2>
          <Text
            invertedStyle
            asButton
            onClick={() => nav('/profile/help')}
            className="text-3xl"
          >
            <span>{t('pages.profile.constellations.howto')}</span>
            <icon className="text-4xl">help</icon>
          </Text>
        </header>
        <scroll
          className="flex flex-col border-2 border-primary py-4 gap-3 rounded-lg max-h-52 px-7"
        >
          {
            userConst.data.map((constellation, i, arr) => (
              <>
                <Text
                  invertedStyle
                  asButton
                  onClick={() => handleSelected(constellation)}
                  className="text-4xl"
                >
                  {constellation.name}
                </Text>
                {i !== arr.length - 1 && <hr className="w-full border-primary border-[1px]" />}
              </>
            ))
          }
        </scroll>
      </view>
    </view>
  );
}
