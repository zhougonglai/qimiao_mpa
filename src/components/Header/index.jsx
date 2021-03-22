import React, { useEffect } from 'react';
import { useCookieState, useMount, useSessionStorageState, useSetState } from 'ahooks';
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
import { getUserInfo } from '~/service/user';

const isPreview = location.host === 'dev-preview.qimiao.com'

function Header({ loginSuccess = () => {}, logout = () => {} }) {
  const [route, setRoute] = useSetState(location);
  const [isModal, setModal] = React.useState(false);
  const [ userData, saveUserData ] = useCookieState('userData');
  const [ loginInfo, setLoginInfo ] = useSessionStorageState('loginInfo');
  const [userInfo, setUser ] = useSessionStorageState('userInfo');

  useMount(async () => {
    if(route.search) {
      const params = new URLSearchParams(route.search);
      if(params.get('account_token')){
        await handleUserInfo(params.get('account_token'));
        params.delete('account_token')
        history.pushState(null, document.title, `${route.pathname}${params.toString() ? `?${params}` : ''}`)
      } else {
        handleUserByConf()
      }
    } else {
      handleUserByConf()
    }
  })

  const handleUserByConf = async () => {
    if(userData) {
      const { login_info } = JSON.parse(userData);
      setLoginInfo(login_info);
      handleUserInfo(login_info.account_token)
    } else if (loginInfo) {
      handleUserInfo(loginInfo.account_token)
    }
  }

  const handleUserInfo = async account_token => {
    const { data, code, msg } = await getUserInfo({ account_token })
    if(code === 0) {
      handleLoginCB(data)
    }
    return { data, code, msg }
  }

  const handleLoginCB = userInfo => {
    setModal(false);
    setUser(userInfo)
    loginSuccess(userInfo)
  }

  const handleLogout = () => {
    saveUserData()
    setUser()
    logout()
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
            <a href='/'>首页</a>
          </li>
          <li className={classNames("nav-item", {active: route.pathname.includes('/announcement/') })}>
            <a href='/announcement/'>公告</a>
          </li>
          <li className={classNames("nav-item", {active: route.pathname.includes('/infomation/') })}>
            <a href='/infomation/'>资讯</a>
          </li>
          <li className={classNames("nav-item", {active: ['/support', '/support.html'].includes(route.pathname)})}>
            <a href={isPreview ? '/support' : "/support.html"}>游戏支持</a>
          </li>
          <li className={classNames("nav-item", {active: ['/about', '/about.html'].includes(route.pathname)})}>
            <a href={isPreview ? '/about' : "/about.html"}>关于我们</a>
          </li>
        </ul>
      </nav>

      <div className="flex-1" />

      {
        userInfo
        ? <UserAvatar userInfo={userInfo} logout={handleLogout}/>
        : <div id="loginWrap">
            <button id="register" onClick={() => setModal(true)}>
              登录
            </button>
          </div>
      }
      <Modal
        round
        isVisible={isModal}
        content={<Login loginSuccess={handleUserInfo}/>}
        onClose={() => setModal(false)}
      />
    </div>
  );
}

export default Header;
