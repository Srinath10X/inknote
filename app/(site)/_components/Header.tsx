export default function Header() {
  return (
    <header className="fixed h-[65px] w-[95%] max-w-7xl top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg border border-white/15 bg-[rgba(206,206,251,0.04)] backdrop-blur-lg shadow-md px-6 flex-between">
      <span className="text-white text-lg font-semibold">Inknote</span>
      <nav className="space-x-6 text-white/80 text-sm flex">
        <a href="#">About</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </nav>
      <div>
        <button className="text-white">Login</button>
      </div>
    </header>
  );
}
