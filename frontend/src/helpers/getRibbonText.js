const getRibbonText = (currentProductId) => {
  const allProducts = JSON.parse(localStorage.getItem('allProductsList'));

  return allProducts.sort((a, b) => b.salesCount - a.salesCount)[0].productId === currentProductId
    ? 'Best seller'
    : allProducts.sort((a, b) => b.visitedCount - a.visitedCount)[0].productId === currentProductId
    ? 'Most popular'
    : allProducts.sort((a, b) => b.wishedCount - a.wishedCount)[0].productId === currentProductId
    ? 'Most wished'
    : allProducts.sort((a, b) => a.price - b.price)[0].productId === currentProductId
    ? 'Best value'
    : allProducts.sort((a, b) => b.rating - a.rating)[0].productId === currentProductId
    ? 'Highest Rating'
    : allProducts.sort((a, b) => b.discount - a.discount)[0].productId === currentProductId
    ? 'Best deal'
    : allProducts.sort((a, b) => b.reviewCount - a.reviewCount)[0].productId === currentProductId
    ? 'Most reviewed'
    : null;
};

export default getRibbonText;
