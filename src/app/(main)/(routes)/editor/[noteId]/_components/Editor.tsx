"use client";

import "@blocknote/mantine/style.css";

import {
  PartialBlock,
  BlockNoteEditor,
  BlockNoteSchema,
  createCodeBlockSpec,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { codeBlockOptions } from "@blocknote/code-block";

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
    schema: BlockNoteSchema.create().extend({
      blockSpecs: {
        codeBlock: createCodeBlockSpec(codeBlockOptions),
      },
    }),
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      theme={"light"}
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
