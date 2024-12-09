/* eslint-disable react/no-unknown-property */
import { Text } from '@components/ui/Text';
import { Exoplanet } from '@mytypes/astros';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AdjustCamera, AstroPrefabBuilder } from '@mytypes/UnityTypes';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import { useEffect, useRef, useState } from 'react';
import { MATERIAL_AMOUNT } from '@lib/constants';
import PreviewData from './PreviewData';

interface PreviewProps {
  currentExoplanet: Exoplanet;
}

export default function Preview({
  currentExoplanet,
}: PreviewProps) {
  const nav = useNavigate();
  const { t } = useTranslation();
  const [, setPreviousAstro] = useState<number>(-1);
  const astroPrefab = useGlobals().AstroPrefabBuilder as AstroPrefabBuilder;
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera = useGlobals().AuxiliarCamera as UnityEngine.Camera;
  const prefabRef = useRef<ReactUnity.UGUI.PrefabComponent>();
  const viewRef = useRef<ReactUnity.UGUI.ContainerComponent>();
  useEffect(() => {
    console.log('valor de prefabRef.current: ', prefabRef.current);
    if (prefabRef.current && currentExoplanet) {
      setPreviousAstro((prev) => {
        if (prev !== -1) astroPrefab.Destroy(prev);
        return astroPrefab.Build(prefabRef.current, currentExoplanet.id % MATERIAL_AMOUNT);
      });
    }
  }, [prefabRef, astroPrefab, currentExoplanet]);
  useEffect(() => {
    console.log('valor de viewRef.current: ', viewRef.current);
    if (viewRef.current) {
      console.log('Se ajustará la cámara auxiliar en el preview');
      adjustCamera.AdjustFirstAuxiliar(viewRef.current, true);
    }
  }, [adjustCamera, viewRef, currentExoplanet]);
  if (!currentExoplanet) {
    return (
      <view className="size-7 animate-spin" />
    );
  }
  return (
    <view
      className="relative flex flex-col portrait:flex-row flex-initial p-6 gap-4 portrait:gap-10 border-2 border-primary rounded-lg"
    >
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
          onScroll={(ev: UnityEngine.EventSystems.PointerEventData) => {
            auxiliarCamera.transform.Translate(
              0,
              0,
              Math.fround(ev.scrollDelta.y * 10),
              Interop.UnityEngine.Space.Self,
            );
          }}
          onMount={(ev) => ev.gameObject.SetActive(true)}
          onUnmount={(ev) => ev.gameObject.SetActive(false)}
          className="absolute inset-0"
        />
        <h3
          className="font-audiowide flex-initial text-4xl text-center text-primary leading-10"
        >
          {currentExoplanet.name}
        </h3>
      </view>
      <article
        className="flex portrait:flex-col-reverse flex-initial gap-5"
      >
        <hr className="border-primary border-[1px] portrait:hidden" />
        <Text
          className="flex flex-row font-exo text-4xl text-primary"
          asButton
          onClick={() => nav(currentExoplanet.name)}
        >
          {t('pages.exoplanets.card.button')}
          <icon className="text-3xl">open_in_new</icon>
        </Text>
        <hr className="border-primary border-[1px] portrait:hidden" />
        <PreviewData
          radius={currentExoplanet.radius}
          distance={currentExoplanet.dist}
          disc_date={currentExoplanet.discovery_year}
        />
      </article>
    </view>
  );
}
