import { Suspense } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";
import { Product } from "@/types/product";


export async function getProducts(category: string): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window === "undefined"
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
      : "");

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  const data: Product[] = await res.json();
  return category === "all" ? data : data.filter((p) => p.category === category);
}

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams?.category ?? "all";
  const products = await getProducts(category);

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
      <Suspense fallback={<div style={{height:48}} />}>
        <CategoryTabs categories={categories} />
      </Suspense>

      <ProductList products={products} />
    </>
  );
}
