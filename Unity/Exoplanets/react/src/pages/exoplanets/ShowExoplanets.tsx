import AstroCard from '@components/astros/AstroCard';
import Search from '@components/search/Search';
import Scroll from '@components/ui/Scroll';
import { Exoplanet } from '@mytypes/astros';
import { AsyncData } from '@mytypes/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface ShowExoplanetsProps {
  handleSelect: (exo: Exoplanet) => void;
  filterExos: (name: string) => void;
  leakedExos: AsyncData<Exoplanet[]>;
  changeLeakedExos: (data: AsyncData<Exoplanet[]>) => void;
}

export default function ShowExoplanets({
  handleSelect, filterExos, leakedExos, changeLeakedExos,
}: ShowExoplanetsProps) {
  const { t } = useTranslation();
  const nav = useNavigate();
  const handleClick = (exo: Exoplanet) => {
    handleSelect(exo);
  };
  const onSearch = (name: string) => {
    changeLeakedExos({ state: 'loading' });
    filterExos(name);
  };
  return (
    <view
      className="flex flex-col flex-auto gap-7"
    >
      <Search
        placeholder={t('pages.exoplanets.search')}
        onSearch={onSearch}
      />
      <Scroll
        className="flex flex-row flex-auto flex-wrap gap-5"
      >
        {
          leakedExos.state === 'loading' && (
            <view
              className="flex flex-auto items-center justify-center self-center h-full"
            >
              <view
                className="rounded-full animate-spin-f size-20 border-4 border-primary border-l-0 border-b-0"
              />
            </view>
          )
        }
        {
          leakedExos.state === 'loaded' && leakedExos.data.length === 0 && (
            <view
              className="flex flex-auto items-center justify-center self-center h-full text-primary"
            >
              <h3
                className="text-5xl font-audiowide leading-8"
              >
                {t('pages.exoplanets.no-results.main')}
              </h3>
              <h5
                className="text-4xl font-exo text-secondary"
              >
                {t('pages.exoplanets.no-results.sub')}
              </h5>
            </view>
          )
        }
        {
          leakedExos.state === 'loaded' && leakedExos.data.length > 0 && (
            leakedExos.data.map((exo) => (
              <AstroCard
                key={exo.name}
                astro={exo}
                onClick={() => handleClick(exo)}
                onDoubleClick={() => nav(exo.name)}
                className="text-3xl basis-80"
              />

            ))
          )
        }
      </Scroll>
    </view>
  );
}
