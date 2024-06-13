import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.category}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
