import { Product } from "@/types/product";

export async function getProducts(category: string): Promise<Product[]> {
  try {
    // اگر تو لوکال هستی، از 3000 یا 3008 استفاده کن
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const url = `${baseUrl}/api/products?category=${category}`;

    console.log("Fetching products from:", url); // برای debug

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // اگر fetch شکست خورد، از آرایه خالی استفاده می‌کنیم
  }
}
