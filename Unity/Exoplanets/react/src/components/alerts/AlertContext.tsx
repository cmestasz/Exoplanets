import React, { createContext } from 'react';
import { AlertOptions } from './types';

interface AlertContextType {
  alertOptions: AlertOptions | null;
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
  isVisible: boolean;
}

export const AlertContext = createContext<AlertContextType | null>(null);
