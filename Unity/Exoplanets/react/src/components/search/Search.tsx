interface SearchProps {
  placeholder?: string;
}

export default function Search({
  placeholder,
}: SearchProps) {
  return (
    <search
      className="flex flex-row text-primary text-3xl"
    >
      <button
        className="border-2 border-primary px-4 hover:border-secondary hover:text-secondary transition-colors duration-300 ease-out rounded-none group m-duration-300 m-ease-out"
        style={{ borderBottomLeftRadius: '0.5rem', borderTopLeftRadius: '0.5rem' }}
      >
        <icon
          className="text-4xl group-active:scale-90"
        >
          search
        </icon>

      </button>
      <input
        className="flex-grow bg-transparent placeholder:text-quaternary text-secondary font-exo border-2 border-primary px-4 py-2 rounded-none border-l-0"
        style={{ borderBottomRightRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
        placeholder={placeholder}
      />
    </search>
  );
}
