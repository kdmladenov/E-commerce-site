import errors from '../constants/error-strings.js';

const createProduct = productsData => async (data) => {
  const { name } = data;

  const existingProduct = await productsData.getBy('name', name);

  if (existingProduct) {
    return {
      error: errors.DUPLICATE_RECORD,
      product: null,
    };
  }
  return {
    error: null,
    product: await productsData.create(data),
  };
};


export default {
  createProduct
};
