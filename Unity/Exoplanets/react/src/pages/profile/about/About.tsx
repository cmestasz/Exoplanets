import { useTranslation } from 'react-i18next';
import Scroll from '@components/ui/Scroll';
import AboutSection from './AboutSection';
import Developers from './Developers';
import Technologies from './Technologies';
import Credits from './Credits';

export default function About() {
  const { t } = useTranslation();
  return (
    <Scroll
      className="flex flex-col gap-7 text-secondary font-exo text-3xl"
      thumbClassName="bg-primary border-secondary border-4 border-solid rounded-full"
      scrollBarClassName="bg-transparent h-2"
    >
      <p>{t('pages.profile.about.introduction')}</p>
      <AboutSection
        title={t('pages.profile.about.team.title')}
      >
        {t('pages.profile.about.team.content')}
        <Developers />
      </AboutSection>
      <AboutSection
        title={t('pages.profile.about.develop.title')}
      >
        {t('pages.profile.about.develop.content')}
        <Technologies />
      </AboutSection>
      <AboutSection
        title={t('pages.profile.about.credits.title')}
      >
        {t('pages.profile.about.credits.content')}
        <Credits />
      </AboutSection>
    </Scroll>
  );
}
