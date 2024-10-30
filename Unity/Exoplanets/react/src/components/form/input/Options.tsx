import { FaXmark, FaCheck } from 'react-icons/fa6';

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
        className="text-green border-[1px] rounded-sm border-transparent hover:border-green transition-colors p-1 hover:bg-green-dark cursor-pointer aspect-square"
      >
        <FaCheck
          size={15}
          className="text-green"
        />
      </button>
      <button
        onClick={handleCancel}
        className="text-red border-[1px] rounded-sm border-transparent hover:border-red transition-colors p-1 hover:bg-red-dark cursor-pointer aspect-square"
      >
        <FaXmark
          size={15}
          className="text-red"
        />
      </button>
    </div>
  );
}
