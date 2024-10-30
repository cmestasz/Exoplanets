import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaXmark } from 'react-icons/fa6';
import { createContext } from 'react';
import { AlertOptions } from './types';

export const AlertContext = createContext<({ message, duration, type }: AlertOptions) => void
>(null);

export interface AlertProps {
  alertOptions: AlertOptions;
  hideAlert: () => void;
}

export default function Alert({
  alertOptions, hideAlert,
}: AlertProps) {
  const baseStyle = 'absolute top-0 right-0 rounded-md border-2 max-w-56 w-fit p-3 shadow-lg z-50 flex flex-row gap-2 m-1.5 text-sm font-exo transition-all enter:-trans-y-[120%] enter:opacity-0 enter:state-duration-0 state-duration-800 leave:-trans-y-[120%]';
  const determinateStyle = clsx({
    'bg-green-dark text-green border-green': alertOptions.type === 'success',
    'bg-red-dark text-red border-red': alertOptions.type === 'error',
  });

  return (
    <view
      className={twMerge(
        baseStyle,
        determinateStyle,
      )}
      style={{ motion: '0.7s 0s ease-in-out' }}
    >
      <span className="flex-auto">{alertOptions.message}</span>
      <FaXmark
        onClick={hideAlert}
        className="cursor-pointer text-red flex-auto"
      />
    </view>
  );
}
