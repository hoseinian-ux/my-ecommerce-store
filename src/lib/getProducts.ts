import { Product } from "@/types/product";

export async function getProducts(category: string): Promise<Product[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3008");

    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // اگر fetch شکست بخورد، آرایه خالی برمی‌گرداند
  }
}
