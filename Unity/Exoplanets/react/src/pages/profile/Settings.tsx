import SelectLanguage from '@components/languages/SelectLanguage';

export default function Settings() {
  return (
    <view
      className="flex flex-col gap-5"
    >
      <SelectLanguage
        showLabel
      />
    </view>
  );
}
