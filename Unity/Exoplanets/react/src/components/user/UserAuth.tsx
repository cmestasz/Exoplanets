import { useTranslation } from 'react-i18next';
import { Text } from '@components/ui/Text';
import { useContext } from 'react';
import { supabase } from '@lib/supabase';
import { useGlobals } from '@reactunity/renderer';
import { AuthServer } from '@mytypes/UnityTypes';
import { AlertContext } from '@components/alerts/AlertContext';
import UserBox from './UserBox';
import { UserContext } from './UserContext';

export default function UserAuth() {
  const { t } = useTranslation();
  const globals = useGlobals().AuthServer as AuthServer;
  const userAction = useContext(UserContext);
  const showAlert = useContext(AlertContext);
  const handleCode = (code: string) => {
    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      if (error) {
        console.log(error);
        showAlert({ message: t('components.user.get-user-error') });
        return;
      }
      userAction.fetchUser(data.user);
    });
  };
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:7463/callback', skipBrowserRedirect: true } }).then(({ data, error }) => {
      if (error) {
        console.error(error);
        showAlert({ message: t('components.user.login-error'), type: 'error' });
        return;
      }
      const d = {
        titlePage: t('components.user.auth-page.success.title') as string,
        titlePageError: t('components.user.auth-page.error.title') as string,
        mainMessage: t('components.user.auth-page.success.main-message') as string,
        mainMessageError: t('components.user.auth-page.error.main-message') as string,
        subMessage: t('components.user.auth-page.success.sub-message') as string,
        subMessageError: t('components.user.auth-page.error.sub-message') as string,
        repo: t('components.user.auth-page.repo') as string,
        email: t('components.user.auth-page.email') as string,
      };
      globals.SetHandleCode(
        handleCode,
        d.titlePage,
        d.titlePageError,
        d.mainMessage,
        d.mainMessageError,
        d.subMessage,
        d.subMessageError,
        d.repo,
        d.email,
      );
      Interop.UnityEngine.Application.OpenURL(data.url);
    }).catch((e) => console.log('Redirección no completada: ', e));
    console.log('sign in');
  };
  if (userAction.current === 'loading') return null;
  if (userAction.current === 'error') {
    return (
      <Text
        asButton
        invertedStyle
        onClick={handleLogin}
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
  return (
    <UserBox />
  );
}
