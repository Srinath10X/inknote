"use client";

import { useRef } from "react";

import ClientOnly from "@/components/ClientOnly";
import { Editor } from "@/components/core/Editor";

export default function DashboardPage() {
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

  return (
    <>
      <aside
        ref={sidebarRef}
        className="w-64 flex justify-between group/sidebar"
      >
        Another div
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
