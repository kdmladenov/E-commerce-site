import { RefObject } from 'react';
import ProductType from '../ProductType';

interface ProductDetailsInfoProps {
  productListAdmin: boolean;
  showZoomedImage: boolean;
  product: ProductType;
  questionsCount?: number;
  comparisonRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
  questionsAndAnswersRef: RefObject<HTMLElement>;
  specsRef: RefObject<HTMLElement>;
  featuresRef: RefObject<HTMLElement>;
}
export default ProductDetailsInfoProps;
