import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
        <span className="font-display text-lg font-black leading-none">W</span>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-tight">Wina Juice</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">ዊና ጁስ · Addis</span>
      </div>
    </div>
  );
}
