import React, { FC } from "react";
import styles from "./edit-product-form.module.css";
import {
  EditProduct,
  ModalProps,
  onSubmitCallbackType,
  Product,
  Comment,
  EditProductFormProps
} from "../../utils/types";

import { useAppDispatch } from "./../../app/hooks";

import { useFormik } from "formik";

const EditProductForm: FC<EditProductFormProps> = ({
  productData,
  onSubmitCallback,
  onClose
}) => {
  const editedProductData = { ...productData };

  const newProductForm = useFormik<EditProduct>({
    initialValues: {
      name: editedProductData.name,
      count: editedProductData.count,
      weight: editedProductData.weight,
      width: editedProductData.size.width,
      height: editedProductData.size.height,
      comment: ""
    },
    onSubmit: (values) => {
      onEditClick(values);
    }
  });

  const onEditClick = ({
    name,
    count,
    weight,
    comment,
    ...size
  }: EditProduct) => {
    const newComment: Comment = {
      id: editedProductData?.comments?.length + 1,
      productId: editedProductData?.id,
      description: values.comment,
      date: new Date().toUTCString()
    };

    const editedProduct = {
      ...editedProductData,
      name,
      count,
      size,
      comments: [...editedProductData.comments, newComment]
    };
    onSubmitCallback(editedProduct);
  };

  const { handleSubmit, handleChange, values } = newProductForm;

  return (
    <section className={styles.editForm}>
      <h2>Edit data about product</h2>

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

        <label htmlFor="comment">
          <p>Change the comment:</p>
          <input
            id="comment"
            name="comment"
            type="text"
            value={values.comment}
            onChange={handleChange}
          />
        </label>
      </form>
      <footer className={styles.buttons}>
        <button type="submit" onClick={handleSubmit}>
          Edit
        </button>
        <button onClick={onClose}>Cancel</button>
      </footer>
    </section>
  );
};

export { EditProductForm };
