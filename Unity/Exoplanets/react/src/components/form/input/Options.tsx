interface OptionsProps {
  handleSending: () => void;
  handleCancel: () => void;
}

export default function Options({
  handleCancel, handleSending,
}: OptionsProps) {
  return (
    <div
      className="flex flex-row gap-5"
    >
      <button
        onClick={handleSending}
        className="text-green border-[1.5px] rounded-sm border-transparent hover:border-green transition-colors hover:bg-green-dark cursor-pointer aspect-square"
      >
        <icon
          className="text-green text-6xl"
        >
          check
        </icon>
      </button>
      <button
        onClick={handleCancel}
        className="text-red border-[1.5px] rounded-sm border-transparent hover:border-red transition-colors hover:bg-red-dark cursor-pointer aspect-square"
      >
        <icon
          className="text-red text-6xl"
        >
          close
        </icon>
      </button>
    </div>
  );
}
