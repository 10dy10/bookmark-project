import BookmarkCard from "./BookmarkCard";
import type { BookmarkTypes } from "../types/bookmarkTypes";

type BookmarkListProps = {
  bookmarks: BookmarkTypes[];
  onToggleFavorite?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (bookmark: BookmarkTypes) => void;
};

export default function BookmarkList({
  bookmarks,
  onToggleFavorite,
  onDelete,
  onEdit,
}: BookmarkListProps) {
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
