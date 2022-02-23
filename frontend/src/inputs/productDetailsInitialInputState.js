import { PRODUCT } from '../constants/constants';

export const productDetailsInitialInputState = {
  title: {
    label: 'Product Title',
    type: 'text',
    placeholder: 'Enter title ...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_NAME_LENGTH,
      maxLength: PRODUCT.MAX_NAME_LENGTH
    },
    valid: true,
    touched: false
  },
  brand: {
    label: 'Product Brand',
    type: 'text',
    placeholder: 'Enter brand ...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_BRAND_LENGTH,
      maxLength: PRODUCT.MAX_BRAND_LENGTH
    },
    valid: true,
    touched: false
  },
  // image: {
  //   url: {
  //     label: 'Product image',
  //     type: 'text',
  //     placeholder: 'Enter Image URL...',
  //     value: '',
  //     validations: {
  //       required: true
  //     },
  //     valid: true,
  //     touched: false
  //   },
  //   file: {
  //     label: 'Product image',
  //     type: 'file',
  //     placeholder: 'Upload image file ...',
  //     value: '',
  //     validations: {
  //       required: true
  //     },
  //     valid: true,
  //     touched: false
  //   }
  // },
  description: {
    label: 'Product Description',
    type: 'text',
    rows: 10,
    placeholder: 'Enter description ...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_DESCRIPTION_LENGTH,
      maxLength: PRODUCT.MAX_DESCRIPTION_LENGTH
    },
    valid: true,
    touched: false
  },
  productCategory: {
    label: 'Product Category',
    type: 'select',
    options: [<option value="Electronics">{'Electronics'}</option>],
    placeholder: 'Select category ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  },
  price: {
    label: 'Product price',
    type: 'number',
    placeholder: 'Enter price ...',
    min: PRODUCT.MIN_PRICE_VALUE,
    max: PRODUCT.MAX_PRICE_VALUE,
    value: '',
    validations: {
      required: true,
      minValue: PRODUCT.MIN_PRICE_VALUE,
      maxValue: PRODUCT.MAX_PRICE_VALUE
    },
    valid: true,
    touched: false
  },
  stockCount: {
    label: 'Stock Count',
    type: 'number',
    placeholder: 'Enter stock count ...',
    min: PRODUCT.MIN_STOCK_COUNT,
    max: PRODUCT.MAX_STOCK_COUNT,
    value: '',
    validations: {
      required: true,
      minValue: PRODUCT.MIN_STOCK_COUNT,
      maxValue: PRODUCT.MAX_STOCK_COUNT
    },
    valid: true,
    touched: false
  },
  discount: {
    label: 'Product discount',
    type: 'number',
    placeholder: 'Enter discount ...',
    min: PRODUCT.MIN_DISCOUNT_VALUE,
    max: PRODUCT.MAX_DISCOUNT_VALUE,
    value: '',
    validations: {
      required: true,
      minValue: PRODUCT.MIN_STOCK_COUNT,
      maxValue: PRODUCT.MAX_STOCK_COUNT
    },
    valid: true,
    touched: false
  },
  // isDeleted: {
  //   label: 'Product deleted',
  //   type: 'checkbox',
  //   value: 'unchecked',
  //   validations: {
  //     required: true
  //   },
  //   valid: true,
  //   touched: false
  // },
  modelNumber: {
    label: 'Model Number',
    type: 'text',
    placeholder: 'Enter model number...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_MODEL_NUMBER_LENGTH,
      maxLength: PRODUCT.MAX_MODEL_NUMBER_LENGTH
    },
    valid: true,
    touched: false
  },
  sku: {
    label: 'SKU',
    type: 'text',
    placeholder: 'Enter product sku...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_SKU_LENGTH,
      maxLength: PRODUCT.MAX_SKU_LENGTH
    },
    valid: true,
    touched: false
  },
  releaseYear: {
    label: 'Release year',
    type: 'number',
    placeholder: 'Enter year ...',
    min: PRODUCT.MIN_RELEASE_YEAR,
    max: PRODUCT.MAX_RELEASE_YEAR,
    value: '',
    validations: {
      required: true,
      minValue: PRODUCT.MIN_RELEASE_YEAR,
      maxValue: PRODUCT.MAX_RELEASE_YEAR
    },
    valid: true,
    touched: false
  },
  color: {
    label: 'Product Color',
    type: 'text',
    placeholder: 'Enter color ...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_COLOR_LENGTH,
      maxLength: PRODUCT.MAX_COLOR_LENGTH
    },
    valid: true,
    touched: false
  },
  colorFamily: {
    label: 'Product color family',
    type: 'text',
    placeholder: 'Enter color family...',
    value: '',
    validations: {
      required: true,
      minLength: PRODUCT.MIN_COLOR_FAMILY_LENGTH,
      maxLength: PRODUCT.MAX_COLOR_FAMILY_LENGTH
    },
    valid: true,
    touched: false
  },
  weight: {
    label: 'Product weight',
    type: 'number',
    step: '0.01',
    placeholder: 'Enter price ...',
    min: PRODUCT.MIN_WEIGHT,
    max: PRODUCT.MAX_WEIGHT,
    value: '',
    validations: {
      required: true,
      minValue: PRODUCT.MIN_PRICE_VALUE,
      maxValue: PRODUCT.MAX_PRICE_VALUE
    },
    valid: true,
    touched: false
  },
  dimensions: {
    label: 'Product dimensions',
    type: 'text',
    placeholder: 'Enter product dimensions (HxWxD inches)',
    value: '',
    validations: {
      required: true,
      format: PRODUCT.DIMENSIONS_REGEX
    },
    valid: true,
    touched: false
  }
};

export default productDetailsInitialInputState;
