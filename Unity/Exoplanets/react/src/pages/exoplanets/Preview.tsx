import { Text } from '@components/ui/Text';
import { Exoplanet } from '@mytypes/astros';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AstroPrefabBuilder } from '@mytypes/UnityTypes';
import { ReactUnity, useGlobals } from '@reactunity/renderer';
import { useEffect, useRef } from 'react';
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
  const astroPrefab = useGlobals().AstroPrefabBuilder as AstroPrefabBuilder;
  const prefabRef = useRef<ReactUnity.UGUI.PrefabComponent>();
  useEffect(() => {
    if (prefabRef.current && currentExoplanet) {
      astroPrefab.Build(prefabRef.current, currentExoplanet.id % MATERIAL_AMOUNT);
    }
  }, [prefabRef, astroPrefab, currentExoplanet]);
  if (!currentExoplanet) {
    return (
      <view className="size-7 animate-spin" />
    );
  }
  return (
    <view
      className="flex flex-col portrait:flex-row flex-initial p-6 gap-4 portrait:gap-10 border-2 border-primary rounded-lg"
    >
      <view
        className="flex flex-col portrait:basis-1/3 gap-4 flex-auto"
      >
        <prefab
          ref={prefabRef}
          className="flex-auto"
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
