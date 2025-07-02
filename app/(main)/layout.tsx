export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-screen w-full flex">{children}</div>;
}
