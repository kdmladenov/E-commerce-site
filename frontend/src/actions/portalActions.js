import { ADD_TO_PORTAL_REFS } from '../constants/portalsConstants';

export const addToPortalRefs = (portalRef) => async (dispatch) => {
  dispatch({
    type: ADD_TO_PORTAL_REFS,
    payload: portalRef
  });
};
