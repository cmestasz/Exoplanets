import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { DEFAULT_COLOR } from '@styles/colors';

interface ArrowSliderProps {
  toLeft?: boolean;
  cardHover: boolean;
  onClick: () => void;
}

export default function ArrowSlider({
  toLeft, onClick, cardHover,
}: ArrowSliderProps) {
  const baseStyle = 'flex items-center justify-center border-primary hover:border-secondary border-2 w-10';
  const colors = DEFAULT_COLOR;
  const rounded = toLeft ? 'rounded-s-lg' : 'rounded-e-lg';
  const arrowVariants: Variants = {
    ontap: {
      x: toLeft ? -3 : 3, scale: 0.8,
    },
    animate: {
      x: 0, scale: 1,
    },
  };
  return (
    <motion.button
      className={twMerge(baseStyle, colors, rounded, clsx(
        {
          'border-s-secondary': cardHover && !toLeft,
          'border-e-secondary': cardHover && toLeft,
        },
      ))}
      onClick={onClick}
    >
      <motion.div
        variants={arrowVariants}
        whileTap="ontap"
        animate="animate"
        className="h-full w-full flex items-center justify-center"
      >
        {
          toLeft ? (
            <FaAngleLeft />
          ) : (
            <FaAngleRight />
          )
        }
      </motion.div>
    </motion.button>
  );
}
