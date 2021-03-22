import { useScroll } from 'ahooks';
import React from 'react';
import img from '~/assets/img/download.svg';
import './index.scss';
import wechat from '~/assets/img/qrcode-wechat.png';
import weibo from '~/assets/img/qrcode-weibo.png';
import douyin from '~/assets/img/qrcode-douyin.png';

function HelpBar() {

  const scroll = useScroll();

  return (
    <>
      <div className="help-item">
        <img src={img} />
      </div>
      <div className="help-item relative">
        <img src={img} />
        <div className="content">
          <div className="wechat platform">
            <div className="cover">
              <img src={wechat} alt="微信"/>
            </div>
            <label>
              微信
            </label>
          </div>
          <div className="weibo platform">
            <div className="cover">
              <img src={weibo} alt="微博" />
            </div>
            <label>微博</label>
          </div>
          <div className="douyin platform">
            <div className="cover">
              <img src={douyin} alt="抖音" />
            </div>
            <label>
              抖音
            </label>
          </div>
        </div>
      </div>

      <div className="help-item">
        <img src={img} />
      </div>
      {/* {
        scroll.top > document.scrollingElement.clientHeight
        ? <div className="help-item">
            <img src={img} />
          </div>
        : null
      } */}
    </>
  );
}

export default HelpBar;
