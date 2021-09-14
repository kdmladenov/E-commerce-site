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
