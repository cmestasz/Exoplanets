import { AlertContext } from '@components/alerts/Alert';
import { Text } from '@components/ui/Text';
import { supabase } from '@lib/supabase';
import { ProfileRoutes, routes } from '@pages/layouts/ProfileLayout';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface AsideProps {
  currentRoute: ProfileRoutes;
}

export default function Aside({
  currentRoute,
}: AsideProps) {
  const { t } = useTranslation();
  const nav = useNavigate();
  const showAlert = useContext(AlertContext);
  const handleLogout = () => {
    supabase.auth.signOut().then(({ error }) => {
      if (error) {
        console.error(error);
        showAlert({ message: t('components.user.logout-error'), type: 'error' });
      } else {
        nav('/');
        console.log('Cerró sesión');
      }
    });
  };
  return (
    <aside
      className="flex flex-col rounded-lg py-4 px-7 border-2 border-primary min-w-48 gap-6"
    >
      <div
        className="flex flex-col gap-2 items-center mb-3"
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
      {
        routes.map((route) => (
          <div
            key={route.route}
            className="text-3xl flex flex-col items-start gap-6"
          >
            <hr className="border-primary border-[1px] w-full" />
            <Text
              invertedStyle
              asButton
              onClick={() => nav(`profile/${route}`)}
              disabled={route.route === currentRoute}
            >
              <icon
                className="text-3xl"
              >
                {route.icon}
              </icon>
              <span>
                {t(`pages.profile.layout.${route.route}.menu`)}
              </span>
            </Text>
          </div>
        ))
      }
      <div className="flex-auto" />
      <div
        className="text-3xl flex flex-col items-start gap-6"
      >
        <Text
          invertedStyle
          asButton
          onClick={() => nav(-1)}
        >
          <icon
            className="text-3xl"
          >
            arrow_back
          </icon>
          <span>
            {t('pages.profile.layout.back')}
          </span>
        </Text>
      </div>
      <div
        className="text-3xl flex flex-col items-start gap-6"
      >
        <hr className="border-primary border-[1px] w-full" />
        <Text
          invertedStyle
          asButton
          onClick={handleLogout}
          className="text-red hover:text-red-dark"
        >
          <icon
            className="text-3xl"
          >
            logout
          </icon>
          <span>
            {t('components.user.logout')}
          </span>
        </Text>
      </div>
    </aside>
  );
}
