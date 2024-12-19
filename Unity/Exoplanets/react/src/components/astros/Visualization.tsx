/* eslint-disable react/no-unknown-property */
import Spin from '@components/loading/Spin';
import { Text } from '@components/ui/Text';
import { AdjustCamera, SpaceController } from '@mytypes/unity';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface VisualizationProps {
  coords?: { ra: number, dec: number, dist: number } | null;
  multicamera?: boolean;
}

export default function Visualization({
  coords, multicamera,
}: VisualizationProps) {
  const { t } = useTranslation();
  const [maximized, setMaximized] = useState<boolean>(false);
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera = useGlobals().AuxiliarCamera as UnityEngine.Camera;
  const spaceControllerComp = useGlobals().SpaceController as UnityEngine.GameObject;
  const spaceController = useRef(spaceControllerComp.GetComponent('SpaceController') as unknown as SpaceController);
  const containerRef = useRef<
  ReactUnity.UGUI.ContainerComponent & ReactUnity.UGUI.PortalComponent
  >();
  const handleMaximized = () => {
    setMaximized((m) => !m);
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
        adjustCamera.MaximizedExoplanets(containerRef.current);
      } else {
        adjustCamera.ResetMain(containerRef.current);
      }
    }
  }, [maximized, adjustCamera, containerRef]);
  return (
    <Comp
      className={clsx('flex items-center justify-center', {
        'relative flex-auto border-primary border-2 rounded-lg': !maximized,
        'absolute inset-0': maximized,
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
    </Comp>
  );
}
