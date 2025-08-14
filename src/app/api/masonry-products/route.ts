// app/api/masonry-products/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const categories = [
    { id: 1, title: 'کالای بزرگ', image: '/images/img1.jpg', size: 'big', category: 'big' },
    { id: 2, title: 'کالای پهن', image: '/images/img2.jpg', size: 'wide', category: 'wide' },
    { id: 3, title: 'کالای قدی', image: '/images/img3.jpg', size: 'tall', category: 'tall' },
    { id: 4, title: 'کالای کوچک', image: '/images/img4.jpg', size: 'small', category: 'small' },
    { id: 5, title: 'کالای متوسط', image: '/images/img5.jpg', size: 'medium', category: 'medium' },
  ]

  return NextResponse.json(categories)
}
