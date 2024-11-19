import { Text } from '@components/ui/Text';
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
      className={clsx('max-h-32 text-3xl px-3 py-8 gap-5', {
        'hover:text-primary text-primary': opened,
      })}
    >
      {
        photo ? (
          <img
            className="flex-auto"
            src={photo}
            alt="Profile"
          />
        ) : (
          <icon>
            person
          </icon>
        )
      }
      <span className="flex flex-row flex-auto">
        {username}
      </span>
      <icon
        className={twMerge(
          'transition-transform m-duration-400 m-ease-in m-delay-100 duration-400 delay-100 text-5xl ease-in flex-auto',
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
