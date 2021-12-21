import { feature as FEATURE } from '../constants/constants.js';

export default {
  feature_title: (value) =>
    typeof value === 'string' &&
    value.length >= FEATURE.MIN_FEATURE_TITLE_LENGTH &&
    value.length <= FEATURE.MAX_FEATURE_TITLE_LENGTH,
  feature_content: (value) =>
    typeof value === 'string' &&
    value.length >= FEATURE.MIN_FEATURE_CONTENT_LENGTH &&
    value.length <= FEATURE.MAX_FEATURE_CONTENT_LENGTH
};
