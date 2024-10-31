import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { TextProps } from './types';

export default function Text({
  invertedStyle,
  onClick,
  asButton,
  size = 'base',
  className,
  children,
}: TextProps) {
  const baseStyle = 'cursor-pointer flex flex-row gap-2 items-center w-fit p-2 font-exo';
  const colorStyle = invertedStyle ? INVERTED_COLOR : DEFAULT_COLOR;
  const Comp = asButton ? 'button' : 'view';
  return (
    <Comp
      onClick={asButton ? onClick : undefined}
      className={clsx(baseStyle, colorStyle, {
        'max-h-6 text-xs': size === 'xs',
        'max-h-7 text-sm': size === 'sm',
        'max-h-7 text-base': size === 'base',
        'max-h-8 text-lg': size === 'lg',
        'max-h-9 text-xl': size === 'xl',
      }, className)}
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