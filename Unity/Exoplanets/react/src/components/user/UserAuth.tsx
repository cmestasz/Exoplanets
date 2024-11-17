import { useTranslation } from 'react-i18next';
import { Text } from '@components/ui/Text';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { supabase } from '@lib/supabase';
import AsyncData from '@mytypes/AsyncData';
import UserAPI from '@mytypes/User';
import { AlertContext } from '@components/alerts/Alert';
import { useGlobals } from '@reactunity/renderer';
import { LocalServer } from '@mytypes/UnityTypes';
import { User } from '@supabase/supabase-js';
import UserBox from './UserBox';

export default function UserAuth() {
  const { t } = useTranslation();
  const globals = useGlobals().LocalServer as LocalServer;
  const [userFetched, setUserFetched] = useState<AsyncData<UserAPI>>('loading');
  const showAlert = useContext(AlertContext);
  const onSignOut = () => {
    setUserFetched('error');
  };
  const getUser = useCallback(async (userGetted?: User, withAlert?: boolean) => {
    if (!userGetted) {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.log('Auth error: ', error);
        if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
        setUserFetched('error');
        return;
      }
      userGetted = user;
    }
    const { data, error: err } = await supabase.from('users').select().eq('id', userGetted.id).maybeSingle();
    if (err) {
      console.error('Send by supabase', err.message);
      if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
      setUserFetched('error');
      return;
    }

    setUserFetched(data);
  }, [showAlert, t]);
  const handleCode = (code: string) => {
    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      if (error) {
        console.log(error);
        showAlert({ message: t('components.user.get-user-error') });
        return;
      }
      getUser(data.user).catch((r) => {
        console.log('Error thowed by me: ', r);
        setUserFetched('error');
      });
    });
  };
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:7463/callback', skipBrowserRedirect: true } }).then(({ data, error }) => {
      if (error) {
        console.error(error);
        showAlert({ message: t('components.user.login-error'), type: 'error' });
        return;
      }
      globals.SetHandleCode(handleCode);
      Interop.UnityEngine.Application.OpenURL(data.url);
    });
    console.log('sign in');
  };
  useEffect(() => {
    let isMounted = true;
    getUser().catch((r) => {
      if (isMounted) {
        console.log('Error thowed by me: ', r);
        setUserFetched('error');
      }
    });
    return () => { isMounted = false; };
  }, [getUser]);
  if (userFetched === 'loading') return null;
  if (userFetched === 'error') {
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
