import { Product } from "@/types/product";

export async function getProducts(category: string): Promise<Product[]> {
  try {
    // در Vercel متغیر محیطی VERCEL_URL اتوماتیک ست میشه
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      cache: "no-store", // برای جلوگیری از کش روی SSR
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
