import React from 'react';
import { useCookieState, useMount, useSetState } from 'ahooks';
import classNames from 'classnames';
import './index.scss';
import 'whatwg-fetch';
import logo from '~/assets/img/logo@1x.png';
import logoX from '~/assets/img/logo@2x.png';
import logoTag from '~/assets/img/logo-tag@1x.png';
import logoTagX from '~/assets/img/logo-tag@2x.png';
import Modal from '../Modal';
import Login from '../Login';
import UserAvatar from './UserAvatar';

function Header() {
  const [route, setRoute] = useSetState(location);
  const [isModal, setModal] = React.useState(false);
  const [ userData, saveUserData ] = useCookieState('userData');
  const [userInfo, setUser ] = useSetState(null);

  useMount(() => {
    if(userData){
      setUser(JSON.parse(userData))
    }
  })

  const handleLoginCB = (userInfo) => {
    setModal(false);
    setUser(userInfo);
  }

  return (
    <div className="block">
      <nav role="navigation">
        <div id="logo" className="flex justify-center items-center">
          <img width="133" height="40" className="logo" src={logo} srcSet={`${logoX} 2x`} alt="奇妙加速器" />
          <img width="36" height="15" className="tag ml-2" src={logoTag} srcSet={`${logoTagX} 2x`} alt="免费" />
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

      {
        userInfo
        ? <UserAvatar userInfo={userInfo.user_info}/>
        : <div id="loginWrap">
            <button id="register" onClick={() => setModal(true)}>
              登录
            </button>
          </div>
      }
      <Modal
        round
        isVisible={isModal}
        content={<Login loginSuccess={handleLoginCB}/>}
        onClose={() => setModal(false)}
      />
    </div>
  );
}

export default Header;
