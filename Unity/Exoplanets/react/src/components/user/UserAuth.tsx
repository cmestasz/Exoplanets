import { useTranslation } from 'react-i18next';
import { Text } from '@components/ui/Text';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
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
  const onSignOut = useCallback(() => {
    setUserFetched(null);
  }, []);
  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.log('Auth error: ', error);
      setUserFetched(null);
      return;
    }
    console.log('Before: postgrest', user.email);
    const { data, error: err } = await supabase.from('users').select().eq('id', user.id).maybeSingle();
    if (err) {
      console.error('Send by supabase', err.message);
      setUserFetched(null);
      return;
    }
    console.log('After postgrest: ', data);

    setUserFetched(data);
  };
  const handleCode = (code: string) => {
    supabase.auth.exchangeCodeForSession(code).then(({ data }) => {
      console.log('user handle Code', data.user.email);
      getUser().catch((r) => {
        console.log('Error thowed by me: ', r);
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
      globals.SetHandleCode(handleCode);
      Interop.UnityEngine.Application.OpenURL(data.url);
    });
    console.log('sign in');
  };
  useEffect(() => {
    getUser().catch((r) => {
      console.log('Error thowed by me: ', r);
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
    <UserBox username={userFetched.username} photo={userFetched.avatar} onSignOut={onSignOut} />
  );
}
