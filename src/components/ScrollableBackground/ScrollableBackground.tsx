import React from 'react';
import styles from './ScrollableBackground.module.scss';

interface ScrollableBackgroundProps {
  backgroundImage: string;
  height?: number; 
  children: React.ReactNode;
  style?: React.CSSProperties; 
}
export default function ScrollableBackground({ backgroundImage, height = 400, children, style }: ScrollableBackgroundProps) {
  return (
    <section
      className={styles.parallaxSection}
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        height: `${height}px`,
        margin:'8rem 0',
        ...style,
      }}
    >
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}

