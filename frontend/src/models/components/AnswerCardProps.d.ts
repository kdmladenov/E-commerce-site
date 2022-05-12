import UserType from '../UserType';

interface AnswerCardProps {
  currentUser: UserType;
  userId: number;
  answerId: number;
  answerContent: string;
  dateCreated: string;
  dateEdited: string;
  fullName: string;
  createAnswerMode?: boolean;
  avatar?: string;
}
export default AnswerCardProps;
