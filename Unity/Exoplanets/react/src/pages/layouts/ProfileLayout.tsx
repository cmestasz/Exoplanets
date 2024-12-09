import Aside from '@components/layouts/profile/Aside';
import { ProfileRoutes } from '@pages/profile/ProfileRoutes';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';

export default function ProfileLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const route: ProfileRoutes = useMemo(() => location.pathname.split('/').filter((s) => s)[1] as ProfileRoutes, [location]);

  return (
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
        <Outlet />
      </main>
    </div>
  );
}
