interface ReviewCardProps {
  currentUser: {
    userId: number;
    fullName: string;
    role: string;
    avatar: string;
    address: string;
    address2: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    email: string;
    phone: string;
    isDeleted: number | boolean;
    password: string;
    token: string;
    totalDBItems: number;
  };
  createMode: boolean;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
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
export default ReviewCardProps;
