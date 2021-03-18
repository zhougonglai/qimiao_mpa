import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useBoolean, useMount, useSessionStorageState, useSetState, useThrottleFn } from 'ahooks';
import TrueItem from '~/assets/img/activitys/index/data-1.png';
import TrueItemX from '~/assets/img/activitys/index/data-1@2x.png';
import FalseItem from '~/assets/img/activitys/index/data-2.png';
import FalseItemX from '~/assets/img/activitys/index/data-2@2x.png';
import {
  getActivity,
  getActivityPackage,
  getActivityPresent,
  activityDraw,
  getPackageLevel,
  getInvoicePrice,
} from '~/service/activity';
import rule1 from '~/assets/img/activitys/index/01.png';
import rule1X from '~/assets/img/activitys/index/01@2x.png';
import rule2 from '~/assets/img/activitys/index/02.png';
import rule2X from '~/assets/img/activitys/index/02@2x.png';
import rule3 from '~/assets/img/activitys/index/03.png';
import rule3X from '~/assets/img/activitys/index/03@2x.png';
import rule4 from '~/assets/img/activitys/index/04.png';
import rule4X from '~/assets/img/activitys/index/04@2x.png';
import payDone from '~/assets/img/done.svg';
import moment from 'moment';
import { Button, message } from 'antd';
import { take, concat, tail, isNumber } from 'lodash';
import anime from 'animejs/lib/anime.es';

import './App.scss';
import { randomPhoneNumber, scrollToTop } from '~/utils/index';
import { toast } from '~/utils/toast';
import Modal from '~/components/Modal';
import Bouncing from '~/components/Bouncing';

const ActivityHeader = lazy(() => import('~/components/ActivityHeader'));
const SlotMachine = lazy(() => import('~/components/SlotMachine'));
const Recharge = lazy(() => import('~/components/Recharge'));
const Payment = lazy(() => import('~/components/Payment'));
const UpgradeTip = lazy(() => import('~/components/Payment/UpgradeTip'));
const PrizeRecord = lazy(() => import('~/components/PrizeRecord'));

const activity_id = 1;

