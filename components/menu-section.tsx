"use client";
import { useMemo, useState } from "react";
import { MenuItem, CATEGORIES, Category } from "@/lib/types";
import { MenuCard } from "./menu-card";
import { MenuItemDialog } from "./menu-item-dialog";
import { Input } from "./ui/input";
import { Search, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuSection({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchCat = active === "All" || i.category === active;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.ingredients.join(" ").toLowerCase().includes(q) ||
        i.benefits.join(" ").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [items, active, query]);

  const popular = items.filter((i) => i.popular);

  const onOpen = (item: MenuItem) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <section id="menu" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Our Menu
          </span>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
            What&apos;s your craving?
          </h2>
          <p className="mt-3 text-muted-foreground">
            From classic Ethiopian spris to detox smoothies — over 20 fresh choices
            blended daily.
          </p>
        </div>

        {/* Featured carousel */}
        {popular.length > 0 && (
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-2 px-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Most popular
              </span>
            </div>
            <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
              {popular.map((item) => (
                <div
                  key={item.id}
                  className="w-[260px] shrink-0 snap-start sm:w-[280px]"
                >
                  <MenuCard item={item} onClick={() => onOpen(item)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mt-14">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search juices, ingredients, benefits…"
              className="h-12 pl-11 text-base"
            />
          </div>

          {/* Category pills */}
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2">
            {(["All", ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  active === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No items match your search.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                className="animate-fade-up"
              >
                <MenuCard item={item} onClick={() => onOpen(item)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <MenuItemDialog item={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
