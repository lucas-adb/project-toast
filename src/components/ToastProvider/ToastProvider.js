import React, { useMemo } from 'react';
import { VARIANT_OPTIONS } from '../ToastPlayground';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  const handleCreateToast = React.useCallback((event) => {
    event.preventDefault();

    const id = crypto.randomUUID();
    const newToasts = [...toasts, { id, message, variant }];
    setToasts(newToasts);
    setMessage('');
    setVariant(variant);
  }, [message, variant, toasts]);

  const handleClose = React.useCallback((id) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }, [toasts]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleVariantChange = React.useCallback((option) => {
    setVariant(option);
  }, []);

  const value = useMemo(
    () => ({
      handleCreateToast,
      handleClose,
      handleMessageChange,
      handleVariantChange,
      toasts,
      message,
      variant,
    }),
    [handleClose, handleCreateToast, handleVariantChange, message, toasts, variant]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
