import ProductType from '../models/ProductType';
import SpecificationType from '../models/SpecificationType';

const specificationsInOrder: (keyof (ProductType & SpecificationType))[] = [
  'price',
  'rating',
  'brand',
  'modelNumber',
  'releaseYear',
  'displayType',
  'processorModelNumber',
  'storageCapacity',
  'systemMemory',
  'graphicsModel',
  'batteryType',
  'operatingSystem',
  'voiceAssistant',
  'backlitKeyboard',
  'color',
  'dimensions',
  'weight'
];

export default specificationsInOrder;
