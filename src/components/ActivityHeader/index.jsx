import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useCookieState, useMount, useSetState } from 'ahooks';
import logo from '~/assets/img/logo@1x.png';
import logoX from '~/assets/img/logo@2x.png';
import logoTag from '~/assets/img/logo-tag@1x.png';
import logoTagX from '~/assets/img/logo-tag@2x.png';
import './index.scss';
import Modal from '../Modal';
import Login from '../Login';

export default forwardRef(function ActivityHeader({ loginSuccess = () => {}, logout }, ref) {
  const [userData, saveUserData] = useCookieState('userData');
  const [isModal, setModal] = useState(false);
  const [ userInfo, setUser ] = useState(null);

  useImperativeHandle(ref, () => ({
    openLogin: () => {
      setModal(true)
    }
  }))

  useMount(() => {
    if(userData) {
      setUser(JSON.parse(userData))
    }
  })

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
    <header className="activity-header absolute top-0 flex justify-between items-center">
      <nav role="navigation">
        <a id="logo" className="flex justify-center items-center" href="/">
          <img width="133" height="40" className="logo" src={logo} srcSet={`${logoX} 2x`} alt="奇妙加速器" />
          <img width="36" height="15" className="tag ml-2" src={logoTag} srcSet={`${logoTagX} 2x`} alt="免费" />
        </a>
      </nav>
      {
        userInfo
        ? <div className="user-info">
            {userInfo.user_info.mobile}
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
        content={<Login loginSuccess={handleLoginCB}/>}
        onClose={() => setModal(false)}
      />
    </header>
  );
})
