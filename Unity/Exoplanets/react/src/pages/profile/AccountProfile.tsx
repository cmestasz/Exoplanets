import Input from '@components/form/input/Input';
import { useTranslation } from 'react-i18next';

export default function AccountProfile() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col"
    >
      <Input name="username" label={t('pages.profile.account.username.label')} placeholder={t('pages.profile.account.username.placeholder')} />
    </div>
  );
}
