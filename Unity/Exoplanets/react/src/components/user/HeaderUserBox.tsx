import { twMerge } from 'tailwind-merge';
import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { HeaderBoxProps } from '../form/select/types';

export interface HeaderUserBoxProps extends HeaderBoxProps {
  image: string;
  className?: string;
}

export default function HeaderUserBox({
  image, title, invertedStyle, className,
}: HeaderUserBoxProps) {
  const baseStyle = 'cursor-pointer flex gap-2 justify-center items-center w-fit p-2 font-exo';
  const colorStyle = invertedStyle ? INVERTED_COLOR : DEFAULT_COLOR;
  return (
    <div
      className={twMerge(baseStyle, colorStyle, className)}
    >
      <img
        src={image}
        /* width={20}
        height={20} */
        alt={title}
        className="rounded-full"
      />
      {title}
    </div>
  );
}
