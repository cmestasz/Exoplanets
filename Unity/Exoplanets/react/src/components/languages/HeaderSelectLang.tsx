import Text from '@components/ui/Text';
import Language from '@mytypes/Language';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface HeaderSelectLangProps {
  lang: Language;
  opened: boolean;
  onClick: () => void;
}

export default function HeaderSelectLang({
  lang, onClick, opened,
}: HeaderSelectLangProps) {
  return (
    <Text
      asButton
      invertedStyle
      onClick={onClick}
      className={clsx({
        'hover:text-primary text-primary': opened,
      })}
      size="lg"
    >
      <image
        src={lang.img}
      />
      <span>{lang.disp}</span>
      <icon
        className={twMerge(
          'transition-transform m-duration-400 m-ease-in m-delay-100 duration-400 delay-100 ease-in',
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
