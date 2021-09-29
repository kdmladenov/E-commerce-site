// TO DO replace the hardcoded values

const reviewValidations = {
  title: {
    validate: (value) => value.length >= 2 && value.length <= 255,
    errorMessage: 'Expected string with length in the range [2-255]'
  },
  content: {
    validate: (value) => value.length >= 2,
    errorMessage: 'Expected string with length more than 2 characters'
  },
  rating: {
    validate: (value) => /^[1-5]$/.test(value),
    errorMessage: `Expected a whole number in the range [0 - 5]`
  }
};

export default reviewValidations;
