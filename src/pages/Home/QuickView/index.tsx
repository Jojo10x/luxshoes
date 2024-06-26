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
import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}
const QuickView = () => {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategory = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;

    setSelectedCategory(target.id);


    if (target.value !== "all") {
      const normalizedValue = target.value.trim().toLowerCase();
      const pathUrl = products.filter((item) => {
        const normalizedCategory = item.category.trim().toLowerCase();
        return normalizedCategory === normalizedValue;
      });

      if (pathUrl.length > 0) {
        setFilteredProducts(filteredProducts);
        dispatch(getCategory(normalizedValue));
      } else {
        console.warn(`No matching category found for value: ${target.value}`);
      }
    } else {
      setFilteredProducts(products);
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
                <div className={styles.button} key={item.name}>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              cardKey={product.id}
              price={product.price}
              title={product.name}
              category={product.category}
              image={product.image}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
        </div>
      </div>
    </section>
  );
};

export default QuickView;
