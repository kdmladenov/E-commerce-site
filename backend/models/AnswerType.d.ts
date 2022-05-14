interface AnswerType {
  questionId: number;
  userId: number;
  answerId: number;
  answerContent: string;
  dateCreated: string | Date;
  dateEdited: string | Date;
  avatar: string;
  fullName: string;
}

export default AnswerType;
