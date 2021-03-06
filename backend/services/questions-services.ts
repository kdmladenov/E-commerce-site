import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import ProductsData from '../models/ProductsData.js';
import QuestionsData from '../models/QuestionsData.js';
import RolesType from '../models/RolesType.js';

const getAllQuestions =
  (questionsData: QuestionsData, productsData: ProductsData) =>
  async (productId: number, search: string, sort: string, page: number, pageSize: number) => {
    const existingProduct = await productsData.getBy('product_id', productId);

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const questionsWithAnswers = await questionsData.getAll(
      productId,
      search,
      sort,
      page,
      pageSize
    );

    // const questionsWithAnswers = await Promise.all(
    //   await questions.map(async (question) => {
    //     const answers = await Promise.all(await answersData.getAll(question.questionId));
    //     return { ...question, answers: [...answers] };
    //   })
    // );

    return {
      error: null,
      result: questionsWithAnswers
    };
  };

const createQuestion =
  (productsData: ProductsData, questionsData: QuestionsData) =>
  async (questionContent: string, userId: number, productId: number) => {
    const existingProduct = await productsData.getBy('product_id', productId);
    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const question = await questionsData.create(questionContent, userId, productId);

    return {
      error: null,
      result: question
    };
  };

const updateQuestion =
  (questionsData: QuestionsData) =>
  async (questionContent: string, questionId: number, userId: number, role: RolesType) => {
    const existingQuestion = await questionsData.getBy('question_id', questionId);

    if (!existingQuestion) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    if (!questionContent) {
      questionContent = existingQuestion.questionContent;
    }

    // checks if the user has asked the question or is admin
    if (existingQuestion.userId !== userId || role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    const updated = {
      ...existingQuestion,
      questionContent,
      dateEdited: new Date()
    };

    await questionsData.update(questionContent, questionId, userId, role);

    return {
      error: null,
      result: updated
    };
  };

const deleteQuestion =
  (questionsData: QuestionsData) => async (questionId: number, userId: number, role: RolesType) => {
    const existingQuestion = await questionsData.getBy('question_id', questionId);

    if (!existingQuestion) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    await questionsData.remove(questionId, userId, role);

    return {
      error: null,
      result: { ...existingQuestion, isDeleted: true }
    };
  };

const voteQuestion =
  (questionsData: QuestionsData) =>
  async (reactionName: string, questionId: number, userId: number) => {
    const existingQuestionVote = await questionsData.getVoteBy('question_id', questionId, userId);

    if (existingQuestionVote) {
      const result = await questionsData.updateVote(reactionName, questionId, userId);
      return {
        error: null,
        result
      };
    }

    const result = await questionsData.createVote(reactionName, questionId, userId);
    return {
      error: null,
      result
    };
  };

const unVoteQuestion =
  (questionsData: QuestionsData) => async (questionId: number, userId: number, role: RolesType) => {
    const existingQuestionVote = await questionsData.getVoteBy('question_id', questionId, userId);

    if (!existingQuestionVote) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }
    // The user is not admin or has created the question vote
    if (existingQuestionVote.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    await questionsData.removeVote(questionId, userId);

    return {
      error: null,
      result: { message: `Vote was successfully removed.` }
    };
  };

export default {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  unVoteQuestion
};
