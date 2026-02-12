"use client";

import { useState, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  File,
  Plus,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/lib/store/ui-store";
import { Note, useNotesStore } from "@/lib/store/notes-store";

interface FileTreeItemProps {
  item: Note;
  depth?: number;
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const FileTreeItem = ({
  item,
  depth = 0,
  onToggle,
  onAddChild,
  onDelete,
  selectedId,
  onSelect,
}: FileTreeItemProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  const router = useRouter();

  const noteMeta = useNotesStore((state) => {
    const find = (list: Note[]): Note | null => {
      for (const n of list) {
        if (n.id === item.id) return n;
        const child = find(n.children);
        if (child) return child;
      }
      return null;
    };
    return find(state.notes);
  });

  const title = noteMeta?.title ?? "Untitled";
  const emoji = noteMeta?.emoji ?? null;

  return (
    <div>
      <div
        className={`group/item flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer transition-colors ${
          isSelected ? "bg-slate-300/60" : "hover:bg-slate-300/40"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isHovered && (
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onToggle(item.id);
              }}
              className="absolute inset-0 flex items-center justify-center rounded hover:bg-slate-400/30 transition-colors z-10"
            >
              {item.isOpen ? (
                <ChevronDown className="w-4 h-4 text-slate-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-600" />
              )}
            </button>
          )}
          {!isHovered &&
            (emoji ? (
              <span className="w-4 h-4 flex items-center justify-center text-[13px] leading-none">
                {emoji}
              </span>
            ) : (
              <File className="w-4 h-4 text-slate-600 shrink-0" />
            ))}
        </div>

        <span
          className="text-slate-700 text-sm flex-1 truncate"
          onClick={() => onSelect(item.id)}
        >
          {title || "Untitled"}
        </span>

        <div
          className={`flex items-center gap-1 ${
            isHovered ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onAddChild(item.id);
            }}
            className="p-1 rounded hover:bg-slate-400/40 transition-colors"
            title="Add a page inside"
          >
            <Plus className="w-3.5 h-3.5 text-slate-600" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                className="p-1 rounded hover:bg-slate-400/40 transition-colors"
              >
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={8}
              className="w-36"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => {
                  onDelete(item.id);
                  router.back();
                }}
              >
                <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasChildren && item.isOpen && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onToggle={onToggle}
              onAddChild={onAddChild}
              onDelete={onDelete}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DocumentList = () => {
  const { notes, selectedId, addNote, selectNote } = useNotesStore();
  const setIsNavigating = useUIStore((state) => state.setIsNavigating);
  const router = useRouter();
  const pathname = usePathname();

  const toggleNote = (id: string) => {
    useNotesStore.setState((state) => {
      const toggle = (notes: Note[]): Note[] =>
        notes.map((note) => {
          if (note.id === id) {
            return { ...note, isOpen: !note.isOpen };
          }
          if (note.children.length > 0) {
            return { ...note, children: toggle(note.children) };
          }
          return note;
        });
      return { notes: toggle(state.notes) };
    });
  };

  const deleteNote = (id: string) => {
    useNotesStore.setState((state) => {
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
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 mb-2">
        <p className="text-sm text-slate-600">Private</p>
        <button
          onClick={() => {
            const id = crypto.randomUUID();
            addNote({
              id,
              title: "",
              emoji: null,
              children: [],
              isOpen: false,
            });
            setIsNavigating(true);
            router.push(`/editor/${id}`);
          }}
          className="p-1 rounded hover:bg-slate-300/40 transition-colors"
          title="Add a page"
        >
          <Plus className="w-4 h-4 text-slate-600" />
        </button>
      </div>
      <div className="space-y-0.5">
        {notes.map((note) => (
          <FileTreeItem
            key={note.id}
            item={note}
            onToggle={toggleNote}
            onAddChild={(parentId) =>
              addNote(
                {
                  id: crypto.randomUUID(),
                  title: "",
                  emoji: null,
                  children: [],
                  isOpen: false,
                },
                parentId,
              )
            }
            onDelete={deleteNote}
            selectedId={selectedId}
            onSelect={(id) => {
              selectNote(id);
              const targetPath = `/editor/${id}`;
              if (pathname !== targetPath) {
                setIsNavigating(true);
              }
              router.push(targetPath);
            }}
          />
        ))}
      </div>
    </>
  );
};
