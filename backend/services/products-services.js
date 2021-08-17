import errors from '../constants/error-strings.js';

const getAllProducts =
  (productsData) => async (search, searchBy, sort, order, pageSize, page, role) => {
    const result = await productsData.getAllProducts(
      search,
      searchBy,
      sort,
      order,
      pageSize,
      page,
      role
    );

    return result;
  };

const createProduct = productsData => async (data) => {
  const { title } = data;

  const existingProduct = await productsData.getBy('title', title);

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
  getAllProducts,
  createProduct
};
