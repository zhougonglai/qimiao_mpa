import { useMount, useSetState } from 'ahooks';
import React, { forwardRef,useRef, useImperativeHandle } from 'react';
import Donut from '../Donut';
import './Spinner.scss'
import anime from 'animejs/lib/anime.es.js';

const Spinner = forwardRef(({ items, defaultState }, ref) => {
  const [ drawData, setDrawData ] = useSetState({ drawItems: [] })
  const spinnerRef = useRef();
  useImperativeHandle(ref, () => ({
    runTo: (bool, options) => {
      const itemHeight = spinnerRef.current.scrollHeight / (drawData.drawItems.length * 2);
      const scrollTo = itemHeight * 2 * (drawData.drawItems.length - 1) - (bool ? ( 2 * itemHeight) : itemHeight);

      console.log(bool, itemHeight, drawData.drawItems.length, scrollTo)

      anime({
        targets: spinnerRef.current,
        duration: 5000,
        easing: 'easeOutCubic',
        delay: 650,
        scrollTop: [ defaultState ?  0  : itemHeight , scrollTo],
        ...options
      })
    }
  }))

  useMount(() => {
    setDrawData({
      drawItems: new Array(10).fill(items)
      // drawItems: [].concat([items], [items], [items], [items], [items], [items], [items], [items], [items], [items])
    })
  })

  return (
    <div className="spinner" ref={spinnerRef}>
      {
        drawData.drawItems.length
        ? drawData.drawItems.map((items,i) =>
            items.map((item, $i) =>
              <div className="img-wrap" key={`${i}-${$i}-${item.id}`}>
                <img src={item.img} />
              </div>
            )
          )
        : <div className="img-wrap">
            <Donut />
          </div>
      }
    </div>
  );
})

export default Spinner;
