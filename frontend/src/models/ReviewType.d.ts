interface ReviewType {
  productId: number;
  userId: number;
  reviewId: number;
  rating: number;
  content: string;
  dateCreated: string;
  dateEdited: string;
  title: string;
  avatar: string;
  fullName: string;
  thumbsUp: number;
  thumbsDown: number;
  userThumbsUpList: string;
  userThumbsDownList: string;
}

export default ReviewType;
