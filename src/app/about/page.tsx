import React from 'react';
import styles from './About.module.scss';

export default function About() {
  const education = [
    {
      title: "کارشناسی مهندسی سخت افزار کامپیوتر",
      place: "دانشگاه صنعتی جندی شاپور",
      year: "1386-1390",
      description: "مطالعه مباحث پایه در علوم کامپیوتر و توسعه نرم‌افزار."
    },
    {
      title: "کارشناسی ارشد معماری سیستم های کامپیوتری",
      place: "دانشگاه نجف آباد",
      year: "1391-1393",
      description: "تمرکز روی توسعه وب و معماری نرم‌افزارهای مقیاس‌پذیر."
    }
  ];

  const experience = [
     {
      position: "مدیر، طراح و بهینه کردن سیو وبسایت ",
      company: "شرکت مظفر صنعت صبا ",
      year: "۱۳۹۷ - ۱۳۹۹",
      description: "مدیر، طراح و بهینه کردن سیو وبسایت..."
    },
     {
      position: "طراح فرم SQL ",
      company: "شرکت ورجاوند ",
      year: "۱۳۹۹ - ۱۴۰۰",
      description: "طراحی و پیاده سازی فرم برای نرم افزار حسابداری..."
    },
    {
      position: "توسعه‌دهنده فرانت‌اند",
      company: "شرکت بهین نیوساد ارتباط ",
      year: "۱۴۰۲ - ۱۴۰۳",
      description: "ساخت و بهینه‌سازی رابط‌های کاربری..."
    },
    {
      position: "توسعه‌دهنده فرانت‌اند و بک‌اند",
      company: "آوان داده پرداز",
      year: "۱۴۰۳-۱۴۰۴",
      description: "توسعه اپلیکیشن‌های وب به صورت web form..."
    }
  ];

  const certification = [
    {
      title: "ReactJS",
      place: "مجتمع فنی تهران",
      year: "۱۴۰۳",
      description: "آشنایی به زبان React و مدیریت دیتا UseContext..."
    },
    {
      title: "NextJS",
      place: "دوره آنلاین مرن فا",
      year: "۱۴۰۴",
      description: "آشنایی با NextJs و ساختار پوشه بندی، صفحات داینامیک..."
    }
  ];

  return (
    <section className={styles.about}>
      <h1>درباره من</h1>

      {/* تحصیلات */}
      <section>
        <div className="section-header">
          <h2>تحصیلات</h2>
          <div className="line"></div>
        </div>
        <div className="grid">
          {education.map((edu, idx) => (
            <div key={idx} className="card">
              <h3>{edu.title}</h3>
              <p>{edu.place} | {edu.year}</p>
              <p className="description">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* سابقه کاری */}
      <section>
        <div className="section-header">
          <h2>سابقه کاری</h2>
          <div className="line"></div>
        </div>
        <div className="grid">
          {experience.map((exp, idx) => (
            <div key={idx} className="card">
              <h3>{exp.position}</h3>
              <p>{exp.company} | {exp.year}</p>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* دوره‌ها */}
      <section>
        <div className="section-header">
          <h2>دوره‌های گذرانده</h2>
          <div className="line"></div>
        </div>
        <div className="grid">
          {certification.map((cer, idx) => (
            <div key={idx} className="card">
              <h3>{cer.title}</h3>
              <p>{cer.place} | {cer.year}</p>
              <p className="description">{cer.description}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
