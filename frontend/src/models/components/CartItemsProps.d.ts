interface CartItemsProps {
  cartItems: {
    qty: number;
    productId: number;
    title: string;
    image: string;
    price: number;
    stockCount: number;
    rating: number;
    reviewCount: number;
  }[];
}
export default CartItemsProps;
