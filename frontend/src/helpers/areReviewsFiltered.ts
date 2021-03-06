import ReviewType from '../models/ReviewType';

const areReviewsFiltered = (reviews: ReviewType[]) => {
  const starMap: { [key: number]: number } = {};

  for (let i = 0; i < reviews?.length; i++) {
    const currReviewRating = reviews[i]?.rating;

    starMap[currReviewRating] = starMap[currReviewRating] + 1 || 1;
  }

  return Object.keys(starMap).filter((key) => +key > 0).length === 1;
};

export default areReviewsFiltered;
