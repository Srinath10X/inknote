"use client";

import { create } from "zustand";

type Note = {
  id: string;
  noteCtx: {
    note_title: string;
  };
};

type NotesStore = {
  notes: Note[];
  getNotes: () => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],

  getNotes: async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    set({ notes: data });
  },

  deleteNote: async (id: string) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId: id }),
    });
    const res = await fetch("/api/notes");
    const data = await res.json();
    set({ notes: data });
  },
}));
