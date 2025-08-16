// src/app/products/page.tsx
import { Suspense } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/product";

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await getProducts("all"); // همه محصولات
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  const categories = [
    { id: "all", label: "همه" },
    { id: "big", label: "بزرگ" },
    { id: "wide", label: "پهن" },
    { id: "tall", label: "قدی" },
    { id: "small", label: "کوچک" },
    { id: "medium", label: "متوسط" },
  ];

  return (
    <>
      <Suspense fallback={<div style={{ height: 48 }} />}>
        <CategoryTabs categories={categories} />
      </Suspense>

      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div style={{ padding: 16, color: "red" }}>
          خطا در بارگذاری محصولات. لاگ سرور را بررسی کنید.
        </div>
      )}
    </>
  );
}
