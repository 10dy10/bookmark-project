type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="검색..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}
