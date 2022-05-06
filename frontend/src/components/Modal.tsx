import React from 'react';
import ReactDOM from 'react-dom';

import './styles/Modal.css';
import useCreateDiv from '../hooks/useCreateDiv';
import ModalProps from '../models/components/ModalProps';

const Modal: React.FC<ModalProps> = ({ classes, setIsOpenModal, children }) => {
  const { loaded, divId } = useCreateDiv('modal');

  return loaded ? (
    ReactDOM.createPortal(
      <div className={`modal_container ${classes ? classes : ''}`}>
        {children}
        <button className="close_modal_btn" onClick={() => setIsOpenModal(false)}>
          <i className="fa fa-times" />
        </button>
      </div>,
      document.getElementById(divId)!
    )
  ) : (
    <></>
  );
};

export default Modal;
