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

export const getTimeDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const hourDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const minuteDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  return dayDiff >= 365 * 2
    ? `${(dayDiff / 365).toFixed(0)} years ago`
    : dayDiff >= 365
    ? `1 year ago`
    : dayDiff >= 30
    ? `${(dayDiff / 30).toFixed(0)} months ago`
    : dayDiff >= 1
    ? `${dayDiff.toFixed(0)} days ago`
    : hourDiff >= 1
    ? `${hourDiff.toFixed(0)} hours ago`
    : minuteDiff >= 1
    ? `${minuteDiff.toFixed(0)} minutes ago`
    : 'just now';
};

export const getDate = (date, additionalDays = 0, isPrefix = true) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() + additionalDays);

  const endDate = new Date();

  const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return dayDiff >= 2 || dayDiff <= 0
    ? `${isPrefix ? 'at' : ''} ${weekDays[startDate.getDay()]}, ${startDate.getDate()} ${
        months[startDate.getMonth()]
      }`
    : dayDiff >= 1
    ? `Yesterday`
    : `Today`;
};

export const poundToKg = (poundWeight, decimals = 2) => {
  return numberDecimalFix(poundWeight / 2.2046, decimals);
};

export const inchesToCm = (inchLength, decimals = 2) => {
  return numberDecimalFix(inchLength * 2.54, decimals);
};

export const areReviewsFiltered = (reviews) => {
  const starMap = {};

  for (let i = 0; i < reviews?.length; i++) {
    const currReviewRating = reviews[i]?.rating;

    starMap[currReviewRating] = starMap[currReviewRating] + 1 || 1;
  }

  return Object.keys(starMap).filter((key) => key > 0).length === 1;
};

// Scroll to a specified element
export const scrollTo = (ref, margin = 0) => {
  window.scrollTo({
    top: ref.current.offsetTop - margin,
    behavior: 'smooth'
  });
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const uniqueId = () => new Date().getTime();
