import { AdjustCamera } from '@mytypes/UnityTypes';
import { useGlobals } from '@reactunity/renderer';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

export default function ContentProfileLayout() {
  const adjustCamera = useGlobals().AdjustCamera as AdjustCamera;

  useEffect(() => {
    adjustCamera.AdjustToCanvas();
  }, [adjustCamera]);
  return (
    <div className="flex-auto border-2 border-primary rounded-lg p-8">
      <Outlet />
    </div>
  );
}
