import React from 'react';

interface ProductFeatureCardFormProps {
  productId: number;
  featureId?: number;
  featureContent?: string;
  featureTitle?: string;
  createMode: boolean;
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default ProductFeatureCardFormProps;
