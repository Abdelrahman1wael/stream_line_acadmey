import React from 'react';

const Toast = ({ show, message, type }) => {
  const iconClass =
    type === 'error'
      ? 'fa-solid fa-circle-exclamation text-danger'
      : 'fa-solid fa-circle-check text-emerald';

  return (
    <div className={`toast-notification ${show ? 'show' : ''}`} id="toast-notification">
      <i className={iconClass} id="toast-icon"></i>
      <span id="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
