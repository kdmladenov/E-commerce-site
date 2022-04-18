import { review, product } from '../constants/constants.js';

export default {
  content: (value: string) =>
    typeof value === 'string' &&
    value.length >= review.MIN_CONTENT_LENGTH &&
    value.length <= review.MAX_CONTENT_LENGTH,
  title: (value: string) =>
    typeof value === 'string' &&
    value.length >= review.MIN_TITLE_LENGTH &&
    value.length <= review.MAX_TITLE_LENGTH,
  rating: (value: number) =>
    typeof value === 'number' && product.RATING_REGEX.test(value.toString())
};