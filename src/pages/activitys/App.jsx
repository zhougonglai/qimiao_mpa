import React, { useRef } from 'react';
import { useBoolean } from 'ahooks';
import SlotMachine from '~/components/SlotMachine';
import TrueItem from '~/assets/img/activitys/index/data-1.png';
import TrueItemX from '~/assets/img/activitys/index/data-1@2x.png';
import FalseItem from '~/assets/img/activitys/index/data-2.png';
import FalseItemX from '~/assets/img/activitys/index/data-2@2x.png';

import './App.scss';

function App() {
  const drawRef = useRef();
  const [runing, { setTrue, setFalse }] = useBoolean(false);
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

  const handleDraw = () => {
    setTrue()
    drawRef.current.run(Math.round(Math.random()), () => {
      setFalse()
    })
  }

  return (
    <>
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
                  还有3次机会
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

          </div>
        </div>
      </section>
    </>
  );
}

export default App;
