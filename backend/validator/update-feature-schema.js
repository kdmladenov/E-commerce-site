import { feature as FEATURE } from '../constants/constants.js';

export default {
  featureTitle: (value) =>
    typeof value === 'string' &&
    value.length >= FEATURE.MIN_FEATURE_TITLE_LENGTH &&
    value.length <= FEATURE.MAX_FEATURE_TITLE_LENGTH,
  featureContent: (value) =>
    typeof value === 'string' &&
    value.length >= FEATURE.MIN_FEATURE_CONTENT_LENGTH &&
    value.length <= FEATURE.MAX_FEATURE_CONTENT_LENGTH
};
