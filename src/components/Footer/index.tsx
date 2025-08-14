import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>نمونه سایت فروشگاهی  </h2>
          <p> با تکنولوژی Next, typeScript, sass</p>
        </div>

        <nav className={styles.nav}>
          <Link  href="/">خانه</Link>
          <Link href="/products">محصولات</Link>
          <Link href="/about">درباره من</Link>
          <Link href="/contact"> نقشه من</Link>
        </nav>

        <div className={styles.social}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="اینستاگرام">
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              <path d="M7.75 2C4.798 2 2.5 4.298 2.5 7.25v9.5c0 2.952 2.298 5.25 5.25 5.25h8.5c2.952 0 5.25-2.298 5.25-5.25v-9.5c0-2.952-2.298-5.25-5.25-5.25h-8.5zm8.75 3.5a1 1 0 110 2 1 1 0 010-2zm-4.25 2a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5z"/>
            </svg>
          </a>
          
        </div>
      </div>
      <div className={styles.copy}>
        © تمامی حقوق برای فروشگاه اکرم حسینیان محفوظ است. {new Date().getFullYear()}
      </div>
    </footer>
  );
}
