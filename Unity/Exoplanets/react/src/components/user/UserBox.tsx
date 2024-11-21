import { useTranslation } from 'react-i18next';
import { Text } from '@components/ui/Text';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import HeaderUserBox from './HeaderUserBox';
import { UserContext } from './UserContext';

export default function UserBox() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const userAction = useContext(UserContext);
  const [opened, setOpened] = useState<boolean>(false);
  const handleProfile = () => {
    nav('profile/account');
    setOpened(false);
  };
  if (userAction.current.state !== 'loaded') return null;
  return (
    <view className="relative w-fit flex-grow-0">
      <HeaderUserBox
        username={userAction.current.data.username}
        photo={userAction.current.data.avatar}
        opened={opened}
        onClick={() => setOpened((p) => !p)}
      />
      {
        opened && (
          <view
            className="flex flex-col items-start gap-2 p-2 enter:opacity-0 enter:-trans-y-10 enter:state-duration-0 state-duration-500 transition-all duration-500 m-duration-500 leave:-trans-y-10 leave:opacity-0 absolute top-[105%] left-0 bg-tertiary w-full rounded-xl z-[1000] text-3xl"
          >
            <Text
              asButton
              invertedStyle
              onClick={handleProfile}
              className="w-full justify-start gap-5"
            >
              <icon className="text-6xl">account_circle</icon>
              {t('components.user.profile')}
            </Text>
            <Text
              asButton
              invertedStyle
              className="w-full justify-start gap-5"
              onClick={() => userAction.logout()}
            >
              <icon className="text-6xl rotate-180">logout</icon>
              {t('components.user.logout')}
            </Text>
          </view>
        )
      }
    </view>

  );
}
