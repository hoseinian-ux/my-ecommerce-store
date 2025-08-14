

import HeroSlider from '../components/HeroSlider/HeroSlider';
import MasonrySection from '../components/MasonrySection/MasonrySection';
import ScrollableBackground from '@/components/ScrollableBackground/ScrollableBackground';

export default function Home() {
  return (
    <>
      <HeroSlider/>
      <ScrollableBackground backgroundImage="/images/background2.jpg" height={400} style={{ padding: '1rem' }}>
      <h1> امیدوارم ساختار این سایت مورد توجه شما قرار گرفته باشد. این سایت یک سایت فروشگاهی به زبان Nextjs و TypeScript هست.</h1>
      </ScrollableBackground>
      <section>
        <h1 className="pageTitle"> محصولات فروشگاه</h1>
        <MasonrySection />
      </section>
      <ScrollableBackground backgroundImage="/images/background2.jpg" height={400}>
      <h1> از بیشتر تکنولوژی های زبان برنامه نویسی Next استفاده شده و قسمت سفارش محصول، سفارش نهایی و گرفتن اطلاعات کامل از کاربر و اعتبار سنجی آن کامل هست.</h1>
      </ScrollableBackground>
      
      
   
    </>
  );
}
