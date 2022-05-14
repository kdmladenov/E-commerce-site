import RolesType from './RolesType';

interface AnswersData {
  getAll: (questionId: number) => Promise<AnswerType[]>;
  getBy: (column: string, value: string | number) => Promise<AnswerType>;
  create: (answerContent: string, userId: number, questionId: number) => Promise<AnswerType>;
  update: (
    answerContent: string,
    answerId: number,
    userId: number,
    role: RolesType
  ) => Promise<any>;
  remove: (answerId: number, userId: number, role: RolesType) => Promise<any>;
}

export default AnswersData;
