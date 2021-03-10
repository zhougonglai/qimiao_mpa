import { useSetState } from 'ahooks';
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './index.scss';
import Spinner from './Spinner';
const randomBool = () => Math.round(Math.random())

const SlotMachine = forwardRef(({ items, defaultState }, ref) => {
  const leftSpinner = useRef();
  const midleSpinner = useRef();
  const rightSpinner = useRef();
  const [ states, setStates ] = useSetState(defaultState);

  useImperativeHandle(ref, () => ({
    run: (bool, cb) => {

      const boolArr = bool ? [1, 1, 1] : [ randomBool(), randomBool() , 0]

      leftSpinner.current.runTo(boolArr[0], {
        delay: 250,
        begin: () => {
          midleSpinner.current.runTo(boolArr[1], {
            delay: 450,
            begin: () => {
              rightSpinner.current.runTo(boolArr[2], {
                delay: 650,
                complete: () => {
                  setStates(boolArr)
                  cb(boolArr)
                }
              })
            },
          })
        },
      })
    }
  }))

  return <div className="slot-machine">
      <Spinner items={items} ref={leftSpinner} defaultState={states[0]}/>
      <Spinner items={items} ref={midleSpinner} defaultState={states[1]}/>
      <Spinner items={items} ref={rightSpinner} defaultState={states[2]}/>
  </div>
});

export default SlotMachine;
