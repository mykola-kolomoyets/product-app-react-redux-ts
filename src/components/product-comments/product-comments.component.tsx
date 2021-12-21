import React, { FC } from "react";
import { ProductCommentsProps } from "./product.comments.props";
import { useAppDispatch } from "./../../app/hooks";
import { DeleteCommentPayload } from "../../utils/types";
import { removeComment } from "./../../store/product-list.slice";
import styles from "./product-comments.module.css";

const ProductComments: FC<ProductCommentsProps> = ({ comments }) => {
  const dispatch = useAppDispatch();

  if (!comments?.length) return null;

  const onRemoveCommentClick = (payload: DeleteCommentPayload) => {
    dispatch(removeComment(payload));
  };

  const commentsList = comments?.map((comment, index) => (
    <li key={index} className={styles.commentItem}>
      {comment.description} (<em>{comment.date}</em>)
      {/* <button
        onClick={() =>
          onRemoveCommentClick({ id: comment.id, productId: comment.productId })
        }
      >
        Delete me
      </button> */}
    </li>
  ));
  return <ul className={styles.commentsList}>{commentsList}</ul>;
};

export { ProductComments };
