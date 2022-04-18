import { answers } from '../constants/constants.js';

export default {
  contentAnswer: (value: string) =>
    typeof value === 'string' &&
    value.length >= answers.MIN_CONTENT_LENGTH &&
    value.length <= answers.MAX_CONTENT_LENGTH
};