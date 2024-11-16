import { useTranslation } from 'react-i18next';
import { Text } from '@components/ui/Text';
import { useContext, useEffect, useState } from 'react';
import { supabase } from '@lib/supabase';
import AsyncData from '@mytypes/AsyncData';
import User from '@mytypes/User';
import { AlertContext } from '@components/alerts/Alert';
import { useGlobals } from '@reactunity/renderer';
import { LocalServer } from '@mytypes/UnityTypes';
import UserBox from './UserBox';

export default function UserAuth() {
  const { t } = useTranslation();
  const globals = useGlobals().LocalServer as LocalServer;
  const [userFetched, setUserFetched] = useState<AsyncData<User>>('loading');
  const showAlert = useContext(AlertContext);
  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      setUserFetched(null);
      return;
    }
    const { data, error: err } = await supabase.from('users').select().eq('id', user.id).single();

    if (err) {
      console.error(err);
      setUserFetched(null);
      return;
    }

    setUserFetched(data);
  };
  const handleCode = (code: string) => {
    console.log('Calling code', code);
    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      console.log('Data', data);
      console.error('Error', error);
      getUser().catch((r) => {
        console.error(r);
        setUserFetched(null);
      });
    });
  };
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:7463/callback', skipBrowserRedirect: true } }).then(({ data, error }) => {
      if (error) {
        console.error(error);
        showAlert({ message: 'No se pudo autenticar, inténtalo de nuevo más tarde', type: 'error' });
        return;
      }
      globals.StartServer(handleCode);
      Interop.UnityEngine.Application.OpenURL(data.url);
    });
    console.log('sign in');
  };
  useEffect(() => {
    getUser().catch((r) => {
      console.error(r);
      setUserFetched(null);
    });
  }, []);
  if (userFetched === 'loading') return null;
  if (userFetched === null) {
    return (
      <Text
        size="lg"
        asButton
        invertedStyle
        onClick={handleLogin}
      >
        <image
          src="/img/google.png"
        />
        {t('components.user.login')}
      </Text>
    );
  }
  return (
    <UserBox username={userFetched.username} photo={userFetched.avatar} />
  );
}
