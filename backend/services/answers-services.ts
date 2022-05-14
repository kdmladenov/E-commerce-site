import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import AnswersData from '../models/AnswersData.js';
import QuestionsData from '../models/QuestionsData.js';
import RolesType from '../models/RolesType.js';
import AnswerType from '../models/AnswerType.js';

const getAllAnswers =
  (answersData: AnswersData, questionsData: QuestionsData) => async (questionId: number) => {
    const existingQuestion = await questionsData.getBy('question_id', questionId);

    if (!existingQuestion) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const answers = await answersData.getAll(questionId);

    return {
      error: null,
      result: answers
    };
  };

const getAnswerById = (answersData: AnswersData) => async (answerId: number) => {
  const existingAnswer = await answersData.getBy('answer_id', answerId);

  if (!existingAnswer) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  return {
    error: null,
    result: existingAnswer
  };
};

const createAnswer =
  (questionsData: QuestionsData, answersData: AnswersData) =>
  async (answerContent: string, userId: number, questionId: number) => {
    const existingQuestion = await questionsData.getBy('question_id', questionId);
    if (!existingQuestion) {
      return {
        error: errors.RECORD_NOT_FOUND,
        answer: null
      };
    }

    const answer = await answersData.create(answerContent, userId, questionId);

    return {
      error: null,
      answer
    };
  };

const updateAnswer =
  (answersData: AnswersData) =>
  async (answerContent: string, answerId: number, userId: number, role: RolesType) => {
    const existingAnswer = await answersData.getBy('answer_id', answerId);

    if (!existingAnswer) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    if (!answerContent) {
      answerContent = existingAnswer.answerContent;
    }

    // checks if the user has asked the answer or is admin
    if (existingAnswer.userId !== userId || role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    const updated: AnswerType = {
      ...existingAnswer,
      answerContent,
      dateEdited: new Date()
    };

    await answersData.update(answerContent, answerId, userId, role);

    return {
      error: null,
      result: updated
    };
  };

const deleteAnswer =
  (answersData: AnswersData) =>
  async (answerId: number, userId: number, role: RolesType) => {
    const existingAnswer = await answersData.getBy('answer_id', answerId);

    if (!existingAnswer) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    await answersData.remove(answerId, userId, role);

    return {
      error: null,
      result: { ...existingAnswer, isDeleted: true }
    };
  };

export default {
  getAllAnswers,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerById
};
