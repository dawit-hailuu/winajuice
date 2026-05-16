export type Category =
  | "Fresh Juices"
  | "Smoothies"
  | "Fruit Salads"
  | "Breakfast Items"
  | "Hot Drinks";

export interface MenuItem {
  id: string;
  name: string;
  amharicName?: string;
  category: Category;
  price: number; // ETB
  ingredients: string[];
  benefits: string[];
  image: string; // emoji or url
  popular?: boolean;
  description?: string;
}

export const CATEGORIES: Category[] = [
  "Fresh Juices",
  "Smoothies",
  "Fruit Salads",
  "Breakfast Items",
  "Hot Drinks",
];
