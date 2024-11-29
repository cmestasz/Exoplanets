import { useId, useState } from 'react';

interface SearchProps {
  placeholder?: string;
  onSearch: (name: string) => void;
}

export default function Search({
  placeholder, onSearch,
}: SearchProps) {
  const [inputData, setInputData] = useState<string>();
  const searchId = useId();
  const handleClick = (name: string) => {
    onSearch(name);
  };
  const handleChange = (val: string) => {
    setInputData(val);
    if (!val) handleClick(val);
  };
  return (
    <search
      className="flex flex-row flex-initial text-primary text-3xl"
      onSubmit={() => handleClick(inputData)}
    >
      <input
        className="flex-auto bg-transparent placeholder:text-quaternary text-secondary font-exo border-2 border-primary px-4 py-2 rounded-none border-r-0"
        style={{ borderBottomLeftRadius: '0.5rem', borderTopLeftRadius: '0.5rem' }}
        value={inputData}
        onChange={(val) => handleChange(val)}
        placeholder={placeholder}
        name={searchId}
        onSubmit={() => handleClick(inputData)}
      />
      <button
        className="border-2 border-primary px-4 hover:border-secondary hover:text-secondary transition-colors duration-300 ease-out rounded-none group m-duration-300 m-ease-out"
        style={{ borderBottomRightRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
        onClick={() => handleClick(inputData)}
      >
        <icon
          className="text-4xl group-active:scale-90"
        >
          search
        </icon>

      </button>
    </search>
  );
}
