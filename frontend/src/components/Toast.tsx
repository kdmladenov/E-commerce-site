import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/Toast.css';
import useCreateDiv from '../hooks/useCreateDiv';
import getUniqueId from '../helpers/getUniqueId';

import Price from './Price';
import ToastProps from '../models/components/ToastProps';
import ToastType, { ToastRefType } from '../models/ToastType';

const Toast = React.forwardRef<ToastRefType, ToastProps>(
  ({ idDiv = 'toast_message', autoClose = true, autoClosePeriod = 6000 }, forwardedRef) => {
    const { loaded, divId } = useCreateDiv(idDiv);

    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [deletingToastId, setDeletingToastId] = useState<number>();

    const deleteToast = (id: number) => setToasts(toasts.filter((toast) => toast.id !== id));

    useImperativeHandle(forwardedRef, () => ({
      createToast(toast) {
        setToasts([...toasts, { ...toast, id: getUniqueId() }]);
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
          {toasts.map((toast) =>
            divId === 'toast_cart' ? (
              <div
                key={toast.id}
                onClick={() => deleteToast(toast.id)}
                className={`toast_cart card`}
              >
                <div className="image ">
                  <img src={toast.image} alt={toast.title} />
                  <div className="badge">
                    <i className="fa fa-shopping-cart" />
                  </div>
                </div>
                <div className="content">
                  <div className="title">{toast.title}</div>
                  <div className="price_qty">
                    <Price price={toast.price} /> <span>x {toast.qty}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={toast.id}
                onClick={() => deleteToast(toast.id)}
                className={`toast card ${toast.type}`}
              >
                {toast.message}
              </div>
            )
          )}
        </div>,
        document.getElementById(divId)!
      )
    ) : (
      <></>
    );
  }
);

export default Toast;
