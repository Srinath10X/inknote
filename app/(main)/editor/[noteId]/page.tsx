"use client";

import { Editor } from "@/components/core/Editor";
import { LoaderIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EditorClient() {
  const pathname = usePathname();
  const noteId = pathname.split("/").pop();

  const [status, setStatus] = useState<"loading" | "valid" | "invalid">(
    "loading",
  );
  const [initialContent, setInitialContent] = useState<string>();
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkNote = async () => {
      const res = await fetch(`/api/notes/${noteId}/check`);
      if (res.ok) {
        setStatus("valid");
      } else {
        setStatus("invalid");
      }
    };

    if (noteId) checkNote();
  }, [noteId]);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch(`/api/notes/${noteId}/content`);
      if (!res.ok) return;

      const data = await res.json();
      setInitialContent(JSON.stringify(data.content));
    };

    if (status === "valid" && noteId) fetchContent();
  }, [status, noteId]);

  const handleChange = (content: string) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      await fetch(`/api/notes/${noteId}/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: JSON.parse(content) }),
      });
    }, 1500); // Debounce
  };

  if (
    status === "loading" ||
    (status === "valid" && initialContent === undefined)
  ) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="text-red-500 p-4">Note not found or unauthorized</div>
    );
  }

  return (
    <Editor
      editable={true}
      initialContent={initialContent}
      onChangeAction={handleChange}
    />
  );
}
