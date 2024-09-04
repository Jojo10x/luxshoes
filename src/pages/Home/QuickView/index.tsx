import { useState, useEffect } from "react";

import styles from "./index.module.scss";
import { useAppDispatch } from "../../../app/hooks";
import {
  getCategory,
  getProducts,
} from "../../../features/product/productSlice";
import ProductCard from "../../../components/components/ProductCard";
import { navData } from "../../../data/navItems";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import {testProducts} from '../../../Testing/index'

const QuickView = () => {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleCategory = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;

    setSelectedCategory(target.id);

    if (target.value !== "all") {
      const normalizedValue = target.value.trim().toLowerCase();
      const pathUrl = testProducts.filter((item) => {
        const normalizedCategory = item.category.trim().toLowerCase();
        return normalizedCategory === normalizedValue;
      });

      if (pathUrl.length > 0) {
        dispatch(getCategory(normalizedValue));
      } else {
        console.warn(`No matching category found for value: ${target.value}`);
      }
    } else {
      dispatch(getProducts());
    }
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_top}>Quick View</p>
        <div className={styles.categories}>
          <div className={styles.buttonContainer}>
            {navData?.map((item) => {
              return (
                <div className={styles.button}>
                  <input
                    type="radio"
                    id={item.name}
                    name="category"
                    value={item.value}
                    onClick={(
                      e: React.MouseEvent<HTMLInputElement, MouseEvent>
                    ) => handleCategory(e)}
                  />
                  <label className="btn btn-default" htmlFor={item.name}>
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>
          <Link
            to={`/catalog/${String(selectedCategory)}`}
            className={styles.viewAllContainer}
          >
            <div className={styles.viewMore}>View More</div>
            <MdArrowRightAlt className={styles.icon} />
          </Link>
        </div>
        <div className={styles.productList}>
          {testProducts.slice(0, 8)?.map((product, index) => {
            return (
              <ProductCard
                id={product.id}
                key={index}
                title={product.productName}
                price={product.price}
                category={product.category}
                image={product.imgUrl} cardKey={product.id}              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickView;
