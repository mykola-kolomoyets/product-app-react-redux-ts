import React, { useState, useEffect, useMemo, VFC, Fragment } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "./../../app/store";
import { add, remove, fetchProducts } from "./../../store/product-list.slice";

import styles from "./product-list.module.css";

import { Product } from "./../product";

const ProductList: VFC<{}> = () => {
  const products = useAppSelector((state: RootState) => state.productList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productsArray = useMemo(
    () =>
      products.map((product) => (
        <li className={styles.listItem}>
          <Product productData={product} />
        </li>
      )),
    [products]
  );

  return <ul className={styles.list}>{productsArray}</ul>;
};

export { ProductList };
