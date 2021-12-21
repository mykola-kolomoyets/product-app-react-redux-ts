import React, { useState } from "react";
import { ProductList } from "./components/product-list";
import { AddProductForm } from "./components/add-product-form";

import styles from "./App.module.css";

function App() {
  const [isAddProductFormVisible, setIsAddProductFormVisible] =
    useState<boolean>(false);

  const onAddClick = () => {
    setIsAddProductFormVisible(true);
  };

  const onAddProductCallback = () => {
    setIsAddProductFormVisible(false);
  };

  const onAddProductClose = () => {
    setIsAddProductFormVisible(false);
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Shop App</h1>
      <section className={styles.productList}>
        <button className={styles.addButton} onClick={onAddClick}>
          Add new product
        </button>
        <ProductList />
      </section>
      <AddProductForm
        visible={isAddProductFormVisible}
        onSubmitCallback={onAddProductCallback}
        onClose={onAddProductClose}
      />
    </main>
  );
}

export default App;
