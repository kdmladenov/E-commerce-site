import { review, product } from '../constants/constants.js';

export default {
  content: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= review.MIN_CONTENT_LENGTH &&
      value.length <= review.MAX_CONTENT_LENGTH),
  title: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= review.MIN_TITLE_LENGTH &&
      value.length <= review.MAX_TITLE_LENGTH),
  rating: (value) => !value || (typeof value === 'number' && product.RATING_REGEX.test(value))
};
