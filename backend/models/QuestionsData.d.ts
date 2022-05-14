import QuestionType from './QuestionType';
import VoteType from './VoteType';

interface QuestionsData {
  getAll: (
    productId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<QuestionType[]>;
  getBy: (column: string, value: string | number) => Promise<QuestionType>;
  create: (questionContent: string, userId: number, productId: number) => Promise<QuestionType>;
  update: (
    questionContent: string,
    questionId: number,
    userId: number,
    role: RolesType
  ) => Promise<QuestionType>;
  remove: (questionId: number, userId: number, role: RolesType) => Promise<any>;
  getVoteBy: (column: string, value: string | number, userId: number) => Promise<VoteType>;
  createVote: (reactionName: string, questionId: number, userId: number) => Promise<VoteType>;
  updateVote: (reactionName: string, questionId: number, userId: number) => Promise<VoteType>;
  removeVote: (questionId: number, userId: number) => Promise<void>;
}

export default QuestionsData;
