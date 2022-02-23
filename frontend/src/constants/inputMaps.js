import Price from '../components/Price.js';
import Rating from '../components/Rating.js';
import { USER, PRODUCT } from './constants.js';
import { poundToKg } from './utility-functions.js';

export const adminMenuMap = [
  { path: '/admin/main/userlist', label: 'Users' },
  { path: '/admin/main/productlist', label: 'Products' },
  { path: '/admin/main/orderlist', label: 'Orders' }
];

export const userMenuMap = [
  { path: '/account/profile', label: 'Profile' },
  { path: '/account/orders', label: 'Orders' },
  { path: '/account/history', label: 'Browsing History' },
  { path: '/account/wishlist', label: 'Wish List' }
];

export const defaultEndpoint = {
  productListScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    filter: [],
    search: ''
  },
  wishListScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateCreated desc&',
    filter: [],
    search: ''
  },
  browsingHistoryScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateVisited desc&',
    filter: [],
    search: ''
  },
  brandStoreScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    filter: [],
    search: ''
  },
  wishList: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    search: ''
  },
  userListAdmin: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=user_id asc&',
    search: ''
  },
  reviews: {
    page: 'page=1&',
    sort: 'sort=dateCreated desc&',
    rating: 'ratingMin=1&ratingMax=5&',
    search: ''
  },
  questionsAndAnswers: {
    page: 'page=1&',
    sort: 'sort=dateCreated desc&',
    search: ''
  },
  productListAdmin: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=productId asc&',
    search: '',
    role: 'role=admin'
  },
  ordersMy: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_id desc&',
    search: ''
  },
  orderListAdmin: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_id asc&',
    search: ''
  },
  history: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateVisited desc&',
    filter: [],
    search: ''
  }
};

export const buttonNavMap = (productId, section) => {
  return {
    account: [
      { tabName: 'profile', path: '/account/profile', label: 'Profile' },
      { tabName: 'orders', path: '/account/orders', label: 'Orders' },
      { tabName: 'history', path: '/account/history', label: 'History' },
      { tabName: 'wishlist', path: '/account/wishlist', label: 'Wishes' }
    ],
    admin: [
      { tabName: 'userlist', path: '/admin/main/userlist', label: 'Users' },
      { tabName: 'productlist', path: '/admin/main/productlist', label: 'Products' },
      { tabName: 'orderlist', path: '/admin/main/orderlist', label: 'Orders' }
    ],
    product_edit: [
      {
        tabName: 'details',
        path: `/admin/products/${productId}/edit/details`,
        label: productId ? `Edit Product` : `Create Product`
      },
      {
        tabName: 'images',
        path: `/admin/products/${productId}/edit/images`,
        label: 'Add Images',
        disabled: !productId
      },
      {
        tabName: 'specifications',
        path: `/admin/products/${productId}/edit/specifications`,
        label: productId ? `Edit Specs` : `Add Specs`,
        disabled: !productId
      },
      {
        tabName: 'features',
        path: `/admin/products/${productId}/edit/features`,
        label: 'Add/Edit Features',
        disabled: !productId
      }
    ]
  };
};

export const userRegisterInitialInputState = {
  fullName: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Your full name ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_FULL_NAME_LENGTH,
      maxLength: USER.MAX_FULL_NAME_LENGTH
    },
    valid: true,
    touched: false
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Your email ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_EMAIL_LENGTH,
      maxLength: USER.MAX_EMAIL_LENGTH,
      format: USER.EMAIL_REGEX
    },
    valid: true,
    touched: false
  },
  reenteredEmail: {
    label: 'Re-enter email',
    type: 'email',
    placeholder: 'Re-enter your email ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  },
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Your password ...',
    value: '',
    validations: {
      required: true,
      format: USER.PASSWORD_REGEX
    },
    valid: true,
    touched: false
  },
  reenteredPassword: {
    label: 'Re-enter password',
    type: 'password',
    placeholder: 'Re-enter your password ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  }
};

