import Scroll from '@components/ui/Scroll';
import { Text } from '@components/ui/Text';
import { ProfileRoutes, routes } from '@pages/profile/ProfileRoutes';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useUser } from 'src/providers/UserProvider';
import { UserStates } from '@lib/utils';
import AsideBottom from './AsideBottom';

interface AsideProps {
  currentRoute: ProfileRoutes;
}

export default function Aside({
  currentRoute,
}: AsideProps) {
  const { t } = useTranslation();
  const nav = useNavigate();
  const userAction = useUser();
  const auth = userAction.current.state === UserStates.LOGGED;
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
      >
        {
          routes.filter((route) => route.auth === auth || !route.auth).map((route, i) => (
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
        <AsideBottom />
      </Scroll>
    </aside>
  );
}
