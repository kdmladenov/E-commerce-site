import ProductType from '../ProductType';

interface ProductCardProps {
  product:ProductType;
  horizontal?: boolean;
  ribbonText?: string | null;
  deleteBtn?: JSX.Element;
  isCard?: boolean;
  isWishList?: boolean;
}
export default ProductCardProps;
