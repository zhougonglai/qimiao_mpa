import React, { useEffect } from 'react';
import { useCookieState, useMount, useSessionStorageState, useSetState } from 'ahooks';
import './index.scss';
import Modal from '../Modal';
import Login from '../Login';
import UserAvatar from './UserAvatar';
import { getUserInfo } from '~/service/user';

const isPreview = () => location.host.includes('preview')

function UserInfo({ loginSuccess = () => {}, logout = () => {} }) {
  const [route, setRoute] = useSetState(location);
  const [isModal, setModal] = React.useState(false);
  const [ userData, saveUserData ] = useCookieState('userData');
  const [ loginInfo, setLoginInfo ] = useSessionStorageState('loginInfo');
  const [userInfo, setUser ] = useSessionStorageState('userInfo');


  useMount(async () => {
    if(route.search) {
      const params = new URLSearchParams(route.search);
      if(params.get('account_token')) {
        await handleUserInfo(params.get('account_token'));
        params.delete('account_token')
        history.pushState(null, document.title, `${route.pathname}${params.toString() ? `?${params}` : ''}`)
      } else {
        handleUserByConf()
      }
    } else {
      handleUserByConf()
    }

    if(route.pathname.includes('/announcement')) {
      const LinkDom = document.querySelector(isPreview() ? `[href='/announcement']`: `[href='/announcement.html']`).parentElement;
      LinkDom.classList.add('active');
    } else if(route.pathname.includes('/infomation')) {
      const LinkDom = document.querySelector(isPreview() ? `[href='/infomation']` : `[href='/infomation.html']`).parentElement;
      LinkDom.classList.add('active');
    } else if(route.pathname.includes('/support')) {
      const LinkDom = document.querySelector(isPreview() ? `[href='/support']` : `[href='/support.html']`).parentElement;
      LinkDom.classList.add('active');
    } else if(route.pathname.includes('/about')) {
      const LinkDom = document.querySelector(isPreview() ? `[href='/about']`: `[href='/about.html']`).parentElement;
      LinkDom.classList.add('active');
    } else if(route.pathname.includes('/')) {
      const LinkDom = document.querySelector(`[href='/']`).parentElement;
      LinkDom.classList.add('active');
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
    <>
      {
        userInfo
        ? <UserAvatar userInfo={userInfo} logout={handleLogout} />
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
    </>
  );
}

export default UserInfo;
