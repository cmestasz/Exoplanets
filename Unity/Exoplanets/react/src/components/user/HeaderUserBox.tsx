import Text from '@components/ui/Text';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface HeaderUserBoxProps {
  photo?: string;
  username: string;
  opened: boolean;
  onClick: () => void;
}

export default function HeaderUserBox({
  photo, username, onClick, opened,
}: HeaderUserBoxProps) {
  return (
    <Text
      asButton
      invertedStyle
      onClick={onClick}
      className={clsx('w-full', {
        'hover:text-primary text-primary': opened,
      })}
      size="lg"
    >
      {
        photo ? (
          <image
            src={photo}
          />
        ) : (
          <icon>
            person
          </icon>
        )
      }
      {username}
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
