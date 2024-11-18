import AstroCard from '@components/astros/AstroCard';
import SelectLanguage from '@components/languages/SelectLanguage';
import { Text } from '@components/ui/Text';
import UserAuth from '@components/user/UserAuth';
import { Astro } from '@mytypes/Astro';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

export default function MainMenu() {
  const nav = useNavigate();
  const astros = useMemo<Pick<Astro, 'imageUrl' | 'name'>[]>(() => [
    { imageUrl: '/img/kepler.jpeg', name: 'Exoplanetas' },
    { imageUrl: '/img/proximaCentauri.jpeg', name: 'Estrellas' },
  ], []);
  return (
    <view
      className="flex flex-col p-5"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="flex flex-row items-center justify-end"
        style={{ justifyContent: 'flex-end', flexGrow: '0', height: 'fit-content' }}
      >
        <UserAuth />
        <SelectLanguage />
      </div>
      <div
        className="flex flex-col gap-4 flex-auto justify-center"
      >
        <div
          className="flex flex-col gap-2"
        >
          <h1>Exoplanets</h1>
          <h2>Descubre el universo cercano</h2>
        </div>
        <div
          className="flex flex-row items-center justify-center"
          style={{ gap: '3rem' }}
        >
          <AstroCard astro={astros[0]} onClick={() => nav('exoplanets')} />
          <AstroCard astro={astros[1]} onClick={() => nav('stars')} />
        </div>
      </div>
      <div
        className="flex flex-row justify-between"
        style={{ flexGrow: '0' }}
      >
        <div
          className="flex flex-row gap-2"
        >
          <Text>Acerca de</Text>
          <Text>Ayuda</Text>
        </div>
        <Text>Repositorio</Text>
      </div>
    </view>
  );
}
