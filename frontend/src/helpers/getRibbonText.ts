import ProductType from '../models/ProductType';

const getRibbonText = (currentProductId: number) => {
  const allProducts = JSON.parse(localStorage.getItem('allProductsList')!);

  return allProducts.sort((a: ProductType, b: ProductType) => b.salesCount - a.salesCount)[0]
    .productId === currentProductId
    ? 'Best seller'
    : allProducts.sort((a: ProductType, b: ProductType) => b.visitedCount - a.visitedCount)[0]
        .productId === currentProductId
    ? 'Most popular'
    : allProducts.sort((a: ProductType, b: ProductType) => b.wishedCount - a.wishedCount)[0]
        .productId === currentProductId
    ? 'Most wished'
    : allProducts.sort((a: ProductType, b: ProductType) => a.price - b.price)[0].productId ===
      currentProductId
    ? 'Best value'
    : allProducts.sort((a: ProductType, b: ProductType) => b.rating - a.rating)[0].productId ===
      currentProductId
    ? 'Highest Rating'
    : allProducts.sort((a: ProductType, b: ProductType) => b.discount - a.discount)[0].productId ===
      currentProductId
    ? 'Best deal'
    : allProducts.sort((a: ProductType, b: ProductType) => b.reviewCount - a.reviewCount)[0]
        .productId === currentProductId
    ? 'Most reviewed'
    : null;
};

export default getRibbonText;
