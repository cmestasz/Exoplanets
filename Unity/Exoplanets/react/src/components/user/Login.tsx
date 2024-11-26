import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useUser } from 'src/providers/UserProvider';

interface LoginProps {
  asideMenu?: boolean
}

export default function Login({
  asideMenu,
}: LoginProps) {
  const { t } = useTranslation();
  const userAction = useUser();
  return (
    <view className="flex">
      <Text
        asButton
        invertedStyle
        onClick={() => userAction.login()}
        className={clsx('text-3xl gap-5', {
          'px-3 py-10 max-h-32': !asideMenu,
          'max-h-14 py-3': asideMenu,
        })}
      >
        <img
          src="/img/google.png"
          alt="Google login"
          className="flex-auto"
        />
        <span className="overflow-clip whitespace-nowrap shrink">
          {t('components.user.login')}
        </span>
      </Text>
    </view>
  );
}
