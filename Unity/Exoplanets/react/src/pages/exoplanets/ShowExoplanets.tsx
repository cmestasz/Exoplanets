import Search from '@components/search/Search';
import { useTranslation } from 'react-i18next';

export default function ShowExoplanets() {
  const { t } = useTranslation();
  return (
    <view
      className="flex flex-col gap-4"
    >
      <Search placeholder={t('pages.exoplanets.search')} />
    </view>
  );
}
