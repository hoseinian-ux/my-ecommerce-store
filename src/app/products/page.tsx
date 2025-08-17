import { Suspense } from "react";
import CategoryTabs from "@/components/sections/ProductList/CategoryTabs";
import ProductList from "@/components/sections/ProductList/ProductList";
import { Product } from "@/types/product";

// نمونه داده محصول برای تست
const sampleProducts: Product[] = [
  { id: 1, title: 'تلویزیون بزرگ', price: 5000000, image: '/images/img1.jpg', category: 'big' },
  { id: 2, title: 'میز پهن', price: 2000000, image: '/images/img2.jpg', category: 'wide' },
  { id: 3, title: 'کمد قدی', price: 3500000, image: '/images/img3.jpg', category: 'tall' },
  { id: 4, title: 'چراغ رومیزی', price: 800000, image: '/images/img4.jpg', category: 'small' },
  { id: 5, title: 'صندلی متوسط', price: 1200000, image: '/images/img5.jpg', category: 'medium' },

 { id: 6, title: 'کفش بزرگ', price: 5000000, image: '/images/img1.jpg', category: 'big' },
  { id: 7, title: 'کیف پهن', price: 2000000, image: '/images/img2.jpg', category: 'wide' },
  { id: 8, title: 'لباس قدی', price: 3500000, image: '/images/img3.jpg', category: 'tall' },
  { id: 9, title: 'چراغ دیواری', price: 800000, image: '/images/img4.jpg', category: 'small' },
  { id: 10, title: 'صندلی طرحدار', price: 1200000, image: '/images/img5.jpg', category: 'medium' },
];

interface ProductsPageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // بدون نیاز به سرچ واقعی
  const category = searchParams?.category ?? "all";

  // فیلتر کردن نمونه داده‌ها بر اساس category
  const products =
    category === "all"
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === category);

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
