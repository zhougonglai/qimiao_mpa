import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '~/style/index.css'
import '~/style/activity.scss'
import 'antd/dist/antd.less';
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)
