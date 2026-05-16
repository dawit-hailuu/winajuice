import { Phone, Send, Instagram, Facebook, MapPin, Clock } from "lucide-react";

const BRANCHES = [
  { name: "Summit Fiyel Bet", note: "Flagship store" },
  { name: "Ras Desta Hospital", note: "Across from the hospital" },
  { name: "Shola Gebeya", note: "Opposite News Agency" },
  { name: "Addisu Gebeya", note: "Opposite NOC station" },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Find Us
          </span>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
            Come visit our store
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <iframe
                title="Wina Juice on Google Maps"
                src="https://www.google.com/maps?q=Summit+Fiyel+Bet,+Addis+Ababa&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>

          {/* Contact cards */}
          <div className="space-y-3 lg:col-span-2">
            <a
              href="tel:+251945292929"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Call us
                </div>
                <div className="font-display text-lg font-bold">+251 94 529 2929</div>
              </div>
            </a>

            <a
              href="https://t.me/winajuices"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Telegram
                </div>
                <div className="font-display text-lg font-bold">@winajuices</div>
              </div>
            </a>

            <a
              href="https://instagram.com/winajuices"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Instagram
                </div>
                <div className="font-display text-lg font-bold">@winajuices</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/WinaJuices/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <Facebook className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Facebook
                </div>
                <div className="font-display text-lg font-bold">820+ followers</div>
              </div>
            </a>

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Hours
              </div>
              <p className="mt-1.5 text-sm">Open daily · 7:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Branches strip */}
        <div className="mt-10">
          <h3 className="mb-4 flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Our 4 locations
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BRANCHES.map((b, i) => (
              <div
                key={b.name}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-accent">
                  #{i + 1}
                </div>
                <div className="mt-1 font-display text-base font-bold">{b.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{b.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
