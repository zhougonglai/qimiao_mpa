import React from 'react';
import Button from '~/components/Button';
import './index.scss';

function Footer() {
  return (
    <div className="block">
      <div className="contact">
        <div className="tile">
          联系我们
        </div>
        <ul className="list">
          <li className="item">
            <a href="/about.html" alt="关于我们" role="link">关于我们</a>
          </li>
        </ul>
      </div>
      <div className="service">
        <div className="tile">
          服务中心
        </div>
        <ul className="list">
          <li className="item">
            <a href="javascrit:;">
              网站地图
            </a>
          </li>
          <li className="item">
            <a href="javascrit:;">
              服务协议
            </a>
          </li>
        </ul>
      </div>

      <div className="links">
        <div className="tile">
          友情链接
        </div>
      </div>

      <div className="about">
        <div className="tile">
          关注我们
        </div>
        <ul className="platforms flex justify-around">
          <li className="platform wechat">
            <div className="cover">

            </div>
            <div className="label text-sm leading-5 text-center">
              微信
            </div>
          </li>
          <li className="platform weibo">
            <a href="https://m.weibo.cn/u/6579444407" target="_blank">
              <div className="cover">

              </div>
              <div className="label text-sm leading-5 text-center">
                微博
              </div>
            </a>
          </li>
          <li className="platform douyin">
            <div className="cover">

            </div>
            <div className="label text-sm leading-5 text-center">
              抖音
            </div>
          </li>
          <li className="platform bilibili">
            <a href="https://space.bilibili.com/359330172" target="_blank" alt="哔哩哔哩">
              <div className="cover">

              </div>
              <div className="label text-sm leading-5 text-center">
                哔哩哔哩
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="kefu">
        <Button>
          联系客服
        </Button>
      </div>

      <address>
        <div className="address-icp inline-block">
          鄂ICP备18023477号@武汉奇妙网络科技有限公司
        </div>
        <div className="detail inline-block">
          详细地址: 湖北省武汉市洪山区花山大道软件新城A2栋4楼
        </div>
      </address>
    </div>
  );
}

export default Footer;
