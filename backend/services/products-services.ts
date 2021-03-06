import errors from '../constants/service-errors.js';
import FeatureType from '../models/FeatureType.js';
import FeaturesData from '../models/FeaturesData.js';
import Image from '../models/Image.js';
import ProductType from '../models/ProductType.js';
import ProductImagesData from '../models/ProductImagesData.js';
import ProductsData from '../models/ProductsData.js';
import RolesType from '../models/RolesType.js';
import SpecificationType from '../models/SpecificationType.js';
import SpecificationsData from '../models/SpecificationsData.js';

const getAllProducts =
  (productsData: ProductsData) =>
  async (
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number,
    role: RolesType
  ) => {
    const result = await productsData.getAllProducts(search, filter, sort, pageSize, page, role);

    return result;
  };

const getProductById =
  (productsData: ProductsData) => async (productId: number, role: RolesType) => {
    const product = await productsData.getBy('product_id', productId, role);

    if (!product) {
      return {
        error: errors.RECORD_NOT_FOUND,
        product: null
      };
    }

    return {
      error: null,
      product
    };
  };

const createProduct = (productsData: ProductsData) => async (data: ProductType) => {
  // const { title } = data;

  // const existingProduct = await productsData.getBy('title', title, 'admin');

  // if (existingProduct) {
  //   return {
  //     error: errors.DUPLICATE_RECORD,
  //     product: null
  //   };
  // }
  return {
    error: null,
    product: await productsData.create(data)
  };
};

const updateProduct =
  (productsData: ProductsData) => async (productId: number, updatedData: ProductType) => {
    const existingProduct = await productsData.getBy('product_id', +productId, 'admin');

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        product: null
      };
    }
    // // checks if the updated title exist in other product
    // if (
    //   updatedData.title &&
    //   (await productsData.getBy('title', updatedData.title, 'admin')) &&
    //   (await productsData.getBy('title', updatedData.title, 'admin')).productId !== productId
    // ) {
    //   return {
    //     error: errors.DUPLICATE_RECORD,
    //     product: null
    //   };
    // }

    const updated = { ...existingProduct, ...updatedData };
    const result = await productsData.update(updated);

    return {
      error: null,
      result
    };
  };

const deleteProduct = (productsData: ProductsData) => async (productId: number) => {
  const productToDelete = await productsData.getBy('product_id', productId, 'admin');

  if (!productToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  await productsData.remove(productToDelete);

  return {
    error: null,
    product: { ...productToDelete, isDeleted: 1 }
  };
};

const restoreProduct = (productsData: ProductsData) => async (productId: number) => {
  const productToRestore = await productsData.getBy('product_id', productId, 'admin');

  if (!productToRestore) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  await productsData.restore(productToRestore);

  return {
    error: null,
    product: { ...productToRestore, isDeleted: 0 }
  };
};

const getProductFeaturesById =
  (productsData: ProductsData, featuresData: FeaturesData) => async (productId: number) => {
    const product = await productsData.getBy('product_id', productId);

    if (!product) {
      return {
        error: errors.RECORD_NOT_FOUND,
        productFeatures: null
      };
    }

    const productFeatures = await featuresData.getFeatures(productId);

    return {
      error: null,
      productFeatures
    };
  };

const createProductFeature =
  (productsData: ProductsData, featuresData: FeaturesData) =>
  async (productId: number, data: FeatureType) => {
    const existingProduct = await productsData.getBy('product_id', +productId, 'admin');

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        productFeature: null
      };
    }

    return {
      error: null,
      productFeature: await featuresData.create(+productId, data)
    };
  };

const updateProductFeature =
  (featuresData: FeaturesData) => async (featureId: number, updatedData: FeatureType) => {
    const existingFeature = await featuresData.getBy('feature_id', +featureId, 'admin');

    if (!existingFeature) {
      return {
        error: errors.RECORD_NOT_FOUND,
        updatedProductFeature: null
      };
    }

    const updated = { ...existingFeature, ...updatedData };
    const updatedProductFeature = await featuresData.update(updated);

    return {
      error: null,
      updatedProductFeature
    };
  };

