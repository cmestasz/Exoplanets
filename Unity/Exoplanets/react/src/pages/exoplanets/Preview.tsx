import { Text } from '@components/ui/Text';
import { Exoplanet } from '@mytypes/astros';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import PreviewData from './PreviewData';

interface PreviewProps {
  currentExoplanet: Exoplanet;
}

export default function Preview({
  currentExoplanet,
}: PreviewProps) {
  const nav = useNavigate();
  const { t } = useTranslation();
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
        className="flex flex-col portrait:basis-1/3 gap-4 flex-initial"
      >
        <img
          src={currentExoplanet.imageUrl}
          alt={currentExoplanet.name}
          className="flex-auto"
        />
        <h3
          className="font-audiowide text-4xl text-center text-primary leading-10"
        >
          {currentExoplanet.name}
        </h3>
      </view>
      <article
        className="flex portrait:flex-col-reverse flex-auto gap-5"
      >
        <hr className="border-primary border-[1px] portrait:hidden" />
        <Text
          className="flex flex-row font-exo text-3xl text-primary"
          asButton
          onClick={() => nav(currentExoplanet.name)}
        >
          {t('pages.exoplanets.card.button')}
          <icon className="text-2xl">open_in_new</icon>
        </Text>
        <hr className="border-primary border-[1px] portrait:hidden" />
        <PreviewData
          radius={currentExoplanet.radius}
          mass={currentExoplanet.mass}
          disc_date={currentExoplanet.disc_date}
        />
      </article>
    </view>
  );
}
