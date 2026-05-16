"use client";
import { MenuItem } from "@/lib/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Leaf, MessageCircle, Star } from "lucide-react";

export function MenuItemDialog({
  item,
  open,
  onOpenChange,
}: {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!item) return null;
  const whatsapp = `https://wa.me/251945292929?text=${encodeURIComponent(
    `Hello Wina Juice! I'd like to order ${item.name} (${item.price} ETB).`
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br from-secondary via-sunshine/15 to-citrus/20">
          <span className="text-8xl">{item.image}</span>
          {item.popular && (
            <Badge variant="accent" className="absolute left-4 top-4 gap-1">
              <Star className="h-3 w-3 fill-current" /> Most Popular
            </Badge>
          )}
        </div>

        <div className="space-y-4 p-6">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle>{item.name}</DialogTitle>
                {item.amharicName && (
                  <p className="mt-1 text-sm text-muted-foreground">{item.amharicName}</p>
                )}
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-black text-accent">
                  {item.price}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ETB
                </div>
              </div>
            </div>
            {item.description && (
              <DialogDescription className="pt-1">{item.description}</DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ingredients
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {item.ingredients.map((ing) => (
                  <Badge key={ing} variant="secondary">
                    {ing}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Health Benefits
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {item.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button asChild variant="accent" className="w-full">
            <a href={whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
