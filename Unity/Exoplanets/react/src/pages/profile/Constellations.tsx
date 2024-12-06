import Visualization from '@components/astros/Visualization';
import Spin from '@components/loading/Spin';
import Scroll from '@components/ui/Scroll';
import { Text } from '@components/ui/Text';
import { Constellation } from '@mytypes/astros';
import { AsyncData } from '@mytypes/index';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function Constellations() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [userConst, setUserConst] = useState<AsyncData<Constellation[]>>({ state: 'loading' });
  const [selectedConstellation, setSelectedConst] = useState<Constellation>();
  const handleSelected = (constellation: Constellation) => {
    setSelectedConst(constellation);
  };
  const getConstellations = async () => {
    setUserConst({
      state: 'loaded',
      data: [
        { name: 'SampleConstellation1', id: 1 },
        { name: 'SampleConstellation2', id: 2 },
      ],
    });
    setSelectedConst({ name: 'SampleConstellation1', id: 1 });
  };
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
  }, []);
  return (
    <view
      className="flex flex-col gap-8 pt-8 flex-auto"
    >
      <view
        className="flex-auto gap-5"
      >
        {
          userConst.state === 'loading' ? (
            <Spin />
          ) : (
            <>
              <h2
                className="text-primary text-5xl font-audiowide leading-10"
              >
                {selectedConstellation.name}
              </h2>
              <Visualization />
            </>
          )
        }
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
            onClick={() => nav('/profile/help', { replace: true })}
            className="text-3xl"
          >
            <span>{t('pages.profile.constellations.howto')}</span>
            <icon className="text-4xl">help</icon>
          </Text>
        </header>
        <Scroll
          className="flex flex-col border-2 border-primary py-4 gap-3 rounded-lg max-h-52 px-7"
        >
          {
            userConst.state === 'loaded' ? userConst.data.map((constellation, i, arr) => (
              <React.Fragment
                key={constellation.name}
              >
                <Text
                  invertedStyle
                  asButton
                  onClick={() => handleSelected(constellation)}
                  className="text-4xl"
                >
                  {constellation.name}
                </Text>
                {i !== arr.length - 1 && <hr className="w-full border-primary border-[1px]" />}
              </React.Fragment>
            )) : (
              <Spin />
            )
          }
        </Scroll>
      </view>
    </view>
  );
}
