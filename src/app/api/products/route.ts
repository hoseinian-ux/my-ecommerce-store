//src\app\api\products\route.ts

import { NextResponse } from "next/server";
import { Product } from "@/types/product";

const products: Product[] = [
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "all";

    let filtered = products;
    if (category !== "all") {
      filtered = products.filter((p) => p.category === category);
    }

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "مشکلی در دریافت محصولات پیش آمد" },
      { status: 500 }
    );
  }
}
