'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useKeenSlider, KeenSliderInstance } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from './HeroSlider.module.scss';

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

// پلاگین autoplay
function autoplay(slider: KeenSliderInstance) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  const clearNext = () => clearTimeout(timeout);
  const next = () => {
    clearNext();
    if (!mouseOver) timeout = setTimeout(() => slider.next(), 3500);
  };

  slider.on('created', next);
  slider.on('animationEnded', next);
  slider.on('updated', next);

  slider.container.addEventListener('mouseover', () => {
    mouseOver = true;
    clearNext();
  });

  slider.container.addEventListener('mouseout', () => {
    mouseOver = false;
    next();
  });

  return {
    destroy() {
      clearNext();
    },
  };
}

export default function HeroSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 0 },
      created(s) {
        setCurrent(s.track.details.rel);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
    },
    [autoplay]
  );

  // بعد از تغییر banners، اسلایدر رو آپدیت کن
  useEffect(() => {
    if (sliderInstance.current) {
      sliderInstance.current.update();
    }
  }, [banners, sliderInstance]);

  // fetch کردن بنرها
  useEffect(() => {
    fetch('/api/banners')
      .then((r) => r.json())
      .then((data) => setBanners(data))
      .catch(() => {
        setBanners([
          { id: 1, title: 'بنر نمونه ۱', subtitle: 'توضیح', imageUrl: '/images/banner1.jpg', ctaText: 'مشاهده', ctaLink: '/products' },
          { id: 2, title: 'بنر نمونه ۲', subtitle: 'توضیح', imageUrl: '/images/banner2.jpg', ctaText: 'خرید', ctaLink: '/products' },
          { id: 3, title: 'بنر نمونه ۳', subtitle: 'توضیح', imageUrl: '/images/banner3.jpg', ctaText: 'بیشتر', ctaLink: '/products' },
        ]);
      });
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.controls}>
        <button aria-label="قبلی" className={styles.arrow} onClick={() => sliderInstance.current?.prev()}>
          ‹
        </button>
        <button aria-label="بعدی" className={styles.arrow} onClick={() => sliderInstance.current?.next()}>
          ›
        </button>
      </div>

      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {banners.map((b) => (
          <div key={b.id} className={`keen-slider__slide ${styles.slide}`}>
            <div className={styles.imageWrapper}>
              <Image src={b.imageUrl} alt={b.title} fill style={{ objectFit: 'cover' }} priority={false} />
            </div>

            <div className={styles.content}>
              <h2 className={styles.title}>{b.title}</h2>
              {b.subtitle && <p className={styles.subtitle}>{b.subtitle}</p>}
              {b.ctaLink && (
                <a href={b.ctaLink} className={styles.cta}>
                  {b.ctaText ?? 'بیشتر'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${current === idx ? styles.activeDot : ''}`}
            onClick={() => sliderInstance.current?.moveToIdx(idx)}
            aria-label={`اسلاید ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
