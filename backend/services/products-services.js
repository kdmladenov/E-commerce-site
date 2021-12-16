import errors from '../constants/service-errors.js';

const getAllProducts = (productsData) => async (search, filter, sort, pageSize, page) => {
  const result = await productsData.getAllProducts(search, filter, sort, pageSize, page);

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
  const { title } = data;

  const existingProduct = await productsData.getBy('title', title, 'admin');

  if (existingProduct) {
    return {
      error: errors.DUPLICATE_RECORD,
      product: null
    };
  }
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
  // checks if the updated title exist in other product
  if (
    updatedData.title &&
    (await productsData.getBy('title', updatedData.title, 'admin')) &&
    (await productsData.getBy('title', updatedData.title, 'admin')).productId !== productId
  ) {
    return {
      error: errors.DUPLICATE_RECORD,
      product: null
    };
  }

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

const getProductFeaturesById = (productsData) => async (productId) => {
  const product = await productsData.getBy('product_id', productId);

  if (!product) {
    return {
      error: errors.RECORD_NOT_FOUND,
      product: null
    };
  }

  const productFeatures = await productsData.getFeatures(productId);

  return {
    error: null,
    productFeatures
  };
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getProductFeaturesById
};
