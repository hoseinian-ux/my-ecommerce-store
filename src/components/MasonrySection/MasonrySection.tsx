"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./MasonrySection.module.scss";

type CategoryCard = {
  id: number;
  title: string;
  image: string;
  size: string;
  category: string;
};

export default function MasonrySection() {
  const [categories, setCategories] = useState<CategoryCard[]>([]);

  useEffect(() => {
    fetch("/api/masonry-products")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {categories.map((item) => (
          <Link
            key={item.id}
            href={`/products?category=${item.category}`}
            className={`${styles.item} ${styles[item.size]}`}
          >
            <Image src={item.image} alt={item.title} fill className={styles.image} />
            <div className={styles.overlay}>
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
