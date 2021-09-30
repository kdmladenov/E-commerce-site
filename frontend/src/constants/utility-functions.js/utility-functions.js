export const isKeywordInString = (keyword, string) => {
  return string.split(' ').some((word) => word.toLowerCase().startsWith(keyword.toLowerCase()));
};

export const keywordInString = (keyword, string) => {
  if (string.startsWith(keyword)) {
    return ['', string.slice(0, keyword.length), string.slice(keyword.length)];
  }
  const indexOfKeyword = string.indexOf(` ${keyword}`) + 1;
  return [
    string.slice(0, indexOfKeyword),
    string.slice(indexOfKeyword, indexOfKeyword + keyword.length),
    string.slice(indexOfKeyword + keyword.length)
  ];
};

export const numberDecimalFix = (number) => (Math.round(number * 100) / 100).toFixed(2);

export const alphabeticalSort = (arr) => arr.sort((a, b) => a.localeCompare(b))

export const getParam = (endpoint, param) => {
  return endpoint.find((i) => i.startsWith(`${param}=`))
    ? `${endpoint.find((i) => i.startsWith(`${param}=`))}&`
    : '';
};

export const getParamsFromHistory = (history) => {
   const endpoint = history.location.search.slice(1).split('&');
   const page = endpoint.find((i) => i.startsWith('page='))
     ? `${endpoint.find((i) => i.startsWith('page='))}&`
     : '';
   const pageSize = endpoint.find((i) => i.startsWith('pageSize='))
     ? `${endpoint.find((i) => i.startsWith('pageSize='))}&`
     : '';
   const sort = endpoint.find((i) => i.startsWith('sort='))
     ? `${endpoint.find((i) => i.startsWith('sort='))}&`
     : '';
   const order = endpoint.find((i) => i.startsWith('order='))
     ? `${endpoint.find((i) => i.startsWith('order='))}&`
     : '';

    return 
}