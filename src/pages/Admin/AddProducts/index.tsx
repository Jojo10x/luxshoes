import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import styles from "./index.module.scss";

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000) + 1; 
};

const AddProduct: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [product, setProduct] = useState({
    id: generateRandomId(),
    name: "",
    category: "",
    price: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("product", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data.img_url);
      const productData = {
        ...product,
        image: response.data.img_url,
      };
      await axios.post("http://localhost:3001/addproducts", productData);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div className={styles.productForm}>
      <h1 className={styles.title}>Admin Page</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        name="id"
        value={product.id}
        placeholder="ID"
        onChange={handleInputChange}
        disabled
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleInputChange}
      />
       <select
        name="category"
        value={product.category}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        <option value="Trainers">Trainers</option>
        <option value="Brogues">Brogues</option>
        <option value="Loafers">Loafers</option>
        <option value="Boots">Boots</option>
      </select>
      <input
        type="text"
        name="price"
        placeholder="Price"
        onChange={handleInputChange}
      />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <>
          <h1>Uploaded</h1>
          <img src={imageUrl} alt="Uploaded" className={styles.uploadedImage} />
        </>
      )}
    </div>
  );
};

export default AddProduct;