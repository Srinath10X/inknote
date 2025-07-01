"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      window.location.href = "/editor";
    }
  };

  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Log In</h1>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-2">
        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white py-2 px-4 rounded" type="submit">
          Log In with Email
        </button>
      </form>

      <button
        onClick={handleOAuthLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Log In with Google
      </button>
    </div>
  );
}
