import type { Metadata } from "next";
import { readMenu } from "@/lib/menu-store";
import { AdminClient } from "@/components/admin-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin · Wina Juice",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const items = await readMenu();
  return <AdminClient initial={items} />;
}
