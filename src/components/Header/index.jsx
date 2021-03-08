import React from 'react';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import './index.scss';

function Header() {
  const [route, setRoute] = useSetState(location);

  return (
    <div className="block">
      <nav role="navigation">
        <div id="logo">
          <img src="../../assets/img/logo@1x.png" srcSet="../../assets/img/logo@2x.png 2x" alt="奇妙加速器" />
        </div>
        <ul className="nav-list">
          <li className={classNames("nav-item", {active: ['/', '/index.html'].includes(route.pathname) })}>
            <a href="/index.html">首页</a>
          </li>
          <li className={classNames("nav-item", {active: ['/support', '/support.html'].includes(route.pathname)})}>
            <a href="/support.html">游戏支持</a>
          </li>
          <li className={classNames("nav-item", {active: ['/about', '/about.html'].includes(route.pathname)})}>
            <a href="/about.html">关于我们</a>
          </li>
        </ul>
      </nav>

      <div id="loginWrap">
        <button id="register">
          登录
        </button>
      </div>
    </div>
  );
}

export default Header;
