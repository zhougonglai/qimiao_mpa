import React from 'react';
import logo from '~/assets/img/logo@1x.png';
import logoX from '~/assets/img/logo@2x.png';
import logoTag from '~/assets/img/logo-tag@1x.png';
import logoTagX from '~/assets/img/logo-tag@2x.png';
import './index.scss';

function ActivityHeader() {
  return (
    <header className="activity-header absolute top-0 flex justify-between items-center">
      <nav role="navigation">
        <a id="logo" className="flex justify-center items-center" href="/">
          <img width="133" height="40" className="logo" src={logo} srcSet={`${logoX} 2x`} alt="奇妙加速器" />
          <img width="36" height="15" className="tag ml-2" src={logoTag} srcSet={`${logoTagX} 2x`} alt="免费" />
        </a>
      </nav>
      <div className="user-info">

      </div>
    </header>
  );
}

export default ActivityHeader;
