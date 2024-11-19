import { AlertContext } from '@components/alerts/AlertContext';
import Aside from '@components/layouts/profile/Aside';
import { UserContext } from '@components/user/UserContext';
import { supabase } from '@lib/supabase';
import AsyncData from '@mytypes/AsyncData';
import UserAPI from '@mytypes/User';
import { User } from '@supabase/supabase-js';
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';

export const routes = [
  { route: 'account', icon: 'person' },
  { route: 'constellations', icon: 'star' },
  { route: 'options', icon: 'settings' },
  { route: 'about', icon: 'info' },
  { route: 'help', icon: 'help' },
] as const;

export type ProfileRoutes = typeof routes[number]['route'];

export default function ProfileLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [userFetched, setUserFetched] = useState<AsyncData<UserAPI>>('loading');
  const showAlert = useContext(AlertContext);
  const route: ProfileRoutes = useMemo(() => location.pathname.split('/').filter((s) => s)[1] as ProfileRoutes, [location]);

  const getUser = useCallback(async (userGetted?: User, withAlert?: boolean) => {
    if (!userGetted) {
      const { data: { user: userAuth }, error } = await supabase.auth.getUser();
      if (error || !userAuth) {
        console.log('Auth error: ', error);
        if (withAlert) showAlert({ message: t('components.user.get-user-error'), type: 'error' });
        setUserFetched('error');
        return;
      }
      userGetted = userAuth;
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
  const fetchUser = (userGetted?: User, withAlert?: boolean) => {
    getUser(userGetted, withAlert).catch((r) => {
      console.log('Error thowed by me: ', r);
      setUserFetched('error');
    });
  };
  const userAction = useMemo(() => ({ current: userFetched, fetchUser }), []);
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
  return (
    <UserContext.Provider
      value={userAction}
    >
      <div
        className="flex flex-row portrait:flex-col gap-6 w-screen h-screen px-10 py-5"
      >
        <Aside currentRoute={route} />
        <main
          className="flex flex-col gap-6 flex-auto"
        >
          <header
            className="flex flex-row text-7xl text-primary leading-[3.5rem] p-4 font-orbitron border-2 border-primary rounded-lg items-center justify-center"
          >
            {t(`pages.profile.layout.${route}.header`)}
          </header>
          <div className="flex-auto border-2 border-primary rounded-lg p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </UserContext.Provider>
  );
}
