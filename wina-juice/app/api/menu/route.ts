import { NextRequest, NextResponse } from "next/server";
import { readMenu, addItem } from "@/lib/menu-store";
import { MenuItem } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await readMenu();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-key");
  if (auth !== (process.env.ADMIN_KEY ?? "wina2024")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<MenuItem>;
  if (!body.name || !body.category || typeof body.price !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const item: MenuItem = {
    id: body.id ?? body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now(),
    name: body.name,
    amharicName: body.amharicName,
    category: body.category,
    price: body.price,
    ingredients: body.ingredients ?? [],
    benefits: body.benefits ?? [],
    image: body.image ?? "🥤",
    popular: Boolean(body.popular),
    description: body.description,
  };
  const items = await addItem(item);
  return NextResponse.json({ ok: true, item, items });
}
