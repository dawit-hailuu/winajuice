"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { MenuItem, CATEGORIES, Category } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MenuItemDialog } from "@/components/menu-item-dialog";
import { Search, ArrowLeft, MessageCircle, Star, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuPageClient({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const matchCat = active === "All" || i.category === active;
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          i.name.toLowerCase().includes(q) ||
          i.ingredients.join(" ").toLowerCase().includes(q);
        return matchCat && matchQ;
      }),
    [items, active, query]
  );

  // Group filtered items by category for "All" view
  const grouped = useMemo(() => {
    if (active !== "All") return [[active as Category, filtered] as const];
    return CATEGORIES.map(
      (cat) => [cat, filtered.filter((i) => i.category === cat)] as const
    ).filter(([, list]) => list.length > 0);
  }, [filtered, active]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="font-display text-base font-bold">Menu · ዊና ጁስ</div>
          <a
            href="https://wa.me/251945292929"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="container py-6 pb-24">
        {/* Hero */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">
            Wina Juice
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fresh menu · Summit Fiyel Bet
          </p>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu…"
              className="h-12 pl-11 text-base"
            />
          </div>

          {/* Sticky chips */}
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
            {(["All", ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  active === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped list */}
        <div className="mt-6 space-y-8">
          {grouped.length === 0 && (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No items match your search.
            </div>
          )}
          {grouped.map(([cat, list]) => (
            <section key={cat}>
              <h2 className="mb-3 flex items-baseline justify-between font-display text-xl font-bold">
                <span>{cat}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {list.length} item{list.length === 1 ? "" : "s"}
                </span>
              </h2>
              <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
                {list.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpen(true);
                      }}
                      className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-secondary/50"
                    >
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-citrus/10 text-4xl">
                        {item.image}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-display text-base font-bold">
                            {item.name}
                          </p>
                          {item.popular && (
                            <Badge variant="accent" className="shrink-0 gap-1 px-2 py-0.5 text-[10px]">
                              <Star className="h-2.5 w-2.5 fill-current" /> Popular
                            </Badge>
                          )}
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {item.ingredients.join(", ")}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-primary/80">
                          <Leaf className="h-3 w-3 text-leaf" />
                          <span className="line-clamp-1">{item.benefits[0]}</span>
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-display text-xl font-black text-accent">
                          {item.price}
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          ETB
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Tap any item for ingredients, benefits & ordering · +251 94 529 2929
        </p>
      </main>

      <MenuItemDialog item={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
