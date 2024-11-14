import User from '@mytypes/User';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/ui/Text';
import UserBox from './UserBox';

export default function UserAuth() {
  const { t } = useTranslation();
  // Esperar por los datos await
  const user: User = {
    email: 'lsequeiros@unsa.edu.pe',
    lastNames: 'Sequeiros Condori',
    names: 'Luis Gustavo',
    photo: '/img/es.png',
    username: 'gusCreator',
  };
  if (user) {
    return (
      <UserBox username={user.username} photo={user.photo} />
    );
  }
  return (
    <Text
      size="lg"
    >
      <image
        src="/img/google.png"
      />
      {t('components.user.login')}
    </Text>
  );
}
