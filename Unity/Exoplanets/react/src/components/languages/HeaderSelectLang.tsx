import { Text } from '@components/ui/Text';
import { Language } from '@mytypes/language';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface HeaderSelectLangProps {
  lang: Language;
  opened: boolean;
  onClick: () => void;
  showLabel?: boolean;
}

export default function HeaderSelectLang({
  lang, onClick, opened, showLabel,
}: HeaderSelectLangProps) {
  return (
    <Text
      asButton
      invertedStyle
      onClick={onClick}
      className={clsx('max-h-32 px-3 py-10 text-3xl gap-5', {
        'hover:text-primary text-primary': opened,
      })}
    >
      <img
        className={clsx({
          'flex-auto': !showLabel,
        })}
        src={lang.img}
        alt="Language"
      />
      <span className={clsx({
        'flex-auto text-left': showLabel,
      })}
      >
        {lang.disp}
      </span>
      <icon
        className={twMerge(
          'transition-transform m-duration-400 m-ease-in m-delay-100 duration-400 delay-100 ease-in text-5xl',
          clsx({
            'rotate-180': opened,
          }),
        )}
      >
        keyboard_arrow_down
      </icon>
    </Text>
  );
}
