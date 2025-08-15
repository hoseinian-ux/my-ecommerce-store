"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./CategoryTabs.module.scss";

type CategoryTabsProps = {
  categories: { id: string; label: string }[];
};

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "all";

  return (
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
  );
}
