import { ADD_TO_PORTAL_REFS } from '../constants/portalsConstants';

export const portalRefsReducer = (state = { portalRefs: {} }, action) => {
  switch (action.type) {
    case ADD_TO_PORTAL_REFS:
      const portalRef = action.payload
      return {
        ...state,
        portalRefs: { ...state?.portalRefs, ...portalRef }
      };
    default:
      return state;
  }
};
