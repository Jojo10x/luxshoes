import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [product, setProduct] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
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

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('product', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.img_url);
      const productData = {
        ...product,
        image: response.data.img_url,
      };
      await axios.post('http://localhost:3001/addproducts', productData);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" name="id" placeholder="ID" onChange={handleInputChange} />
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleInputChange} />
      <input type="text" name="price" placeholder="Price" onChange={handleInputChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
