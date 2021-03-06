import React from 'react';
import { useBoolean, useDebounce } from 'ahooks';
import './UserAvatar.scss';

function UserAvatar({ userInfo, logout }) {
  const [ hovering, { setTrue, setFalse } ] = useBoolean(false);
  const debounceHover = useDebounce(hovering, { wait: 500 });

  return (
    <div className="user-info cursor-pointer text-center flex items-center justify-center" onMouseEnter={setTrue} onMouseLeave={setFalse}>
      <img id="avatar" src={userInfo.avatar || avatarX } className="rounded-sm mr-2" width="45" alt={userInfo.nickname || userInfo.mobile} />
      <label htmlFor="avatar" className="cursor-pointer">{userInfo.nickname || userInfo.mobile}</label>
      {
        debounceHover
        ? <div className="user-menus" onMouseEnter={setTrue}>
            <div className="user-menu" onClick={logout}> 退出登录 </div>
          </div>
        : null
      }
    </div>
  );
}

export default UserAvatar;
