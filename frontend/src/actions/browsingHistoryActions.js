import axios from 'axios';
import {
  BROWSING_HISTORY_ADD_FAIL,
  BROWSING_HISTORY_ADD_REQUEST,
  BROWSING_HISTORY_ADD_SUCCESS
} from '../constants/browsingHistoryConstants';
import { BASE_URL } from '../constants/constants';

export const addBrowsingHistoryRecord = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BROWSING_HISTORY_ADD_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    console.log(userInfo.token,'token');
    await axios.post(`${BASE_URL}/history/${productId}`,{}, config);

    dispatch({ type: BROWSING_HISTORY_ADD_SUCCESS });
  } catch (error) {
    dispatch({
      type: BROWSING_HISTORY_ADD_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
