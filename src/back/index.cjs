// mongodb+srv://jojo:<password>@cluster0.sqrtk3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express');
const connectDB = require('./db.cjs');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads/images'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/images';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

app.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: 'No file uploaded' });
  }
  
  try {
    res.json({
      success: 1,
      img_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: 0, message: 'Internal server error' });
  }
});

const findProducts = async () => {
    try {
      const products = await Product.find();
      console.log('Products:', products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  findProducts();

app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });  

app.post('/addproducts', async (req, res) => {
  try {
    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ id: id });
    if (product) {
      res.status(200).send({ message: `Product ${id} deleted successfully` });
    } else {
      res.status(404).send({ message: `Product ${id} not found` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting product', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
