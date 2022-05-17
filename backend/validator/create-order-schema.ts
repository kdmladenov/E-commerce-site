import { order, user } from '../constants/constants.js';
import OrderItemType from '../models/OrderItemType.js';

export default {
  orderItems: (value: OrderItemType[]) =>
    Array.isArray(value) &&
    value.every(
      (item) =>
        !Object.keys(item).some(
          (key) =>
            typeof item[key as keyof typeof item] !==
            order.ORDER_ITEMS_TYPES[key as keyof typeof order.ORDER_ITEMS_TYPES]
        )
    ),
  paymentMethod: (value: string) =>
    typeof value === 'string' && order.PAYMENT_METHODS.includes(value),
  itemsPrice: (value: number) => typeof value === 'number' && value >= order.MIN_ITEMS_PRICE,
  taxPrice: (value: number) => typeof value === 'number' && value >= order.MIN_TAX_PRICE,
  shippingPrice: (value: number) => typeof value === 'number' && value >= order.MIN_SHIPPING_PRICE,
  totalPrice: (value: number) => typeof value === 'number' && value >= order.MIN_TOTAL_PRICE,
  address: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_ADDRESS_LENGTH &&
    value.length <= user.MAX_ADDRESS_LENGTH,
  address2: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_ADDRESS_LENGTH &&
      value.length <= user.MAX_ADDRESS_LENGTH),
  city: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_CITY_LENGTH &&
    value.length <= user.MAX_CITY_LENGTH,
  state: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_STATE_LENGTH &&
    value.length <= user.MAX_STATE_LENGTH,
  zip: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_ZIP_LENGTH &&
    value.length <= user.MAX_ZIP_LENGTH,
  country: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_COUNTRY_LENGTH &&
    value.length <= user.MAX_COUNTRY_LENGTH
};
