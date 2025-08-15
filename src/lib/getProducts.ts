import { Product } from "@/types/product";

export async function getProducts(category: string): Promise<Product[]> {
  try {
    // استفاده از URL کامل برای fetch در سرور
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      cache: "no-store", // جلوگیری از کش در SSR
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    return [];
  }
}
