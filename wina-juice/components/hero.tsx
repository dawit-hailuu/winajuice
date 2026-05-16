import Link from "next/link";
import { Button } from "./ui/button";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-36">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-citrus/20 blur-3xl" />
        <div className="absolute right-[-10%] top-1/2 h-[400px] w-[400px] rounded-full bg-sunshine/25 blur-3xl" />
        <div className="absolute left-[-10%] top-1/3 h-[400px] w-[400px] rounded-full bg-leaf/20 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>

      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Open daily · Summit Fiyel Bet
          </span>

          <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Fresh.{" "}
            <span className="italic text-accent">Healthy.</span>
            <br />
            <span className="relative inline-block">
              Delicious.
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-citrus"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Fresh, healthy, and delicious juices in Summit Fiyel Bet — crafted from local Ethiopian fruits, served with care since day one.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href="#menu">
                View Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">
                <MapPin className="h-4 w-4" /> Visit Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating fruit visual */}
        <div className="relative mx-auto mt-14 grid max-w-2xl grid-cols-5 gap-3 px-4 md:gap-6">
          {[
            { e: "🥑", bg: "bg-leaf/15" },
            { e: "🍊", bg: "bg-citrus/20" },
            { e: "🥭", bg: "bg-sunshine/25" },
            { e: "🍓", bg: "bg-coral/15" },
            { e: "🍋", bg: "bg-sunshine/30" },
          ].map((f, i) => (
            <div
              key={i}
              className={`grid aspect-square place-items-center rounded-3xl ${f.bg} backdrop-blur-sm animate-float`}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <span className="text-4xl sm:text-5xl md:text-6xl">{f.e}</span>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-border rounded-3xl border border-border bg-card p-1 shadow-sm">
          {[
            { k: "20+", v: "Fresh items" },
            { k: "4", v: "Branches" },
            { k: "100%", v: "Daily fresh" },
          ].map((s) => (
            <div key={s.v} className="px-4 py-6 text-center sm:px-6">
              <div className="font-display text-3xl font-black text-primary sm:text-4xl">
                {s.k}
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
