import { useBoolean, useDebounce, useScroll } from 'ahooks';
import React from 'react';
import './index.scss';
import kefu from '~/assets/img/kefu@1x.png';
import kefuX from '~/assets/img/kefu@2x.png';
import qrcode from '~/assets/img/qrcode@1x.png';
import qrcodeX from '~/assets/img/qrcode@2x.png';
import goup from '~/assets/img/goup@1x.png';
import goupX from '~/assets/img/goup@2x.png';

import wechat from '~/assets/img/qrcode-wechat.png';
import weibo from '~/assets/img/qrcode-weibo.jpg';
import douyin from '~/assets/img/qrcode-douyin.png';
import classNames from 'classnames';

import { scrollToTop } from '~/utils';

function HelpBar({ position = 'top' }) {
  const [ hovering, { setTrue, setFalse } ] = useBoolean(false);
  const debounceHover = useDebounce(hovering, { wait: 500 });
  const scroll = useScroll();

  return (
    <>
      <div className="help-item zhiCustomBtn">
        <img src={kefu} srcSet={`${kefuX} 2x`} width="40"/>
      </div>
      <div className={classNames("help-item relative", { active: debounceHover })} onMouseEnter={setTrue} onMouseLeave={setFalse}>
        <img src={qrcode} srcSet={`${qrcodeX} 2x`} width="40"/>
        <div className={classNames("content absolute flex flex-col items-center", position )} onMouseEnter={setTrue}>
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
      {
        scroll.top > document.scrollingElement.clientHeight
        ? <div className="help-item" onClick={scrollToTop}>
            <img src={goup} srcSet={`${goupX} 2x`} width="40"/>
          </div>
        : null
      }
    </>
  );
}

export default HelpBar;
