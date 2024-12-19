/* eslint-disable react/no-unknown-property */
import Spin from '@components/loading/Spin';
import { AlertContext } from '@components/modals/AlertContext';
import Modal from '@components/modals/Modal';
import { Text } from '@components/ui/Text';
import { useModal } from '@lib/hooks';
import { AdjustCamera, SpaceController } from '@mytypes/unity';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import clsx from 'clsx';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';

interface VisualizationProps {
  coords?: { ra: number, dec: number, dist: number } | null;
  multicamera?: boolean;
}

export default function Visualization({
  coords, multicamera,
}: VisualizationProps) {
  const { t } = useTranslation();
  const {
    open, accept, cancel, content, modalVisible,
  } = useModal({
    title: t('pages.see-exoplanet.create-const.title'),
  });
  const showAlert = useContext(AlertContext);
  const [nameConst, setNameConst] = useState<string>();
  const [maximized, setMaximized] = useState<boolean>(false);
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera = useGlobals().AuxiliarCamera as UnityEngine.Camera;
  const spaceControllerComp = useGlobals().SpaceController as UnityEngine.GameObject;
  const spaceController = useRef(spaceControllerComp.GetComponent('SpaceController') as unknown as SpaceController);
  const containerRef = useRef<
  ReactUnity.UGUI.ContainerComponent & ReactUnity.UGUI.PortalComponent
  >();
  const modalRef = useRef<ReactUnity.UGUI.PortalComponent>();
  const handleMaximized = () => {
    setMaximized((m) => !m);
  };
  const onAccept = () => {
    if (!nameConst) {
      showAlert({
        message: t('pages.see-exoplanet.create-const.empty-name'),
        type: 'error',
      });
      console.log('Vacío');
      return;
    }
    if (spaceController.current) {
      spaceController.current.SaveConstellation(nameConst);
      accept();
      setNameConst('');
      showAlert({
        message: t('pages.see-exoplanet.create-const.success'),
      });
    }
  };
  const handleOpenModal = () => {
    open();
  };
  const Comp = maximized ? 'portal' : 'view';
  useEffect(() => {
    if (containerRef.current) {
      adjustCamera.AdjustFirstAuxiliar(containerRef.current, false, true);
      if (!multicamera) adjustCamera.ResetSecond();
    }
  }, [containerRef, adjustCamera, multicamera]);
  useEffect(() => {
    if (spaceController.current && coords) {
      spaceController.current.WarpToCoord(coords.ra, coords.dec, coords.dist);
    }
  }, [spaceController, coords]);
  useEffect(() => {
    if (containerRef.current) {
      if (maximized) {
        adjustCamera.MaximizedExoplanets(
          containerRef.current,
          modalVisible && modalRef.current ? [modalRef.current] : null,
        );
      } else {
        adjustCamera.ResetMain(
          containerRef.current,
          modalVisible && modalRef.current ? [modalRef.current] : null,
        );
      }
    }
  }, [maximized, adjustCamera, containerRef, modalRef, modalVisible]);
  return (
    <Comp
      className={clsx('flex items-center justify-center', {
        'relative flex-auto border-primary border-2 rounded-lg': !maximized,
        'absolute inset-0 z-10': maximized,
      })}
      ref={containerRef}
    >
      {
        coords ? (
          <>
            <render
              width={500}
              height={500}
              camera={auxiliarCamera}
              onMount={(ev) => ev.gameObject.SetActive(true)}
              onUnmount={(ev) => ev.gameObject.SetActive(false)}
              className="absolute inset-0 z-10"
            />
            <view
              className="absolute z-20 right-4 bottom-4 flex flex-row gap-4"
            >
              {
                maximized && (
                  <Text
                    asButton
                    onClick={handleOpenModal}
                    className="bg-tertiary text-3xl"
                  >
                    <icon className="text-4xl">add</icon>
                    {t('pages.see-exoplanet.create-const.button')}
                  </Text>
                )
              }
              <Text
                asButton
                onClick={handleMaximized}
                className="bg-tertiary text-3xl"
              >
                {
                  maximized ? (
                    <>
                      <icon className="text-4xl">fullscreen_exit</icon>
                      {t('components.visualization.minimize')}
                    </>
                  ) : (
                    <>
                      <icon className="text">fullscreen</icon>
                      {t('components.visualization.maximize')}
                    </>
                  )
                }
              </Text>
            </view>
          </>
        ) : (
          <Spin />
        )
      }
      {
        modalVisible && (
          <Modal
            onAccept={onAccept}
            onCancel={cancel}
            title={content.title}
            ref={modalRef}
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
    </Comp>
  );
}
