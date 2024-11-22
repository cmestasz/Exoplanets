import { useTranslation } from 'react-i18next';
import ShowExoplanets from './ShowExoplanets';
import Preview from './Preview';

export default function Exoplanets() {
  const { t } = useTranslation();
  return (
    <view
      className="flex flex-col flex-auto gap-2"
    >
      <h1
        className="font-audiowide text-5xl text-primary"
      >
        {t('pages.exoplanets.title')}
      </h1>
      <view
        className="flex flex-row gap-10"
      >
        <ShowExoplanets />
        <Preview />
      </view>
    </view>
  );
}
