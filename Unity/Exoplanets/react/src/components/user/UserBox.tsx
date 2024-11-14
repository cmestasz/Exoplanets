import { useTranslation } from 'react-i18next';
import Text from '@components/ui/Text';
import { useState } from 'react';
import HeaderUserBox from './HeaderUserBox';

interface UserBoxProps {
  username: string;
  photo?: string;
}

export default function UserBox({
  username, photo,
}: UserBoxProps) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);
  const handleProfile = () => {
    // router.push('/profile');
    // TODO: To profile using reactrouter
    console.log('To profile');
    setOpened(false);
  };
  const handleLogout = () => {
    console.log('Cerró sesión');
    setOpened(false);
  };
  return (
    <view className="relative w-fit max-w-48 flex-grow-0">
      <HeaderUserBox
        username={username}
        photo={photo}
        opened={opened}
        onClick={() => setOpened((p) => !p)}
      />
      {
        opened && (
          <view
            className="flex flex-col items-start gap-2 p-2 enter:opacity-0 enter:-trans-y-10 enter:state-duration-0 state-duration-500 transition-all duration-500 m-duration-500 leave:-trans-y-10 leave:opacity-0 absolute top-[105%] left-0 bg-tertiary w-full rounded-md z-[1000]"
          >
            <Text
              asButton
              invertedStyle
              onClick={handleProfile}
              className="w-full justify-start"
            >
              <icon>account_circle</icon>
              {t('components.user.profile')}
            </Text>
            <Text
              asButton
              invertedStyle
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <icon>logout</icon>
              {t('components.user.logout')}
            </Text>
          </view>
        )
      }
    </view>

  );
}
