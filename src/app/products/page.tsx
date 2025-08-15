import { Suspense } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";
import { getProducts } from "@/lib/getProducts";

// استفاده از تایپ رسمی Next.js
interface ProductsPageProps {
  searchParams?: { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // مقدار پیش‌فرض اگر category وجود نداشت
  const category = searchParams?.category ?? "all";

  // گرفتن محصولات از API
  const products = await getProducts(category);

  // لیست دسته‌بندی‌ها
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
      {/* Suspense برای Client Component */}
      <Suspense fallback={<div style={{ height: 48 }} />} >
        <CategoryTabs categories={categories} />
      </Suspense>

      <ProductList products={products} />
    </>
  );
}
