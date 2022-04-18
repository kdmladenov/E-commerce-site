interface Product {
  productId: number;
  title: string;
  brand: string;
  image: string;
  description: string;
  productCategory: string;
  price: number;
  stockCount: number;
  discount: number;
  color: string;
  colorFamily: string;
  dimensions: string;
  isDeleted: boolean;
  modelNumber: string;
  releaseYear: number;
  sku: string;
  weight: number;
}

export default Product;
