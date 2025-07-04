"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useNotesStore } from "@/lib/store/note";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { notes, getNotes, deleteNote } = useNotesStore();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLElementTagNameMap["section"] | null>(null);
  const sidebarContainerRef = useRef<HTMLElementTagNameMap["section"] | null>(
    null,
  );

  const onMouseUp = () => {
    setIsResizing(false);

    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);

    editorRef.current!.style.cursor = "default";
    editorRef.current!.style.userSelect = "auto";
  };

  const onMouseDown = () => {
    setIsResizing(true);

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    editorRef.current!.style.userSelect = "none";
    editorRef.current!.style.cursor = "ew-resize";
  };

  const onMouseMove = (e: any) => {
    let width = e.clientX;

    if (width < 200) width = 200;
    if (width > 500) width = 500;

    sidebarRef.current!.style.width = `${width}px`;
  };

  useEffect(() => {
    sidebarRef.current?.style.width === "0px"
      ? setCollapsed(true)
      : setCollapsed(false);
  }, [collapsed]);

  const handleClose = () => {
    sidebarRef.current!.style.width = "0px";
    sidebarRef.current!.style.visibility = "hidden";
    sidebarContainerRef.current!.style.display = "none";
    setCollapsed((prev) => !prev);
  };

  const handleOpen = () => {
    sidebarRef.current!.style.width = "256px";
    sidebarRef.current!.style.visibility = "visible";
    sidebarContainerRef.current!.style.display = "block";
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main className="h-screen w-full flex overflow-hidden">
      <aside
        ref={sidebarRef}
        className={`w-64 bg-slate-100 flex justify-between group/sidebar relative ${!isResizing && "duration-300"}`}
      >
        <section ref={sidebarContainerRef} className="p-4 duration-300">
          <div className="flex flex-col gap-2">
            {notes.map((note, id) => (
              <button key={id} onClick={() => deleteNote(note.id)}>
                {note.noteCtx.note_title}
              </button>
            ))}
          </div>
        </section>
        <button
          onClick={handleClose}
          className="opacity-0 group-hover/sidebar:opacity-50 transition-all cursor-pointer group/button"
        >
          <ChevronsLeft className="absolute top-4 right-4 group-active/button:scale-90" />
        </button>
        <div
          onMouseDown={onMouseDown}
          className="w-1 cursor-ew-resize group-hover/sidebar:bg-slate-200"
        ></div>
      </aside>
      <section
        ref={editorRef}
        className={`flex-1 relative ${!isResizing && "duration-300"}`}
      >
        {collapsed && (
          <button
            onClick={handleOpen}
            className="cursor-pointer opacity-50 absolute top-4 left-4"
          >
            <ChevronsRight />
          </button>
        )}
        {children}
      </section>
    </main>
  );
}
