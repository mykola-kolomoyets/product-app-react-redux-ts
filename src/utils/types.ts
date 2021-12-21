export type Comment = {
  id: number;
  productId: number;
  description: string;
  date: string | Date;
}

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Comment[];
}

export type onSubmitCallbackType = (() => void) & ((productData: Product) => void);

export type ModalProps = {
  visible: boolean;
  onSubmitCallback: onSubmitCallbackType;
  onClose?: () => void;
}

export type AddProduct = {
  name: string;
  count: number;
  weight: string;
  width: number;
  height: number;
}

export type EditProduct = {
  name: string;
  count: number;
  weight: string;
  width: number;
  height: number;
  comment: string;
}

export type EditProductFormProps = ModalProps & {
  productData: Product;
  onClose: () => void;
};

export type ProductViewProps = {
  productData: Product;
} & { onClose: () => void };

export type AddCommentPayload = {
  id: number;
  comment: Comment;
}

export type DeleteCommentPayload = {
  id: number;
  productId: number;
}