export const userLoginInitialInputState = {
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Your email ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_EMAIL_LENGTH,
      maxLength: USER.MAX_EMAIL_LENGTH,
      format: USER.EMAIL_REGEX
    },
    valid: true,
    touched: false
  },
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Your password ...',
    value: '',
    validations: {
      required: true,
      format: USER.PASSWORD_REGEX
    },
    valid: true,
    touched: false
  }
};

export const userForgottenPasswordInitialInputState = {
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Your email ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_EMAIL_LENGTH,
      maxLength: USER.MAX_EMAIL_LENGTH,
      format: USER.EMAIL_REGEX
    },
    valid: true,
    touched: false
  }
};

export const userResetPasswordInitialInputState = {
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Your password ...',
    value: '',
    validations: {
      required: true,
      format: USER.PASSWORD_REGEX
    },
    valid: true,
    touched: false
  },
  reenteredPassword: {
    label: 'Re-enter password',
    type: 'password',
    placeholder: 'Re-enter your password ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  }
};

export const profileOverviewInitialInputState = {
  fullName: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Your full name ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_FULL_NAME_LENGTH,
      maxLength: USER.MAX_FULL_NAME_LENGTH
    },
    valid: true,
    touched: false
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Your email ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_EMAIL_LENGTH,
      maxLength: USER.MAX_EMAIL_LENGTH,
      format: USER.EMAIL_REGEX
    },
    valid: true,
    touched: false
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    placeholder: 'Your phone ...',
    value: '',
    validations: {
      required: true,
      format: USER.PHONE_REGEX
    },
    pattern: USER.PHONE_REGEX,
    valid: true,
    touched: false
  }
};

export const profileAddressInitialInputState = {
  address: {
    label: 'Address',
    type: 'text',
    placeholder: 'Your address ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_ADDRESS_LENGTH,
      maxLength: USER.MAX_ADDRESS_LENGTH
    },
    valid: true,
    touched: false
  },
  address2: {
    label: 'Address 2',
    type: 'text',
    placeholder: 'Your address 2 ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_ADDRESS_LENGTH,
      maxLength: USER.MAX_ADDRESS_LENGTH
    },
    valid: true,
    touched: false
  },
  city: {
    label: 'City',
    type: 'text',
    placeholder: 'Your city ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_CITY_LENGTH,
      maxLength: USER.MAX_CITY_LENGTH
    },
    valid: true,
    touched: false
  },
  state: {
    label: 'State',
    type: 'text',
    placeholder: 'Your state ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_STATE_LENGTH,
      maxLength: USER.MAX_STATE_LENGTH
    },
    valid: true,
    touched: false
  },
  zip: {
    label: 'Zip',
    type: 'text',
    placeholder: 'Your zip ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_ZIP_VALUE,
      maxLength: USER.MAX_ZIP_VALUE
    },
    valid: true,
    touched: false
  },
  country: {
    label: 'Country',
    type: 'text',
    placeholder: 'Your country ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_COUNTRY_LENGTH,
      maxLength: USER.MAX_COUNTRY_LENGTH
    },
    valid: true,
    touched: false
  }
};

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

