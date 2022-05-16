import AnswerType from './AnswerType';

interface QuestionType {
  productId: number;
  userId: number;
  questionId: number;
  questionContent: string;
  dateCreated: string;
  dateEdited: string;
  avatar: string;
  fullName: string;
  thumbsUp: number;
  thumbsDown: number;
  userThumbsUpList: string;
  userThumbsDownList: string;
  answers:AnswerType[];
  totalDBItems: number;
}

export default QuestionType;