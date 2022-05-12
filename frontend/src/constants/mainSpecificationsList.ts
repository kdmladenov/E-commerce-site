import ProductType from '../models/ProductType';

const mainSpecificationsList: (keyof ProductType)[] = [
  'modelNumber',
  'releaseYear',
  'displayType',
  'processorModelNumber',
  'storageCapacity',
  'systemMemory'
];

export default mainSpecificationsList;
