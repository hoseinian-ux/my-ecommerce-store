'use client'
import { Suspense, useEffect, useState } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";
import { getProducts } from "@/lib/getProducts";
import { Product } from "@/types/product";

interface ProductsPageProps {
  searchParams?: {
    category?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams?.category ?? "all";
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts(category)
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [category]);

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

      {error ? (
        <div style={{ padding: 16, color: "red" }}>
          خطا در بارگذاری محصولات. لاگ سرور را بررسی کنید.
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
