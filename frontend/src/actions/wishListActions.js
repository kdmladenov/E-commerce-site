import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { WISH_LIST_ADD_FAIL, WISH_LIST_ADD_REQUEST, WISH_LIST_ADD_SUCCESS } from '../constants/wishlLstConstants';

export const addWishToList = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISH_LIST_ADD_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`${BASE_URL}/history/${productId}`, {}, config);

    dispatch({ type: WISH_LIST_ADD_SUCCESS });
  } catch (error) {
    dispatch({
      type: WISH_LIST_ADD_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
