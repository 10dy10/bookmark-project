import { useState, useEffect } from "react";
import type { BookmarkTypes } from "../types/bookmarkTypes";

type BookmarkInput = Omit<BookmarkTypes, "id" | "favorite">;

type BookmarkFormProps = {
  categories: string[];
  onSave: (data: BookmarkInput) => void;
  onCancel: () => void;
  initialData?: BookmarkInput;
};

export default function BookmarkForm({
  initialData,
  categories,
  onSave,
  onCancel,
}: BookmarkFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [category, setCategory] = useState(
    initialData?.category || categories[0] || ""
  );
  // const [favorite, setFavorite] = useState(initialData?.favorite || false);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setUrl(initialData?.url || "");
    setCategory(initialData?.category || categories[0] || "");
  }, [initialData, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return alert("제목과 URL을 입력하세요.");
    onSave({ title, url, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow-md max-w-md mx-auto"
    >
      <div>
        <label className="block mb-1 font-semibold">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded border"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}
