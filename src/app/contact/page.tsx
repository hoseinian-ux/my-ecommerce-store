
import Map from '@/components/Map/Map';
import { Mail, Phone, Github, Smile, Handshake } from "lucide-react";
import styles from "./ContactPage.module.scss";
export default function ContactPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>تماس با من</h1>
      <h2>آدرس:  تهران، خیابان کرمان    </h2>
      
      <Map center={[35.68083, 51.462]} zoom={16} />
      <div className={styles.contactInfo}>
       <div className={styles.infoText}>
          <span>
            <Mail /> a.hoseinian13@gmail.com
          </span>
          <p>
            <Phone /> 09378623292
          </p>
          <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="20px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span  className={styles.telegram}>@A_hosseinian2</span>
            <Github />
             <a
            href="https://github.com/hoseinian-ux"
            target="_blank"
            className={styles.github}
          >
             <span  className={styles.telegram}>hoseinian-ux</span>
          </a>
        </div>

        
      </div>
      <div className={styles.messageBox}>
       <p>
          با عرض ادب و احترام <br />
         امیدوارم سبک  و منطق پیاده سازی آن مورد توجه شما قرار گرفته  و بتوانم در ادامه برای پیشرفت بهتر و اصولی تر با انجام کارهای عملی بیشتر مفید فایده باشم. ان شالله که این رزومه و رزومه های قبلی در زمینه های دیگر برنامه نویسی اشتیاق و توانایی بنده برای پیشرفت و رفع مشکلات 
     احتمالی را نشان داده باشد.
     <Handshake size={32} strokeWidth={1.5} color="#2703c8" />
      
      <Smile size={32} strokeWidth={1.5} color="#df0b59" />
          <br />
         <span> با تشکر پیشاپیش از عنایت و پذیرش شما </span>
        </p>  
      </div>
    </main>
  );
}
