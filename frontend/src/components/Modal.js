import React from 'react';
import ReactDOM from 'react-dom';

import './styles/Modal.css';
import useCreateDiv from '../hooks/useCreateDiv';

const Modal = ({ classes, setIsOpenModal, children }) => {
  const { loaded, divId } = useCreateDiv('modal');

  return loaded ? (
    ReactDOM.createPortal(
      <div className={`modal_container ${classes ? classes : ''}`}>
        {children}
        <button className='close_modal_btn' onClick={() => setIsOpenModal(false)}>
          <i className="fa fa-times" />
        </button>
      </div>,
      document.getElementById(divId)
    )
  ) : (
    <></>
  );
};

export default Modal;
