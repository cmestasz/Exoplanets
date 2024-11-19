import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';

type ProfileRoutes = 'account' | 'constellations' | 'options' | 'about' | 'help';

export default function ProfileLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const route: ProfileRoutes = useMemo(() => location.pathname.split('/').filter((s) => s)[1] as ProfileRoutes, [location]);
  return (
    <div
      className="flex flex-row gap-6 w-screen h-screen px-10 py-5"
    >
      <aside
        className="flex flex-col rounded-lg p-4 border-2 border-primary min-w-48"
      >
        <div
          className="flex flex-col gap-2 items-center"
        >
          <h1
            className="text-primary font-orbitron text-5xl leading-10"
          >
            Exoplanets
          </h1>
          <h2
            className="font-exo text-secondary text-2xl"
          >
            {t('pages.subtitle')}
          </h2>
        </div>
      </aside>
      <main
        className="flex flex-col gap-6 flex-auto"
      >
        <header
          className="flex flex-row text-6xl text-primary leading-10 p-4 font-orbitron border-2 border-primary items-center justify-center"
        >
          {t(`pages.profile.layout.${route}.header`)}
        </header>
        <Outlet />
      </main>
    </div>
  );
}
