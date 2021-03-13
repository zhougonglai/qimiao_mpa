import React from 'react';
import './index.scss';
import alipay from '~/assets/img/alipay.svg';
import wepay from '~/assets/img/wepay.svg';
import qqpay from '~/assets/img/qq.svg';
import Radio from '../Radio';
import { useMount, useRequest, useSetState } from 'ahooks';
import classNames from 'classnames';
import { getSetting } from '~/service/activity';
import { Button, message } from 'antd';
import { packageBuy } from '~/service/activity';

import oneForOne from '~/assets/img/components/one_for_one.png';
import oneForOneX from '~/assets/img/components/one_for_one@2x.png';

export default function Recharge({ packager, done, account_token }) {
  const [ state, setState ] = useSetState({
    pay_type: null,
    discount_code: '',
    useDiscount: false,
    pay_plat: null,
    payLabel: '支付宝',
  })


  const [ payInfo, setInfo ] = useSetState({
    alipay: 2,
    wepay: 1,
    paytype: 1
  })

  const { data, loading, run } = useRequest(packageBuy, {
    throttleInterval: 3000,
    manual: true,
    onSuccess: ({ data, code , msg }) => {
      if(code) {
        message.warn(msg)
      } else {
        done({
          ...state,
          ...data,
          ...payInfo,
        })
      }
    }
  })

  const handlePay = async () => {
    await run({
      ...state,
      ...packager,
      account_token,
      src_channel: 'guanwang',
      invoice_from: 0,
      discount_code: state.useDiscount ? state.discount_code : '',
    })
  }

  const payTypeChange = type => {
    const action = [ null, () => {
      const state = {
        alipay: () => setState({ pay_type: 2, payLabel: '支付宝' }),
        wepay: () => setState({ pay_type: 1, payLabel: '微信支付' }),
        qq: () => setState({ pay_type: 3, payLabel: 'QQ钱包' }),
      }
      state[type]()
    }, () => {
      const state = {
        alipay: () => setState({ pay_plat: 3, pay_type: 14, payLabel: '支付宝' }),
        wepay: () => setState({ pay_plat: 4, pay_type: 14, payLabel: '微信支付' }),
        qq: () => setState({ pay_type: 3, pay_plat: null, payLabel: 'QQ钱包' })
      }
      state[type]()
    }]
    action[payInfo.paytype]()
  }

  useMount(async () => {
    const [ { key, value } ] = await getSetting({key_name: 'default_pay_type' }).then(res => res.data);
    const action = [ null, () => {
      setState({
        pay_type: 2
      })
      setInfo({
        alipay: 2,
        wepay: 1,
        paytype: value
      })

    }, () => {
      setState({
        pay_type: 14,
        pay_plat: 3
      })
      setInfo({
        alipay: 3,
        wepay: 4,
        paytype: value
      })
    }]

    action[value]();
  })

  return (
    <div className="w-full flex flex-col justify-center items-center pb-8">
      <div className="alert my-4">
        <ul className="alert-list">
          <li className="alert-item">
            <div className="left">
              套餐:
            </div>
            <div className="right inline-flex">
              <img src={oneForOne} srcSet={`${oneForOneX} 2x`} width="76" height="20" alt="买一年送一年" className="mr-2"/>
              {
                packager.price_title
              }
            </div>
          </li>
          <li className="alert-item">
            <div className="left">
              价格:
            </div>
            <div className="right price">
              ¥ { packager.price_num }
            </div>
          </li>
        </ul>
      </div>

      <hr className="line my-6 w-4/5"/>

      <ul className="qm-list">
        <li className={classNames("qm-item cursor-pointer", {
          active: payInfo.paytype === 2
            ? state.pay_plat === 3
            : state.pay_type === 2
          })} onClick={() => payTypeChange('alipay')}>
          <div className="qm-item-icon">
            <img src={alipay} alt="支付宝"/>
          </div>
          <div className="qm-item-tile">
            支付宝
          </div>
          <div className="qm-item-extra">
            <Radio checked={payInfo.paytype === 2  ? state.pay_plat === 3 : state.pay_type === 2} />
          </div>
        </li>
        <li className={classNames("qm-item cursor-pointer", {
          active: payInfo.paytype === 2
            ? state.pay_plat === 4
            : state.pay_type === 1
          })} onClick={() => payTypeChange('wepay')}>
          <div className="qm-item-icon">
            <img src={wepay} alt="微信" />
          </div>
          <div className="qm-item-tile">
            微信支付
          </div>
          <div className="qm-item-extra">
            <Radio checked={payInfo.paytype === 2 ? state.pay_plat === 4 : state.pay_type === 1} />
          </div>
        </li>
        <li className={classNames("qm-item cursor-pointer", { active: state.pay_type === 3 })} onClick={() => payTypeChange('qq')}>
          <div className="qm-item-icon">
            <img src={qqpay} alt="qq" />
          </div>
          <div className="qm-item-tile">
            QQ钱包
          </div>
          <div className="qm-item-extra">
            <Radio checked={state.pay_type === 3} />
          </div>
        </li>
        <li className={classNames('qm-item')}>
          <div className="qm-item-tile">
            {
              state.useDiscount
                ? <div className="qm-input-box">
                    <input placeholder="折扣码"
                      spellCheck={false}
                      value={state.discount_code}
                      onInput={e => setState({ discount_code: e.target.value })}
                      className="qm-input font-mono" />
                  </div>
                : null
            }
          </div>
          <div className="qm-item-extra">
            <Radio checked={state.useDiscount} onClick={() => setState({ useDiscount: !state.useDiscount })}>折扣码</Radio>
          </div>
        </li>
      </ul>
      <div className="recharge-desc">
        <p>
          查看<a className="text-primary" href="/about.html?index=service" target="_blank">《会员服务条款》</a>
        </p>
      </div>
      <div className="action w-64 mt-4">
        <Button type="primary" shape="round" loading={loading} size="large" block onClick={handlePay}>
          支付
        </Button>
      </div>
    </div>
  );
}
