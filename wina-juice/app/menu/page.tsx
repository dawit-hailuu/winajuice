import type { Metadata } from "next";
import { readMenu } from "@/lib/menu-store";
import { MenuPageClient } from "@/components/menu-page-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu · Wina Juice ዊና ጁስ",
  description:
    "Scan, browse, and order from the full Wina Juice menu — fresh juices, smoothies, fruit salads, and Ethiopian coffee in Summit Fiyel Bet, Addis Ababa.",
};

export default async function MenuPage() {
  const items = await readMenu();
  return <MenuPageClient items={items} />;
}
