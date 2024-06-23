import styles from "./index.module.scss";
import AddProduct from "./AddProducts";
import ShowProduct from "./ShowProducts";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";

const AdminPage = () => {
  const [currentView, setCurrentView] = useState("show");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleShow = () => {
    setCurrentView("show");
  };

  const handleAdd = () => {
    setCurrentView("add");
  };

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className={styles.admin}>
        <div className={styles.adminPanel}>
          {currentView === "show" && <ShowProduct />}
          {currentView === "add" && <AddProduct />}
        </div>

        <div className={styles.button}>
          <button onClick={handleShow}>Show</button>
          <button onClick={handleAdd}>Add</button>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => logoutHandler()}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

