import React, { useState } from "react";
import BookmarkForm from "../components/BookmarkForm";

const categories = ["Search", "Video", "Dev", "News"];

export default function AddBookmarkPage() {
  const [showForm, setShowForm] = useState(true);

  const handleSave = (data: any) => {
    console.log("저장된 데이터:", data);
    setShowForm(false);
    // 여기에 북마크 상태에 추가하는 로직 넣기
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <BookmarkForm
          categories={categories}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
