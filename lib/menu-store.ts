import fs from "fs/promises";
import path from "path";
import { MenuItem } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "menu.json");

export async function readMenu(): Promise<MenuItem[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as MenuItem[];
}

export async function writeMenu(items: MenuItem[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function addItem(item: MenuItem): Promise<MenuItem[]> {
  const items = await readMenu();
  items.push(item);
  await writeMenu(items);
  return items;
}

export async function updateItem(id: string, patch: Partial<MenuItem>): Promise<MenuItem[]> {
  const items = await readMenu();
  const next = items.map((i) => (i.id === id ? { ...i, ...patch } : i));
  await writeMenu(next);
  return next;
}

export async function deleteItem(id: string): Promise<MenuItem[]> {
  const items = await readMenu();
  const next = items.filter((i) => i.id !== id);
  await writeMenu(next);
  return next;
}
