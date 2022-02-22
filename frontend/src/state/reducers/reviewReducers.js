import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_RESET,
  REVIEW_CREATE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_EDIT_FAIL,
  REVIEW_EDIT_REQUEST,
  REVIEW_EDIT_RESET,
  REVIEW_EDIT_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_VOTE_FAIL,
  REVIEW_VOTE_REQUEST,
  REVIEW_VOTE_SUCCESS
} from '../constants/reviewConstants';

export const reviewCreateReducer = (state = { }, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true};
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewListReducer = (state = { reviews: {} }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { loading: true };
    case REVIEW_LIST_SUCCESS:
      return { loading: false, reviews: action.payload };
    case REVIEW_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewEditReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_EDIT_REQUEST:
      return { loading: true };
    case REVIEW_EDIT_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case REVIEW_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_EDIT_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const reviewVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_VOTE_REQUEST:
      return { loading: true };
    case REVIEW_VOTE_SUCCESS:
      return { loading: false, success: true };
    case REVIEW_VOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
