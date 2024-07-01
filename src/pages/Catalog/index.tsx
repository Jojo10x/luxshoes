import { useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import ProductCard from "../../components/components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCategory, getProducts } from "../../features/product/productSlice";
import { useEffect, useState } from "react";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
import GoToTop from "../../components/components/GoToTop";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";
import { ROUTES } from "../../constants/Route";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}
const Catalog = () => {
  let { id } = useParams();
  const {isLoading } = useAppSelector((state) => state.product);
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!id) {
      const newUrl = window.location.pathname + "/All";
      window.history.pushState({ path: newUrl }, "", newUrl);

      id = "All";
    }

    const category = [
      ...navData.filter((item) => {
        return item.name === id?.toString();
      }),
    ];
    if (category[0].value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === category[0].value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  }, [id]);

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



  const convertedString = id
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");

  if (isLoading) return <Spinner />;


  const filteredProducts = id === 'Loafers'
    ? products.filter(product => product.category.toLowerCase() === 'loafers')
    : id === 'Trainers'
    ? products.filter(product => product.category.toLowerCase() === 'trainers')
    : id === 'Brogues'
    ? products.filter(product => product.category.toLowerCase() === 'brogues')
    : id === 'Boots'
    ? products.filter(product => product.category.toLowerCase() === 'boots')
    : products;

 

  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>{convertedString}</div>
      </div>
      <div className={styles.productList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
            cardKey={product.id}
              id={product.id}
              key={product.id}
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
      <GoToTop />
    </div>
  );
};

export default Catalog;
