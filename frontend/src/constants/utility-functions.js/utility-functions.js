export const isSearchTermInString = (searchTerm, string) => {
  return string.split(' ').some((word) => word.toLowerCase().startsWith(searchTerm.toLowerCase()));
};

export const searchTermInString = (searchTerm, string) => {
  if (string.startsWith(searchTerm)) {
    return ['', string.slice(0, searchTerm.length), string.slice(searchTerm.length)];
  }
  const indexOfSearchTerm = string.indexOf(` ${searchTerm}`) + 1;
  return [
    string.slice(0, indexOfSearchTerm),
    string.slice(indexOfSearchTerm, indexOfSearchTerm + searchTerm.length),
    string.slice(indexOfSearchTerm + searchTerm.length)
  ];
};

export const numberDecimalFix = (number) => (Math.round(number * 100) / 100).toFixed(2);

export const alphabeticalSort = (arr) => arr.sort((a, b) => a.localeCompare(b))
