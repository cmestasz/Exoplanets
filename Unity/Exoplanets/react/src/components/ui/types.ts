type TextBaseProps = {
  invertedStyle?: boolean;
  className?: string;
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
};

type AsButton = {
  asButton: true;
  onClick: () => void;
  disabled?: boolean;
  asLink?: undefined;
  url?: undefined;
};

type AsLink = {
  asLink: true;
  url: string;
  asButton?: undefined;
  onClick?: undefined;
  disabled?: undefined;
};

type OnlyText = {
  asButton?: undefined;
  asLink?: undefined;
  onClick?: undefined;
  disabled?: undefined;
  url?: undefined;
};

export type TextProps =
  TextBaseProps
  & (AsButton | AsLink | OnlyText);
