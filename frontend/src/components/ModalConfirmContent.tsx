import React from 'react';
import { useDispatch } from 'react-redux';
import ModalConfirmContentProps from '../models/components/ModalConfirmContentProps';
import Button from './Button';

const ModalConfirmContent: React.FC<ModalConfirmContentProps> = ({
  setIsModalOpen,
  message,
  resourceId,
  action
}) => {
  const dispatch = useDispatch();

  return (
    <div className="confirm">
      <span className="message">{message}</span>
      <div className="button_group">
        <Button
          onClick={() => {
            dispatch(action(resourceId));
            setIsModalOpen(false);
          }}
        >
          Yes
        </Button>
        <Button onClick={() => setIsModalOpen(false)}>No</Button>
      </div>
    </div>
  );
};

export default ModalConfirmContent;
