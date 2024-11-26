import { Text } from '@components/ui/Text';
import Login from '@components/user/Login';
import Logout from '@components/user/Logout';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useUser } from 'src/providers/UserProvider';

export default function AsideBottom() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const userAction = useUser();
  return (
    <>
      <view
        className="text-3xl flex flex-col items-start gap-6 portrait:flex-row"
      >
        <hr className="border-primary border-[1px] landscape:w-full portrait:h-full landscape:hidden" />
        <Text
          invertedStyle
          asButton
          onClick={() => nav(-1)}
        >
          <icon
            className="text-3xl"
          >
            arrow_back
          </icon>
          <span>
            {t('pages.profile.layout.back')}
          </span>
        </Text>
      </view>
      <view
        className="text-3xl flex flex-col items-start gap-6 portrait:flex-row"
      >
        <hr className="border-primary border-[1px] landscape:w-full portrait:h-full" />
        {
          userAction.current.state !== 'loaded' ? (
            <Login asideMenu />
          ) : (
            <Logout />
          )
        }
      </view>
    </>
  );
}
