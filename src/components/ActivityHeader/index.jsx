import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useCookieState, useMount, useSessionStorageState, useSetState } from 'ahooks';
import logo from '~/assets/img/logo@1x.png';
import logoX from '~/assets/img/logo@2x.png';
import logoTag from '~/assets/img/logo-tag@1x.png';
import logoTagX from '~/assets/img/logo-tag@2x.png';
import './index.scss';
import Modal from '../Modal';
import Login from '../Login';
import { getUserInfo } from '~/service/user';

export default forwardRef(function ActivityHeader({ loginSuccess = () => {}, logout = () => {} }, ref) {
  const [route, setRoute] = useSetState(location);
  const [userData, saveUserData] = useCookieState('userData');
  const [ loginInfo, setLoginInfo ] = useSessionStorageState('loginInfo');
  const [ userInfo, setUser ] = useSessionStorageState('userInfo');
  const [isModal, setModal] = useState(false);

  useImperativeHandle(ref, () => ({
    openLogin: () => {
      setModal(true)
    },
    logout: handleLogout
  }))

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
    } else {
      handleLogout()
    }
  }

  const handleUserInfo = async account_token => {
    const { data, code, msg } = await getUserInfo({ account_token })
    if(code === 0) {
      handleLoginCB(data)
    }
    return { data, code, msg }
  }

  const handleLoginCB = (userInfo) => {
    setModal(false);
    setUser(userInfo);
    loginSuccess(userInfo);
  }

  const handleLogout = () => {
    saveUserData()
    setUser()
    logout()
  }

  return (
    <header className="activity-header absolute top-0 flex items-center">
      <nav role="navigation" className="flex justify-center items-center">
        <a id="logo"  className="flex justify-center items-center" href="/">
          <img width="133" height="40" className="logo" src={logo} srcSet={`${logoX} 2x`} alt="奇妙加速器" />
          <img width="36" height="15" className="tag ml-2" src={logoTag} srcSet={`${logoTagX} 2x`} alt="免费" />
        </a>
      </nav>
      <div className="flex-1" />
      {
        userInfo
        ? <div className="user-info">
            {userInfo.mobile}
            &nbsp;
            <button className="logout" onClick={handleLogout}>【退出】</button>
          </div>
        : <div className="login-btn">
            <button onClick={() => setModal(true)}>登录</button>
          </div>
      }
      <Modal
        round
        isVisible={isModal}
        content={<Login loginSuccess={handleUserInfo}/>}
        onClose={() => setModal(false)}
      />
    </header>
  );
})
