import { useState, useCallback, useEffect } from 'react';
import { AlertOptions, AlertState } from '@components/alerts/types';
import { DEFAULT_ALERT_DURATION } from './constants';

export function useAlert() {
  const [state, setState] = useState<AlertState>('hide');
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    message: '',
    type: 'success',
    duration: DEFAULT_ALERT_DURATION,
  });

  useEffect(() => {
    let timer: number;

    switch (state) {
      case 'in':
        timer = setTimeout(() => setState('visible'), 500);
        break;
      case 'visible':
        timer = setTimeout(() => setState('out'), alertOptions.duration || DEFAULT_ALERT_DURATION);
        break;
      case 'out':
        timer = setTimeout(() => setState('hide'), 500);
        break;
      default: break;
    }

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
