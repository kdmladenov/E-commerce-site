interface ProductFeatureEditCardProps {
  productId: number;
  featureId?: number;
  featureContent?: string;
  featureTitle?: string;
  createMode: boolean;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
}
export default ProductFeatureEditCardProps;
