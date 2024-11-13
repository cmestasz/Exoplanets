import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DEFAULT_COLOR } from '@styles/colors';
import { Style } from '@reactunity/renderer';

interface ArrowSliderProps {
  toLeft?: boolean;
  cardHover: boolean;
  onClick: () => void;
}

export default function ArrowSlider({
  toLeft, onClick, cardHover,
}: ArrowSliderProps) {
  const baseStyle = 'border-primary hover:border-secondary border-2 w-10 max-h-48 group';
  const colors = DEFAULT_COLOR;
  const leftArrow: Style = {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightColor: cardHover ? 'var(--secondary)' : '',
  };
  const rightArrow: Style = {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftColor: cardHover ? 'var(--secondary)' : '',
  };
  return (
    <div
      className={twMerge(baseStyle, colors)}
      style={toLeft ? leftArrow : rightArrow}
    >
      <button
        onClick={onClick}
        className={clsx(
          'h-full w-full flex items-center justify-center m-duration-300 m-ease-in active:scale-90',
          {
            'active:trans-x-4': !toLeft,
            'active:-trans-x-4': toLeft,
          },
        )}
      >
        {
          toLeft ? (
            <icon className="text-primary group-hover:text-secondary transition-colors duration-300 ease-out">
              chevron_left
            </icon>

          ) : (
            <icon className="text-primary group-hover:text-secondary transition-colors duration-300 ease-out">
              chevron_right
            </icon>
          )
        }
      </button>
    </div>
  );
}
