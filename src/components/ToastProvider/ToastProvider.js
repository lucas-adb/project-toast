import React, { useEffect, useMemo } from 'react';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([])
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

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
