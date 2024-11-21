import { Text } from '@components/ui/Text';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from './UserContext';

export default function Login() {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
  return (
    <Text
      asButton
      invertedStyle
      onClick={() => userAction.login()}
      className="max-h-32 text-3xl px-3 py-10 gap-3 shrink"
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
