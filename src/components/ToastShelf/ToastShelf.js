import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toasts, handleClose }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, message, variant }) => (
      <li key={id} id={id} className={styles.toastWrapper}>
        <Toast id={id} variant={variant} handleClose={handleClose}>{message}</Toast>
      </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
