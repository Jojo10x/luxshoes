import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Img1 from '../../../images/test1.jpeg';
import Img2 from '../../../images/test2.jpeg';
import Img3 from '../../../images/test3.jpeg';
import Img4 from '../../../images/test4.jpeg';
import Img5 from '../../../images/test5.jpeg';

const ImageGallery: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

  const images = [Img1, Img2, Img3, Img4, Img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
  };

  const clearActiveImage = () => {
    setActiveIndex(-1);
  };

  return (
    <section className={styles.section}>
    <div className={styles.container} onClick={clearActiveImage}>
      {images.map((src, index) => (
        <img
          key={index}
          className={`${styles.img} ${index === activeIndex ? styles.active : ''}`}
          src={src}
          alt=""
          onClick={(e) => {
            e.stopPropagation();
            handleImageClick(index);
          }}
        />
      ))}
    </div>
    </section>
  );
};

export default ImageGallery;
