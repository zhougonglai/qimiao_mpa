import React from 'react';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import styles from './index.module.scss';
import Tab from '../Tab';

const tabs = {
  about: {
    title: '关于我们',
    key: 'about',
  },
  service: {
    title: '用户协议',
    key: 'service',
  }
}

function Tabs() {
  const [state, setState] = useSetState({
    activeKey: 'about',
    tabs
  })

  return (
    <div className={classNames(styles.tabs, 'flex')}>
      <div className={styles.headers}>
        {
          Object.values(state.tabs).map((tab) =>
          <div
          className={classNames(styles.head, {[styles.active]: tab.key === state.activeKey })}
          onClick={() => setState({activeKey: tab.key})}
          key={tab.key}>
            {tab.title}
          </div>)
        }
      </div>
      <Tab title={state.tabs[state.activeKey].title} activeKey={state.activeKey} />
    </div>
  );
}

export default Tabs;
