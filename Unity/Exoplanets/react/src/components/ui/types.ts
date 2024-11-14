type TextBaseProps = {
  invertedStyle?: boolean;
  className?: string;
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
};

type AsButton = {
  asButton?: true;
  onClick?: () => void;
  disabled?: boolean;
};

export type TextProps =
  TextBaseProps
  & AsButton;
