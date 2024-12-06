import { AlertContext } from '@components/modals/AlertContext';
import Modal from '@components/modals/Modal';
import { Text } from '@components/ui/Text';
import { useModal } from '@lib/hooks';
import { Exoplanet } from '@mytypes/astros';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ExoDataProps {
  exo: Exoplanet;
}

export default function ExoData({
  exo,
}: ExoDataProps) {
  const { t } = useTranslation();
  const showAlert = useContext(AlertContext);
  const [nameConst, setNameConst] = useState<string>();

  const {
    open, accept, cancel, content, modalVisible,
  } = useModal({
    title: t('pages.see-exoplanet.create-const.title'),
  });
  const onAccept = () => {
    if (!nameConst) {
      showAlert({
        message: t('pages.see-exoplanet.create-const.empty-name'),
        type: 'error',
      });
      console.log('Vacío');
      return;
    }
    accept();
    setNameConst('');
    showAlert({
      message: t('pages.see-exoplanet.create-const.success'),
    });
    console.log('Accepted content: ', nameConst);
  };
  if (!exo) {
    return (
      <view className="size-7 animate-spin" />
    );
  }
  const data = [
    { key: t('pages.see-exoplanet.data.radius'), val: `${exo.radius} 🌎` },
    { key: t('pages.see-exoplanet.data.distance'), val: `${exo.dist} parsecs` },
    { key: t('pages.see-exoplanet.data.year'), val: exo.discovery_year },
    { key: t('pages.see-exoplanet.data.host_star'), val: exo.host_star },
    { key: t('pages.see-exoplanet.data.amount_stars'), val: exo.stars_amount },
  ];
  const handleClick = () => {
    open();
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
      {
        modalVisible && (
          <Modal
            onAccept={onAccept}
            onCancel={cancel}
            title={content.title}
          >
            <input
              className="border-2 border-primary py-2 px-4 font-exo text-secondary text-3xl bg-transparent"
              value={nameConst}
              onChange={(val) => setNameConst(val)}
              onSubmit={onAccept}
            />
          </Modal>
        )
      }
    </view>
  );
}
