import { useCountDown, useRequest } from 'ahooks';
import React, { useEffect } from 'react';
import Bouncing from '../Bouncing';
import './index.scss';
import scanCode from '~/assets/img/scancode.svg';
import { invoiceState } from '~/service/activity';
import { Button, message } from 'antd';

function Payment({ payInfo, account_token, activity_id, paySuccess, closePayment = () => {} }) {
  const [ countdown, setTargetDate, formattedRes ] = useCountDown({
    targetDate: payInfo.timeout_express
  })

  const { minutes } = formattedRes;

  const handleInvoiceState = async (silence = true) => {
    const { data } = await invoiceState({
      account_token,
      invoice_id: payInfo.invoice_id,
      activity_id
    });
    if(data.status) {
      paySuccess()
    } else {
      if(!silence) {
        message.info(data.message);
      }
    }
  }

  const { data, loading, run, cancel } = useRequest(handleInvoiceState, {
    pollingInterval: 2000,
    pollingWhenHidden: false,
  })

  return (
    <div className="pay-info flex flex-col items-center pb-8 px-12">
      {
        payInfo
        ? <>
            <div className="pay-amount text-4xl">
              ¥ {payInfo.amount}
            </div>
            <hr className="line w-4/5 my-4"/>
            <div className="pay-order text-gray-500">
              订单号: {payInfo.order_no}
            </div>
            <div className="flex items-center justify-center mb-4">
              <p className="text-gray-500">
                请使用支付宝扫一扫，扫描二维码完成支付
              </p>
            </div>
            <iframe className="overflow-visible" src={payInfo.pay_url} width="166" height="170" frameBorder="0" />
            <div className="pay-desc text-sm my-2">
              二维码将在 {minutes} 分钟后失效
            </div>
            <div className="pay-action mt-4">
              <Button className="w-32" size="large" shape="round" onClick={closePayment} >返回上一步</Button>
            </div>
          </>
        : <Bouncing />
      }
    </div>
  );
}

export default Payment;
