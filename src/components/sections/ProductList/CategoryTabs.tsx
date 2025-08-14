'use client';

import { useSearchParams, useRouter } from "next/navigation";
import styles from './CategoryTabs.module.scss';

type CategoryTabsProps = {
  categories: { id: string; label: string }[];
};

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "all";

  const handleTabClick = (catId: string) => {
    // Push URL با query جدید و refresh صفحه
    router.push(`/products?category=${catId}`);
    router.refresh();
  };

  return (
    <div className={styles.tabsContainer}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleTabClick(cat.id)}
          className={`${styles.tabButton} ${cat.id === category ? styles.active : styles.inactive}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
