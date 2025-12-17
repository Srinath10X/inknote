"use client";

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your email below to login to your account
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</Field>
				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<a
							href="#"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required />
				</Field>
				<Field>
					<Button type="submit">Login</Button>
				</Field>
				<FieldSeparator>Or continue with</FieldSeparator>
				<Field>
					<Button variant="outline" type="button" onClick={async () => {
						supabase.auth.signInWithOAuth({
							provider: 'google', options: {
								redirectTo: `${origin}/api/auth/callback`
							}
						})
					}}>
						<svg viewBox="0 0 48 48" className="h-4 w-4">
							<path
								fill="#EA4335"
								d="M24 9.5c3.54 0 6.06 1.54 7.45 2.83l5.45-5.45C33.64 3.89 29.21 2 24 2 14.82 2 7.1 7.94 4.24 16.26l6.68 5.18C12.59 15.36 17.88 9.5 24 9.5z"
							/>
							<path
								fill="#4285F4"
								d="M46.5 24c0-1.64-.15-3.22-.43-4.74H24v9.02h12.7c-.55 2.98-2.22 5.5-4.72 7.2l7.23 5.6C43.98 36.3 46.5 30.68 46.5 24z"
							/>
							<path
								fill="#FBBC05"
								d="M10.92 28.44A14.5 14.5 0 0 1 10.1 24c0-1.54.27-3.02.82-4.44l-6.68-5.18A23.99 23.99 0 0 0 2 24c0 3.92.94 7.63 2.24 10.62l6.68-5.18z"
							/>
							<path
								fill="#34A853"
								d="M24 46c6.21 0 11.43-2.05 15.24-5.58l-7.23-5.6c-2.01 1.35-4.58 2.14-8.01 2.14-6.12 0-11.41-5.86-13.08-11.94l-6.68 5.18C7.1 40.06 14.82 46 24 46z"
							/>
						</svg>
						Continue with Google
					</Button>
					<FieldDescription className="text-center">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="underline underline-offset-4">
							Sign up
						</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	)
}
