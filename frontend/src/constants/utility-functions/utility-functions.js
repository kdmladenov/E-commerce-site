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

export const numberDecimalFix = (number, decimals = 2) =>
  (Math.round(number * 100) / 100).toFixed(decimals);

export const alphabeticalSort = (arr) => arr.sort((a, b) => a.localeCompare(b));

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

  return;
};

export const getTimeDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const hourDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const minuteDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  return dayDiff >= 1
    ? `${dayDiff.toFixed(0)} days ago`
    : hourDiff >= 1
    ? `${hourDiff.toFixed(0)} hours ago`
    : minuteDiff >= 1
    ? `${minuteDiff.toFixed(0)} minutes ago`
    : 'just now';
};

export const poundToKg = (poundWeight, decimals = 2) => {
  return numberDecimalFix(poundWeight / 2.2046, decimals);
};

export const inchesToCm = (inchLength, decimals = 2) => {
  return numberDecimalFix(inchLength * 2.54, decimals);
};

export const areReviewsFiltered = (reviews) => {
  const starMap = {};

  for (let i = 0; i < reviews.length; i++) {
    const currReviewRating = reviews[i].rating;

    starMap[currReviewRating] = starMap[currReviewRating] + 1 || 1;
  }

  return Object.keys(starMap).filter((key) => key > 0).length === 1;
};
