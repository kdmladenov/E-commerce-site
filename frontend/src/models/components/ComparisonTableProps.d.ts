import ProductType from '../ProductType';

interface ComparisonTableProps {
  currentProductId: number;
  sortBy?: keyof ProductType;
  brand?: string;
}
export default ComparisonTableProps;
