import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import '~/style/index.css'
import './index.scss'
import UserInfo from '~/components/UserInfo'

ReactDOM.render(
  <React.StrictMode>
    <UserInfo />
  </React.StrictMode>,
  document.getElementById('user-info')
)
