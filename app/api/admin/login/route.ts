import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_KEY ?? "wina2024";
  if (password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
