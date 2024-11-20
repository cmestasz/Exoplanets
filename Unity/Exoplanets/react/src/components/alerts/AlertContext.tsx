import { createContext } from 'react';
import { AlertOptions } from './types';

export const AlertContext = createContext<({ message, duration, type }: AlertOptions) => void
>(null);
