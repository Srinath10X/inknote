"use client";

import "@blocknote/shadcn/style.css";

import { codeBlock } from "@blocknote/code-block";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

interface EditorProps {
  editable?: boolean;
  initialContent?: string;
  onChangeAction?: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  onChangeAction,
  editable,
  initialContent,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    codeBlock: codeBlock,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={() => {
        const content = JSON.stringify(editor.document);
        onChangeAction?.(content);
      }}
      spellCheck={false}
    />
  );
};
