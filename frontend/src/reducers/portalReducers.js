import { ADD_TO_PORTAL_REFS } from '../constants/portalsConstants';

export const portalRefsReducer = (state = { portalRefsMap: {} }, action) => {
  switch (action.type) {
    case ADD_TO_PORTAL_REFS:
      const portalRef = action.payload
      return {
        ...state,
        portalRefsMap: { ...state?.portalRefsMap, ...portalRef }
      };
    default:
      return state;
  }
};
