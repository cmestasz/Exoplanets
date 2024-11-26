import { Text } from '@components/ui/Text';
import { Exoplanet } from '@mytypes/astros';
import { useTranslation } from 'react-i18next';
import { useModals } from 'src/providers/ModalProvider';

interface ExoDataProps {
  exo: Exoplanet;
}

export default function ExoData({
  exo,
}: ExoDataProps) {
  const { t } = useTranslation();
  const showModal = useModals();
  if (!exo) {
    return (
      <view className="size-7 animate-spin" />
    );
  }
  const data = [
    { key: t('pages.exoplanets.card.radius'), val: exo.radius },
    { key: t('pages.exoplanets.card.mass'), val: exo.mass },
    { key: t('pages.exoplanets.card.year'), val: exo.disc_date },
  ];
  const onAccept = () => {
    console.log('Accepted content');
  };
  const handleClick = () => {
    showModal({
      title: t('pages.see-exoplanet.create-const.title'),
      onAccept,
      children: <h1>Proving</h1>,
    });
    console.log(exo.name);
  };
  return (
    <view
      className="flex flex-col gap-8 pt-2 flex-auto"
    >
      <header
        className="flex flex-row flex-initial justify-between"
      >
        <h2 className="font-orbitron font-bold text-primary leading-10 text-5xl">{exo.name}</h2>
        <Text
          asButton
          onClick={handleClick}
          className="text-3xl"
        >
          <icon className="text-4xl">add</icon>
          {t('pages.see-exoplanet.create-const.button')}
        </Text>
      </header>
      <view
        className="flex flex-row flex-auto items-center border-2 border-primary rounded-lg gap-10 p-6"
      >
        {
          data.map(({ key, val }, index) => (
            <view
              key={key}
              className="flex flex-row h-full items-center gap-10"
            >
              <article
                className="flex flex-col items-center font-exo text-4xl gap-4"
              >
                <span className="text-primary flex-auto">{key}</span>
                <span className="text-secondary flex-auto">{val}</span>
              </article>
              {index !== data.length - 1 && <hr className="border-primary border-[1px] h-full" />}
            </view>
          ))
        }
      </view>
    </view>
  );
}
