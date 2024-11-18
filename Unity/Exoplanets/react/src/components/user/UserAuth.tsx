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
import { AuthServer } from '@mytypes/UnityTypes';
import { User } from '@supabase/supabase-js';
import UserBox from './UserBox';

export default function UserAuth() {
  const { t } = useTranslation();
  const globals = useGlobals().AuthServer as AuthServer;
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
      const dict: Record<string, string> = {
        titlePage: t('components.user.auth-page.success.title') as string,
        titlePageError: t('components.user.auth-page.error.title') as string,
        mainMessage: t('components.user.auth-page.success.main-message') as string,
        mainMessageError: t('components.user.auth-page.error.main-message') as string,
        subMessage: t('components.user.auth-page.success.sub-message') as string,
        subMessageError: t('components.user.auth-page.error.sub-message') as string,
        repo: t('components.user.auth-page.repo') as string,
        email: t('components.user.auth-page.email') as string,
      };
      globals.SetHandleCode(handleCode, dict);
      Interop.UnityEngine.Application.OpenURL(data.url);
    }).catch((e) => console.log('Redirección no completada: ', e));
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
