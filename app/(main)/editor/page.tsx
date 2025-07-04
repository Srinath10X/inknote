"use client";

import { useNotesStore } from "@/lib/store/note";
import { PlusCircleIcon } from "lucide-react";

export default function EditorPage() {
  const { getNotes } = useNotesStore();

  async function createNote() {
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    getNotes();
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1>Welcome to Inknote</h1>
        <button
          onClick={createNote}
          className="m-4 px-6 py-3 bg-[#1e1e1e] text-white rounded-md hover:cursor-pointer flex gap-2 active:scale-95 duration-300"
        >
          <PlusCircleIcon width={16} />
          Create a note
        </button>
      </div>
    </>
  );
}
