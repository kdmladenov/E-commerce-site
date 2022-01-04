import errors from '../constants/service-errors.js';
import { uploads } from '../constants/constants.js';

const getAllProducts = (productsData) => async (search, filter, sort, pageSize, page, role) => {
  const result = await productsData.getAllProducts(search, filter, sort, pageSize, page, role);

  return result;
};

const getProductById = (productsData) => async (productId, role) => {
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

const createProduct = (productsData) => async (data) => {
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

const updateProduct = (productsData) => async (productId, updatedData) => {
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

const deleteProduct = (productsData) => async (productId) => {
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

const restoreProduct = (productsData) => async (productId) => {
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

const getProductFeaturesById = (productsData, featuresData) => async (productId) => {
  const product = await productsData.getBy('product_id', productId);

  if (!product) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  const productFeatures = await featuresData.getFeatures(productId);

  return {
    error: null,
    productFeatures
  };
};

const createProductFeature = (productsData, featuresData) => async (productId, data) => {
  const existingProduct = await productsData.getBy('product_id', +productId, 'admin');

  if (!existingProduct) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  return {
    error: null,
    product: await featuresData.create(+productId, data)
  };
};

const updateProductFeature = (featuresData) => async (featureId, updatedData) => {
  const existingFeature = await featuresData.getBy('feature_id', +featureId, 'admin');

  if (!existingFeature) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  const updated = { ...existingFeature, ...updatedData };
  const updatedProductFeature = await featuresData.update(updated);

  return {
    error: null,
    updatedProductFeature
  };
};

const deleteProductFeature = (featuresData) => async (featureId) => {
  const featureToDelete = await featuresData.getBy('feature_id', featureId, 'admin');

  if (!featureToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  await featuresData.remove(featureToDelete);

  return {
    error: null,
    product: { ...featureToDelete, isDeleted: 1 }
  };
};

const createProductSpecification =
  (productsData, specificationsData) => async (productId, updatedData) => {
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
      const productSpecification = await specificationsData.update(+productId, updated);

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

const updateProductSpecification = (specificationsData) => async (specificationId, updatedData) => {
  const existingSpecification = await specificationsData.getBy(
    'specification_id',
    +specificationId,
    'admin'
  );

  if (!existingSpecification) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  const updated = { ...existingSpecification, ...updatedData };
  const productSpecification = await specificationsData.update(specificationId, updated);

  return {
    error: null,
    productSpecification
  };
};

const deleteProductSpecification = (specificationsData) => async (specificationId) => {
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

const getAllProductImages = (productsImagesData, productsData) => async (productId) => {
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

const addProductImage = (productsImagesData, productsData) => async (productId, imageUrl) => {
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

const deleteProductImage = (productsImagesData) => async (productImageId) => {
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

const setProductImageAsMain = (productsImagesData) => async (productImageId) => {
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

  const oldMainProduct = allProductImages.filter((image) => image.isMain)[0];

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
