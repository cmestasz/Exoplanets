import {
  useState, useCallback, useEffect, useMemo,
  useContext,
} from 'react';
import { AlertOptions } from '@components/alerts/types';
import { useTranslation } from 'react-i18next';
import { UserAPI } from '@mytypes/user';
import { User } from '@supabase/supabase-js';
import { AlertContext } from '@components/alerts/AlertContext';
import { useNavigate } from 'react-router';
import { AsyncData } from '@mytypes/index';
import { useGlobals } from '@reactunity/renderer';
import { AuthServer } from '@mytypes/UnityTypes';
import { supabase } from './supabase';
import { DEFAULT_ALERT_DURATION } from './constants';

function useAlert() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    message: '',
    type: 'success',
    duration: DEFAULT_ALERT_DURATION,
  });

  useEffect(() => {
    let timer: number = 0;
    if (isVisible) {
      timer = setTimeout(
        () => setIsVisible(false),
        alertOptions.duration || DEFAULT_ALERT_DURATION,
      );
    }
    return () => clearTimeout(timer);
  }, [isVisible, alertOptions, setIsVisible]);

  const showAlert = useCallback(({ message, type = 'success', duration = DEFAULT_ALERT_DURATION }: AlertOptions) => {
    setAlertOptions({ message, type, duration });
    setIsVisible(true);
  }, [setIsVisible]);

  const hideAlert = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return {
    isVisible, alertOptions, showAlert, hideAlert,
  };
}

function useUserActions() {
  const { t } = useTranslation();
  const authServer = useGlobals().AuthServer as AuthServer;
  const showAlert = useContext(AlertContext);
  const nav = useNavigate();
  const [userFetched, setUserFetched] = useState<AsyncData<UserAPI>>({ state: 'loading' });
  const getUser = useCallback(async (userGetted?: User, withAlert?: boolean) => {
    if (!userGetted) {
      const { data: { user: userAuth }, error } = await supabase.auth.getUser();
      if (error || !userAuth) {
        console.log('Auth error: ', error);
        if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
        setUserFetched({ state: 'error' });
        return;
      }
      userGetted = userAuth;
    }
    const { data, error: err } = await supabase.from('users').select().eq('id', userGetted.id).maybeSingle();
    if (err) {
      console.error('Send by supabase', err.message);
      if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
      setUserFetched({ state: 'error' });
      return;
    }

    setUserFetched({ state: 'loaded', data });
  }, [showAlert, t]);
  const fetchUser = useCallback((userGetted?: User, withAlert?: boolean) => {
    getUser(userGetted, withAlert).catch((r) => {
      console.log('Error thowed by me: ', r);
      setUserFetched({ state: 'error' });
    });
  }, [getUser]);
  const logout = useCallback((redirectTo?: string) => {
    supabase.auth.signOut().then(({ error }) => {
      if (error) {
        console.error(error);
        showAlert({ message: t('components.user.logout-error'), type: 'error' });
      } else {
        setUserFetched({ state: 'error' });
        if (redirectTo) nav(redirectTo);
        console.log('Cerró sesión');
      }
    });
  }, [t, nav, showAlert]);
  const handleCode = useCallback((code: string) => {
    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      if (error) {
        console.log(error);
        showAlert({ message: t('components.user.get-user-error') });
        return;
      }
      fetchUser(data.user);
    });
  }, [fetchUser, t, showAlert]);
  const login = useCallback(() => {
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
      authServer.SetHandleCode(
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
  }, [showAlert, authServer, t, handleCode]);
  useEffect(() => {
    let isMounted = true;
    getUser().catch((r) => {
      if (isMounted) {
        console.log('Error thowed by me: ', r);
        setUserFetched({ state: 'error' });
      }
    });
    return () => { isMounted = false; };
  }, [getUser]);
  return useMemo(() => ({
    current: userFetched, fetchUser, logout, login,
  }), [fetchUser, userFetched, logout, login]);
}

export { useAlert, useUserActions };
