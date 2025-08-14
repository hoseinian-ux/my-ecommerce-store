"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductList from "@/components/sections/ProductList/ProductList";
import styles from "./ProductsPage.module.scss";
import { Product } from "@/types/product"; // ← اینو اضافه کنید

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "all";

  const categories = [
    { id: "all", label: "همه" },
    { id: "big", label: "بزرگ" },
    { id: "wide", label: "پهن" },
    { id: "tall", label: "قدی" },
    { id: "small", label: "کوچک" },
    { id: "medium", label: "متوسط" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json(); // ← حالا همون نوع رو استفاده می‌کنیم

      const filtered =
        category === "all" ? data : data.filter((p) => p.category === category);

      setProducts(filtered);
    }

    fetchProducts();
  }, [category]);

  return (
    <>
      <div className={styles.tabsContainer}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => router.push(`/products?category=${cat.id}`)}
            className={`${styles.tabButton} ${
              cat.id === category ? styles.active : styles.inactive
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* لیست محصولات */}
      <ProductList products={products} />
    </>
  );
}
