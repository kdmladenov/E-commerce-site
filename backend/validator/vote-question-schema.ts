import reactionsEnum from '../constants/reactions.enum.js';

export default {
  reactionName: (value: string) => Object.keys(reactionsEnum).includes(value),
  userId: (value: number) => !value || (typeof value === 'number' && value > 0)
};