export const productSpecificationsInitialInputState = (database) => {
  return {
    screenSize: {
      formElement: 'select',
      label: 'Screen size',
      options: Array.from(new Set(Object.values(database).map((item) => item.screenSize)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue.toFixed(1)}"`,
          value: `${itemValue}`
        })),
      placeholder: 'Screen size ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    screenResolution: {
      formElement: 'select',
      label: 'Screen resolution',
      options: Array.from(new Set(Object.values(database).map((item) => item.screenResolution)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Screen resolution ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    displayType: {
      formElement: 'select',
      label: 'Display type',
      options: Array.from(new Set(Object.values(database).map((item) => item.displayType)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Display type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    processorBrand: {
      formElement: 'select',
      label: 'Processor brand',
      options: Array.from(new Set(Object.values(database).map((item) => item.processorBrand)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Processor brand ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    processorModel: {
      formElement: 'select',
      label: 'Processor model',
      options: Array.from(new Set(Object.values(database).map((item) => item.processorModel)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Processor model ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    processorModelNumber: {
      formElement: 'select',
      label: 'Processor number',
      options: Array.from(new Set(Object.values(database).map((item) => item.processorModelNumber)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Processor model number...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    storageType: {
      formElement: 'select',
      label: 'Storage type',
      options: Array.from(new Set(Object.values(database).map((item) => item.storageType)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Storage type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    storageCapacity: {
      formElement: 'select',
      label: 'Storage capacity',
      options: Array.from(new Set(Object.values(database).map((item) => item.storageCapacity)))
        .sort((a, b) => a - b)
        .map((itemValue) => ({
          label: `${itemValue} GB`,
          value: `${itemValue}`
        })),
      placeholder: 'Storage capacity ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    systemMemory: {
      formElement: 'select',
      label: 'System memory',
      options: Array.from(new Set(Object.values(database).map((item) => item.systemMemory)))
        .sort((a, b) => a - b)
        .map((itemValue) => ({
          label: `${itemValue} GB`,
          value: `${itemValue}`
        })),
      placeholder: 'System memory ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    operatingSystem: {
      formElement: 'select',
      label: 'Operating system',
      options: Array.from(new Set(Object.values(database).map((item) => item.operatingSystem)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Operating system ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    graphicsType: {
      formElement: 'select',
      label: 'Graphics type',
      options: Array.from(new Set(Object.values(database).map((item) => item.graphicsType)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Graphics type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    graphicsBrand: {
      formElement: 'select',
      label: 'Graphics brand',
      options: Array.from(new Set(Object.values(database).map((item) => item.graphicsBrand)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Graphics brand ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    graphicsModel: {
      formElement: 'select',
      label: 'Graphics model',
      options: Array.from(new Set(Object.values(database).map((item) => item.graphicsModel)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Graphics model ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    voiceAssistant: {
      formElement: 'select',
      label: 'Voice Assistant',
      options: Array.from(new Set(Object.values(database).map((item) => item.voiceAssistant)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Voice Assistant ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    batteryType: {
      formElement: 'select',
      label: 'Battery type',
      options: Array.from(new Set(Object.values(database).map((item) => item.batteryType)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Battery type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    touchScreen: {
      formElement: 'select',
      label: 'Touch screen',
      options: Array.from(new Set(Object.values(database).map((item) => item.touchScreen)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue === 1 ? 'true' : 'false'}`,
          value: `${itemValue}`
        })),
      placeholder: 'Touch screen ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    backlitKeyboard: {
      formElement: 'select',
      label: 'Backlit keyboard',
      options: Array.from(new Set(Object.values(database).map((item) => item.backlitKeyboard)))
        .sort()
        .map((itemValue) => ({
          label: `${itemValue === 1 ? 'true' : 'false'}`,
          value: `${itemValue}`
        })),
      placeholder: 'Backlit keyboard ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  };
};

export const sidebarInput = (database) => {
  return {
    // 'Product Category': Array.from(
    //   new Set(Object.values(productsDatabase).map((product) => product.productCategory))
    // ).map((productCategory) => ({
    //   label: `${productCategory} (${
    //     Object.values(productsDatabase).filter(
    //       (product) => product.productCategory === productCategory
    //     ).length
    //   })`,
    //   value: `filter=product_category = '${productCategory}'`,
    //   type: 'checkbox'
    // })),
    Brand: Array.from(new Set(Object.values(database).map((product) => product.brand)))
      .sort()
      .map((brand) => ({
        label: `${brand} (${
          Object.values(database).filter((product) => product.brand === brand).length
        })`,
        value: `filter=brand = '${brand}'`,
        type: 'checkbox',
        accordionOpen: true
      })),
    'Customer Reviews': [5, 4, 3, 2, 1].map((rating) => ({
      label: `${rating} stars (${
        Object.values(database).filter(
          (product) => product.rating >= rating - 0.501 && product.rating <= rating + 0.501
        ).length
      })`,
      // (  <div className="sidebar_review">
      //     <Rating rating={rating} /> & up
      //   </div>
      // ),
      value:
        Object.values(database).filter(
          (product) => product.rating >= rating - 0.501 && product.rating < rating + 0.501
        ).length > 0
          ? `filter=rating between ${rating - 0.501} and ${rating + 0.499}`
          : '',
      type: 'checkbox',
      accordionOpen: true
    })),
    Price: [
      [0, 300],
      [300, 500],
      [500, 700],
      [700, 900],
      [900, 10000]
    ].map((priceRange) => ({
      label: `${
        priceRange[0] === 0
          ? `Under ${priceRange[1]}`
          : priceRange[1] === 10000
          ? `${priceRange[0]} & Above`
          : `${priceRange[0]} to ${priceRange[1]}`
      } (${
        Object.values(database).filter(
          (product) => product.price >= priceRange[0] && product.price < priceRange[1]
        ).length
      })`,
      value: `filter=price between ${priceRange[0]} and ${priceRange[1] + 0.001}`,
      type: 'checkbox',
      accordionOpen: true
    })),
    'Release Year': Array.from(
      new Set(Object.values(database).map((product) => product.releaseYear))
    )
      .sort((a, b) => b - a)
      .map((releaseYear) => ({
        label: `${releaseYear} (${
          Object.values(database).filter((product) => product.releaseYear === releaseYear).length
        })`,
        value: `filter=release_year = ${releaseYear}`,
        type: 'checkbox'
      })),
    'CPU Manufacturer': Array.from(
      new Set(Object.values(database).map((product) => product.processorBrand))
    )
      .sort()
      .map((processorBrand) => ({
        label: `${processorBrand} (${
          Object.values(database).filter((product) => product.processorBrand === processorBrand)
            .length
        })`,
        value: `filter=processor_brand = '${processorBrand}'`,
        type: 'checkbox'
      })),
    'Operating System': Array.from(
      new Set(Object.values(database).map((product) => product.operatingSystem))
    )
      .sort()
      .map((operatingSystem) => ({
        label: `${operatingSystem} (${
          Object.values(database).filter((product) => product.operatingSystem === operatingSystem)
            .length
        })`,
        value: `filter=operating_system = '${operatingSystem}'`,
        type: 'checkbox'
      })),
    Color: Array.from(new Set(Object.values(database).map((product) => product.colorFamily)))
      .sort()
      .map((mainColor) => ({
        label: `${mainColor} (${
          Object.values(database).filter((product) => product.colorFamily === mainColor).length
        })`,
        value: `filter=color_family ='${mainColor}'`,
        type: 'checkbox'
      })),
    'Display Size': Array.from(
      new Set(Object.values(database).map((product) => product.screenSize))
    )
      .sort()
      .map((screenSize) => ({
        label: `${screenSize?.toFixed(1)}'' (${
          Object.values(database).filter((product) => product.screenSize === screenSize).length
        })`,
        value: `filter=screen_size between ${screenSize - 0.001} and ${screenSize + 0.001}`,
        type: 'checkbox'
      })),
    'Display Type': Array.from(
      new Set(Object.values(database).map((product) => product.displayType))
    )
      .sort()
      .map((displayType) => ({
        label: `${displayType} (${
          Object.values(database).filter((product) => product.displayType === displayType).length
        })`,
        value: `filter=display_type = '${displayType}'`,
        type: 'checkbox'
      })),
    'CPU Model': Array.from(
      new Set(Object.values(database).map((product) => product.processorModel))
    )
      .sort()
      .map((processorModel) => ({
        label: `${processorModel} (${
          Object.values(database).filter((product) => product.processorModel === processorModel)
            .length
        })`,
        value: `filter=processor_model = '${processorModel}'`,
        type: 'checkbox'
      })),
    'Display Resolution': Array.from(
      new Set(Object.values(database).map((product) => product.screenResolution))
    )
      .sort()
      .map((screenResolution) => ({
        label: `${screenResolution} (${
          Object.values(database).filter((product) => product.screenResolution === screenResolution)
            .length
        })`,
        value: `filter=screen_resolution = '${screenResolution}'`,
        type: 'checkbox'
      })),
    'RAM Capacity': Array.from(
      new Set(Object.values(database).map((product) => product.systemMemory))
    )
      .sort((a, b) => a - b)
      .map((systemMemory) => ({
        label: `${systemMemory} GB (${
          Object.values(database).filter((product) => product.systemMemory === systemMemory).length
        })`,
        value: `filter=system_memory = ${systemMemory}`,
        type: 'checkbox'
      })),
    'Hard Disk Size': Array.from(
      new Set(Object.values(database).map((product) => product.storageCapacity))
    )
      .sort((a, b) => a - b)
      .map((storageCapacity) => ({
        label: `${storageCapacity} GB (${
          Object.values(database).filter((product) => product.storageCapacity === storageCapacity)
            .length
        })`,
        value: `filter=storage_capacity = ${storageCapacity}`,
        type: 'checkbox'
      })),

    'Hard Disk Type': Array.from(
      new Set(Object.values(database).map((product) => product.storageType))
    )
      .sort((a, b) => a - b)
      .map((storageType) => ({
        label: `${storageType} (${
          Object.values(database).filter((product) => product.storageType === storageType).length
        })`,
        value: `filter=storage_type = '${storageType}'`,
        type: 'checkbox'
      })),

    'Graphics Type': Array.from(
      new Set(Object.values(database).map((product) => product.graphicsType))
    )
      .sort()
      .map((graphicsType) => ({
        label: `${graphicsType} (${
          Object.values(database).filter((product) => product.graphicsType === graphicsType).length
        })`,
        value: `filter=graphics_type = '${graphicsType}'`,
        type: 'checkbox'
      })),
    'Graphics Model': Array.from(
      new Set(Object.values(database).map((product) => product.graphicsModel))
    )
      .sort()
      .map((graphicsModel) => ({
        label: `${graphicsModel} (${
          Object.values(database).filter((product) => product.graphicsModel === graphicsModel)
            .length
        })`,
        value: `filter=graphics_model = '${graphicsModel}'`,
        type: 'checkbox'
      })),
    Weight: [
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 100]
    ]
      .sort()
      .map((weightRange) => ({
        label: `${
          weightRange[0] === 0
            ? `Up to ${weightRange[1]} Pounds`
            : weightRange[1] === 100
            ? `${weightRange[0]} Pounds & Above`
            : `${weightRange[0]} to ${weightRange[1]} Pounds`
        } (${
          Object.values(database).filter(
            (product) => product.weight >= weightRange[0] && product.weight < weightRange[1]
          ).length
        })`,
        value: `filter=weight between ${weightRange[0] - 0.001} and ${weightRange[1] - 0.001}`,
        type: 'checkbox'
      })),
    'Battery Type': Array.from(
      new Set(Object.values(database).map((product) => product.batteryType))
    )
      .sort()
      .map((batteryType) => ({
        label: `${batteryType} (${
          Object.values(database).filter((product) => product.batteryType === batteryType).length
        })`,
        value: `filter=battery_type = '${batteryType}'`,
        type: 'checkbox'
      })),
    'Voice Assistant': Array.from(
      new Set(Object.values(database).map((product) => product.voiceAssistant))
    )
      .sort()
      .map((voiceAssistant) => ({
        label: `${voiceAssistant} (${
          Object.values(database).filter((product) => product.voiceAssistant === voiceAssistant)
            .length
        })`,
        value: `filter=voice_assistant = '${voiceAssistant}'`,
        type: 'checkbox'
      })),
    'Backlit Keyboard': Array.from(
      new Set(Object.values(database).map((product) => product.backlitKeyboard))
    )
      .sort()
      .map((backlitKeyboard) => ({
        label: `${backlitKeyboard ? 'Yes' : 'No'} (${
          backlitKeyboard
            ? Object.values(database).filter((product) => product.backlitKeyboard).length
            : Object.values(database).filter((product) => !product.backlitKeyboard).length
        })`,
        value: `filter=backlit_keyboard = ${backlitKeyboard}`,
        type: 'checkbox'
      })),
    'Touch Screen': Array.from(
      new Set(Object.values(database).map((product) => product.touchScreen))
    )
      .sort()
      .map((touchScreen) => ({
        label: `${touchScreen ? 'Yes' : 'No'} (${
          touchScreen
            ? Object.values(database).filter((product) => product.touchScreen).length
            : Object.values(database).filter((product) => !product.touchScreen).length
        })`,
        value: `filter=touch_screen = ${touchScreen}`,
        type: 'checkbox'
      })),
    Availability: Array.from(
      new Set(
        Object.values(database).map((product) => {
          if (product.stockCount > 0) return 'In stock';
          else return 'Out of stock';
        })
      )
    )
      .sort()
      .map((stock) => ({
        label: `${stock} (${
          stock === 'In stock'
            ? Object.values(database).filter((product) => product.stockCount > 0).length
            : Object.values(database).filter((product) => product.stockCount === 0).length
        })`,
        value: `${stock === 'In stock' ? 'filter=stock_count > 0' : 'filter=stock_count = 0'}`,
        type: 'checkbox'
      }))
  };
};

export const productListPageSizeOptionsMap = [
  { label: 12, value: 'pageSize=12&' },
  { label: 16, value: 'pageSize=16&' },
  { label: 20, value: 'pageSize=20&' }
];

export const adminListPageSizeOptionsMap = [
  { label: 10, value: 'pageSize=10&' },
  { label: 15, value: 'pageSize=15&' },
  { label: 20, value: 'pageSize=20&' }
];

export const questionsListPageSizeOptionsMap = [
  { label: 3, value: 'pageSize=3&' },
  { label: 6, value: 'pageSize=6&' },
  { label: 12, value: 'pageSize=12&' }
];

export const productListSortOptionsMap = [
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' },
  { label: 'Sales: High to Low', value: 'sort=salesCount desc&' },
  { label: 'Popularity: High to Low', value: 'sort=visitedCount desc&' },
  { label: 'Most wished', value: 'sort=wishedCount desc&' },
  { label: 'Avg. Customer Rating', value: 'sort=rating desc&' },
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' }
];

export const browsingHistorySortOptionsMap = [
  { label: 'Visited last', value: 'sort=dateVisited desc&' },
  { label: 'Visited first', value: 'sort=dateVisited asc&' },
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' },
  { label: 'Sales: High to Low', value: 'sort=salesCount desc&' },
  { label: 'Popularity: High to Low', value: 'sort=visitedCount desc&' },
  { label: 'Most wished', value: 'sort=wishedCount desc&' },
  { label: 'Avg. Customer Rating', value: 'sort=rating desc&' }
];

export const reviewsSortOptionsMap = [
  { label: 'Rating: High to Low', value: 'sort=rating desc&' },
  { label: 'Rating: Low to High', value: 'sort=rating asc&' },
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' },
  { label: 'Most liked', value: 'sort=thumbsUp desc&' },
  { label: 'Most disliked', value: 'sort=thumbsDown desc&' }
];

export const questionsSortOptionsMap = [
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' },
  { label: 'Most liked', value: 'sort=thumbsUp desc&' },
  { label: 'Most disliked', value: 'sort=thumbsDown desc&' }
];

export const ratingFilterOptionsMap = [
  { label: 'All stars', value: 'ratingMin=1&ratingMax=5&' },
  { label: '5 stars', value: 'ratingMin=5&ratingMax=5&' },
  { label: '4 stars', value: 'ratingMin=4&ratingMax=4&' },
  { label: '3 stars', value: 'ratingMin=3&ratingMax=3&' },
  { label: '2 stars', value: 'ratingMin=2&ratingMax=2&' },
  { label: '1 star', value: 'ratingMin=1&ratingMax=1&' }
];

export const adminUserListSortOptionsMap = [
  { label: 'User Id: Low to High', value: 'sort=user_id asc&' },
  { label: 'User Id: High to Low', value: 'sort=user_id desc&' },
  { label: 'Name: A to Z', value: 'sort=full_name asc&' },
  { label: 'Name: Z to A', value: 'sort=full_name desc&' }
];

export const adminOrderListSortOptionsMap = [
  { label: 'Ordered last', value: 'sort=order_date desc&' },
  { label: 'Ordered first', value: 'sort=order_date asc&' },
  { label: 'Order Id: Low to High', value: 'sort=order_id asc&' },
  { label: 'Order Id: High to Low', value: 'sort=order_id desc&' },
  { label: 'Total: Low to High', value: 'sort=total_price asc&' },
  { label: 'Total: High to Low', value: 'sort=total_price desc&' }
];

export const adminProductListSortOptionsMap = [
  { label: 'Product Id: Low to High', value: 'sort=productId asc&' },
  { label: 'Product Id: High to Low', value: 'sort=productId desc&' },
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' }
];

export const checkoutBreadcrumbsSteps = [
  { label: 'Cart', path: '/cart' },
  { label: 'Shipping', path: '/shipping' },
  { label: 'Pay Info', path: '/payment' },
  { label: 'Place Order', path: '/placeorder' },
  { label: 'Pay Order', path: `` }
];

export const orderBreadcrumbsSteps = [
  { label: 'Place Order', path: '', success: 'Order Placed' },
  { label: 'Pay Order', path: '', success: 'Paid' },
  { label: 'Delivery', path: '', success: 'Delivered' },
  { label: 'Order Complete', path: '', success: 'Order Complete' }
];

export const getProductSpecificationItem = (spec, product) => {
  const {
    screenSize,
    displayType,
    touchScreen,
    screenResolution,
    storageCapacity,
    storageType,
    systemMemory,
    graphicsModel,
    graphicsType,
    voiceAssistant,
    reviewCount
  } = product;

  return spec === 'price' ? (
    <div className="price">{<Price price={product[spec]} />}</div>
  ) : spec === 'backlitKeyboard' ? (
    product[spec] === 1 ? (
      <i className="fa fa-check" />
    ) : (
      <i className="fa fa-times" />
    )
  ) : spec === 'voiceAssistant' ? (
    product[spec] === 'No' ? (
      <i className="fa fa-times" />
    ) : (
      <span>{`${voiceAssistant}`}</span>
    )
  ) : spec === 'rating' ? (
    reviewCount ? (
      <div className="rating">
        <Rating rating={product[spec]} />({reviewCount})
      </div>
    ) : (
      'Not rated yet'
    )
  ) : spec === 'weight' ? (
    <span>{`${product[spec]?.toFixed(1)} pounds (${poundToKg(product[spec], 1)} kg)`}</span>
  ) : spec === 'displayType' ? (
    <span>{`${screenSize?.toFixed(1)}-inch ${displayType} with ${screenResolution} resolution ${
      touchScreen ? 'and touchscreen' : ''
    }`}</span>
  ) : spec === 'storageCapacity' ? (
    <span>{`${storageCapacity} GB ${storageType}`}</span>
  ) : spec === 'systemMemory' ? (
    <span>{`${systemMemory} GB`}</span>
  ) : spec === 'graphicsModel' ? (
    `${graphicsModel} (${graphicsType})`
  ) : (
    product[spec]
  );
};
