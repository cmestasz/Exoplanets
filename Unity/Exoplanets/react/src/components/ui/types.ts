import React from 'react';

export type TextBaseProps = {
  invertedStyle?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export type AsButton = {
  asButton: true;
  onClick: () => void;
  disabled?: boolean;
};

export type AsLink = {
  asLink: true;
  url: string;
};

export type OnlyText = {
  asButton?: undefined;
  asLink?: undefined;
};
