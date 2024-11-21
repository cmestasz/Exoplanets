import { Text } from '@components/ui/Text';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { UserContext } from './UserContext';

interface LoginProps {
  asideMenu?: boolean
}

export default function Login({
  asideMenu,
}: LoginProps) {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
  return (
    <Text
      asButton
      invertedStyle
      onClick={() => userAction.login()}
      className={clsx('text-3xl gap-3 shrink', {
        'px-3 py-10 max-h-32': !asideMenu,
        'max-h-14 py-3': asideMenu,
      })}
    >
      <img
        src="/img/google.png"
        alt="Google login"
      />
      <span className="overflow-clip whitespace-nowrap shrink">
        {t('components.user.login')}
      </span>
    </Text>
  );
}
