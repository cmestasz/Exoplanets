import Text from '@components/ui/Text';
import clsx from 'clsx';

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
      <icon>keyboard_arrow_down</icon>
    </Text>
  );
}
