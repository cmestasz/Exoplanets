import Scroll from '@components/ui/Scroll';
import { useTranslation } from 'react-i18next';

interface PreviewDataProps {
  radius: number;
  disc_date: string;
  distance: string;
}

export default function PreviewData({
  radius, disc_date, distance,
}: PreviewDataProps) {
  const { t } = useTranslation();
  const data = [
    { key: t('pages.exoplanets.card.radius'), val: `${radius} 🌎` },
    { key: t('pages.exoplanets.card.distance'), val: `${distance} parsecs` },
    { key: t('pages.exoplanets.card.year'), val: disc_date },
  ];
  return (
    <Scroll
      className="flex flex-row portrait:flex-col gap-10 mb-8"
      scrollBarClassName="-bottom-9"
    >
      {
        data.map(({ key, val }) => (
          <article
            key={key}
            className="flex flex-col items-center gap-3 font-exo text-3xl"
          >
            <span className="text-primary flex-auto">{key}</span>
            <span className="text-secondary flex-auto">{val}</span>
          </article>
        ))
      }
    </Scroll>
  );
}
