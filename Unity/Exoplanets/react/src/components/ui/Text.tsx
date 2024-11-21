/* eslint-disable react/void-dom-elements-no-children */
import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { ReactUnity, UnityEngine } from '@reactunity/renderer';
import {
  AsButton, AsLink, OnlyText, TextBaseProps,
} from './types';

export function Text(props: TextBaseProps & OnlyText): React.JSX.Element;
export function Text(props: TextBaseProps & AsButton): React.JSX.Element;
export function Text(props: TextBaseProps & AsLink): React.JSX.Element;

export function Text(props: TextBaseProps & (AsButton | AsLink | OnlyText)): JSX.Element {
  const {
    invertedStyle, children, className,
  } = props;
  const resultClass = twMerge(
    'cursor-pointer flex flex-row gap-2 items-center justify-center w-fit p-2 font-exo',
    clsx({
      [INVERTED_COLOR]: invertedStyle,
      [DEFAULT_COLOR]: !invertedStyle,
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
    const { url, inline, content } = props;
    if (inline) {
      const handleLink = (
        ev: UnityEngine.EventSystems.PointerEventData,
        sender: ReactUnity.UGUI.TextComponent,
      ) => {
        const linkId = sender.GetLinkInfo(ev);
        if (linkId) Interop.UnityEngine.Application.OpenURL(linkId);
      };
      return (
        <richtext
          className={resultClass}
          // eslint-disable-next-line react/no-unknown-property
          onPointerClick={handleLink}
        >
          <link value={url}>
            {content}
          </link>
        </richtext>
      );
    }
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
