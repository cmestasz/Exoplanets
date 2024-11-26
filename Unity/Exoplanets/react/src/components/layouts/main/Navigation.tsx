import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface NavigationProps {
  routes: string[];
}

export default function Navigation({
  routes,
}: NavigationProps) {
  const { t } = useTranslation();
  const nav = useNavigate();
  if (routes.length === 0) return null;
  return (
    <nav
      className="flex flex-row portrait:self-center text-3xl items-center gap-2 text-secondary"
    >
      <Text
        invertedStyle
        className="text-3xl"
        asButton
        onClick={() => nav('')}
      >
        {t('components.navigation')}
      </Text>
      {
        routes.map((route, i) => (
          <>
            <span>{'>'}</span>
            <Text
              invertedStyle
              className="text-3xl gap-2"
              asButton
              onClick={() => nav(routes.splice(0, i + 1).join('/'))}
            >
              {
                route === 'exoplanets' || route === 'stars'
                  ? t(`pages.layout.navigation.${route}`)
                  : route
              }
            </Text>
          </>
        ))
      }
    </nav>
  );
}
