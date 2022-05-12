interface SpecificationType {
  specificationId: number;
  productId: number;
  screenSize: number;
  screenResolution: string;
  displayType: string;
  touchScreen: number | boolean;
  processorBrand: string;
  processorModel: string;
  processorModelNumber: string;
  storageType: string;
  storageCapacity: number;
  systemMemory: number;
  graphicsType: string;
  graphicsBrand: string;
  graphicsModel: string;
  operatingSystem: string;
  voiceAssistant: string;
  batteryType: string;
  backlitKeyboard: number | boolean;
  dateCreated?: string;
}

export default SpecificationType;
