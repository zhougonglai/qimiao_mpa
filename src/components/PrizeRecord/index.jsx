import { useBoolean, useSetState } from 'ahooks';
import { Button, message, Pagination } from 'antd';
import React, { useEffect } from 'react';
import { getPrizeList } from '~/service/activity';
import Modal from '../Modal';
import './index.scss';
import { userReceive } from '~/service/activity';

function PrizeRecord({ account_token, tokenExpired = () => {} }) {

  const [ receive, { setTrue: openReceive, setFalse: closeReceive } ] = useBoolean(false);
  const [ detail, { setTrue: openDtail, setFalse: closeDtail }  ] = useBoolean(false);

  const [ state, setState ] = useSetState({
    prize: null
  })

  const handlePageChange = async (page = 1, size = 10) => {
    const { data, code, msg } = await getPrizeList({
      account_token,
      page,
      size
    })
    if(code) {
      if(code === 400006) {
        tokenExpired(false)
      }
      message.info(msg);
    } else {
      setState({
        prize: data
      })
    }
  }

  useEffect(handlePageChange, [account_token])

  const handleReceive = async prizer => {
    const { data, code } = await userReceive({
      account_token,
      prize_id: prizer.id,
    })

    if(code === 0) {
      openReceive()
      handlePageChange(state.prize.current_page)
    }

  }

  return (
    <>
      <Modal isVisible={receive}
        size="small"
        title="兑换成功！"
        onClose={closeReceive}
        content={
          <div className="h-16 flex items-center justify-center">
            <p className="text-gray-500 w-64 text-center">
              我们将于活动结束后7个工作日内原路退还该套餐的支付金额，请注意查收！
            </p>
          </div>
        }
        footer={
          <div className="w-full flex items-center justify-center">
            <Button className="w-32" type="primary" size="large" shape="round" onClick={closeReceive}>好的</Button>
          </div>
        }
      />
      <Modal isVisible={detail}
        size="small"
        title="奖品发放中"
        onClose={closeDtail}
        content={
          <div className="h-16 flex items-center justify-center">
            <p className="text-gray-500 w-64 text-center">
              我们将于活动结束后7个工作日内完成退款，如有问题请，联系在线客服。
            </p>
          </div>
        }
        footer={
          <div className="w-full flex items-center justify-center">
            <Button className="w-32" type="primary" size="large" shape="round" onClick={closeDtail}>好的</Button>
          </div>
        }
      />
      <div className="prize-record flex flex-col items-center justify-center">
        <div className="record-content w-full pb-4 px-2">
          <ul className="prize-list">
            <li className="prize-header flex">
              <div className="prize-title flex-1">
                中奖礼品
              </div>
              <div className="prize-state flex-1 text-center">
                状态
              </div>
              <div className="prize-action flex-1 text-center">
                操作
              </div>
            </li>
            {
              state.prize?.list?.length
              ? state.prize.list.map(prizer =>
                <li className="prize-item flex" key={prizer.id}>
                  <div className="prize-title flex-1">
                    {prizer.present_title}
                  </div>
                  <div className="prize-state flex-1 text-center">
                    {prizer.status_title}
                  </div>
                  <div className="prize-action flex-1 text-center">
                    {
                    prizer.status === 0
                    ? <Button type="primary" onClick={() => handleReceive(prizer)}>立即兑换</Button>
                    : <Button onClick={openDtail}>查看详情</Button>}
                  </div>
                </li>)
              : <div className="prize-empty w-full h-32 text-center text-4xl">
                暂无数据
              </div>
            }
          </ul>
        </div>
        <div className="record-page">
          {
            state.prize ? <Pagination defaultCurrent={state.prize.current_page} total={state.prize.total} onChange={handlePageChange}/> : null
          }
        </div>
      </div>
    </>
  );
}

export default PrizeRecord;
