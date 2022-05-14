import ProductImageType from './ProductImageType';
import ProductType from './ProductType';

interface ProductsData {
  getAllProducts: (
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number,
    role: RolesType
  ) => Promise<ProductType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<ProductType>;
  create: (product: ProductType) => Promise<ProductType>;
  update: (updatedProduct: ProductType) => Promise<ProductType>;
  remove: (productToDelete: ProductType) => Promise<any>;
  restore: (productToRestore: ProductType) => Promise<any>;
}

export default ProductsData;
