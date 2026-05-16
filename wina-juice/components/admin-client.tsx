"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MenuItem, CATEGORIES, Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lock, Plus, Pencil, Trash2, ArrowLeft, LogOut, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "wina-admin-key";

type FormState = {
  id?: string;
  name: string;
  amharicName: string;
  category: Category;
  price: string;
  ingredients: string;
  benefits: string;
  image: string;
  popular: boolean;
  description: string;
};

const empty: FormState = {
  name: "",
  amharicName: "",
  category: "Fresh Juices",
  price: "",
  ingredients: "",
  benefits: "",
  image: "🥤",
  popular: false,
  description: "",
};

export function AdminClient({ initial }: { initial: MenuItem[] }) {
  const [authed, setAuthed] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category | "All">("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Verify the saved password is still valid
      fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: saved }),
      }).then((res) => {
        if (res.ok) {
          setAdminKey(saved);
          setAuthed(true);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }).catch(() => sessionStorage.removeItem(STORAGE_KEY));
    }
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const matchCat = filter === "All" || i.category === filter;
        const q = search.trim().toLowerCase();
        const matchQ = !q || i.name.toLowerCase().includes(q);
        return matchCat && matchQ;
      }),
    [items, filter, search]
  );

  const stats = useMemo(() => {
    if (items.length === 0)
      return { total: 0, popular: 0, min: 0, max: 0, avg: 0 };
    const prices = items.map((i) => i.price);
    return {
      total: items.length,
      popular: items.filter((i) => i.popular).length,
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    };
  }, [items]);

  const tryLogin = async () => {
    setError("");
    if (!pwInput.trim()) {
      setError("Enter your password.");
      return;
    }
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pwInput }),
    });
    if (!res.ok) {
      setError("Incorrect password. Try again.");
      return;
    }
    setAdminKey(pwInput);
    setAuthed(true);
    sessionStorage.setItem(STORAGE_KEY, pwInput);
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminKey("");
    setAuthed(false);
    setPwInput("");
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(empty);
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      id: item.id,
      name: item.name,
      amharicName: item.amharicName ?? "",
      category: item.category,
      price: String(item.price),
      ingredients: item.ingredients.join(", "),
      benefits: item.benefits.join(", "),
      image: item.image,
      popular: Boolean(item.popular),
      description: item.description ?? "",
    });
    setDialogOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      setError("Name and price are required.");
      return;
    }
    setBusy(true);
    setError("");
    const payload = {
      name: form.name.trim(),
      amharicName: form.amharicName.trim() || undefined,
      category: form.category,
      price: parseInt(form.price) || 0,
      ingredients: form.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
      benefits: form.benefits.split(",").map((s) => s.trim()).filter(Boolean),
      image: form.image.trim() || "🥤",
      popular: form.popular,
      description: form.description.trim() || undefined,
    };
    let res;
    if (editingId) {
      res = await fetch(`/api/menu/${editingId}`, {
        method: "PATCH",
        headers: { "x-admin-key": adminKey, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch("/api/menu", {
        method: "POST",
        headers: { "x-admin-key": adminKey, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "Save failed.");
      return;
    }
    const data = await res.json();
    if (data.items) setItems(data.items);
    setDialogOpen(false);
    setForm(empty);
    setEditingId(null);
  };

  const removeItem = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await fetch(`/api/menu/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.items) setItems(data.items);
    }
  };

  // Login screen
  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="mt-2">Owner Dashboard</CardTitle>
            <CardDescription>
              Enter your admin password to manage the menu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pw">Password</Label>
              <Input
                id="pw"
                type="password"
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button onClick={tryLogin} className="w-full" size="lg">
              Sign in
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Default password: <span className="font-mono font-semibold">wina2024</span> · change via <code className="rounded bg-muted px-1.5 py-0.5">ADMIN_KEY</code> env var.
            </p>
            <Link
              href="/"
              className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> Back to site
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="container flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <div className="font-display text-base font-bold">Admin · Wina Juice</div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container space-y-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { label: "Total items", value: stats.total, color: "bg-primary/10 text-primary" },
            { label: "Popular", value: stats.popular, color: "bg-accent/10 text-accent" },
            { label: "Min ETB", value: stats.min, color: "bg-leaf/10 text-leaf" },
            { label: "Max ETB", value: stats.max, color: "bg-citrus/10 text-citrus" },
            { label: "Avg ETB", value: stats.avg, color: "bg-sunshine/10 text-sunshine" },
          ].map((s) => (
            <Card key={s.label} className="rounded-2xl">
              <CardContent className="p-4">
                <div className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.color}`}>
                  {s.label}
                </div>
                <div className="mt-2 font-display text-2xl font-black">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap gap-2">
            <div className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu items…"
                className="pl-10"
              />
            </div>
            <div className="no-scrollbar flex gap-1 overflow-x-auto">
              {(["All", ...CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
                    filter === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={openCreate} variant="accent">
            <Plus className="h-4 w-4" /> Add item
          </Button>
        </div>

        {/* List */}
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {filtered.map((item) => (
                <li key={item.id} className="flex items-center gap-3 p-3 md:p-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                    {item.image}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold">{item.name}</p>
                      {item.popular && (
                        <Badge variant="accent" className="px-1.5 py-0 text-[9px]">
                          POPULAR
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.category} · {item.ingredients.join(", ")}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-base font-bold text-accent">
                      {item.price} ETB
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEdit(item)}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      aria-label="Delete"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="p-10 text-center text-sm text-muted-foreground">
                  No items match.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit item" : "Add new item"}</DialogTitle>
            <DialogDescription>
              All fields support Amharic. Separate ingredients & benefits with commas.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <Label>Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Avocado Juice"
                />
              </div>
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <Label>Amharic Name</Label>
                <Input
                  value={form.amharicName}
                  onChange={(e) => setForm({ ...form, amharicName: e.target.value })}
                  placeholder="የአቮካዶ ጁስ"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as Category })
                  }
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Price (ETB) *</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="180"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Image (emoji or URL)</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="🥑"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Ingredients (comma-separated)</Label>
              <Input
                value={form.ingredients}
                onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                placeholder="Avocado, milk, honey"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Health Benefits (comma-separated)</Label>
              <Textarea
                value={form.benefits}
                onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                placeholder="Rich in healthy fats, Loaded with potassium"
                rows={2}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Description (optional)</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Our signature creamy classic…"
                rows={2}
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 pt-1">
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              <span className="text-sm">Mark as &ldquo;Most Popular&rdquo;</span>
            </label>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={save} disabled={busy} variant="accent">
                {busy ? "Saving…" : editingId ? "Save changes" : "Add to menu"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
