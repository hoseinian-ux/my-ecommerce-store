// src/lib/getProducts.ts
import { Product } from "@/types/product";

export async function getProducts(category: string): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window === "undefined"
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
      : "");

  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
  const data: Product[] = await res.json();
  return category === "all" ? data : data.filter((p) => p.category === category);
}
