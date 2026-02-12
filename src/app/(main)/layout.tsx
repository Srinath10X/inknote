"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";

import AppLayout from "./_components/AppLayout";
import { Navigation } from "./_components/Navigation";
import { useResizableSidebar } from "@/lib/hooks/use-resizable-sidebar";
import { useUIStore } from "@/lib/store/ui-store";
import { Spinner } from "@/components/ui/spinner";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isResizing, sidebarRef, editorRef, onMouseDown } =
    useResizableSidebar();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const pathname = usePathname();

  const isNavigating = useUIStore((state) => state.isNavigating);
  const setIsNavigating = useUIStore((state) => state.setIsNavigating);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, setIsNavigating]);

  useEffect(() => {
    if (sidebarRef.current) {
      setIsCollapsed(sidebarRef.current.style.width === "0px");
    }
  }, [sidebarRef]);

  const handleClose = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "0px";
      sidebarRef.current.style.visibility = "hidden";
      setIsCollapsed(true);
    }
  };

  const handleOpen = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "288px";
      sidebarRef.current.style.visibility = "visible";
      setIsCollapsed(false);
    }
  };

  return (
    <AppLayout>
      <aside
        ref={sidebarRef}
        className={`w-72 flex justify-between group/sidebar bg-slate-100 relative ${
          !isResizing && "transition-all duration-300"
        }`}
      >
        <Navigation onClose={handleClose} isCollapsed={isCollapsed} />

        <div
          onMouseDown={onMouseDown}
          className={`w-1 cursor-ew-resize group-hover/sidebar:bg-slate-200 duration-300 ${
            isResizing ? "bg-slate-200" : ""
          }`}
        />
      </aside>

      <section
        ref={editorRef}
        className={`flex-1 relative ${
          !isResizing && "transition-all duration-300"
        }`}
      >
        {isNavigating && (
          <div className="absolute bg-white inset-0 z-50 flex items-center justify-center">
            <Spinner role="status" className="size-8" />
          </div>
        )}
        <div
          onClick={handleOpen}
          className={`absolute top-5 left-5 p-1.5 hover:bg-slate-300/40 hover:cursor-pointer rounded-md active:scale-[.98] transition-opacity z-20 ${
            isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronsRight className="text-slate-500" />
        </div>

        <div className="h-full w-full overflow-y-auto">{children}</div>
      </section>
    </AppLayout>
  );
}
