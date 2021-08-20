import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export const listProducts = () => async (dispatch) => {

  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {data} = await axios.get(`${BASE_URL}/products`)

    console.log(data);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message
    });
  }
};
