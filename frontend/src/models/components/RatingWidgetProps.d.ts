import ProductType from '../ProductType';

interface RatingWidgetProps {
  product: ProductType;
  updateQuery?: (prop: string, value: string) => void;
  ratingQuery?: string;
}
export default RatingWidgetProps;
