import classNames from 'classnames';
import React from 'react';
import './index.scss';

const Modal = ({ isVisible = false, round = false , size = 'normal', className, title, content, footer, onClose }) => {
  const keydownHandler = (e) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        console.log(e)
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className={classNames("modal-dialog", { round }, size, className )} onClick={e => e.stopPropagation()}>
        { size === 'small' ? null : <div className="modal-close" onClick={onClose}>
          &times;
        </div> }
        <div className="modal-header">
          {
            title ? <h3 className="modal-title">{title}</h3> : null
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
