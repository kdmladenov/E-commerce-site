import { questions } from '../constants/constants.js';

export default {
  contentQuestion: (value: string) =>
    typeof value === 'string' &&
    value.length >= questions.MIN_CONTENT_LENGTH &&
    value.length <= questions.MAX_CONTENT_LENGTH
};
