interface ProductImageType {
  productImageId: number;
  productId: number;
  image: string;
  isMain: number | boolean;
  isDeleted: number | boolean;
}

export default ProductImageType;
