import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { ORDER_MY_LIST_RESET } from '../constants/orderConstants';
import {
  USER_DELETE_AVATAR_FAIL,
  USER_DELETE_AVATAR_REQUEST,
  USER_DELETE_AVATAR_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESTORE_FAIL,
  USER_RESTORE_REQUEST,
  USER_RESTORE_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const register =
  (email, password, reenteredPassword, fullName, address, city, zip, state, country) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/users`,
        { email, password, reenteredPassword, fullName, address, city, zip, state, country },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      });

      // Auto login after the registration
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error?.response?.data?.message ? error.response.data.message : error.message
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${BASE_URL}/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${BASE_URL}/users/${user.id}`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listUsers =
  (endpoint = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST
      });
      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/users?${endpoint}`, config);

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${BASE_URL}/users/${userId}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const restoreUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_RESTORE_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.patch(`${BASE_URL}/users/${userId}/restore`, {}, config);

    dispatch({
      type: USER_RESTORE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: USER_RESTORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// export const updateUser = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_UPDATE_REQUEST
//     });
//     // access to the logged in user info
//     const {
//       userLogin: { userInfo }
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`
//       }
//     };

//     const { data } = await axios.put(`${BASE_URL}/users/${user.userId}`, user, config);

//     dispatch({
//       type: USER_UPDATE_SUCCESS
//     });
//     // update the state everywhere
//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message
//     });
//   }
// };

export const updateUserAvatarReducer =
  (userId, mode, event, imageAddress) => async (dispatch, getState) => {
    // mode: 'file_upload' or 'add_image_url'
    let imageUrl = imageAddress || '';

    try {
      dispatch({
        type: USER_UPDATE_AVATAR_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      if (mode === 'file_upload') {
        // Case file upload
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const uploadedImageURL = await axios.post(
          `${BASE_URL}/users/avatars/upload`,
          formData,
          config
        );

        imageUrl = uploadedImageURL.data;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/users/${userId}/avatars`,
        { imageUrl },
        config
      );

      dispatch({
        type: USER_UPDATE_AVATAR_SUCCESS,
        payload: data
      });

    } catch (error) {
      dispatch({
        type: USER_UPDATE_AVATAR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };


  export const deleteUserAvatar = (userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_AVATAR_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/users/${userId}/avatars`, config);

      dispatch({
        type: USER_DELETE_AVATAR_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: USER_DELETE_AVATAR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };