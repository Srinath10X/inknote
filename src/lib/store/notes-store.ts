import { create } from "zustand";

export interface Note {
  id: string;
  name: string;
  children: Note[];
  isOpen: boolean;
  emoji?: string;
}

interface NotesState {
  notes: Note[];
  selectedId: string | null;

  addNote: (note: Note, parentId?: string) => void;
  deleteNote: (id: string) => void;
  toggleNote: (id: string) => void;

  selectNote: (id: string) => void;
  updateTitle: (id: string, name: string) => void;
  updateEmoji: (id: string, emoji: string | null) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedId: null,

  // ----------------------------
  // ADD NOTE (root or child)
  // ----------------------------
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
            ? {
                ...n,
                isOpen: true,
                children: [...n.children, note],
              }
            : {
                ...n,
                children: insert(n.children),
              },
        );

      return {
        notes: insert(state.notes),
        selectedId: note.id,
      };
    }),

  // ----------------------------
  // DELETE NOTE
  // ----------------------------
  deleteNote: (id) =>
    set((state) => {
      const remove = (list: Note[]): Note[] =>
        list
          .filter((n) => n.id !== id)
          .map((n) => ({
            ...n,
            children: remove(n.children),
          }));

      const newNotes = remove(state.notes);

      return {
        notes: newNotes,
        selectedId:
          state.selectedId === id
            ? (newNotes[0]?.id ?? null)
            : state.selectedId,
      };
    }),

  // ----------------------------
  // TOGGLE OPEN / CLOSE
  // ----------------------------
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

  // ----------------------------
  // SELECT NOTE
  // ----------------------------
  selectNote: (id) =>
    set(() => ({
      selectedId: id,
    })),

  // ----------------------------
  // UPDATE TITLE
  // ----------------------------
  updateTitle: (id, name) =>
    set((state) => {
      const update = (list: Note[]): Note[] =>
        list.map((n) =>
          n.id === id ? { ...n, name } : { ...n, children: update(n.children) },
        );

      return { notes: update(state.notes) };
    }),

  // ----------------------------
  // UPDATE EMOJI
  // ----------------------------
  updateEmoji: (id, emoji) =>
    set((state) => {
      const update = (list: Note[]): Note[] =>
        list.map((n) =>
          n.id === id
            ? { ...n, emoji: emoji ?? undefined }
            : { ...n, children: update(n.children) },
        );

      return { notes: update(state.notes) };
    }),
}));
