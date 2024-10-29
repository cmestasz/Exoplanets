import { useState, useCallback, useEffect } from 'react';
import { AlertOptions } from '@components/alerts/types';
import { DEFAULT_ALERT_DURATION } from './constants';

export type InOutStates = 'initial' | 'in' | 'normal' | 'out';

interface InOutAnimationProps {
  durationIn: number;
  durationOut?: number;
}

export function useInOutAnimation({ durationIn, durationOut = durationIn }: InOutAnimationProps) {
  const [state, setState] = useState<InOutStates>('initial');
  useEffect(() => {
    let timer: number;

    switch (state) {
      case 'in':
        timer = setTimeout(() => setState('normal'), durationIn);
        break;
      case 'out':
        timer = setTimeout(() => setState('initial'), durationOut);
        break;
      default: break;
    }

    return () => clearTimeout(timer);
  }, [state]);

  return {
    state, setState,
  };
}

export function useAlert() {
  const { state, setState } = useInOutAnimation({ durationIn: 500 });
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    message: '',
    type: 'success',
    duration: DEFAULT_ALERT_DURATION,
  });

  useEffect(() => {
    const timer: number = setTimeout(() => setState('out'), alertOptions.duration || DEFAULT_ALERT_DURATION);

    return () => clearTimeout(timer);
  }, [state, alertOptions]);

  const showAlert = useCallback(({ message, type = 'success', duration = DEFAULT_ALERT_DURATION }: AlertOptions) => {
    setAlertOptions({ message, type, duration });
    setState('in');
  }, []);

  const hideAlert = useCallback(() => {
    setState('out');
  }, []);

  return {
    state, alertOptions, showAlert, hideAlert,
  };
}
