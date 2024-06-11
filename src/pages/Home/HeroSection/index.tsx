import styles from "./index.module.scss";
import Button from "../../../components/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { heroImages } from "../../../data/images";
import { useEffect } from "react";
import Slider from "../Slider";

const HeroSection = () => {

  useEffect(() => {
    console.log('HeroSection component rendered');
  }, []);

  // Log heroImages content
  useEffect(() => {
    console.log('heroImages:', heroImages);
  }, [heroImages]);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_wrapper}>
          <header className={styles.header}>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
            Luxury 
            </h1>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
            Redefined
            </h1>
          </header>
          <div className={styles.buttons_wrapper}>
            <Button to="/catalog/All" className={styles.button}>
              Shop Now
            </Button>
          </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className={styles.image}
          >
           <Slider />
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
