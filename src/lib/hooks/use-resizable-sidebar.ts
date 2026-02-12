"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";

export const useResizableSidebar = () => {
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLElement>(null);

  const onMouseMove = (e: globalThis.MouseEvent) => {
    if (!isResizing) return;
    let width = e.clientX;
    if (width < 250) width = 250;
    if (width > 550) width = 550;
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${width}px`;
    }
  };

  const onMouseUp = () => {
    setIsResizing(false);
    if (editorRef.current) {
      editorRef.current.style.cursor = "default";
      editorRef.current.style.userSelect = "auto";
    }
    if (sidebarRef.current) {
      sidebarRef.current.style.userSelect = "auto";
    }
  };

  const onMouseDown = () => {
    setIsResizing(true);
    if (editorRef.current) {
      editorRef.current.style.userSelect = "none";
      editorRef.current.style.cursor = "ew-resize";
    }
    if (sidebarRef.current) {
      sidebarRef.current.style.userSelect = "none";
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing]);

  return { isResizing, sidebarRef, editorRef, onMouseDown };
};
