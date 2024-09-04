import { useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import ProductCard from "../../components/components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCategory, getProducts } from "../../features/product/productSlice";
import { useEffect } from "react";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
import GoToTop from "../../components/components/GoToTop";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";
import { ROUTES } from "../../constants/Route";
import {testProducts} from '../../Testing/index'

const Catalog = () => {
  let { id } = useParams();
  const { products, isLoading } = useAppSelector((state) => state.product);

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

  const convertedString = id
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");

  if (isLoading) return <Spinner />;

  const filteredProducts = id === 'Loafers'
  ? testProducts.filter(product => product.category.toLowerCase() === 'loafers')
  : id === 'Trainers'
  ? testProducts.filter(product => product.category.toLowerCase() === 'trainers')
  : id === 'Brogues'
  ? testProducts.filter(product => product.category.toLowerCase() === 'brogues')
  : id === 'Boots'
  ? testProducts.filter(product => product.category.toLowerCase() === 'boots')
  : testProducts;

  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>{convertedString}</div>
      </div>
      <div className={styles.productList}>
        {filteredProducts?.map((product, index) => {
          return (
            <ProductCard
              id={product.id}
              key={index}
              price={product.price}
              title={product.productName}
              category={product.category}
              image={product.imgUrl} cardKey={product.id}            />
          );
        })}
      </div>
      <GoToTop />
    </div>
  );
};

export default Catalog;
