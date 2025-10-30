import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-2 z-50">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between border border-black/10 rounded-xl bg-white/70 backdrop-blur-xl supports-backdrop-filter:bg-white/40">
        <h1 className="text-lg font-semibold tracking-tight">Inknote</h1>

        {/* TODO: Fix this non-sense make a resuable component */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <a className="text-black/80 hover:text-black transition" href="#">
            Home
          </a>
          <a className="text-black/80 hover:text-black transition" href="#">
            Features
          </a>
          <a className="text-black/80 hover:text-black transition" href="#">
            Pricing
          </a>
          <a className="text-black/80 hover:text-black transition" href="#">
            Blog
          </a>
        </nav>

        <div className="flex items-center">
          <Button variant={"ghost"}>Login</Button>
          <Button variant={"default"}>Signup</Button>
        </div>
      </div>
    </header>
  );
}
