import {
  useState, useCallback, useEffect, useMemo,
  useContext,
} from 'react';
import { AlertOptions, ModalContent } from '@components/modals/types';
import { useTranslation } from 'react-i18next';
import { UserManager } from '@mytypes/user';
import { AlertContext } from '@components/modals/AlertContext';
import { useNavigate } from 'react-router';
import { API_URL } from 'src/config';
import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { DEFAULT_ALERT_DURATION } from './constants';
import { AuthSocket, UserStates } from './utils';

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
  const getUser = useCallback(async (session?:
  { token: string, refresh_token: string }, withAlert?: boolean) => {
    let userAuth: User; let sessionError: AuthError;
    if (session) {
      const { data: { user }, error } = await supabase.auth.setSession({
        access_token: session.token,
        refresh_token: session.refresh_token,
      });
      userAuth = user;
      sessionError = error;
    } else {
      const { data: { user }, error } = await supabase.auth.getUser();
      userAuth = user;
      sessionError = error;
    }
    if (sessionError || !userAuth) {
      console.log('Auth error: ', sessionError);
      if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
      setUserFetched({ state: UserStates.ANON });
      return { error: sessionError };
    }
    const { data, error: err } = await supabase.from('users').select().eq('id', userAuth.id).maybeSingle();
    if (err) {
      console.error('Send by supabase', err.message);
      if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
      setUserFetched({ state: UserStates.ANON });
      return { error: err };
    }

    setUserFetched({ state: UserStates.LOGGED, user: data });
    return { error: null, data };
  }, [showAlert, t]);
  const logout = useCallback((redirectTo?: string) => {
    // Logout using API
    fetch(`${API_URL}/logout`, {
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
        console.log(e.message);
      });
  }, [t, nav, showAlert]);
  const login = useCallback(() => {
    // Redirect to api endpoint for login
    Interop.UnityEngine.Application.OpenURL(`${API_URL}/login`);
    // Initilize web socket connection
    const socket = AuthSocket();
    socket.addEventListener('message', async (e) => {
      console.log('Mensaje recibido: ', e.data);
      if (e.data) {
        const { error } = await getUser(JSON.parse(e.data));
        if (error) {
          showAlert({ message: t('components.user.login-error'), type: 'error' });
        }
        socket.send('token_received');
      } else {
        console.log('Sin mensaje');
      }
    });
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
    current: userFetched, getUser, logout, login,
  }), [getUser, userFetched, logout, login]);
}

export { useAlert, useModal, useUserActions };
