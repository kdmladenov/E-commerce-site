import React from 'react';
import ReactDOM from 'react-dom';
import useCreateDiv from '../hooks/useCreateDiv';
import './styles/Modal.css';

const Modal = ({ setIsOpenModal, children }) => {
  const { loaded, divId } = useCreateDiv('modal');

  return loaded ? (
    ReactDOM.createPortal(
      <div className="modal">
        <div className="modal_container">
          {children}
          <button onClick={() => setIsOpenModal(false)}>
            <i className="fa fa-times" />
          </button>
        </div>
      </div>,
      document.getElementById(divId)
    )
  ) : (
    <></>
  );
};

export default Modal;
