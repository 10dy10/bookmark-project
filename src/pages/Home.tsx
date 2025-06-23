import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import BookmarkList from "../components/BookmarkList";
import BookmarkForm from "../components/BookmarkForm";
import type { BookmarkTypes } from "../types/bookmarkTypes";
import { saveBookmarks, loadBookmarks } from "../utils/storage";

export type BookmarkInput = Omit<BookmarkTypes, "id" | "favorite">;

export default function Home() {
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // 선택된 카테고리 상태 ('All' 기본값)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkTypes[]>([]);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkTypes | null>(
    null
  );

  useEffect(() => {
    const saved = loadBookmarks();
    console.log("🔥 불러온 북마크:", saved);
    setBookmarks(saved);
  }, []);

  useEffect(() => {
    if (bookmarks.length === 0) return; // 빈 배열 저장 방지
    console.log("💾 북마크 변경 감지됨:", bookmarks);
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  // 검색 + 카테고리 필터 적용된 북마크 필터링
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch = bookmark.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || bookmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Search", "Video", "Dev"];

  const handleSave = (data: BookmarkInput) => {
    const newBookmark: BookmarkTypes = {
      ...data,
      id: Date.now(),
      favorite: false,
    };
    setBookmarks((prev) => [...prev, newBookmark]);
    setShowModal(false);
  };

  const handleCancel = () => {
    setEditingBookmark(null);
    setShowModal(false);
  };

  function handleToggleFavorite(id: number) {
    // 즐겨찾기 토글 로직
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, favorite: !bookmark.favorite }
          : bookmark
      )
    );
  }

  function handleDelete(id: number) {
    // 삭제 로직
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }

  const handleEdit = (bookmark: BookmarkTypes) => {
    setEditingBookmark(bookmark);
    setShowModal(true);
  };

  const handleUpdate = (data: BookmarkInput) => {
    if (!editingBookmark) return;
    setBookmarks((prev) =>
      prev.map((bm) => (bm.id === editingBookmark.id ? { ...bm, ...data } : bm))
    );
    setEditingBookmark(null);
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">북마크 여기에!</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <BookmarkList
        bookmarks={filteredBookmarks}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        +
      </button>
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => handleCancel()}
        >
          <div
            className="bg-white rounded p-6 w-full max-w-md mx-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <BookmarkForm
              categories={categories.filter((c) => c !== "All")}
              onSave={editingBookmark ? handleUpdate : handleSave}
              onCancel={handleCancel}
              initialData={
                editingBookmark
                  ? {
                      title: editingBookmark.title,
                      url: editingBookmark.url,
                      category: editingBookmark.category,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
