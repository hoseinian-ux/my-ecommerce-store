import { NextResponse } from 'next/server';

export async function GET() {
  const banners = [
    {
      id: 1,
      title: 'امکان سفارش محصول',
      subtitle: 'ددارای سبد خرید و امکان ثبت سفارش همراه با دادن ادرس از روی نقشه',
      imageUrl: '/images/banner1.jpg',
      ctaText: 'مشاهده محصولات',
      ctaLink: '/products',
    },
    {
      id: 2,
      title: 'امکان جستجو در محصولات ',
      subtitle: 'امکان جتجوی ادرس و محصولات',
      imageUrl: '/images/banner2.jpg',
      ctaText: 'مشاهده',
      ctaLink: '/products',
    },
    // بیشتر بنر اضافه کن
  ];

  return NextResponse.json(banners);
}
