"use client";

import { useEffect, useState } from "react";

import ClientOnly from "@/components/ClientOnly";
import { Editor } from "@/components/core/Editor";

export default function DashboardPage() {
  const [initialContent, setInitialContent] = useState<string>("");

  useEffect(() => {
    const inknote_ctx = localStorage.getItem("inknote");
    if (inknote_ctx) setInitialContent(inknote_ctx);
  }, []);

  function onChangeAction(ctx: string) {
    localStorage.setItem("inknote", ctx);
  }

  return (
    <>
      <div className="w-full">
        <ClientOnly>
          <Editor
            editable={true}
            initialContent={initialContent}
            onChangeAction={onChangeAction}
          />
        </ClientOnly>
      </div>
    </>
  );
}
