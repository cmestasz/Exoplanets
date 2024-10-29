export interface AlertOptions {
  message: string;
  type?: 'error' | 'success';
  duration?: number;
}

export type AlertState = 'hide' | 'in' | 'out' | 'visible';
