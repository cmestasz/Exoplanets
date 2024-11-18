import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import {
  AsButton, AsLink, OnlyText, TextBaseProps,
} from './types';

export function Text(props: TextBaseProps & OnlyText): React.JSX.Element;
export function Text(props: TextBaseProps & AsButton): React.JSX.Element;
export function Text(props: TextBaseProps & AsLink): React.JSX.Element;

export function Text(props: TextBaseProps & (AsButton | AsLink | OnlyText)): JSX.Element {
  const {
    invertedStyle, size, children, className,
  } = props;
  const resultClass = twMerge(
    'cursor-pointer flex flex-row gap-[0.35rem] items-center w-fit p-2 font-exo',
    clsx({
      [INVERTED_COLOR]: invertedStyle,
      [DEFAULT_COLOR]: !invertedStyle,
      'max-h-8 text-xs': size === 'xs',
      'max-h-9 text-sm': size === 'sm',
      'max-h-10 text-base': size === 'base',
      'max-h-11 text-lg': size === 'lg',
      'max-h-12 text-xl': size === 'xl',
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
