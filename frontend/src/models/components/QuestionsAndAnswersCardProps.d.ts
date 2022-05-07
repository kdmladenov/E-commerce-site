import UserType from '../UserType';

interface QuestionsAndAnswersCardProps {
  currentUser: UserType;
  userId: number;
  fullName: string;
  avatar: string;
  questionId: number;
  questionContent: string;
  thumbsUp: number;
  thumbsDown: number;
  userThumbsUpList: string;
  userThumbsDownList: string;
  answers: string;
}
export default QuestionsAndAnswersCardProps;
