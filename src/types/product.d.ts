export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: "all" | "big" | "wide" | "tall" | "small" | "medium";
};
