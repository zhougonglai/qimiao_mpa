import classNames from 'classnames';
import React, { forwardRef, useImperativeHandle } from 'react';
import './index.scss';

export default forwardRef(function Tabs({ defaultIndex = 0, onTabClick, children, ...props}, ref) {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex);

  const changeTab = newIndex => {
    if (typeof onTabClick === 'function') onTabClick(newIndex);
    setBindIndex(newIndex);
  };

  useImperativeHandle(ref, () => ({
    changeTab
  }))

  return (
    <div className={classNames("wrapper", props.className)}>
      <div className="tab-menu">
        {children.map(({ props: { index, label } }) => (
          <button
            key={`tab-btn-${index}`}
            onClick={() => changeTab(index)}
            className={bindIndex === index ? 'focus' : ''}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {children.map(({ props }) => (
          <div
            {...props}
            className={classNames('tab-content', bindIndex === props.index ? 'selected' : '', props.className)}
            key={`tab-content-${props.index}`}
          />
        ))}
      </div>
    </div>
  );
});
