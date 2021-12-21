import React, { FC } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "./../../app/store";
import { Product, ModalProps, AddProduct } from "../../utils/types";
import { add } from "./../../store/product-list.slice";

import styles from "./add-product-form.module.css";

import { useFormik } from "formik";

import {
  defaultName,
  defaultCount,
  defaultHeight,
  defaultWidth,
  defaultWeight,
  defaultImageUrl
} from "./add-product-form.constants";

const AddProductForm: FC<ModalProps> = ({
  visible,
  onSubmitCallback,
  onClose
}) => {
  const products = useAppSelector((state: RootState) => state.productList);

  const dispatch = useAppDispatch();

  const newProductData: Product = {
    id: products?.length + 1,
    imageUrl: defaultImageUrl,
    name: defaultName,
    count: defaultCount,
    size: {
      width: defaultWidth,
      height: defaultHeight
    },
    weight: defaultWeight,
    comments: []
  };

  const newProductForm = useFormik<AddProduct>({
    initialValues: {
      name: defaultName,
      count: defaultCount,
      weight: defaultWeight,
      width: defaultWidth,
      height: defaultHeight
    },
    onSubmit: (values) => {
      console.log(values);

      onAddClick(values);
    }
  });

  const onAddClick = ({ name, count, weight, ...size }: AddProduct) => {
    const newProduct = {
      ...newProductData,
      name,
      count,
      size
    };
    dispatch(add(newProduct));
    onSubmitCallback();
  };

  const { handleSubmit, handleChange, values } = newProductForm;

  return visible ? (
    <div className={styles.addProductForm}>
      <h2>Add product Form</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>Change the name:</p>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="count">
          <p>Change the count:</p>
          <input
            id="count"
            name="count"
            type="number"
            value={values.count}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="width">
          <p>Change the width:</p>
          <input
            id="width"
            name="width"
            type="number"
            value={values.width}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="height">
          <p>Change the height:</p>
          <input
            id="height"
            name="height"
            type="number"
            value={values.height}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="weight">
          <p>Change the weight:</p>
          <input
            id="weight"
            name="weight"
            type="text"
            value={values.weight}
            onChange={handleChange}
          />
        </label>
      </form>
      <footer className={styles.buttons}>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
        <button onClick={onClose}>Cancel</button>
      </footer>
    </div>
  ) : null;
};

export { AddProductForm };
