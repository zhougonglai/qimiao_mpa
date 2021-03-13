import classNames from 'classnames';
import React from 'react';
import './index.scss';


function Radio({ onChange = e => {}, value, defaultChecked, checked, disabled, children, ...props }) {
  return (
    <div className={classNames("qm-radio-content", { checked })}>
      <label className="qm-radio-label">
        <div className="qm-radio-box">
          <input type='radio' checked={checked} readOnly className="qm-radio" {...props}/>
          <div className="qm-radio-mask">
            <div className="qm-radio-check">
              <span>
                <div className="line1"></div>
                <div className="line2"></div>
              </span>
            </div>
          </div>
        </div>
        <div className="qm-radio-ctx">
          {
            children
          }
        </div>
      </label>
    </div>
  );
}

export default Radio;
