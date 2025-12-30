"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Still up";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export default function EditorEmptyPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setName(
        user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "",
      );
    };

    loadUser();
  }, []);

  const handleCreate = () => {
    const id = crypto.randomUUID();
    router.push(`/editor/${id}`);
  };

  return (
    <div className="h-full w-full bg-slate-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-16">
        {/* Greeting */}
        <h1 className="text-2xl font-medium text-slate-700 mb-4 tracking-tight">
          {getGreeting()}
          {name && `, ${name}`}
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 leading-relaxed max-w-xl mb-5">
          This space is empty. Select a note from the sidebar, or start writing
          something new.
        </p>

        {/* Action (text-first, not a button) */}
        <Button onClick={handleCreate}>
          <PlusIcon className="ml-1 h-4 w-4" />
          Create a new note
        </Button>
      </div>
    </div>
  );
}
