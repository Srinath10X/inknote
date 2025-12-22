import { LoginForm } from "@/components/login-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
}
