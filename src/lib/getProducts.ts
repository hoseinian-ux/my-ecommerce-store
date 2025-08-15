import { Product } from "@/types/product";

// فرض می‌کنیم داده‌ها از یک API یا فایل می‌آید
export async function getProducts(category: string): Promise<Product[]> {
  try {
    const res = await fetch(`/api/products?category=${category}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // اگر خطا بود، آرایه خالی برگردان
  }
}
