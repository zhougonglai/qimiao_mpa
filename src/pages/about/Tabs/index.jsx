import React from 'react';
import c from 'classnames';
import '~/components/Tabs/index.scss';

function Tabs({ tabs, active, changeTab }) {
  return (
    <div className={c("qm-tabs", "flex", 'wrapper')}>
      <div className={c('tab-menu')}>
        {
          Object.values(tabs).map(({ label, key }) =>
            <button className={active === key ? 'focus' : ''} key={key} onClick={() => changeTab(key)}>
              {label}
            </button>)
        }
      </div>
      <div className={c('tab-view')}>
      {
        tabs[active].content
      }
      </div>
    </div>
  );
}

export default Tabs;
