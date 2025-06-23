type CategoryFilterProps = {
  selected: string;
  onSelect: (val: string) => void;
};

const categories = ["All", "Search", "Video", "Dev"];

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex space-x-4 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded ${
            selected === cat ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
