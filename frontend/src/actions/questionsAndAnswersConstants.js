import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { QUESTION_CREATE_FAIL, QUESTION_CREATE_REQUEST, QUESTION_CREATE_SUCCESS } from '../constants/questionsAndAnswersConstants';

export const createReview = (productId, question) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${BASE_URL}/questions/${productId}`, question, config);

    dispatch({ type: QUESTION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
