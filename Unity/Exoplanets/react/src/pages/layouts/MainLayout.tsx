import SelectLanguage from '@components/languages/SelectLanguage';
import Navigation from '@components/layouts/main/Navigation';
import UserAuth from '@components/user/UserAuth';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router';

export default function MainLayout() {
  const location = useLocation();
  const routes = useMemo(() => location.pathname.split('/').filter((s) => s), [location]);
  return (
    <div
      className="flex flex-col gap-20 w-screen h-screen px-8 py-5 landscape:px-20"
    >
      <div
        className={clsx('flex flex-row portrait:flex-col-reverse', {
          'landscape:justify-between': routes.length > 0,
          'landscape:justify-end': routes.length === 0,
        })}
      >
        <Navigation routes={routes} />
        <div
          className="flex flex-row items-center justify-end portrait:justify-between gap-9"
        >
          <UserAuth />
          <SelectLanguage />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
