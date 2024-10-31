import Language from '@mytypes/Language';

interface OptionLangProps {
  option: Language;
}

export default function OptionLanguage({
  option,
}: OptionLangProps) {
  return (
    <view
      className="flex flex-row gap-2 p-2 items-center size-full group"
    >
      <image
        src={option.img}
        alt={option.disp}
        className="h-full max-h-6 aspect-square"
      />
      <span className="flex-auto text-secondary group-hover:text-primary">
        {option.disp}
      </span>

    </view>
  );
}
