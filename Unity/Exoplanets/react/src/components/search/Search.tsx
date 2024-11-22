interface SearchProps {
  placeholder?: string;
}

export default function Search({
  placeholder,
}: SearchProps) {
  return (
    <search
      className="flex flex-row text-primary text-3xl border-2 border-primary rounded-lg px-4 py-2 gap-6"
    >
      <icon className="text-3xl">search</icon>
      <input
        className="flex-auto w-full bg-transparent placeholder:text-quaternary text-secondary font-exo"
        placeholder={placeholder}
      />
    </search>
  );
}
