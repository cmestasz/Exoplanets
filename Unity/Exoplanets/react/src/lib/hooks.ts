import {
  useState, useCallback, useEffect, useMemo,
  useContext,
} from 'react';
import { AlertOptions, ModalContent } from '@components/modals/types';
import { useTranslation } from 'react-i18next';
import { UserManager } from '@mytypes/user';
import { User } from '@supabase/supabase-js';
import { AlertContext } from '@components/modals/AlertContext';
import { useNavigate } from 'react-router';
import { API_URL } from 'src/config';
import { supabase } from './supabase';
import { DEFAULT_ALERT_DURATION } from './constants';
import { UserStates } from './utils';

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

function useModal({
  title,
}: ModalContent | undefined) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<ModalContent>({ title });
  const cancel = useCallback(() => setModalVisible(false), []);
  const accept = useCallback(() => {
    cancel();
  }, [cancel]);
  const open = () => setModalVisible(true);

  return {
    modalVisible, accept, cancel, open, content, setContent,
  };
}

function useUserActions() {
  const { t } = useTranslation();
  const showAlert = useContext(AlertContext);
  const nav = useNavigate();
  const [userFetched, setUserFetched] = useState<UserManager>({ state: UserStates.ANON });
  const getUser = useCallback(async (userGetted?: User, withAlert?: boolean) => {
    if (!userGetted) {
      const { data: { user: userAuth }, error } = await supabase.auth.getUser();
      if (error || !userAuth) {
        console.log('Auth error: ', error);
        if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
        setUserFetched({ state: UserStates.ANON });
        return;
      }
      userGetted = userAuth;
    }
    const { data, error: err } = await supabase.from('users').select().eq('id', userGetted.id).maybeSingle();
    if (err) {
      console.error('Send by supabase', err.message);
      if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
      setUserFetched({ state: UserStates.ANON });
      return;
    }

    setUserFetched({ state: UserStates.LOGGED, user: data });
  }, [showAlert, t]);
  const fetchUser = useCallback((userGetted?: User, withAlert?: boolean) => {
    getUser(userGetted, withAlert).catch((r) => {
      console.log('Error thowed by me: ', r);
      setUserFetched({ state: UserStates.ANON });
    });
  }, [getUser]);
  const logout = useCallback((redirectTo?: string) => {
    // Logout using API
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ message, status }) => {
        console.log(message, status);
        if (status === 200) {
          setUserFetched({ state: UserStates.ANON });
          if (redirectTo) nav(redirectTo);
          console.log('Cerró sesión');
        }
      })
      .catch((e) => {
        showAlert({ message: t('components.user.logout-error'), type: 'error' });
        console.log(e);
      });
  }, [t, nav, showAlert]);
  const login = useCallback(() => {
    // Redirect to api endpoint for login
    Interop.UnityEngine.Application.OpenURL(`${API_URL}/login`);
    // Initilize web socket connection
  }, []);
  useEffect(() => {
    let isMounted = true;
    getUser().catch((r) => {
      if (isMounted) {
        console.log('Error thowed by me: ', r);
        setUserFetched({ state: UserStates.ANON });
      }
    });
    return () => { isMounted = false; };
  }, [getUser]);
  return useMemo(() => ({
    current: userFetched, fetchUser, logout, login,
  }), [fetchUser, userFetched, logout, login]);
}

export { useAlert, useModal, useUserActions };
