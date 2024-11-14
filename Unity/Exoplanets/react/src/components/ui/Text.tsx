import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  AsButton, AsLink, OnlyText, TextBaseProps,
} from './types';

export function Text(props: TextBaseProps & OnlyText): JSX.Element;
export function Text(props: TextBaseProps & AsButton): JSX.Element;
export function Text(props: TextBaseProps & AsLink): JSX.Element;

export function Text(props: TextBaseProps & (AsButton | AsLink | OnlyText)): JSX.Element {
  const {
    invertedStyle, size, children, className,
  } = props;
  const resultClass = twMerge(
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
  );
  if ('onClick' in props) {
    const { onClick, disabled } = props;
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={resultClass}
      >
        {children}
      </button>
    );
  }

  if ('url' in props) {
    const { url } = props;
    return (
      <anchor
        // eslint-disable-next-line react/no-unknown-property
        url={url}
        className={twMerge(resultClass, 'not-italic')}
      >
        {children}
      </anchor>
    );
  }

  return (
    <div
      className={resultClass}
    >
      {children}
    </div>
  );
}