const deleteProductFeature = (featuresData: FeaturesData) => async (featureId: number) => {
  const featureToDelete = await featuresData.getBy('feature_id', featureId, 'admin');

  if (!featureToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      productFeature: null
    };
  }

  await featuresData.remove(featureToDelete);

  return {
    error: null,
    productFeature: { ...featureToDelete, isDeleted: 1 }
  };
};

const createProductSpecification =
  (productsData: ProductsData, specificationsData: SpecificationsData) =>
  async (productId: number, updatedData: SpecificationType) => {
    const existingProduct = await productsData.getBy('product_id', +productId, 'admin');

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        product: null
      };
    }

    const existingSpecification = await specificationsData.getBy('product_id', +productId, 'admin');

    if (existingSpecification) {
      const updated = { ...existingSpecification, ...updatedData };

      const productSpecification = await specificationsData.update(
        +existingSpecification.specificationId,
        updated
      );

      return {
        error: null,
        productSpecification
      };
    }
    return {
      error: null,
      productSpecification: await specificationsData.create(productId, updatedData)
    };
  };

const updateProductSpecification =
  (specificationsData: SpecificationsData) =>
  async (specificationId: number, updatedData: SpecificationType) => {
    const existingSpecification = await specificationsData.getBy(
      'specification_id',
      +specificationId,
      'admin'
    );

    if (!existingSpecification) {
      return {
        error: errors.RECORD_NOT_FOUND,
        productSpecification: null
      };
    }

    const updated = { ...existingSpecification, ...updatedData };
    
    const productSpecification = await specificationsData.update(+specificationId, updated);

    return {
      error: null,
      productSpecification
    };
  };

const deleteProductSpecification =
  (specificationsData: SpecificationsData) => async (specificationId: number) => {
    const specificationToDelete = await specificationsData.getBy(
      'specification_id',
      +specificationId,
      'admin'
    );

    if (!specificationToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        product: null
      };
    }

    await specificationsData.remove(specificationToDelete);

    return {
      error: null,
      deletedProductSpecification: { ...specificationToDelete, isDeleted: 1 }
    };
  };

const getAllProductImages =
  (productsImagesData: ProductImagesData, productsData: ProductsData) =>
  async (productId: number) => {
    const existingProduct = await productsData.getBy('product_id', +productId, 'basic');

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    return {
      error: null,
      result: await productsImagesData.getAllProductImages(+productId)
    };
  };

const addProductImage =
  (productsImagesData: ProductImagesData, productsData: ProductsData) =>
  async (productId: number, imageUrl: string) => {
    const existingProduct = await productsData.getBy('product_id', productId, 'basic');

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const existingImagesList = await productsImagesData.getAllProductImages(+productId);

    const isMainImage = existingImagesList.length === 0 ? 1 : 0;

    return {
      error: null,
      result: await productsImagesData.addProductImage(+productId, imageUrl, +isMainImage)
    };
  };

const deleteProductImage =
  (productsImagesData: ProductImagesData) => async (productImageId: number) => {
    const productImageToDelete = await productsImagesData.getProductImageBy(
      'product_image_id',
      +productImageId,
      'basic'
    );

    if (!productImageToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        deletedImage: null
      };
    }

    await productsImagesData.remove(+productImageId);

    return {
      error: null,
      deletedImage: { ...productImageToDelete, isDeleted: 1 }
    };
  };

const setProductImageAsMain =
  (productsImagesData: ProductImagesData) => async (productImageId: number) => {
    const newMainProductImage = await productsImagesData.getProductImageBy(
      'product_image_id',
      +productImageId
    );

    if (!newMainProductImage) {
      return {
        error: errors.RECORD_NOT_FOUND,
        newMainImage: null
      };
    }
    const allProductImages = await productsImagesData.getAllProductImages(
      +newMainProductImage.productId
    );

    const oldMainProduct = allProductImages.filter((image: Image) => image.isMain)[0];

    await productsImagesData.update({ ...oldMainProduct, isMain: 0 });

    return {
      error: null,
      newMainImage: await productsImagesData.update({ ...newMainProductImage, isMain: 1 })
    };
  };

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getProductFeaturesById,
  createProductFeature,
  updateProductFeature,
  deleteProductFeature,
  createProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
  addProductImage,
  getAllProductImages,
  deleteProductImage,
  setProductImageAsMain
};
