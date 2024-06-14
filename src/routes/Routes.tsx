import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Cart, Catalog, Home, Product } from "../pages";
import LoginPage from "../pages/Login";
import AdminPage from "../pages/Admin";
import ShowProduct from "../pages/Admin/ShowProducts";
import AddProduct from "../pages/Admin/AddProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "showproduct",
        element: <ShowProduct />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "catalog",
        element: <Catalog />,
        children: [
          {
            path: ":id",
            element: <Catalog />,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            path: ":id",
            element: <Product />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);
