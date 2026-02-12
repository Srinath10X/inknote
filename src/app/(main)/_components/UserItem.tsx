"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export const UserItem = () => {
  const [userProfile, setUserProfile] = useState<{
    name: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Anonymous";

      const avatar = user.user_metadata?.avatar_url || "";

      setUserProfile({ name, avatar });
    };

    loadUser();
  }, []);

  return (
    <div className="mt-auto pt-3 border-t border-slate-200">
      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-300/40 cursor-pointer transition-colors">
        <div className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
          {userProfile?.avatar ? (
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            userProfile?.name?.[0] ?? "A"
          )}
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-slate-700">
            {userProfile?.name ?? "Anonymous"}
          </span>
          <span className="text-xs text-slate-500">Free Plan</span>
        </div>
      </div>
    </div>
  );
};
