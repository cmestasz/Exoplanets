import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaXmark } from 'react-icons/fa6';
import { AlertOptions, AlertState } from './types';

export interface AlertProps {
  alertOptions: AlertOptions;
  state: AlertState;
  hideAlert: () => void;
}

export default function Alert({
  alertOptions, state, hideAlert,
}: AlertProps) {
  const baseStyle = 'fixed top-0 right-0 rounded-md border-2 max-w-56 w-fit p-3 shadow-lg z-50 flex gap-2 m-1.5 text-sm font-exo';
  const determinateStyle = clsx({
    'bg-green-dark text-green border-green': alertOptions.type === 'success',
    'bg-red-dark text-red border-red': alertOptions.type === 'error',
  });

  return (
    state !== 'hide' && (
      <div
        key="alert"
        className={twMerge(
          baseStyle,
          determinateStyle,
          clsx({
            'animate-alert-in': state === 'in',
            'animate-alert-out': state === 'out',
          }),
        )}
      >
        <span>{alertOptions.message}</span>
        <FaXmark
          onClick={hideAlert}
          className="cursor-pointer"
        />
      </div>
    )

  );
}
