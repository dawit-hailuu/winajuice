import Link from "next/link";
import { Logo } from "./logo";
import { Phone, Send, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Fresh, healthy, and delicious juices in Summit Fiyel Bet, Addis Ababa. Open daily.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="tel:+251945292929"
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/winajuices"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/winajuices"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/WinaJuices/"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Explore
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="#menu" className="hover:text-accent">Menu</Link></li>
              <li><Link href="#about" className="hover:text-accent">About</Link></li>
              <li><Link href="#reviews" className="hover:text-accent">Reviews</Link></li>
              <li><Link href="#contact" className="hover:text-accent">Contact</Link></li>
              <li><Link href="/menu" className="hover:text-accent">QR Menu</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Visit
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Summit Fiyel Bet</li>
              <li>Addis Ababa, Ethiopia</li>
              <li className="pt-1 text-foreground">Open daily · 7AM – 9PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Wina Juice ዊና ጁስ. All rights reserved.</p>
          <p>
            <Link href="/admin" className="underline-offset-4 hover:underline">Owner login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
