/* eslint-disable react/no-unknown-property */
import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AdjustCamera, AstroPrefabBuilder, SpaceController } from '@mytypes/unity';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import { useEffect, useRef, useState } from 'react';
import { MATERIAL_AMOUNT } from '@lib/constants';
import Spin from '@components/loading/Spin';
import { useExoplanets } from 'src/providers/ExoplanetsProvider';
import PreviewData from './PreviewData';

export default function Preview() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { selectedExo } = useExoplanets();
  const [, setPreviousAstro] = useState<number>(-1);
  const astroPrefab = useGlobals().AstroPrefabBuilder as AstroPrefabBuilder;
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera = useGlobals().AuxiliarCamera as UnityEngine.Camera;
  const spaceController = useGlobals().SpaceController as UnityEngine.GameObject;
  const prefabRef = useRef<ReactUnity.UGUI.PrefabComponent>();
  const viewRef = useRef<ReactUnity.UGUI.ContainerComponent>();
  useEffect(() => {
    if (prefabRef.current && selectedExo) {
      setPreviousAstro((prev) => {
        if (prev !== -1) astroPrefab.Destroy(prev);
        return astroPrefab.Build(prefabRef.current, Number(selectedExo.id.split(' ')[2]) % MATERIAL_AMOUNT, true);
      });
    }
  }, [prefabRef, astroPrefab, selectedExo]);
  useEffect(() => {
    if (viewRef.current) {
      adjustCamera.AdjustFirstAuxiliar(viewRef.current);
    }
  }, [adjustCamera, viewRef, selectedExo]);
  useEffect(() => {
    if (spaceController) {
      const script = spaceController.GetComponent('SpaceController') as unknown as SpaceController;
      script.ClearStars();
    }
  }, [spaceController]);
  return (
    <view
      className="relative flex flex-col portrait:flex-row flex-initial basis-1/3 p-6 gap-4 portrait:gap-10 border-2 border-primary rounded-lg"
    >
      {
        selectedExo ? (
          <>
            <view
              className="flex flex-col portrait:basis-1/3 gap-4 flex-auto"
              ref={viewRef}
            >
              <prefab
                ref={prefabRef}
                className="flex-auto"
              />
              <render
                width={500}
                height={500}
                camera={auxiliarCamera}
                onMount={(ev) => ev.gameObject.SetActive(true)}
                onUnmount={(ev) => ev.gameObject.SetActive(false)}
                className="absolute inset-0"
              />
              <h3
                className="font-audiowide flex-initial text-4xl text-center text-primary leading-10"
              >
                {selectedExo.name}
              </h3>
            </view>
            <article
              className="flex portrait:flex-col-reverse flex-initial gap-5"
            >
              <hr className="border-primary border-[1px] portrait:hidden" />
              <Text
                className="flex flex-row font-exo text-4xl text-primary"
                asButton
                onClick={() => nav(selectedExo.name)}
              >
                {t('pages.exoplanets.card.button')}
                <icon className="text-3xl">open_in_new</icon>
              </Text>
              <hr className="border-primary border-[1px] portrait:hidden" />
              <PreviewData
                radius={selectedExo.radius}
                distance={selectedExo.dist}
                disc_date={selectedExo.discovery_year}
              />
            </article>
          </>
        ) : (
          <Spin />
        )
      }
    </view>
  );
}
