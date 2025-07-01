"use client";

import "@blocknote/shadcn/style.css";

import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

interface EditorProps {
  editable?: boolean;
  initialContent?: string;
  onChangeAction?: () => void;
}

export const Editor: React.FC<EditorProps> = ({
  onChangeAction,
  editable,
  initialContent,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={onChangeAction}
      spellCheck={false}
    />
  );
};
