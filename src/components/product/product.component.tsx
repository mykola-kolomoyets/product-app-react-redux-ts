import { useState, VFC, Fragment } from "react";
import { ProductProps } from "./product.props";

import { ProductView } from "./../product-view";

import styles from "./product.module.css";

import { useAppDispatch } from "../../app/hooks";
import { remove } from "./../../store/product-list.slice";

const Product: VFC<ProductProps> = ({ productData }) => {
  const [isDataOpen, setIsDataOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onRemoveClick = () => {
    dispatch(remove(productData.id));
  };

  const onDataOpenClick = () => {
    setIsDataOpen(true);
  };

  const onDataCloseClick = () => {
    setIsDataOpen(false);
  };

  return (
    <Fragment>
      <article className={styles.productItem}>
        <section className={styles.upPart}>
          <img src={productData.imageUrl} alt={productData.name} />
          <h2 className={styles.productTitle}>{productData.name}</h2>
        </section>
        <section className={styles.bottomPart}>
          <button onClick={onRemoveClick}>Remove me</button>
          <button onClick={onDataOpenClick}>More Dateils...</button>
        </section>
      </article>
      {isDataOpen && (
        <ProductView productData={productData} onClose={onDataCloseClick} />
      )}
    </Fragment>
  );
};

export { Product };
