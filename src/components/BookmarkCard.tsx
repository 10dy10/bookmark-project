import type { BookmarkTypes } from "../types/bookmarkTypes";

type BookmarkCardProps = {
  bookmark: BookmarkTypes;
  onToggleFavorite?: (id: string, currentFavorite: boolean) => void;
  onDelete?: (id: string) => void;
  onEdit?: (bookmark: BookmarkTypes) => void;
};

export default function BookmarkCard({
  bookmark,
  onToggleFavorite,
  onDelete,
  onEdit,
}: BookmarkCardProps) {
  return (
    <div className="border rounded p-4 mb-3 flex justify-between items-center shadow-sm">
      <div>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-semibold"
        >
          {bookmark.title}
        </a>
        <p className="text-sm text-gray-500">{bookmark.category}</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() =>
            onToggleFavorite &&
            onToggleFavorite(bookmark.id!, bookmark.favorite)
          }
          className={`text-xl ${
            bookmark.favorite ? "text-yellow-400" : "text-gray-400"
          }`}
          aria-label="즐겨찾기 토글"
        >
          ★
        </button>
        <button
          onClick={() => onEdit?.(bookmark)}
          className="text-green-600 hover:text-green-800"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete && onDelete(bookmark.id!)}
          className="text-red-500 hover:text-red-700"
          aria-label="삭제"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
