import FeatureType from './FeatureType';

interface FeaturesData {
  getFeatures: (productId: number) => Promise<FeatureType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<FeatureType>;
  create: (productId: number, data: FeatureType) => Promise<FeatureType>;
  update: (updatedFeature: FeatureType) => Promise<FeatureType>;
  remove: (featuresData: FeatureType) => Promise<FeatureType>;
}

export default FeaturesData;
