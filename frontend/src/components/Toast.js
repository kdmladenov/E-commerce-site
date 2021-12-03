import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { uniqueId } from '../constants/utility-functions';
import useCreateDiv from '../hooks/useCreateDiv';
import './styles/Toast.css';
import ToastCard from './ToastCard';

const Toast = forwardRef(({ idDiv = 'toast', autoClose = true, autoClosePeriod = 6000 }, ref) => {
  const { loaded, divId } = useCreateDiv(idDiv);
  const [toasts, setToasts] = useState([]);
  const [deletingToastId, setDeletingToastId] = useState('');

  const deleteToast = (id) => setToasts(toasts.filter((toast) => toast.id !== id));

  useImperativeHandle(ref, () => ({
    createToast(toast) {
      setToasts([...toasts, { ...toast, id: uniqueId() }]);
    }
  }));

  // Autoclose - prevents closure effect
  useEffect(() => {
    if (deletingToastId) {
      setToasts(toasts.filter((toast) => toast.id !== deletingToastId));
    }
  }, [deletingToastId]);

  useEffect(() => {
    if (autoClose && toasts.length) {
      const lastToastId = toasts[toasts.length - 1].id;
      setTimeout(() => setDeletingToastId(lastToastId), autoClosePeriod);
    }
  }, [toasts, autoClose, autoClosePeriod]);

  return loaded ? (
    ReactDOM.createPortal(
      <div className="toasts_container">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} type={toast.type} onClose={() => deleteToast(toast.id)}>
            {toast.message}
          </ToastCard>
        ))}
      </div>,
      document.getElementById(divId)
    )
  ) : (
    <></>
  );
});

export default Toast;
