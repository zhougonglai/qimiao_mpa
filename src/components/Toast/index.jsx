import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

function Toast({ children }) {
  return <div className="qm-toast-wrap">
    {children}
  </div>
}

export default Toast;
