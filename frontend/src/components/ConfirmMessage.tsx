import React from 'react';
import { useDispatch } from 'react-redux';
import ConfirmMessageProps from '../models/components/ConfirmMessageProps';
import Button from './Button';

const ConfirmMessage: React.FC<ConfirmMessageProps> = ({
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

export default ConfirmMessage;
