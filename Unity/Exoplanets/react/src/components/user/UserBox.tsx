'use client';

import User from '@mytypes/User';
import { useTranslation } from 'react-i18next';
import BoxDown from '../form/select/BoxDown';
import OptionUser from './OptionUser';
import HeaderUserBox from './HeaderUserBox';

export default function UserBox({
  username, photo,
}: Pick<User, 'username' | 'photo'>) {
  const { t } = useTranslation();
  const handleProfile = () => {
    // router.push('/profile');
    // TODO: To profile using reactrouter
  };
  const handleLogout = () => {
    console.log('Cerró sesión');
  };
  return (
    <BoxDown
      headerBox={HeaderUserBox}
      headerBoxProps={{ title: username, invertedStyle: true, image: photo }}
    >
      <OptionUser option={{ unique: 'profile', display: t('profile') }} onSelect={handleProfile} />
      <OptionUser option={{ unique: 'logout', display: t('logout') }} onSelect={handleLogout} />
    </BoxDown>
  );
}
