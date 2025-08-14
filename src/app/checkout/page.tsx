'use client';

import { useCart } from '@/hooks/useCart';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, Marker } from 'leaflet';
import styles from './CheckoutPage.module.scss';

const schema = z.object({
  name: z.string().min(3, 'نام باید حداقل ۳ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  address: z.string().min(5, 'آدرس باید کامل باشد'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();

  // مختصات انتخاب شده روی نقشه
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // برای هماهنگی مقدار آدرس در فرم و نقشه، مقدار آدرس را از فرم می‌خوانیم
  const address = watch('address');

  const updateAddressFromCoords = useCallback(async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fa`
      );
      const data = await res.json();
      if (data.display_name) {
        setCoords({ lat, lng });
        // مقدار آدرس فرم را هم بروز می‌کنیم و اعتبارسنجی اجرا می‌شود
        setValue('address', data.display_name, { shouldValidate: true });
      }
    } catch (err) {
      console.error('خطا در گرفتن آدرس:', err);
    }
  }, [setValue]);

  useEffect(() => {
  (async () => {
    const L = await import('leaflet');

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });

    const map = L.map('checkout-map', {
      center: [35.6892, 51.3890],
      zoom: 13,
    });

    const customIcon = L.icon({
      iconUrl: '/leaflet/icons/custom-marker2.png',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -30],
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const marker = L.marker([35.6892, 51.3890], { icon: customIcon, draggable: true }).addTo(map);

    marker.on('dragend', async () => {
      const { lat, lng } = marker.getLatLng();
      await updateAddressFromCoords(lat, lng);
    });

    markerRef.current = marker;
    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView([latitude, longitude], 16);
          marker.setLatLng([latitude, longitude]);
          await updateAddressFromCoords(latitude, longitude);
        },
        (err) => {
          console.warn('عدم دسترسی به موقعیت کاربر:', err.message);
        }
      );
    }
  })();
}, [updateAddressFromCoords]);

  // جستجو روی نقشه بر اساس آدرس وارد شده در فرم
  const handleSearchAddress = async () => {
    if (!address.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&accept-language=fa`
      );
      const data = await res.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        if (mapRef.current && markerRef.current) {
          const latNum = parseFloat(lat);
          const lonNum = parseFloat(lon);
          mapRef.current.setView([latNum, lonNum], 16);
          markerRef.current.setLatLng([latNum, lonNum]);
          setCoords({ lat: latNum, lng: lonNum });
        }
      } else {
        alert('مکان مورد نظر یافت نشد.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (cartItems.length === 0) {
      alert('سبد خرید خالی است');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          coords,
          cartItems,
          totalPrice,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setOrderId(result.orderId);
        clearCart();
      } else {
        alert('خطا در ثبت سفارش');
      }
    } catch {
      alert('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className={styles.container}>
        <h2>سفارش شما با موفقیت ثبت شد</h2>
        <p>شماره پیگیری: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>نهایی کردن سفارش</h2>

      <div className={styles.cartSummary}>
        {cartItems.length === 0 ? (
          <p>سبد خرید شما خالی است.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              {item.title} × {item.quantity} — {(item.price * item.quantity).toLocaleString()} تومان
            </div>
          ))
        )}
        <strong>جمع کل: {totalPrice.toLocaleString()} تومان</strong>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <input placeholder="نام و نام خانوادگی" {...register('name')} style={{
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  }}/>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <input placeholder="ایمیل" type="email" {...register('email')}style={{
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  }} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input placeholder="شماره موبایل" {...register('phone')}style={{
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  }} />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <div className={styles.addressInputGroup}>
          <input style={{
    borderRadius: '8px',
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  }}
            placeholder="آدرس"
            {...register('address')}
            onBlur={() => {
              // وقتی آدرس تغییر کرد، می‌تونیم آدرس رو روی نقشه جستجو کنیم
              handleSearchAddress();
            }}
          />
          {errors.address && <p className={styles.error}>{errors.address.message}</p>}

          <button type="button" onClick={handleSearchAddress} className={styles.submitButton}>
            جستجو روی نقشه
          </button>
        </div>

        <div id="checkout-map" style={{ height: '300px', width: '100%', margin: '1rem 0' }}></div>

        <button type="submit" disabled={loading || cartItems.length === 0} className={styles.submitButton}>
          {loading ? 'در حال ثبت...' : 'ثبت سفارش'}
        </button>
      </form>
    </div>
  );
}
