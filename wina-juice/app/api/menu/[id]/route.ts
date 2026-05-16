import { NextRequest, NextResponse } from "next/server";
import { updateItem, deleteItem } from "@/lib/menu-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-key") === (process.env.ADMIN_KEY ?? "wina2024");
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const patch = await req.json();
  const items = await updateItem(id, patch);
  return NextResponse.json({ ok: true, items });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const items = await deleteItem(id);
  return NextResponse.json({ ok: true, items });
}
