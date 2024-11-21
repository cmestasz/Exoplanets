import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Logout() {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
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
