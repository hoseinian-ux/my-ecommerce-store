// src/app/products/page.tsx
import { Suspense } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";
import { sampleProducts } from "@/lib/sampleProducts";
import { Product } from "@/types/product";

export const dynamic = "force-dynamic"; // SSR اجباری، ولی الان مشکل fetch نداریم

export default function ProductsPage() {
  const products: Product[] = sampleProducts; // داده مستقیم بدون fetch

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
          هیچ محصولی پیدا نشد.
        </div>
      )}
    </>
  );
}
