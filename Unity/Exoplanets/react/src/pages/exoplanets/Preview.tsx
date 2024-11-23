import { Exoplanet } from '@mytypes/astros';

interface PreviewProps {
  currentExoplanet: Exoplanet;
}

export default function Preview({
  currentExoplanet,
}: PreviewProps) {
  if (!currentExoplanet) {
    return (
      <view className="size-7 animate-spin" />
    );
  }
  return (
    <view
      className="flex flex-col flex-1 p-6 gap-3 border-2 border-primary rounded-lg"
    >
      <img
        src={currentExoplanet.imageUrl}
        alt={currentExoplanet.name}
      />
      <h3
        className="font-audiowide text-4xl text-center text-primary leading-10"
      >
        {currentExoplanet.name}
      </h3>
    </view>
  );
}
