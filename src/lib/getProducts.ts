import { Product } from "@/types/product";

export async function getProducts(category: string): Promise<Product[]> {
  try {
    // اگه تو محیط پروDUCTION باشیم از دامنه پروژه استفاده می‌کنیم
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      cache: "no-store", // تا همیشه داده تازه بیاره
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // اگه خطا بود آرایه خالی برگردون
  }
}
