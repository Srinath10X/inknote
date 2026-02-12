"use client";

import { LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  shortcut?: React.ReactNode;
}

export const Item = ({ label, icon: Icon, onClick, shortcut }: ItemProps) => {
  return (
    <div
      onClick={onClick}
      className="text-slate-600 hover:bg-slate-300/40 hover:cursor-pointer rounded-md duration-300 active:scale-95 select-none"
    >
      <div className="flex justify-between gap-2 p-2 items-center">
        <div className="flex gap-2 items-center">
          <Icon className="h-5" />
          <p className="mb-0.5">{label}</p>
        </div>
        {shortcut}
      </div>
    </div>
  );
};
