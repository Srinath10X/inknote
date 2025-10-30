import { Button } from "@/components/ui/button";

/* TODO: Fix this scrap */
function Link({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a className="text-black/80 hover:text-black transition" href={href || "#"}>
      {children}
    </a>
  );
}

export default function Header() {
  const links = [
    {
      id: 1,
      name: "Home",
      href: "#",
    },
    {
      id: 2,
      name: "Features",
      href: "#",
    },
    {
      id: 3,
      name: "Pricing",
      href: "#",
    },
    {
      id: 4,
      name: "Blog",
      href: "#",
    },
  ];

  return (
    <header className="sticky top-2 z-50">
      <div className="h-16 px-4 sm:px-6 glass glass-border flex-between-center">
        <h1 className="font-semibold text-lg tracking-tight">Inknote</h1>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {links.map(({ id, name, href }) => (
            <Link key={id} href={href}>
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant={"ghost"}>Login</Button>
          <Button variant={"default"}>Signup</Button>
        </div>
      </div>
    </header>
  );
}
