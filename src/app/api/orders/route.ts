// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // شماره پیگیری ساختگی
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();

    // ذخیره سفارش - در حالت واقعی به دیتابیس وصل میشه
    console.log('سفارش جدید:', { ...body, orderId });

    return NextResponse.json({
      success: true,
      orderId,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطا در ثبت سفارش' }, { status: 500 });
  }
}
