import User from '@mytypes/User';
import { useTranslation } from 'react-i18next';
import Interactivetext from '../ui/InteractiveText';
import UserBox from './UserBox';

export default function UserAuth() {
  const { t } = useTranslation();
  // Esperar por los datos await
  const user: User = {
    email: 'lsequeiros@unsa.edu.pe',
    lastNames: 'Sequeiros Condori',
    names: 'Luis Gustavo',
    photo: '/img/es.svg',
    username: 'gusCreator',
  };
  if (user) {
    return (
      <UserBox username={user.username} photo={user.photo} />
    );
  }
  return (
    <Interactivetext
      leftGraphic={Image}
      lgProps={{
        src: '/img/google.svg', width: 20, height: 20, alt: t('profileImage'),
      }}
      content={t('login')}
      className="gap-1"
    />
  );
}
