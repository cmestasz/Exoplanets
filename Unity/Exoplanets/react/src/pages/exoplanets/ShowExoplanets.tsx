/* eslint-disable react/no-unknown-property */
import AstroCard from '@components/astros/AstroCard';
import Spin from '@components/loading/Spin';
import Search from '@components/search/Search';
import Scroll from '@components/ui/Scroll';
import { Text } from '@components/ui/Text';
import { Exoplanet } from '@mytypes/astros';
import { AsyncData } from '@mytypes/index';
import { AdjustCamera } from '@mytypes/unity';
// import { AdjustCamera } from '@mytypes/UnityTypes';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface ShowExoplanetsProps {
  handleSelect: (exo: Exoplanet) => void;
  filterExos: (name: string) => void;
  leakedExos: AsyncData<Exoplanet[]>;
  exos: AsyncData<Exoplanet[]>;
  changeLeakedExos: (data: AsyncData<Exoplanet[]>) => void;
  get_next_exos: (amount?: number) => void;
}

export default function ShowExoplanets({
  handleSelect, filterExos, leakedExos, exos, changeLeakedExos, get_next_exos,
}: ShowExoplanetsProps) {
  const { t } = useTranslation();
  const nav = useNavigate();
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera2 = useGlobals().AuxiliarCamera2 as UnityEngine.Camera;
  const viewRef = useRef<ReactUnity.UGUI.ContainerComponent>();
  const [usingFilter, setUsingFilter] = useState<boolean>(false);
  const [currentExos, setCurrentExos] = useState<AsyncData<Exoplanet[]>>(exos);
  const handleClick = (exo: Exoplanet) => {
    handleSelect(exo);
  };
  const onSearch = (name: string) => {
    if (name) {
      setUsingFilter(true);
      changeLeakedExos({ state: 'loading' });
      filterExos(name);
    } else {
      setUsingFilter(false);
    }
  };
  useEffect(() => {
    if (usingFilter) {
      setCurrentExos(leakedExos);
    } else {
      setCurrentExos(exos);
    }
  }, [usingFilter, leakedExos, exos]);
  useEffect(() => {
    if (viewRef.current) {
      adjustCamera.AdjustSecondAuxiliar(viewRef.current);
    }
  }, [adjustCamera, viewRef]);
  return (
    <view
      className="flex flex-col flex-auto gap-7"
    >
      <Search
        placeholder={t('pages.exoplanets.search')}
        onSearch={onSearch}
      />
      <view
        className="relative flex flex-auto"
        ref={viewRef}
      >
        <render
          width={500}
          height={500}
          camera={auxiliarCamera2}
          onMount={(ev) => ev.gameObject.SetActive(true)}
          onUnmount={(ev) => ev.gameObject.SetActive(false)}
          className="absolute inset-0"
        />
        <Scroll
          className="flex flex-row flex-auto flex-wrap gap-5"
        >
          {
            currentExos.state === 'loading' && (
              <Spin />
            )
          }
          {
            ((currentExos.state === 'loaded' && currentExos.data.length === 0)
              || currentExos.state === 'error') && (
              <view
                className="flex flex-auto items-center justify-center self-center h-full text-primary"
              >
                <h3
                  className="text-5xl font-audiowide leading-8"
                >
                  {t('pages.exoplanets.no-results.main')}
                </h3>
                <h5
                  className="text-4xl font-exo text-secondary"
                >
                  {t('pages.exoplanets.no-results.sub')}
                </h5>
              </view>
            )
          }
          {
            currentExos.data && (
              <>
                {
                  currentExos.data.length > 0 && currentExos.data.map((exo) => (
                    <AstroCard
                      key={`${exo.id}-${exo.name}-card`}
                      astro={exo}
                      onClick={() => handleClick(exo)}
                      onDoubleClick={() => nav(exo.name)}
                      className="text-3xl flex-grow shrink-0 basis-80"
                    />
                  ))
                }
                {
                  !usingFilter && (
                    <Text
                      asButton
                      onClick={() => get_next_exos()}
                      disabled={currentExos.state === 'loading'}
                      className="flex-auto flex flex-col gap-4 border-2 border-primary hover:border-secondary text-4xl"
                    >
                      <icon className="text-5xl">add</icon>
                      {
                        currentExos.state === 'loading'
                          ? t('pages.exoplanets.loading')
                          : t('pages.exoplanets.load-more')
                      }
                    </Text>
                  )
                }
              </>
            )
          }
        </Scroll>
      </view>
    </view>
  );
}
