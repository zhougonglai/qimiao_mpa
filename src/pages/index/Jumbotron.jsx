import React from 'react';
import { useMouse } from 'ahooks';
import './Jumbotron.scss';
import downloadIcon from '~/assets/img/download.svg';
import jumbotronTitle from '~/assets/img/index/jumbotron-title.png';
import jumbotronTitleX from '~/assets/img/index/jumbotron-title@2x.png';
import bgData from '~/assets/img/index/bg-data@1x.png';
import bgDataX from '~/assets/img/index/bg-data@2x.png';
import win from '~/assets/img/index/win.png';
import winX from '~/assets/img/index/win@2x.png';
import mac from "~/assets/img/index/mac.png";
import macX from "~/assets/img/index/mac@2x.png";
import os from '~/assets/img/index/os.png';
import osX from '~/assets/img/index/os@2x.png';
import android from '~/assets/img/index/android.png';
import androidX from '~/assets/img/index/android@2x.png';

function Jumbotron() {
  const { clientX, clientY } = useMouse();

  return (
    <div className="block">
      <div className="left-block">
        <div className="left-head">
          <img width="491" height="161" src={jumbotronTitle} srcSet={`${jumbotronTitleX} 2x`} />
        </div>
        <div className="download">
          <a className="download-btn" role="button" href="/download.html">
            <img src={downloadIcon} alt="免费下载" className="icon"/>
            免费下载
          </a>
        </div>
      </div>
      <div className="right-block flex items-center justify-center">
        <img width="899" height="548" className="transition-transform"
        style={{transform: 'translate('+ Math.floor(window.screen.availWidth - clientX)/20 + 'px,' + Math.floor(window.screen.availHeight - clientY)/20 + 'px)'}}
        src={bgData} srcSet={`${bgDataX} 2x`} />
      </div>
      <div className="bottom-block">
        <div className="platform platform-win active">
          <div className="platform-cover">
            <img src={win} srcSet={`${winX} 2x`} alt="windows平台" />
          </div>
          <div className="platform-desc">
            Windwos版本
          </div>
          <div className="platform-action">
            <button className="platform-download">
              立即下载
            </button>
          </div>
        </div>

        <div className="platform platform-win">
          <div className="platform-cover">
            <img src={mac} srcSet={`${macX} 2x`} alt="macOS版本" />
          </div>
          <div className="platform-desc">
            macOS版本
          </div>
          <div className="platform-action">
            <button className="platform-download">
              立即下载
            </button>
          </div>
        </div>

        <div className="platform platform-win">
          <div className="platform-cover">
            <img src={os} srcSet={`${osX} 2x`} alt="iOS版本" />
          </div>
          <div className="platform-desc">
            iOS版本
          </div>
          <div className="platform-action">
            <button className="platform-download">
              立即下载
            </button>
          </div>
        </div>

        <div className="platform platform-win">
          <div className="platform-cover">
            <img src={android} srcSet={`${androidX} 2x`} alt="Android版本" />
          </div>
          <div className="platform-desc">
            Android版本
          </div>
          <div className="platform-action">
            <button className="platform-download">
              立即下载
            </button>
          </div>
        </div>

        <div className="platform platform-win">
          <div className="platform-cover">
            <img src={android} srcSet={`${androidX} 2x`} alt="主机加速" />
          </div>
          <div className="platform-desc">
            主机加速
          </div>
          <div className="platform-action">
            <button className="platform-download">
              立即下载
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
