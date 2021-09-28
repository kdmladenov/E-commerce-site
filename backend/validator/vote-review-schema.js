import reactionsEnum from '../constants/reactions.enum.js';

export default {
  reactionName: (value) => Object.keys(reactionsEnum).includes(value),
  userId: (value) => !value || (typeof value === 'number' && value > 0)
};
