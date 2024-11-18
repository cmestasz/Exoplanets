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
      className="flex flex-col"
      style={{ minHeight: '100vh', padding: '0.75rem' }}
    >
      <div
        className="flex flex-row items-center justify-end"
        style={{ justifyContent: 'flex-end', flexGrow: '0', height: 'fit-content' }}
      >
        <UserAuth />
        <SelectLanguage />
      </div>
      <div
        className="flex flex-col flex-auto justify-center"
        style={{ gap: '2.5rem' }}
      >
        <div
          className="flex flex-col gap-1 items-center"
        >
          <h1
            className="text-primary"
            style={{ fontFamily: 'Orbitron', fontSize: '3.5rem' }}
          >
            Exoplanets
          </h1>
          <h2
            className="font-exo text-secondary text-xl"
          >
            Descubre el universo cercano
          </h2>
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
          <Text
            invertedStyle
            asButton
            onClick={() => nav('about')}
          >
            <icon>info</icon>
            Acerca de
          </Text>
          <Text
            invertedStyle
            asButton
            onClick={() => nav('help')}
          >
            <icon>help</icon>
            Ayuda
          </Text>
        </div>
        <Text
          invertedStyle
          asLink
          url="https://github.com/cmestasz/Exoplanets"
        >
          <icon>github</icon>
          Repositorio
        </Text>
      </div>
    </view>
  );
}
