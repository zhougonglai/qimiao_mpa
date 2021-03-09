import React from 'react';
import './UserAvatar.scss';

function UserAvatar({ userInfo }) {
  console.log(userInfo)
  return (
    <div className="user-info cursor-pointer">
      <img src={userInfo.avatar} width="45" alt={userInfo.nickname} />
    </div>
  );
}

export default UserAvatar;
