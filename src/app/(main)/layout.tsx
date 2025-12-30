"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Command,
  PlusCircle,
  Search,
  Settings,
  File,
  Plus,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppLayout from "./_components/AppLayout";
import { supabase } from "@/lib/supabase/client";

// Types
interface Note {
  id: string;
  name: string;
  children: Note[];
  isOpen: boolean;
}

interface UseResizableSidebarReturn {
  isResizing: boolean;
  sidebarRef: React.RefObject<HTMLElement | null>;
  editorRef: React.RefObject<HTMLElement | null>;
  onMouseDown: () => void;
}

interface FileTreeItemProps {
  item: Note;
  depth?: number;
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  selectedId: string;
  onSelect: (id: string) => void;
}

interface FileTreeLayoutProps {
  children?: React.ReactNode;
}

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Anonymous";

  const avatar = user?.user_metadata?.avatar_url || "";

  return { name, avatar };
}

// Custom hook for resizable sidebar
const useResizableSidebar = (): UseResizableSidebarReturn => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLElement>(null);

  const onMouseMove = (e: Event) => {
    const mouseEvent = e as unknown as MouseEvent;
    let width = mouseEvent.clientX;
    if (width < 200) width = 200;
    if (width > 500) width = 500;
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${width}px`;
    }
  };

  const onMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    if (editorRef.current) {
      editorRef.current.style.cursor = "default";
      editorRef.current.style.userSelect = "auto";
    }
  };

  const onMouseDown = () => {
    setIsResizing(true);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    if (editorRef.current) {
      editorRef.current.style.userSelect = "none";
      editorRef.current.style.cursor = "ew-resize";
    }
  };

  return { isResizing, sidebarRef, editorRef, onMouseDown };
};

// File Tree Item Component
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

  return (
    <div>
      <div
        className={`group/item flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer transition-colors ${
          isSelected ? "bg-slate-300/60" : "hover:bg-slate-300/40"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(item.id)}
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
          {!isHovered && <File className="w-4 h-4 text-slate-600 shrink-0" />}
        </div>

        <span className="text-slate-700 text-sm flex-1 truncate">
          {item.name}
        </span>

        <div
          className={`flex items-center gap-1 ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity`}
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
                onClick={() => onDelete(item.id)}
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

export default function FileTreeLayout({ children }: FileTreeLayoutProps) {
  const { isResizing, sidebarRef, editorRef, onMouseDown } =
    useResizableSidebar();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const sideBarContainerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [nextId, setNextId] = useState<number>(5);

  const [notes, setNotes] = useState<Note[]>([]);

  const [userProfile, setUserProfile] = useState<{
    name: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Anonymous";

      const avatar = user.user_metadata?.avatar_url || "";

      setUserProfile({ name, avatar });
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (sidebarRef.current) {
      setIsCollapsed(sidebarRef.current.style.width === "0px");
    }
  }, []);

  const handleClose = () => {
    if (sidebarRef.current && sideBarContainerRef.current) {
      sidebarRef.current.style.width = "0px";
      sidebarRef.current.style.visibility = "hidden";
      sideBarContainerRef.current.style.display = "none";
      setIsCollapsed(true);
    }
  };

  const handleOpen = () => {
    if (sidebarRef.current && sideBarContainerRef.current) {
      sidebarRef.current.style.width = "288px";
      sidebarRef.current.style.visibility = "visible";
      sideBarContainerRef.current.style.display = "flex";
      setIsCollapsed(false);
    }
  };

  const addNote = (parentId: string | null = null) => {
    const newNote: Note = {
      id: String(nextId),
      name: "New page",
      children: [],
      isOpen: false,
    };

    if (parentId === null) {
      setNotes([...notes, newNote]);
    } else {
      const addChildToNote = (notesList: Note[]): Note[] => {
        return notesList.map((note) => {
          if (note.id === parentId) {
            return {
              ...note,
              children: [...note.children, newNote],
              isOpen: true,
            };
          }
          if (note.children.length > 0) {
            return {
              ...note,
              children: addChildToNote(note.children),
            };
          }
          return note;
        });
      };
      setNotes(addChildToNote(notes));
    }
    setNextId(nextId + 1);
  };

  const toggleNote = (id: string) => {
    const toggleInTree = (notesList: Note[]): Note[] => {
      return notesList.map((note) => {
        if (note.id === id) {
          return { ...note, isOpen: !note.isOpen };
        }
        if (note.children.length > 0) {
          return {
            ...note,
            children: toggleInTree(note.children),
          };
        }
        return note;
      });
    };
    setNotes(toggleInTree(notes));
  };

  const deleteNote = (id: string) => {
    const deleteFromTree = (notesList: Note[]): Note[] => {
      return notesList
        .filter((note) => note.id !== id)
        .map((note) => ({
          ...note,
          children: deleteFromTree(note.children),
        }));
    };
    setNotes(deleteFromTree(notes));
    if (selectedId === id) {
      setSelectedId(notes[0]?.id || "");
    }
  };

  return (
    <AppLayout>
      <aside
        ref={sidebarRef}
        className={`w-72 flex justify-between group/sidebar bg-slate-100 relative ${!isResizing && "transition-all duration-300"}`}
      >
        <section
          ref={sideBarContainerRef}
          className="flex flex-col w-full p-5 truncate whitespace-nowrap overflow-hidden"
        >
          {/* Profile section */}
          <div className="flex gap-2 p-1.5 items-center hover:cursor-pointer select-none">
            <div className="bg-blue-300 h-6 w-6 rounded-md"></div>
            <h1 className="font-semibold mb-0.5">Inknote</h1>
          </div>

          <div className="flex flex-col mt-2">
            {/* Search */}
            <div className="text-slate-600 hover:bg-slate-300/40 hover:cursor-pointer rounded-md duration-300 active:scale-95 select-none">
              <div className="flex justify-between gap-2 p-2 items-center">
                <div className="flex gap-2 items-center">
                  <Search className="h-5" />
                  <p className="mb-0.5">Search</p>
                </div>
                <div className="flex items-center text-slate-500">
                  <Command className="h-4" />
                  <p className="mb-0.5 mr-2">K</p>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="text-slate-600 hover:bg-slate-300/40 hover:cursor-pointer rounded-md duration-300 active:scale-95 select-none">
              <div className="flex gap-2 p-2 items-center">
                <Settings className="h-5" />
                <p className="mb-0.5">Settings</p>
              </div>
            </div>

            {/* New Page */}
            <div
              onClick={() => addNote()}
              className="text-slate-600 hover:bg-slate-300/40 hover:cursor-pointer rounded-md duration-300 active:scale-95 select-none"
            >
              <div className="flex gap-2 p-2 items-center">
                <PlusCircle className="h-5" />
                <p className="mb-0.5">New page</p>
              </div>
            </div>
          </div>

          {/* Private section with file tree */}
          <div className="mt-4 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-sm text-slate-600">Private</p>
              <button
                onClick={() => addNote()}
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
                  onAddChild={addNote}
                  onDelete={deleteNote}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          </div>

          {/* User section */}
          <div className="mt-auto pt-3 border-t border-slate-200">
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-300/40 cursor-pointer transition-colors">
              <div className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
                {userProfile?.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  (userProfile?.name?.[0] ?? "A")
                )}
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-slate-700">
                  {userProfile?.name ?? "Anonymous"}
                </span>
                <span className="text-xs text-slate-500">Free Plan</span>
              </div>
            </div>
          </div>

          {/* Chevron icon to collapse sidebar */}
          <div
            onClick={handleClose}
            className="invisible absolute top-5 right-5 p-1.5 hover:bg-slate-300/40 rounded-md group-hover/sidebar:visible hover:cursor-pointer duration-300 active:scale-90"
          >
            <ChevronsLeft className="text-slate-500" />
          </div>
        </section>

        <div
          onMouseDown={onMouseDown}
          className={`w-1 cursor-ew-resize group-hover/sidebar:bg-slate-200 duration-300 ${
            isResizing ? "bg-slate-200" : ""
          }`}
        />
      </aside>

      <section
        ref={editorRef}
        className={`flex-1 relative overflow-y-auto ${!isResizing && "transition-all duration-300"}`}
      >
        <div
          onClick={handleOpen}
          className={`absolute top-5 left-5 p-1.5 hover:bg-slate-300/40 hover:cursor-pointer rounded-md active:scale-90 transition-opacity z-20 ${
            isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronsRight className="text-slate-500" />
        </div>

        {/* Children content area */}
        <div className="h-full w-full">{children}</div>
      </section>
    </AppLayout>
  );
}
