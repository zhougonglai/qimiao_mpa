import React, { useRef, useEffect } from 'react';
import { useSetState, useMount, useCookieState, useCountDown, useBoolean } from 'ahooks';
import { message } from 'antd';
import logo from '~/assets/img/logo.png';
import phoneIcon from '~/assets/img/phone.svg';
import smsIcon from '~/assets/img/sms.svg';
import request from '~/utils/request';
import './index.scss';

const Login = ({ loginSuccess }) => {
  const [ formData, setForm ] = useSetState({
    mobile_num: '',
    country_code: 86,
    smscode: '',
    smscode_key: '',
    captchaObj: '',
  });
  const [ timer, { setTrue, setFalse } ] = useBoolean(false)

  const inputRef = useRef();
  const [ userData, saveUserData ] = useCookieState('userData');
  const [ countdown, setTargetDate ] = useCountDown({
    onEnd: () => setFalse()
  })

  useEffect(async () => {
    inputRef.current.focus();
    const { data } = await request(`${import.meta.env.VITE_BASE_PATH}tools/captcha/geetest/config`, {
      method: 'post',
      body: JSON.stringify({ type: 'web' })
    })
    window.initGeetest({
      ...data,
      offline: !data.success,
      product: 'bind'
    }, captchaObj => {
      captchaObj.onReady(() => {
        setForm({ captchaObj })
      }).onSuccess(async () => {
        const validata = captchaObj.getValidate();

        const { code, data, msg } = await request(`${import.meta.env.VITE_BASE_PATH}tools/smscode`, {
          method: 'post',
          body: JSON.stringify({
            phone: formData.mobile_num || inputRef.current.value,
            state: 0,
            country_code: formData.country_code,
            ...validata,
          })
        })
        if(code) {
          message.warn(msg);
          captchaObj.reset();
        } else {
          setForm({smscode_key: data.smscode_key})
          setTargetDate(Date.now() + 60 * 1000)
          setTrue()
          captchaObj.destroy();
        }
      });
    })
  }, [])

  const handleSendSms = () => {
    formData.captchaObj.verify();
  }

  const handleInput = e => {
    if(e.target.value.trim().replace(/[^\d]/g, '') != formData.mobile_num) {
      setForm({ mobile_num: e.target.value.trim().replace(/[^\d]/g, '') })
    }
  }

  const handleSubmit = async () => {
    const { data, code, msg } = await request(`${import.meta.env.VITE_BASE_PATH}api/auth/login/code`, {
      method: 'post',
      body: JSON.stringify({
        ...formData,
      })
    });
    if(code) {
      message.info(msg);
    } else {
      saveUserData(JSON.stringify(data), {
        expires: (() => new Date(data.login_info.expiry_time))()
      })
      if(typeof loginSuccess === 'function') loginSuccess(data);
    }
  }

  return (
    <div className="login-block flex flex-col items-center">
      <div className="login-logo">
        <img src={logo} width="258" alt="奇妙加速器"/>
      </div>
      <form noValidate className="form login-form mt-8 flex flex-col items-center justify-center">
        <div className="form-contrl my-4 flex items-center justify-start">
          <img src={phoneIcon} className="form-icon" alt="手机号"/>
          <input
            id="mobile_num"
            placeholder="手机号"
            maxLength="16"
            ref={inputRef}
            value={formData.mobile_num}
            onInput={handleInput}
            className="form-input font-sans"/>
          {/* <label htmlFor="mobile_num" className="form-label">手机号</label> */}
        </div>
        <div className="form-contrl my-4 flex items-center justify-start">
          <img src={smsIcon} className="form-icon" alt="验证码"/>
          <input id="smscode" placeholder="验证码" maxLength="6"
            onInput={e => setForm({ smscode: e.target.value })}
            className="form-input font-sans" />
          {/* <label htmlFor="smscode" className="form-label">验证码</label> */}
          <button type="button" id="smsbtn" className="sms-btn" disabled={timer} onClick={handleSendSms}>
            {
              timer
              ? '(' + Math.round(countdown / 1000) + ')'
              : '发送验证码'
            }
          </button>
        </div>
        <div className="form-actions mt-8 flex items-center justify-center">
          <button type="button" className="login" onClick={handleSubmit}>
            立即登录
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
