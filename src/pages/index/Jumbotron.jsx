import React from 'react';
import './Jumbotron.scss';
import jumbotronTitle from '~/assets/img/index/jumbotron-title.png';
import jumbotronTitleX from '~/assets/img/index/jumbotron-title@2x.png';

function Jumbotron() {
  return (
    <div className="block">
      <div className="left-block">
        <div className="left-head">
          <img width="491" height="161" src={jumbotronTitle} srcSet={`${jumbotronTitleX} 2x`} />
        </div>
        <div className="download">
          <button className="download-btn">
            免费下载
          </button>
        </div>
      </div>
      <div className="right-block flex items-center justify-center">
        <img width="499" height="548" src="./assets/img/index/bg-data@1x.png"
          srcSet="./assets/img/index/bg-data@2x.png 2x" />
      </div>
      <div className="bottom-block">
        <div className="platform platform-win active">
          <div className="platform-cover">
            <img src="./assets/img/index/win.png" srcSet="./assets/img/index/win@2x.png 2x" alt="windows平台" />
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
            <img src="./assets/img/index/mac.png" srcSet="./assets/img/index/mac@2x.png 2x" alt="macOS版本" />
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
            <img src="./assets/img/index/os.png" srcSet="./assets/img/index/os@2x.png 2x" alt="iOS版本" />
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
            <img src="./assets/img/index/android.png" srcSet="./assets/img/index/android@2x.png 2x" alt="Android版本" />
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
            <img src="./assets/img/index/android.png" srcSet="./assets/img/index/android@2x.png 2x" alt="Android版本" />
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
      </div>
    </div>
  );
}

export default Jumbotron;
