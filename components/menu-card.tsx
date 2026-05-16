"use client";
import { MenuItem } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Leaf, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuCard({ item, onClick }: { item: MenuItem; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-all",
        "hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {item.popular && (
        <div className="absolute right-3 top-3 z-10">
          <Badge variant="accent" className="gap-1">
            <Star className="h-3 w-3 fill-current" /> Popular
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative grid h-32 place-items-center overflow-hidden bg-gradient-to-br from-secondary via-sunshine/10 to-citrus/15">
        <span className="text-7xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {item.image}
        </span>
        <div className="absolute inset-0 bg-grain opacity-30" />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold leading-tight">{item.name}</h3>
            <span className="shrink-0 font-display text-lg font-black text-accent">
              {item.price}
              <span className="ml-0.5 text-[10px] font-semibold text-muted-foreground">ETB</span>
            </span>
          </div>
          {item.amharicName && (
            <p className="mt-0.5 text-xs text-muted-foreground">{item.amharicName}</p>
          )}
        </div>

        <p className="line-clamp-1 text-xs text-muted-foreground">
          {item.ingredients.join(", ")}
        </p>

        <div className="flex items-center gap-1.5 text-xs">
          <Leaf className="h-3.5 w-3.5 text-leaf shrink-0" />
          <span className="line-clamp-1 text-primary/80">
            {item.benefits[0]}
          </span>
        </div>
      </div>
    </button>
  );
}
