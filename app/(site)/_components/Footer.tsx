import Link from "next/link";

const links = [
  {
    group: "Product",
    items: [
      { title: "Features", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Download", href: "#" },
    ],
  },
  {
    group: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Roadmap", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
  {
    group: "Legal",
    items: [
      { title: "Privacy", href: "#" },
      { title: "Terms", href: "#" },
      { title: "Security", href: "#" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-white dark:bg-transparent pt-20">
      <div className="mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" aria-label="Go home" className="block size-fit">
              <h3 className="font-semibold text-neutral-900 text-lg">
                Inknote
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              A calm, minimal workspace for focused note-taking.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-3 lg:justify-items-end">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="block text-muted-foreground hover:text-primary duration-150"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Inknote - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
