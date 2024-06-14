import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./index.module.scss";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

const ImageGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.adminPanel}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <div className={styles.productDetails}>
            <p>{product.category}</p>
            <p className={styles.price}>${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
