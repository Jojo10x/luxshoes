import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

const ShowProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      console.log(`Attempting to delete product with ID: ${id}`);
      const response = await axios.delete(`http://localhost:3001/products/${id}`);
      console.log(`Delete response: `, response);
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className={styles.adminPanel}>
      <h1>Products</h1>
      <ul className={styles.productList}>
        <li className={styles.productListHeader}>
          <span>Product</span>
          <span>Name</span>
          <span>Price</span>
          <span>Category</span>
          <span>Remove</span>
        </li>
        {products.map((product) => (
          <li key={product.id} className={styles.productListItem}>
            <span className={styles.productImage}>
              <img src={product.image} alt={product.name} />
            </span>
            <span>{product.name}</span>
            <span className={styles.price}>${product.price}</span>
            <span>{product.category}</span>
            <span>
            <button onClick={() => deleteProduct(product.id)} className={styles.deleteButton}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowProduct;
