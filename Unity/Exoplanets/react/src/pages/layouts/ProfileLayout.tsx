import Aside from '@components/layouts/profile/Aside';
import { useMemo } from 'react';
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
          className="flex flex-row text-6xl text-primary leading-10 p-4 font-orbitron border-2 border-primary rounded-lg items-center justify-center"
        >
          {t(`pages.profile.layout.${route}.header`)}
        </header>
        <div className="flex-auto border-2 border-primary rounded-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
