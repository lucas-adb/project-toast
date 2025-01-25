import React, { useMemo } from 'react';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = React.useCallback(
    (message, variant) => {
      const id = crypto.randomUUID();
      const newToasts = [...toasts, { id, message, variant }];
      setToasts(newToasts);
    },
    [toasts]
  );

  const closeToast = React.useCallback(
    (id) => {
      const newToasts = toasts.filter((toast) => toast.id !== id);
      setToasts(newToasts);
    },
    [toasts]
  );

  const value = useMemo(
    () => ({
      createToast,
      closeToast,
      toasts,
    }),
    [closeToast, createToast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
