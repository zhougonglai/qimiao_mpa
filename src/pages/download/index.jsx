import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less';
import '~/style/index.css'
import '~/style/index.scss'
import './index.scss'
import UserInfo from '~/components/UserInfo'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <UserInfo />
  </React.StrictMode>,
  document.getElementById('user-info')
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('download')
)
