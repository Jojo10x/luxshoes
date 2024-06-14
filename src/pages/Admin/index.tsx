import styles from "./index.module.scss";
import AddProduct from "./AddProducts";
import ShowProduct from "./ShowProducts";
import { useState } from "react";

const AdminPage = () => {
  const [currentView, setCurrentView] = useState("show");
  const handleShow = () => {
    setCurrentView("show");
  };

  const handleAdd = () => {
    setCurrentView("add");
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
        </div>
      </div>
    </>
  );
};

export default AdminPage;
