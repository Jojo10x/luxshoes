import express from 'express';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: 'uploads/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use('/images', express.static('uploads/images'));
app.use(express.json());

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
  res.json({
    success: 1,
    img_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
