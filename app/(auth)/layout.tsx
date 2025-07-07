import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
