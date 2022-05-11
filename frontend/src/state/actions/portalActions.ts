import { Dispatch } from 'redux';
import AddToPortalRefsActionType from '../../models/state/actions/AddToPortalRefsActionType.d copy';
import { ToastRefType } from '../../models/ToastType';
import { ADD_TO_PORTAL_REFS } from '../constants/portalsConstants';

export const addToPortalRefs =
  (portalRef: { toast_cart: React.RefObject<ToastRefType> }) =>
  async (dispatch: Dispatch<AddToPortalRefsActionType>) => {
    dispatch({
      type: ADD_TO_PORTAL_REFS,
      payload: portalRef
    });
  };
