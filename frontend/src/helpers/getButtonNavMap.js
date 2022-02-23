const getButtonNavMap = (productId) => {
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

export default getButtonNavMap;