function App() {
  const drawRef = useRef();
  const headerRef = useRef();
  const winRef = useRef();
  const [ userInfo, setUser ] = useSessionStorageState('userInfo');

  const [ runing, { setTrue, setFalse }] = useBoolean(false);
  const [ overTime, { setTrue: openOverTip , setFalse: closeOverTip }] = useBoolean(false);
  const [ recharge, { setTrue:openRecharge , setFalse:closeRecharge } ] = useBoolean(false);
  const [ payment, { setTrue: openPayment, setFalse: closePayment } ] = useBoolean(false);
  const [ drawTip, { setTrue: openDrawTip, setFalse: closeDrawTip } ] = useBoolean(false);
  const [ upgradeTip, { setTrue: openUpgradeTip, setFalse: closeUpgradeTip } ] = useBoolean(false);
  const [ rechargeTip, { setTrue: openRechargeTip, setFalse: closeRechargeTip } ] = useBoolean(false);
  const [ rechargeSuc, { setTrue: openRechargeSuc, setFalse: closeRechargeSuc } ] = useBoolean(false);
  const [ prizeRecord, { setTrue: openPrizeRecord, setFalse: closePrizeRecord } ] = useBoolean(false);
  const [ winTip, { setTrue: openWinTip, setFalse: closeWinTip } ] = useBoolean(false);

  const [ activityInfo, updateActivity ] = useSessionStorageState('activity')
  const [ packages, updatePackage ] = useSessionStorageState('packages')

  const [ state, setState ] = useSetState({
    packager: null,
    payInfo: null,
    present: [],
    invoicePrice: null,
    upgradePackage: null,
    prize: null,
    inActivityTime: null,
  })

  const { run: handleDraw } = useThrottleFn(async () => {
    if(state.inActivityTime === 1) {
      if(userInfo) {
        if(activityInfo.points < activityInfo.detail.fee){
          openRechargeTip()
          return
        }
        const { data, code, msg } = await activityDraw({
          activity_id,
          account_token: userInfo.login_info.account_token
        })
        if(code) {
          if(code === 400006) {
            handleTokenExpired()
            message.warn(msg)
            return
          }
          drawRef.current.run(0, () => {
            setTimeout(() => {
              openDrawTip()
              setFalse()
            }, 500)
          })
        } else {
          drawRef.current.run(1, () => {
            setState({
              prize: data
            })
            setTimeout(() => {
              openWinTip()
              setFalse()
            }, 550)
          })
        }
        updateActivity({
          ...activityInfo,
          points: data.points
        })
        setTrue()

      } else {
        headerRef.current.openLogin()
      }
    } else {
      openOverTip()
    }
  }, { trailing: false })

  const items = [
    {
      id: 1,
      value: true,
      label: '奇妙免单券',
      img: TrueItem,
      large: TrueItemX
    },
    {
      id: 0,
      value: false,
      label: '谢谢参与',
      img: FalseItem,
      large: FalseItemX
    }
  ]

  // 选取充值套餐
  const handlePackageSelect = () => {
    if(state.inActivityTime === 1) {
      if(userInfo) {
        setState({ packager: state.invoicePrice
        ? {
          ...updatePackage[0].price[0],
          package_id: updatePackage[0].package_id
        } : {
          ...packages[0].price[0],
          package_id: packages[0].package_id,
        } });
        openRecharge();
      } else {
        headerRef.current.openLogin()
      }
    } else {
      openOverTip()
    }
  }

  // 打开奖品列表
  const handleOpenPrizeRecord = () => {
    if(userInfo) {
      openPrizeRecord()
    } else {
      headerRef.current.openLogin()
    }
  }

  // 支付订单
  const handlePackageBuy = async payInfo => {
    setState({
      payInfo
    })
    openPayment();
  }

  // 支付成功
  const handlePaySuccess = async paymentInfo => {
    closePayment()
    closeRecharge();
    handleTokenUpdate(userInfo);
    openRechargeSuc();
  }

  const handleOverTime = async () => {
    if(activityInfo){
      if(!isNumber(state.inActivityTime)){
        const now = moment();
        if(now.isBefore(activityInfo.detail.start_time)) {
          setState({ inActivityTime: 0 })
          openOverTip()
        } else if(now.isAfter(activityInfo.detail.end_time)) {
          setState({ inActivityTime: 2 })
          openOverTip()
        } else {
          setState({ inActivityTime: 1 })
        }
      }
    }
  }

  useEffect(handleOverTime, [activityInfo])

  // token更新
  const handleTokenUpdate = async user => {
    if(user) {
      setUser(user)
      updateActivity( await getActivity(activity_id, {
        activity_id,
        account_token: user.login_info.account_token,
        type: 1,
        plat_type: 1
      }).then(activity => activity.data));
    } else {
      setUser(null);
      updateActivity(await getActivity(activity_id, {
        activity_id,
        type: 1,
        plat_type: 1
      }).then(res => res.data));
    }
  }

  const handleTokenExpired = (silent = true) => {
    headerRef.current.logout()
    drawRef.current.reset();
    if(!silent) {
      headerRef.current.openLogin();
    }
  }

  // 处理套餐升级
  const handlePackageUpgrade = async () => {
    if(userInfo){
      const { data } = await getInvoicePrice({
        price_id: packages[0].price[0].price_id,
        account_token: userInfo.login_info.account_token
      })
      if (
        data.length && data.some(pkg => pkg.status
            && pkg.process_time <= activityInfo.detail.end_time
            && pkg.process_time >= activityInfo.detail.start_time
        )
      ) {
        setState({
          invoicePrice: data
        })
        handlePackageLeve()
      }
    }
  }

  const handlePackageLeve = async () => {
    const { data } = await getPackageLevel({
      price_id: [packages[0].price[0].price_id],
    })

    setState({
      upgradePackage: data
    })
  }

  useEffect(() => {
    const presentItem = winRef.current.scrollHeight / state.present.length
    anime({
      targets: winRef.current,
      scrollTop: [0 , presentItem],
      loop: true,
      delay: 2000,
      duration: 1000,
      easing: 'linear',
      loopComplete: () => {
        // 涉及到图绘
        requestAnimationFrame(() => {
          setState({
            present: concat(tail(state.present), take(state.present))
          })
        })
      }
    })
    return () => anime.remove(winRef.current)
  }, [state.present])

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
      const presenter = (
        phone = randomPhoneNumber(),
        user_id = Math.round(Math.random() * 3000),
        create_time = moment(present.list[0].create_time).subtract(Math.round(Math.random() * 24 * 60 * 60), 'seconds').format("YYYY-MM-DD HH:mm:ss")
      ) => ({
        create_time,
        mail: '',
        mobile_num: phone,
        nickname: phone,
        title: present.list[0].title,
        user_id,
        user_name: ''
      })
      present.list.push(presenter(), presenter(), presenter(), presenter(), presenter(), presenter(), presenter())
      setState({
        present: present.list
      })
    } else {
      setState({
        present: present.list
      })
    }
  })

  return (
    <>
      <Suspense fallback={<Bouncing /> }>
        <ActivityHeader ref={headerRef}
          loginSuccess={handleTokenUpdate}
          logout={handleTokenUpdate}/>
      </Suspense>
      <Modal size="small"
        defaultStyle={false}
        className="w-full"
        isVisible={recharge}
        title="选择支付方式"
        onClose={closeRecharge}
        content={
          <Suspense fallback={<Bouncing />}>
            <Recharge
              tokenExpired={() => {
                closeRecharge()
                handleTokenExpired()
              }}
              account_token={ userInfo?.login_info?.account_token }
              done={handlePackageBuy}
              packager={state.packager} />
          </Suspense>
          }
      />
      <Modal
        defaultStyle={false}
        isVisible={payment}
        title={state.payInfo?.payLabel}
        onClose={closePayment}
        content={
          <Suspense fallback={<Bouncing /> } >
            <Payment payInfo={state.payInfo}
              closePayment={closePayment}
              activity_id={activity_id}
              paySuccess={handlePaySuccess}
              account_token={ userInfo?.login_info?.account_token } />
          </Suspense>
        }
      />
      <Modal
        size="small"
        title="中奖信息"
        isVisible={drawTip}
        onClose={closeDrawTip}
        content={
          <div className="flex py-4 justify-center items-center">
            <p className="text-center text-lg">很遗憾，未中奖！</p>
          </div>
        }
        footer={
          <div className="w-full flex justify-center items-center mb-5">
            <Button type="primary" size="large" className="w-32" shape="round" onClick={closeDrawTip}>好的</Button>
          </div>
        }
      />
      <Modal
        isVisible={upgradeTip}
        title='温馨提示!'
        onClose={closeUpgradeTip}
        content={
          <Suspense fallback={<Bouncing />}>
            <UpgradeTip />
          </Suspense>}
        footer={
          <div className="w-full flex items-center justify-center">
            <Button type="primary" shape="round" onClick={() => {
              handlePackageUpgrade()
              handlePackageSelect()
            }}>再次购买</Button>
          </div>
        }
      />
      <Modal
        title="中奖信息"
        isVisible={winTip}
        onClose={closeWinTip}
        content={<div className="flex flex-col w-full px-8 items-center justify-center">
          <h3 className="text-lg">
            恭喜您获得 <span className="text-primary">“{state.prize?.title}”</span>
          </h3>
          <p className="text-gray-500 w-64 text-center mt-2">
            请到中奖记录进行兑换，我们将于活动结束后7个工作日内原路退还该套餐的支付金额，请注意查收！
          </p>
        </div>}
        footer={
          <div className="w-full flex items-center mb-5 justify-center">
            <Button type="primary" className="w-32" size="large" shape="round" onClick={closeWinTip}>好的</Button>
          </div>
        }
      />
      <Modal
        size="small"
        title=" &nbsp; "
        isVisible={overTime}
        onClose={closeOverTip}
        content={
          <div className="flex items-center justify-center h-24">
            <p className="text-xl">
              { state.inActivityTime > 1 ? '活动已结束' : '活动未开始' }
            </p>
          </div>
        }
        footer={
          <div className="w-full flex items-center mb-5 justify-center">
            <Button type="primary" className="w-32" size="large" shape="round" onClick={closeOverTip}>好的</Button>
          </div>
        }
        />
      <Modal
        title="支付成功"
        size="small"
        isVisible={rechargeSuc}
        onClose={closeRechargeSuc}
        content={
          <div className="flex flex-col items-center justify-center">
              <div className="icon w-20">
                <img src={payDone} alt="支付成功"/>
              </div>
              <p className="w-64 text-center mt-4">
                您购买的"奇妙-年卡"已到账，请前往奇妙客户端进行查看
              </p>
          </div>
        }
        footer={
          <div className="w-full flex items-center mb-5 justify-center">
            <Button type="primary" className="w-32" size="large" shape="round" onClick={closeRechargeSuc}>好的</Button>
          </div>
        }
        />
      <Modal
        size="small"
        isVisible={rechargeTip}
        title='温馨提示!'
        onClose={closeRechargeTip}
        content={
          <div className="upgrade-tip flex items-center justify-center py-4">
            <div className="upgrade-info">
              <p className="text-center text-xl">
                需要充值
              </p>
            </div>
          </div>
        }
        footer={
          <div className="w-full flex mb-5 items-center justify-center">
            <Button type="primary" className="w-32" size="large" shape="round" onClick={() => {
              closeRechargeTip()
              scrollToTop()
            }}>去充值</Button>
          </div>
        }
      />
      <Modal size="large"
        isVisible={prizeRecord}
        title="中奖记录"
        onClose={closePrizeRecord}
        content={
        <Suspense fallback={<Bouncing />}>
          <PrizeRecord tokenExpired={bool => {
            closePrizeRecord()
            handleTokenExpired()
          }} account_token={userInfo?.login_info?.account_token}/>
        </Suspense>}
      />
      <section className="section-header">
        <div className="block">
          <div className="buy-block">
            <button className="buy-btn" onClick={() => handlePackageSelect()}>
            </button>
          </div>
        </div>
      </section>
      <section className="section-draw">
        <div className="block">
          <div className="block-title" ></div>
          <div className="block-subtitle cursor-default">在此页面或客户端购买年卡套餐均可获得1次抽奖机会</div>
          <div className="draw-block flex justify-between items-center">
            <div className="draw-content flex flex-col justify-end">
              <Suspense fallback={<Bouncing /> }>
                <SlotMachine defaultState={[ 1, 1, 1 ]} ref={drawRef} items={items} />
              </Suspense>
              <div className="draw-action">
                <button className="draw-btn" disabled={runing} onClick={handleDraw}></button>
              </div>
              <div className="draw-desc">
                <div className="draw-count">
                  还有{activityInfo ? (activityInfo.points / activityInfo.detail.fee) : 0}次机会
                </div>
              </div>
            </div>

            <div className="draw-winList flex flex-col">
              <div className="win-title">
                中奖名单
              </div>
              <div className="win-content flex-1 flex justify-center items-center">
                <ul className="win-list w-4/5 overflow-hidden" ref={winRef}>
                  {
                    state.present?.map((presen, i) =>
                    <li className="win-item" key={`${presen.user_id}-${presen.create_time}-${i}`}>
                      <small>{presen.create_time}</small>
                      <div className="win-item-tile flex justify-start items-center">
                        <div className="desc">恭喜 {presen.mobile_num} 获得</div>
                        <b className="extra ml-4">
                          {presen.title}
                        </b>
                      </div>
                    </li>)
                  }
                </ul>
              </div>
              <div className="win-action text-lg h-16 flex items-center justify-center">
                <button className="win-btn" onClick={handleOpenPrizeRecord}>
                    查看中奖记录
                </button>
              </div>
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
                    活动时间: {activityInfo ? <span className="mark-yellow">{moment(activityInfo.detail.start_time).format('YYYY年MM月DD日')}~{moment(activityInfo.detail.end_time).format('YYYY年MM月DD日')}</span> : null}
                  </div>
                </li>
                <li className="rule-item">
                  <div className="rule-tag">
                    <img src={rule2} srcSet={`${rule2X} 2x`} />
                  </div>
                  <div className="rule-tile">
                    <p>
                      活动期间，<span className="mark-yellow">99元年卡套餐限时买一送一</span>，<br/>
                      多买多得，赠送年卡时长实时到账，不可转赠；
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
