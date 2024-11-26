import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';
import { useUser } from 'src/providers/UserProvider';

export default function Logout() {
  const { t } = useTranslation();
  const userAction = useUser();
  return (
    <Text
      invertedStyle
      asButton
      onClick={() => userAction.logout()}
    >
      <icon
        className="text-3xl rotate-180"
      >
        logout
      </icon>
      <span>
        {t('components.user.logout')}
      </span>
    </Text>
  );
}
