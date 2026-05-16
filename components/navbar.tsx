"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="Wina Juice home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/menu"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            QR Menu
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            variant="accent"
            className="hidden md:inline-flex"
          >
            <a
              href="https://wa.me/251945292929?text=Hello%20Wina%20Juice!%20I'd%20like%20to%20order."
              target="_blank"
              rel="noreferrer"
            >
              Order Now
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <nav className="container flex flex-col gap-1 pb-4 pt-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-secondary"
            >
              QR Menu
            </Link>
            <Button asChild variant="accent" className="mt-2 h-12">
              <a href="https://wa.me/251945292929" target="_blank" rel="noreferrer">
                Order on WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
