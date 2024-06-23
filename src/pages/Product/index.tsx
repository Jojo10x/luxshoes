import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSingleProduct } from "../../features/product/productSlice";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import { sizeData } from "../../data/navItems";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { CartItem } from "../../types/cart";
import GoToTop from "../../components/components/GoToTop";
import Spinner from "../../components/components/Spinner";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}
const Product = () => {
  const { isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
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
  const selectedProduct = products.find(item => item.id === Number(id));
  const addToCartHandler = () => {
    setIsLoadingProduct(true);
   


  if (!selectedProduct) {
    console.error("Product not found!");
    return;
  }
    console.log("I am adding to cart");
    const cartProduct: CartItem = {
      quantity: 1,
      product: {
        id: selectedProduct.id,
        title: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        // description: product.description,
        category: selectedProduct.category,
      },
    };
    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  useEffect(() => {
    dispatch(getSingleProduct(Number(id)));
  }, []);

  const route = [
    { name: "Home", route: "/" },
    { name: "Products", route: "/catalog/All" },
    { name: "Product Details", route: `/products/${id}` },
  ];

  if (isLoading) return <Spinner />;


  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_bottom}>
          {route?.map((item, index) => {
            return (
              <Link to={item.route}>
                {item.name}
                {index < 2 && <span>&nbsp;&gt;&nbsp;</span>}
              </Link>
            );
          })}
        </p>
        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            <img src={ selectedProduct?.image} className={styles.image}></img>
          </div>
          <div className={styles.productDetailsContainer}>
            <div className={styles.titleContainer}>
            <div className={styles.title}>{selectedProduct?.name}</div>

              {/* <div className={styles.subHeading}>{product.description}</div> */}
            </div>
            <div className={styles.sizeContainer}>
              <div className={styles.title}>Size:</div>
              <div className={styles.categories}>
                <div className={styles.buttonContainer}>
                  {sizeData?.map((item) => {
                    return (
                      <div className={styles.button}>
                        <input type="radio" id={item} name="category" />
                        <label className="btn btn-default" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.title}>Price:</div>
              <div className={styles.price}>${selectedProduct?.price}</div>
            </div>
            <div className={styles.addToCartContainer}>
              <div
                className={styles.addToCart}
                onClick={() => addToCartHandler()}
              >
                {isLoadingProduct ? (
                  <Spinner className={"addToCartSm"} />
                ) : (
                  "Add to Cart"
                )}
              </div>
              <Link to={`/catalog/All`} className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <GoToTop />
    </section>
  );
};

export default Product;
