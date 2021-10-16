import { questions } from '../constants/constants.js';

export default {
  questionContent: (value) =>
    typeof value === 'string' &&
    value.length >= questions.MIN_CONTENT_LENGTH &&
    value.length <= questions.MAX_CONTENT_LENGTH
};