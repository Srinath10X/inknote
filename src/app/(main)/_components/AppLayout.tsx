export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="h-screen w-full flex overflow-hidden">{children}</main>
  );
}
