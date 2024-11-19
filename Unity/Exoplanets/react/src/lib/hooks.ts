import {
  useState, useCallback, useEffect, useMemo,
  useContext,
} from 'react';
import { AlertOptions } from '@components/alerts/types';
import { useTranslation } from 'react-i18next';
import { AsyncData } from '@mytypes/AsyncData';
import UserAPI from '@mytypes/User';
import { User } from '@supabase/supabase-js';
import { AlertContext } from '@components/alerts/AlertContext';
import { useNavigate } from 'react-router';
import { supabase } from './supabase';
import { DEFAULT_ALERT_DURATION } from './constants';

export function useAlert() {
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

export const useUserActions = () => {
  const { t } = useTranslation();
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
  const logout = useCallback((redirectTo: string) => {
    supabase.auth.signOut().then(({ error }) => {
      if (error) {
        console.error(error);
        showAlert({ message: t('components.user.logout-error'), type: 'error' });
      } else {
        setUserFetched({ state: 'error' });
        nav(redirectTo);
        console.log('Cerró sesión');
      }
    });
  }, [t, nav, showAlert]);
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
    current: userFetched, fetchUser, logout,
  }), [fetchUser, userFetched, logout]);
};
