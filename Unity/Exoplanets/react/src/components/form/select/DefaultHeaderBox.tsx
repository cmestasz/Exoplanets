import { twMerge } from 'tailwind-merge';
import { DEFAULT_COLOR, INVERTED_COLOR } from '@styles/colors';
import { HeaderBoxProps } from './types';

export default function DefaultHeaderBox({
  title, invertedStyle,
}: HeaderBoxProps) {
  const baseStyle = 'cursor-pointer flex gap-2 justify-center items-center w-fit p-2 font-exo';
  const colorStyle = invertedStyle ? INVERTED_COLOR : DEFAULT_COLOR;
  return (
    <div
      className={twMerge(baseStyle, colorStyle)}
    >
      <p>{title}</p>
    </div>
  );
}
