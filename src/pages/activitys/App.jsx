import React, { useEffect, useRef, useState } from 'react';
import { useBoolean, useCookieState, useMount, useSessionStorageState } from 'ahooks';
import SlotMachine from '~/components/SlotMachine';
import TrueItem from '~/assets/img/activitys/index/data-1.png';
import TrueItemX from '~/assets/img/activitys/index/data-1@2x.png';
import FalseItem from '~/assets/img/activitys/index/data-2.png';
import FalseItemX from '~/assets/img/activitys/index/data-2@2x.png';
import {
  getActivity,
  getActivityPackage,
  getActivityPresent,
  getPrizeList,
  activityDraw
} from '~/service/activity';
import ActivityHeader from '~/components/ActivityHeader';
import rule1 from '~/assets/img/activitys/index/01.png';
import rule1X from '~/assets/img/activitys/index/01@2x.png';
import rule2 from '~/assets/img/activitys/index/02.png';
import rule2X from '~/assets/img/activitys/index/02@2x.png';
import rule3 from '~/assets/img/activitys/index/03.png';
import rule3X from '~/assets/img/activitys/index/03@2x.png';
import rule4 from '~/assets/img/activitys/index/04.png';
import rule4X from '~/assets/img/activitys/index/04@2x.png';
import moment from 'moment'

import './App.scss';
import { randomPhoneNumber } from '~/utils/index';

const activity_id = 1;

function App() {
  const drawRef = useRef();
  const headerRef = useRef();
  const [userData, saveUserData] = useCookieState('userData');
  const [ userInfo, setUser ] = useState(null);
  const [runing, { setTrue, setFalse }] = useBoolean(false);
  const [ activityInfo, updateActivity ] = useSessionStorageState('activity')
  const [ packages, updatePackage ] = useSessionStorageState('packages')
  const [ present, updatePresent ] = useSessionStorageState('present')
  const [ prize, updatePrize ] = useSessionStorageState('prize')

  const items = [
    {
      id: 1,
      value: true,
      img: TrueItem,
      large: TrueItemX
    },
    {
      id: 0,
      value: false,
      img: FalseItem,
      large: FalseItemX
    }
  ]

  const handleDraw = async () => {
    if(activityInfo.points < activityInfo.detail.fee){
      // TODO: 没有积分弹窗
      return
    }
    if(userInfo) {
      const { data, code, msg } = await activityDraw({
        activity_id,
        account_token: userInfo.login_info.account_token
      })

      updateActivity({
        ...activityInfo,
        ...data
      })
      setTrue()
      if(code) {
        drawRef.current.run(0, () => {
          setFalse()
        })
      } else {
        drawRef.current.run(1, () => {
          setFalse()
        })
      }

    } else {
      headerRef.current.openLogin()
    }
  }

  useEffect(async () => {
    if(userData) {
      const userProfile = JSON.parse(userData)
      setUser(userProfile)
      updateActivity(await getActivity(activity_id, {
        activity_id,
        account_token: userProfile.login_info.account_token,
        type: 1,
        plat_type: 1
      }).then(activity => activity.data));
      updatePrize(await getPrizeList({
        account_token: userProfile.login_info.account_token
      }).then(res => res.data))
    } else {
      updateActivity(await getActivity(activity_id, {
        activity_id,
        type: 1,
        plat_type: 1
      }).then(res => res.data));
    }
  }, [userData])

  useMount(async () => {
    updatePackage(await getActivityPackage({
      activity_id,
      price_type: 0
    }).then(res => res.data))
    const present = await getActivityPresent({
      activity_id,
      present_type: 6
    }).then(res => res.data)
    if(present.total <= 10) {
      const object = {
        create_time: '',
        mail: '',
        mobile_num: randomPhoneNumber(),
        nickname: randomPhoneNumber(),
        title: '',
        user_id: Math.round(Math.random() * 3000),
        user_name: ''
      }
      // TODO 伪造奖品
    } else {
      updatePresent(present)
    }

  })

  return (
    <>
      <ActivityHeader ref={headerRef} />
      <section className="section-header">
        <div className="block">
          <div className="buy-block cursor-pointer">

          </div>
        </div>
      </section>
      <section className="section-draw">
        <div className="block">
          <div className="block-title"></div>
          <div className="block-subtitle cursor-default">在此页面或客户端购买年卡套餐均可获得1次抽奖机会</div>
          <div className="draw-block flex justify-between items-center">
            <div className="draw-content flex flex-col justify-end">
              <SlotMachine defaultState={[ 1, 1, 1 ]} ref={drawRef} items={items} />
              <div className="draw-action">
                <button className="draw-btn" disabled={runing} onClick={handleDraw}></button>
              </div>
              <div className="draw-desc">
                <div className="draw-count">
                  还有{activityInfo ? (activityInfo.points / activityInfo.detail.fee) : 0}次机会
                </div>
              </div>
            </div>

            <div className="draw-winList">

            </div>
          </div>
        </div>
      </section>
      <section className="section-rule">
        <div className="block">
          <div className="block-title"></div>

          <div className="block-rule">
            <div className="rule-title">
                活动最终解释权归武汉奇妙科技有限公司所有
            </div>
            <div className="rule-content flex justify-center items-center">
              <ul className="rule-list">
                <li className="rule-item">
                  <div className="rule-tag">
                    <img src={rule1} srcSet={`${rule1X} 2x`} />
                  </div>
                  <div className="rule-tile">
                    活动时间: <span className="mark-yellow">2021年3月15日</span>
                  </div>
                </li>
                <li className="rule-item">
                  <div className="rule-tag">
                    <img src={rule2} srcSet={`${rule2X} 2x`} />
                  </div>
                  <div className="rule-tile">
                    <p>
                      活动期间，<span className="mark-yellow">99元年卡套餐限时买一送一</span>，<br/>
                      多买多得，赠送年卡时长实时到帐，不可转赠；
                    </p>
                  </div>

                </li>
                <li className="rule-item">
                  <div className="rule-tag">
                    <img src={rule3} srcSet={`${rule3X} 2x`} />
                  </div>
                  <div className="rule-tile">
                    <p>
                      在活动页及客户端<span className="mark-yellow">购买年卡套餐均可获得抽免单机会</span>， <br />
                      抽奖机会仅限在活动期间使用，逾期将作废；
                    </p>
                  </div>

                </li>
                <li className="rule-item">
                  <div className="rule-tag">
                    <img src={rule4} srcSet={`${rule4X} 2x`} />
                  </div>
                  <div className="rule-tile">
                    <p>
                      抽中免单的用户 <br />
                      我们将于活动结束后<span className="mark-yellow">7个工作日</span>内完成退款；
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
