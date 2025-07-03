"use client";

import { useEffect, useRef, useState } from "react";

import ClientOnly from "@/components/ClientOnly";
import { Editor } from "@/components/core/Editor";

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const isResizing = useRef<boolean>(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const onMouseUp = () => {
    isResizing.current = false;

    editorRef.current!.style.cursor = "default";
    editorRef.current!.style.userSelect = "auto";

    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseDown = () => {
    isResizing.current = true;

    editorRef.current!.style.userSelect = "none";
    editorRef.current!.style.cursor = "ew-resize";

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: any) => {
    if (!isResizing.current && !sidebarRef.current) return;

    let width = e.clientX;

    if (width < 200) width = 200;
    if (width > 500) width = 500;

    sidebarRef.current!.style.width = `${width}px`;
  };

  async function getNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();

    setNotes(data);
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function createNote() {
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    getNotes();
  }

  async function deleteNotes(id: string) {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId: id }),
    });
    getNotes();
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className="w-64 flex justify-between group/sidebar"
      >
        <ul className="flex flex-col">
          {notes.map((note, id) => (
            <button key={id} onClick={async () => await deleteNotes(note.id)}>
              {note.noteCtx.note_title}
            </button>
          ))}
          <button
            className="p-2 bg-[#1e1e1e] text-white rounded-md"
            onClick={createNote}
          >
            Create
          </button>
        </ul>
        <div
          className="h-full w-1 cursor-ew-resize group-hover/sidebar:bg-gray-300"
          onMouseDown={onMouseDown}
        ></div>
      </aside>
      <section ref={editorRef} className="flex-1 overflow-y-auto">
        <ClientOnly>
          <Editor />
        </ClientOnly>
      </section>
    </>
  );
}
