import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Note {
  id: string;
  title: string;
  emoji: string | null;
  isOpen: boolean;
  children: Note[];
}

interface NotesState {
  notes: Note[];
  selectedId: string | null;

  addNote: (note: Note, parentId?: string) => void;
  deleteNote: (id: string) => void;
  toggleNote: (id: string) => void;
  selectNote: (id: string) => void;

  updateTitle: (id: string, title: string) => void;
  updateEmoji: (id: string, emoji: string | null) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      selectedId: null,

      addNote: (note, parentId) =>
        set((state) => {
          if (!parentId) {
            return {
              notes: [...state.notes, note],
              selectedId: note.id,
            };
          }

          const insert = (list: Note[]): Note[] =>
            list.map((n) =>
              n.id === parentId
                ? { ...n, isOpen: true, children: [...n.children, note] }
                : { ...n, children: insert(n.children) },
            );

          return {
            notes: insert(state.notes),
            selectedId: note.id,
          };
        }),

      deleteNote: (id) =>
        set((state) => {
          const remove = (list: Note[]): Note[] =>
            list
              .filter((n) => n.id !== id)
              .map((n) => ({ ...n, children: remove(n.children) }));

          const newNotes = remove(state.notes);

          return {
            notes: newNotes,
            selectedId:
              state.selectedId === id
                ? (newNotes[0]?.id ?? null)
                : state.selectedId,
          };
        }),

      toggleNote: (id) =>
        set((state) => {
          const toggle = (list: Note[]): Note[] =>
            list.map((n) =>
              n.id === id
                ? { ...n, isOpen: !n.isOpen }
                : { ...n, children: toggle(n.children) },
            );
          return { notes: toggle(state.notes) };
        }),

      selectNote: (id) => set({ selectedId: id }),

      updateTitle: (id, title) =>
        set((state) => {
          const update = (list: Note[]): Note[] =>
            list.map((n) =>
              n.id === id
                ? { ...n, title }
                : { ...n, children: update(n.children) },
            );
          return { notes: update(state.notes) };
        }),

      updateEmoji: (id, emoji) =>
        set((state) => {
          const update = (list: Note[]): Note[] =>
            list.map((n) =>
              n.id === id
                ? { ...n, emoji }
                : { ...n, children: update(n.children) },
            );
          return { notes: update(state.notes) };
        }),
    }),
    {
      name: "inknote-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notes: state.notes,
        selectedId: state.selectedId,
      }),
    },
  ),
);
