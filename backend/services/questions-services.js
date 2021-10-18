import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';

const getAllQuestions = (questionsData, answersData, productsData) => async (productId) => {
  const existingProduct = await productsData.getBy('product_id', productId);

  if (!existingProduct) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const questions = await questionsData.getAll(productId);

  const questionsWithAnswers = await Promise.all(
    await questions.map(async (question) => {
      const answers = await Promise.all(await answersData.getAll(question.questionId));
      return { ...question, answers: [...answers] };
    })
  );

  return {
    error: null,
    result: questionsWithAnswers
  };
};

const createQuestion =
  (productsData, questionsData) => async (questionContent, userId, productId) => {
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

const updateQuestion = (questionsData) => async (questionContent, questionId, userId, role) => {
  const existingQuestion = await questionsData.getBy('question_id', questionId, userId, role);

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

const deleteQuestion = (questionsData) => async (questionId, userId, role) => {
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


const voteQuestion = (questionsData) => async (reactionName, questionId, userId) => {
  const existingQuestion = await questionsData.getVoteBy('question_id', questionId, userId);

  if (existingQuestion) {
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

const unVoteQuestion = (questionsData) => async (questionId, userId, role) => {
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
