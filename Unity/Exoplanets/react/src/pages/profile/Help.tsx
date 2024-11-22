import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';

export default function Help() {
  const { t } = useTranslation();
  return (
    <view className="flex flex-row flex-auto flex-wrap text-secondary font-exo text-3xl gap-2">
      {t('pages.profile.help')}
      <Text asLink inline url="mailto:lgsc21211@gmail.com" content="lgsc21211@gmail.com" />
    </view>
  );
}
