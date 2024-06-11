import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


import styles from "./index.module.scss";

const Footer = () => {
  const location = useLocation();

  const isBigScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const currYear = new Date().getFullYear();

  const isCollectionPage = location.pathname.includes("collections");

  return (
    <footer
      className={`${styles.footer} ${
        isCollectionPage && isBigScreen
          ? styles.is_collection_page_b
          : styles.is_collection_page_s
      }`}
    >
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.footerRow}>
            <div className={styles.box}>
              <h2>About Us</h2>
              <ul>
                <li>Our Story</li>
                <li>Brand Values</li>
                <li>Press & Media</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className={styles.box}>
              <h2>Shop</h2>
              <ul>
                <li>Mens Clothing</li>
                <li>Suits</li>
                <li>Shirts</li>
                <li>Pants</li>
              </ul>
            </div>
            <div className={styles.box}>
              <h2>Customer Service</h2>
              <ul>
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
              </ul>
            </div>
            <div className={styles.box}>
              <h2>Follow Us</h2>
              <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Pinterest</li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.subTitle}>
        {currYear} | Lux Shoes. All Rights Reserved. Built by |
        <a href="https://joelkasisi.netlify.app/"> <span>Joel Kasisi</span></a>
      </div>
    </footer>
  );
};

export default Footer;
