import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TextProps } from './types';

export default function Text({
  invertedStyle,
  onClick,
  asButton,
  disabled,
  size = 'base',
  className,
  children,
}: TextProps) {
  const Comp = asButton ? 'button' : 'view';
  return (
    <Comp
      onClick={asButton ? onClick : undefined}
      disabled={disabled}
      className={twMerge(
        'cursor-pointer flex flex-row gap-2 items-center w-fit p-2 font-exo',
        clsx({
          [INVERTED_COLOR]: invertedStyle,
          [DEFAULT_COLOR]: !invertedStyle,
          'max-h-6 text-xs': size === 'xs',
          'max-h-7 text-sm': size === 'sm',
          'max-h-8 text-base': size === 'base',
          'max-h-9 text-lg': size === 'lg',
          'max-h-10 text-xl': size === 'xl',
        }),
        'disabled:text-primary disabled:cursor-default',
        className,
      )}
    >
      {children}
    </Comp>
  );
}
function Child({ children }: { children: React.ReactNode }) {
  return (
    <span>
      {children}
    </span>
  );
}

Text.Left = Child;
Text.Right = Child;
