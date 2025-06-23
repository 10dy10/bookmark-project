import type { BookmarkTypes } from "../types/bookmarkTypes";

export const STORAGE_KEY = "bookmark-data";

export const saveBookmarks = (data: BookmarkTypes[]) => {
  console.log("✅ 저장 호출됨:", data); // 추가
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadBookmarks = (): BookmarkTypes[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
