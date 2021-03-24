import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const Modal = ({
  isVisible = false,
  round = false,
  closable = true,
  keyboard = false,
  maskClosable = false,
  defaultStyle = true,
  size = 'normal',
  className, title, content, footer, onClose }) => {
  const keydownHandler = ({key}) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    if(keyboard) {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    }
  });

  return !isVisible ? null : (
    <div className="modal" onClick={() => maskClosable && onClose() }>
      <div className={classNames("modal-dialog", { round }, size, className )} onClick={e => e.stopPropagation()}>
        { closable ? <div className="modal-close" onClick={onClose}>
          &times;
        </div> : null }
        <div className="modal-header">
          {
            title ? <h3 className={classNames("modal-title", { 'text-left w-full' : defaultStyle })}>{title}</h3> : null
          }
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
