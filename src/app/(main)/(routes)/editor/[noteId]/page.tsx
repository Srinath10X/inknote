"use client";

import { useState, useRef } from "react";
import { Smile, Image, X } from "lucide-react";
import Picker from "emoji-picker-react";
import ClientOnly from "@/components/client-only";
import { Editor } from "./_components/Editor";

export default function DynamicPage() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const editor = editorWrapperRef.current?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement | null;
      editor?.focus();
    }
  };

  const handleEmojiSelect = (emojiObject: any) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeEmoji = () => {
    setSelectedEmoji(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Cover Image */}
      {coverImage && (
        <div className="relative w-full h-[30vh] group/cover">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeCoverImage}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white
              text-gray-700 px-3 py-1.5 rounded text-sm
              opacity-0 group-hover/cover:opacity-100 transition-opacity
              flex items-center gap-2 shadow-sm z-10"
          >
            <X size={16} />
            Remove
          </button>
        </div>
      )}

      {/* Content */}
      <div className="max-w-225 mx-auto px-24 pt-12 relative z-20">
        {/* TITLE HOVER SCOPE */}
        <div className="group/title">
          {/* Emoji + Buttons */}
          <div className="relative mb-2">
            {selectedEmoji && (
              <div className="flex items-center gap-3 group/emoji mb-1">
                <span className="text-[78px] leading-none">
                  {selectedEmoji}
                </span>
                <button
                  onClick={removeEmoji}
                  className="p-2 rounded text-gray-400 hover:text-gray-600
                    hover:bg-gray-100 opacity-0
                    group-hover/emoji:opacity-100 transition-opacity"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              {!selectedEmoji && (
                <div className="relative">
                  <button
                    onClick={() => setShowEmojiPicker((v) => !v)}
                    className="text-slate-600 hover:bg-slate-100
                      px-3 py-1.5 rounded text-sm flex items-center gap-2
                      opacity-0 group-hover/title:opacity-100 transition-opacity"
                  >
                    <Smile size={16} />
                    Add icon
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute top-full left-0 mt-2 z-50">
                      <Picker
                        onEmojiClick={handleEmojiSelect}
                        width={350}
                        height={400}
                        searchPlaceHolder="Search emoji..."
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  )}
                </div>
              )}

              {!coverImage && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-slate-600 hover:bg-slate-100
                      px-3 py-1.5 rounded text-sm flex items-center gap-2
                      opacity-0 group-hover/title:opacity-100 transition-opacity"
                  >
                    <Image size={16} />
                    Add cover
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            placeholder="Untitled"
            className="w-full text-5xl font-bold border-none outline-none
              placeholder-gray-300 bg-transparent mb-2 leading-tight text-gray-700"
            style={{ caretColor: "black" }}
          />
        </div>

        {/* Editor */}
        <div ref={editorWrapperRef} className="-ml-13 mt-2">
          <ClientOnly>
            <Editor />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
