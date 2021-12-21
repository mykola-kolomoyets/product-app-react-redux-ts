import React, { FC, Fragment, useState } from "react";
import {
  onSubmitCallbackType,
  Product,
  ProductViewProps
} from "../../utils/types";
import styles from "./product-view.module.css";

import { EditProductForm } from "./../edit-product-form";
import { useAppDispatch } from "../../app/hooks";
import { edit } from "../../store/product-list.slice";
import { ProductComments } from "../product-comments";

const ProductView: FC<ProductViewProps> = ({ productData, onClose }) => {
  const [isEditProductVisisble, setIsEditProductVisisble] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onEditClick = () => {
    setIsEditProductVisisble(true);
  };

  const onEditSubmitCallback = (productData: Product) => {
    dispatch(edit(productData));
    setIsEditProductVisisble(false);
  };

  const onEditCalcelClick = () => {
    setIsEditProductVisisble(false);
  };

  return (
    <Fragment>
      <section className={styles.productView}>
        <h1 className={styles.title}>Product overview</h1>
        <h2 className={styles.productName}>{productData.name}</h2>

        <p>Count: {productData.count}</p>

        <p>
          Size: {productData.size.width}x{productData.size.height}mm
        </p>

        <p>Weight: {productData.weight}</p>

        <h4>Comments</h4>
        <ProductComments comments={productData?.comments} />

        <section className={styles.buttons}>
          <button onClick={onEditClick}>Edit Info</button>
          <button onClick={onClose}>Close</button>
        </section>
      </section>

      {isEditProductVisisble && (
        <EditProductForm
          productData={productData}
          visible={isEditProductVisisble}
          onSubmitCallback={onEditSubmitCallback as onSubmitCallbackType}
          onClose={onEditCalcelClick}
        />
      )}
    </Fragment>
  );
};

export { ProductView };
