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
      className="flex flex-col flex-1 p-6 gap-4 border-2 border-primary rounded-lg"
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
      <hr className="border-primary border-[1px]" />
      <Text
        className="flex flex-row font-exo text-3xl text-primary"
        asButton
        onClick={() => nav(currentExoplanet.id)}
      >
        {t('pages.exoplanets.card.button')}
        <icon className="text-2xl">open_in_new</icon>
      </Text>
      <hr className="border-primary border-[1px]" />
      <PreviewData
        radius={currentExoplanet.radius}
        mass={currentExoplanet.mass}
        disc_date={currentExoplanet.disc_date}
      />
    </view>
  );
}
