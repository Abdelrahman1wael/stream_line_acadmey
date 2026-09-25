import React from 'react';
import { useGame } from '../../hooks/useGame.js';

const Toast = () => {
  const { toast } = useGame();
  const { show, message, type } = toast;

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
