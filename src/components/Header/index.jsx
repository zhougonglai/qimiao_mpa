import React from 'react';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import './index.scss';
import logo from '~/assets/img/logo@1x.png';
import logoX from '~/assets/img/logo@2x.png';
import Modal from '../Modal';

function Header() {
  const [route, setRoute] = useSetState(location);
  const [isModal, setModal] = React.useState(false);

  return (
    <div className="block">
      <nav role="navigation">
        <div id="logo">
          <img src={logo} srcSet={`${logoX} 2x`} alt="奇妙加速器" />
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
        <button id="register" onClick={() => setModal(true)}>
          登录
        </button>
      </div>
      <Modal
        isVisible={isModal}
        title="登录/注册"
        content={<p>Add your content here</p>}
        footer={<button>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </div>
  );
}

export default Header;
