
import { Suspense } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";

import { getProducts } from "@/lib/getProducts";



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
