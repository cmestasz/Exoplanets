import clsx from 'clsx';
import { AlertOptions } from './types';

export interface AlertProps {
  alertOptions: AlertOptions;
  hideAlert: () => void;
}

export default function Alert({
  alertOptions, hideAlert,
}: AlertProps) {
  return (
    <view
      className={clsx(
        'absolute top-0 right-0 rounded-md border-2 max-w-56 w-fit p-3 shadow-lg z-50 flex flex-row gap-2 m-1.5 text-sm font-exo duration-800 transition-all enter:-trans-y-[120%] enter:scale-90 enter:opacity-0  enter:state-duration-0 state-duration-800 leave:-trans-y-[120%] leave:opacity-0 leave:scale-90 m-duration-700 m-ease-out',
        {
          'bg-green-dark text-green border-green': alertOptions.type === 'success',
          'bg-red-dark text-red border-red': alertOptions.type === 'error',
        },
      )}
    >
      <span className="flex-auto">{alertOptions.message}</span>
      <icon
        onClick={hideAlert}
        className="cursor-pointer text-red flex-auto"
      >
        close
      </icon>
    </view>
  );
}
