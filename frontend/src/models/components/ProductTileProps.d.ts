interface ProductTileProps {
  products: {
    productId: number;
    title: string;
    image: string;
    description: string;
    brand: string;
    productCategory: string;
    price: number;
    stockCount: number;
    isDeleted: number | boolean;
    modelNumber: string;
    sku: string;
    releaseYear: number;
    dateCreated: string | Date;
    color: string;
    colorFamily: string;
    weight: number;
    dimensions: string;
    discount: number;
    specificationId: number;
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
    salesCount: number;
    visitedCount: number;
    wishedCount: number;
    reviewCount: number;
    rating: number;
    starOne: number;
    starTwo: number;
    starThree: number;
    starFour: number;
    starFive: number;
    totalDBItems: number;
  }[];
  header:string;
  itemSubtitleLine1?:string;
  itemSubtitleLine2?:string;
  footer?:string;
  footerLink?:string;
}
export default ProductTileProps 