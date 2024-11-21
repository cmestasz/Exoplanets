import Scroll from '@components/ui/Scroll';
import { Text } from '@components/ui/Text';
import { UserContext } from '@components/user/UserContext';
import { ProfileRoutes, routes } from '@pages/profile/ProfileRoutes';
import clsx from 'clsx';
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
  const userAction = useContext(UserContext);
  return (
    <aside
      className="flex flex-col rounded-lg landscape:py-4 landscape:px-7 landscape:border-2 landscape:border-primary min-w-48 gap-7"
    >
      <div
        className="flex flex-col gap-2 items-center mb-3 portrait:border-2 portrait:border-primary rounded-lg"
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
      <Scroll
        className="flex flex-col portrait:flex-row flex-auto overflow-hidden gap-5 portrait:border-2 portrait:border-primary portrait:py-3 portrait:px-2"
        thumbClassName="bg-primary border-secondary border-4 border-solid rounded-full"
        scrollBarClassName="bg-transparent h-2"
      >
        {
          routes.map((route, i) => (
            <div
              key={route.route}
              className="text-3xl flex flex-col portrait:flex-row items-start gap-5"
            >
              <hr className={clsx('border-primary border-[1px] landscape:w-full portrait:h-full', {
                'portrait:hidden': i === 0,
              })}
              />
              <Text
                invertedStyle
                asButton
                onClick={() => nav(route.route, { replace: true })}
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
          className="text-3xl flex flex-col items-start gap-6 portrait:flex-row"
        >
          <hr className="border-primary border-[1px] landscape:w-full portrait:h-full landscape:hidden" />
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
          className="text-3xl flex flex-col items-start gap-6 portrait:flex-row"
        >
          <hr className="border-primary border-[1px] landscape:w-full portrait:h-full" />
          <Text
            invertedStyle
            asButton
            onClick={() => userAction.logout('..')}
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
      </Scroll>
    </aside>
  );
}
