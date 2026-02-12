"use client";

import {
  ChevronsLeft,
  Command,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotesStore } from "@/lib/store/notes-store";

import { Item } from "./Item";
import { UserItem } from "./UserItem";
import { DocumentList } from "./DocumentList";

interface NavigationProps {
  onClose: () => void;
}

export const Navigation = ({ onClose }: NavigationProps) => {
  const router = useRouter();
  const { addNote } = useNotesStore();

  return (
    <section className="flex flex-col w-full p-5 truncate whitespace-nowrap overflow-hidden">
      {/* Profile section */}
      <div className="flex gap-2 p-1.5 items-center hover:cursor-pointer select-none">
        <div className="bg-blue-300 h-6 w-6 rounded-md"></div>
        <h1 className="font-semibold mb-0.5">Inknote</h1>
      </div>

      <div className="flex flex-col mt-2">
        <Item
          label="Search"
          icon={Search}
          shortcut={
            <div className="flex items-center text-slate-500">
              <Command className="h-4" />
              <p className="mb-0.5 mr-2">K</p>
            </div>
          }
        />
        <Item label="Settings" icon={Settings} />
        <Item
          label="New page"
          icon={PlusCircle}
          onClick={() => {
            const id = crypto.randomUUID();
            addNote({
              id,
              title: "",
              emoji: null,
              children: [],
              isOpen: false,
            });
            router.push(`/editor/${id}`);
          }}
        />
      </div>

      {/* Private section with file tree */}
      <div className="mt-4 overflow-y-auto no-scrollbar">
        <DocumentList />
      </div>

      {/* User section */}
      <UserItem />

      {/* Chevron icon to collapse sidebar */}
      <div
        onClick={onClose}
        className="invisible absolute top-5 right-5 p-1.5 hover:bg-slate-300/40 rounded-md group-hover/sidebar:visible hover:cursor-pointer duration-300 active:scale-90"
      >
        <ChevronsLeft className="text-slate-500" />
      </div>
    </section>
  );
};
