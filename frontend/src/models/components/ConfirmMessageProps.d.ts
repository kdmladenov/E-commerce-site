import React from 'react';
import ProductDeleteActionType from '../models/state/actions/ProductDeleteActionType';
import ProductRestoreActionType from '../models/state/actions/ProductRestoreActionType';
import StateType from '../models/state/StateType';
import UserDeleteActionType from '../state/actions/UserDeleteActionType';
import UserRestoreActionType from '../state/actions/UserRestoreActionType';

interface ConfirmMessageProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  resourceId: number;
  action: (
    productId: number
  ) => (
    dispatch: Dispatch<ProductDeleteActionType | ProductRestoreActionType | UserDeleteActionType | UserRestoreActionType>,
    getState: () => StateType
  ) => Promise<void>;
}
export default ConfirmMessageProps;
