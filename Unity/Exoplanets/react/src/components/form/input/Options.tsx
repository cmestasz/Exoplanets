interface OptionsProps {
  handleSending: () => void;
  handleCancel: () => void;
}

export default function Options({
  handleCancel, handleSending,
}: OptionsProps) {
  return (
    <div
      className="flex flex-row gap-1"
    >
      <button
        onClick={handleSending}
        className="text-green border-[1px] rounded-sm border-transparent hover:border-green transition-colors hover:bg-green-dark cursor-pointer aspect-square"
      >
        <icon
          className="text-green"
        >
          check
        </icon>
      </button>
      <button
        onClick={handleCancel}
        className="text-red border-[1px] rounded-sm border-transparent hover:border-red transition-colors hover:bg-red-dark cursor-pointer aspect-square"
      >
        <icon
          className="text-red"
        >
          close
        </icon>
      </button>
    </div>
  );
}
