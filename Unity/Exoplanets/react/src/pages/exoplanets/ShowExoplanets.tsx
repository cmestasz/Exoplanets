import AstroCard from '@components/astros/AstroCard';
import Search from '@components/search/Search';
import { Exoplanet } from '@mytypes/astros';
import { AsyncData } from '@mytypes/index';
import { useTranslation } from 'react-i18next';

interface ShowExoplanetsProps {
  exoplanets: AsyncData<Exoplanet[]>
  handleSelect: (exo: Exoplanet) => void;
}

export default function ShowExoplanets({
  exoplanets, handleSelect,
}: ShowExoplanetsProps) {
  const { t } = useTranslation();
  const handleClick = (exo: Exoplanet) => {
    handleSelect(exo);
  };
  return (
    <view
      className="flex flex-col flex-auto gap-7"
    >
      <Search placeholder={t('pages.exoplanets.search')} />
      <view
        className="flex flex-row flex-wrap gap-5"
      >
        {
          exoplanets.state !== 'loaded' ? (
            <view className="self-center justify-self-center animate-spin size-8" />
          ) : (
            exoplanets.data.map((exo) => (
              <AstroCard
                key={exo.name}
                astro={exo}
                onClick={() => handleClick(exo)}
                className="text-3xl basis-80"
              />
            ))
          )
        }
      </view>
    </view>
  );
}
