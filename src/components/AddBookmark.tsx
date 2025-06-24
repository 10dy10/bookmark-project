import React, { useState } from "react";
import BookmarkForm from "../components/BookmarkForm";

const categories = ["Search", "Video", "Dev", "News"];

export default function AddBookmarkPage() {
  const [showForm, setShowForm] = useState(true);

  const handleSave = (data: any) => {
    console.log("저장된 데이터:", data);
    setShowForm(false);
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
