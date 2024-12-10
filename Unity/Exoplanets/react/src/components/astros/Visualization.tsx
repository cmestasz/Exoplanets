/* eslint-disable react/no-unknown-property */
import Spin from '@components/loading/Spin';
import { AdjustCamera, SpaceController } from '@mytypes/unity';
import { ReactUnity, UnityEngine, useGlobals } from '@reactunity/renderer';
import { useEffect, useRef } from 'react';

interface VisualizationProps {
  coords?: { ra: number, dec: number, dist: number } | null;
  multicamera?: boolean;
}

export default function Visualization({
  coords, multicamera,
}: VisualizationProps) {
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;
  const auxiliarCamera = useGlobals().AuxiliarCamera as UnityEngine.Camera;
  const spaceController = useGlobals().SpaceController as UnityEngine.GameObject;
  const crossHair = useGlobals().CrossHair as UnityEngine.GameObject;
  const viewRef = useRef<ReactUnity.UGUI.ContainerComponent>();
  useEffect(() => {
    if (viewRef.current) {
      adjustCamera.AdjustFirstAuxiliar(viewRef.current);
      if (!multicamera) adjustCamera.ResetSecond();
    }
  }, [viewRef, adjustCamera, multicamera]);
  useEffect(() => {
    if (spaceController && coords) {
      const script = spaceController.GetComponent('SpaceController') as unknown as SpaceController;
      script.WarpToCoord(coords.ra, coords.dec, coords.dist);
    }
  }, [spaceController, coords]);
  return (
    <view
      className="relative flex-auto border-primary border-2 rounded-lg"
      ref={viewRef}
    >
      {
        coords ? (
          <>
            <render
              width={500}
              height={500}
              camera={auxiliarCamera}
              onScroll={(ev: UnityEngine.EventSystems.PointerEventData) => {
                auxiliarCamera.transform.Translate(
                  0,
                  0,
                  Math.fround(ev.scrollDelta.y * 10),
                  Interop.UnityEngine.Space.Self,
                );
              }}
              onMount={(ev) => ev.gameObject.SetActive(true)}
              onUnmount={(ev) => ev.gameObject.SetActive(false)}
              className="absolute inset-0"
            />
            <prefab
              className="m-auto inset-0 z-30"
              target={crossHair}
            />
          </>
        ) : (
          <Spin />
        )
      }
    </view>
  );
}
