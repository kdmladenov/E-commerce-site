import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';

const getAllAnswers = (answersData, questionsData) => async (questionId) => {
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

const getAnswerById = (answersData) => async (answerId) => {
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

const createAnswer = (questionsData, answersData) => async (answerContent, userId, questionId) => {
  const existingQuestion = await questionsData.getBy('question_id', questionId);
  if (!existingQuestion) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const answer = await answersData.create(answerContent, userId, questionId);

  return {
    error: null,
    result: answer
  };
};

const updateAnswer = (answersData) => async (answerContent, answerId, userId, role) => {
  const existingAnswer = await answersData.getBy('answer_id', answerId, userId, role);

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

  const updated = {
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

const deleteAnswer = (answersData) => async (answerId, userId, role) => {
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
