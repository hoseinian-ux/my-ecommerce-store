import { Product } from "@/types/product";
import { sampleProducts } from "./sampleProducts";

export async function getProducts(category: string): Promise<Product[]> {
  try {
    // آدرس پایه: لوکال یا Vercel
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      cache: "no-store", // SSR بدون کش
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts, using sampleProducts:", error);
    // اگر fetch شکست خورد، داده تستی برگردان
    return sampleProducts.filter(
      (p) => category === "all" || p.category === category
    );
  }
}
