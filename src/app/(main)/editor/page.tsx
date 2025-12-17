"use client"

import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation";

export default function EditorPage() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			setUser(user);
		}

		fetchUser();
	}, []);

	console.log(user?.user_metadata)

	return (
		<div>
			{!user ? <p>Loading...</p> : (
				<div>
					<h1>
						Welcome to the Editor, {user?.email}
					</h1>
					<img src={user?.user_metadata?.avatar_url} alt="" className="rounded-full p-4" />
				</div>
			)}

			<button className="bg-red-500 text-white p-2 px-4 rounded-sm m-4 hover:cursor-pointer" onClick={() => {
				supabase.auth.signOut()
				router.refresh();
			}}>Sign Out</button>
		</div>
	)
}
