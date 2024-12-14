import { Text } from '@components/ui/Text';
import { AdjustCamera, MainStar } from '@mytypes/unity';
import { ReactUnity, useGlobals } from '@reactunity/renderer';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

export default function MainMenu() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const mainStar = useGlobals().MainStar as MainStar;
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const prefabRef = useRef<ReactUnity.UGUI.PrefabComponent>();
  useEffect(() => {
    if (prefabRef.current) {
      mainStar.Insert(prefabRef.current);
    }
  }, [prefabRef, mainStar]);
  useEffect(() => {
    adjustCamera.AdjustToCanvas();
  }, [adjustCamera]);
  return (
    <view className="flex flex-col flex-auto gap-10 portrait:gap-20">
      <view
        className="flex flex-col flex-auto justify-center gap-20"
      >
        <view
          className="flex flex-col items-center flex-initial justify-center"
        >
          <h1
            className="text-primary font-orbitron text-[6.5rem] leading-[3rem]"
          >
            Exoplanets
          </h1>
          <h2
            className="font-exo text-secondary text-5xl leading-3"
          >
            {t('pages.subtitle')}
          </h2>
        </view>
        <Text
          className="text-5xl leading-10 gap-20 flex-col self-center hover:scale-105 transition-all duration-700"
          asButton
          onClick={() => nav('exoplanets')}

        >
          <prefab
            ref={prefabRef}
            className="flex-initial basis-40"
          />
          <view
            className="flex flex-row gap-4"
          >
            <h2>{t('pages.start')}</h2>
            <icon className="text-5xl">open_in_new</icon>
          </view>

        </Text>
      </view>
      <view
        className="flex flex-row flex-initial justify-between"
        style={{ flexGrow: '0' }}
      >
        <view
          className="flex flex-row gap-4"
        >
          <Text
            invertedStyle
            asButton
            onClick={() => nav('profile/about')}
            className="text-3xl"
          >
            <icon className="text-3xl">info</icon>
            {t('pages.about')}
          </Text>
          <Text
            invertedStyle
            asButton
            onClick={() => nav('profile/help')}
            className="text-3xl"
          >
            <icon className="text-3xl">help</icon>
            {t('pages.help')}
          </Text>
        </view>
        <Text
          invertedStyle
          asLink
          url="https://github.com/cmestasz/Exoplanets"
          className="text-3xl"
        >
          <FaGithub
            style={{ fill: 'inherit' }}
          />
          {t('pages.repo')}
        </Text>
      </view>
    </view>
  );
}
