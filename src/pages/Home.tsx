import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import BookmarkList from "../components/BookmarkList";
import BookmarkForm from "../components/BookmarkForm";
import type { BookmarkTypes } from "../types/bookmarkTypes";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";

export type BookmarkInput = Omit<BookmarkTypes, "id" | "favorite">;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // 선택된 카테고리 상태 ('All' 기본값)
  const [showModal, setShowModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkTypes[]>([]);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkTypes | null>(
    null
  );
  const { user } = useAuth();

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "bookmarks")
      );
      if (snapshot.empty) {
        console.log("북마크가 없습니다.");
        setBookmarks([]);
        return;
      }
      const fetched: BookmarkTypes[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            url: data.url,
            category: data.category,
            favorite: data.favorite,
          };
        }
      );

      setBookmarks(fetched);
    } catch (err) {
      console.error("불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const q = collection(db, "users", user.uid, "bookmarks");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: BookmarkTypes[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          url: data.url,
          category: data.category,
          favorite: data.favorite,
        };
      });
      setBookmarks(fetched);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch = bookmark.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || bookmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Search", "Video", "Dev"];

  const handleSave = async (data: BookmarkInput) => {
    if (!user) return;

    const newBookmark = {
      ...data,
      favorite: false,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "users", user.uid, "bookmarks"), newBookmark);
      console.log("북마크 저장됨!");
      setShowModal(false);
    } catch (err) {
      console.error("저장 실패:", err);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setEditingBookmark(null);
    setShowModal(false);
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    if (!user) return;

    try {
      const bookmarkRef = doc(db, "users", user.uid, "bookmarks", id);
      await updateDoc(bookmarkRef, {
        favorite: !currentFavorite,
      });

      setBookmarks((prev) =>
        prev.map((bm) =>
          bm.id === id ? { ...bm, favorite: !currentFavorite } : bm
        )
      );
    } catch (error) {
      console.error("즐겨찾기 토글 실패:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;

    try {
      const bookmarkRef = doc(db, "users", user.uid, "bookmarks", id);
      await deleteDoc(bookmarkRef);

      setBookmarks((prev) => prev.filter((bm) => bm.id !== id));
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

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
