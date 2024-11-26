import Scroll from '@components/ui/Scroll';
import { useTranslation } from 'react-i18next';

interface PreviewDataProps {
  radius: number;
  disc_date: string;
  mass: string;
}

export default function PreviewData({
  radius, disc_date, mass,
}: PreviewDataProps) {
  const { t } = useTranslation();
  const data = [
    { key: t('pages.exoplanets.card.radius'), val: radius },
    { key: t('pages.exoplanets.card.mass'), val: mass },
    { key: t('pages.exoplanets.card.year'), val: disc_date },
  ];
  return (
    <Scroll
      className="flex flex-row portrait:flex-col gap-6 mb-8 justify-center"
      thumbClassName="bg-primary border-secondary border-4 border-solid rounded-full"
      scrollBarClassName="bg-transparent h-2 -bottom-9"
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
